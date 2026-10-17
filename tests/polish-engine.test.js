import test from 'node:test';
import assert from 'node:assert/strict';
import { SUBJECTS } from '../src/subjects.js';
import { createExamEngine } from '../src/engine.js';
import { collectBackup, collectRecoveryCopies, importBackup, listRecoveryCopyKeys, mergeRecords, validateBackup } from '../src/learning-records.js';

function storage(initial = []) {
  const values = new Map(initial);
  return {
    values,
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  };
}

function record(subject, now = 1000) {
  const q = subject.QUESTIONS[0];
  return {
    practice: {
      active: createExamEngine(subject).makeSession([q.id], 'practice', null, now),
      suspended: null,
      progress: { [q.id]: { attempts: 5, correct: 4, wrong: false } },
      history: [],
      saved: [q.id],
    },
    course: { last: subject.LESSONS[1].id, done: [subject.LESSONS[0].id] },
  };
}

function emptyRecord(subject) {
  return validateBackup(collectBackup(storage()))[subject.id];
}

test('importing an empty backup cannot erase practice when only a local lesson ID is obsolete', () => {
  const subject = SUBJECTS.options, local = record(subject);
  const practiceRaw = JSON.stringify(local.practice);
  const courseRaw = JSON.stringify({ ...local.course, last: 'removed-lesson' });
  const store = storage([[subject.practiceKey, practiceRaw], [subject.courseKey, courseRaw]]);

  const result = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  const restored = validateBackup(collectBackup(store))[subject.id];
  assert.deepEqual(restored.practice.active, local.practice.active);
  assert.deepEqual(restored.practice.progress, local.practice.progress);
  assert.deepEqual(restored.practice.saved, local.practice.saved);
  assert.deepEqual(restored.course.done, local.course.done);
  assert.deepEqual(result.recoveredSubjects, [subject.id]);
  assert.equal(result.recoveryKeys.length, 1);
  assert.deepEqual(listRecoveryCopyKeys(store), result.recoveryKeys);

  const originals = collectRecoveryCopies(result.recoveryKeys, store);
  assert.equal(originals.copies[0].snapshots[0].practiceRaw, practiceRaw);
  assert.equal(originals.copies[0].snapshots[0].courseRaw, courseRaw);
  assert.throws(() => validateBackup(originals), /不是知权导出/);
});

test('local recovery retains valid records independently of a damaged session or individual progress entry', () => {
  const subject = SUBJECTS.fund2, local = record(subject);
  const engine = createExamEngine(subject);
  const exam = engine.makeSession(engine.makePaper(subject.QUESTIONS, 'standard'), 'exam', 'standard', 2000);
  const past = { ...local.practice.active, id: 'finished-practice', endedAt: 3000 };
  const damaged = {
    ...local.practice,
    active: { ...local.practice.active, ids: ['retired-question'] },
    suspended: exam,
    progress: { ...local.practice.progress, 'retired-question': { attempts: 1, correct: 0, wrong: true } },
    history: [past, { id: 'invalid-history' }],
    saved: [...local.practice.saved, 'retired-question'],
  };
  const store = storage([[subject.practiceKey, JSON.stringify(damaged)], [subject.courseKey, JSON.stringify(local.course)]]);

  const result = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  const restored = validateBackup(collectBackup(store))[subject.id];
  assert.equal(restored.practice.active, null);
  assert.deepEqual(restored.practice.suspended, exam);
  assert.deepEqual(restored.practice.progress, local.practice.progress);
  assert.deepEqual(restored.practice.history, [past]);
  assert.deepEqual(restored.practice.saved, local.practice.saved);
  assert.deepEqual(restored.course.done, local.course.done);
  const snapshot = collectRecoveryCopies(result.recoveryKeys, store).copies[0].snapshots[0];
  assert.deepEqual(JSON.parse(snapshot.practiceRaw), damaged);
});

test('unparseable local practice is preserved verbatim while valid course completion survives import', () => {
  const subject = SUBJECTS.options, local = record(subject), raw = '{partial-json';
  const store = storage([[subject.practiceKey, raw], [subject.courseKey, JSON.stringify(local.course)]]);
  const result = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  const restored = validateBackup(collectBackup(store))[subject.id];
  assert.deepEqual(restored.course.done, local.course.done);
  assert.equal(collectRecoveryCopies(result.recoveryKeys, store).copies[0].snapshots[0].practiceRaw, raw);
});

test('repeated recovery preserves earlier snapshots and an unreadable earlier recovery copy', () => {
  const subject = SUBJECTS.options, store = storage([[subject.practiceKey, '{first-broken']]);
  const first = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  store.setItem(subject.courseKey, '{second-broken');
  const second = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  assert.deepEqual(second.recoveryKeys, first.recoveryKeys);
  const snapshots = collectRecoveryCopies(second.recoveryKeys, store).copies[0].snapshots;
  assert.equal(snapshots.length, 2);
  assert.equal(snapshots[0].practiceRaw, '{first-broken');
  assert.equal(snapshots[1].courseRaw, '{second-broken');

  const unreadable = '{broken-previous-recovery';
  store.setItem(second.recoveryKeys[0], unreadable);
  store.setItem(subject.practiceKey, '{third-broken');
  const third = importBackup({ [subject.id]: emptyRecord(subject) }, store);
  assert.equal(collectRecoveryCopies(third.recoveryKeys, store).copies[0].snapshots[0].recoveryRaw, unreadable);
});

test('a backup active session uses a free suspended slot without replacing the local answer sheet', () => {
  const subject = SUBJECTS.options, local = record(subject, 1000), incoming = record(subject, 2000);
  const merged = mergeRecords(local, incoming);
  assert.deepEqual(merged.practice.active, local.practice.active);
  assert.deepEqual(merged.practice.suspended, incoming.practice.active);
  const again = mergeRecords(merged, incoming);
  assert.deepEqual(again.practice, merged.practice);
  assert.equal(again.practice.progress[subject.QUESTIONS[0].id].attempts, 5);
});

test('an active session exported earlier cannot duplicate or overwrite its current local suspended copy', () => {
  const subject = SUBJECTS.options, local = record(subject, 1000), incoming = record(subject, 2000);
  const q = subject.QUESTIONS[0];
  local.practice.suspended = { ...incoming.practice.active, answers: { [q.id]: q.answer } };
  const merged = mergeRecords(local, incoming);
  assert.deepEqual(merged.practice.active, local.practice.active);
  assert.deepEqual(merged.practice.suspended, local.practice.suspended);
  assert.notEqual(merged.practice.active.id, merged.practice.suspended.id);
});

test('an older backup cannot resurrect a practice attempt already completed locally', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = structuredClone(local);
  const q = subject.QUESTIONS[0], finished = { ...local.practice.active, answers: { [q.id]: q.answer }, checked: [q.id], endedAt: 3000 };
  local.practice.active = null;
  local.practice.history = [finished];
  const store = storage([[subject.practiceKey, JSON.stringify(local.practice)], [subject.courseKey, JSON.stringify(local.course)]]);

  importBackup({ [subject.id]: incoming }, store);
  const restored = validateBackup(collectBackup(store))[subject.id].practice;
  assert.equal(restored.active, null);
  assert.equal(restored.suspended ?? null, null);
  assert.deepEqual(restored.history, [finished]);
  assert.deepEqual(restored.progress, local.practice.progress);
});

test('a finished imported exam closes an older local copy while retaining a different pending attempt', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = emptyRecord(subject), engine = createExamEngine(subject);
  const exam = engine.makeSession(engine.makePaper(subject.QUESTIONS, 'level1'), 'exam', 'level1', 2000);
  local.practice.suspended = local.practice.active;
  local.practice.active = exam;
  incoming.practice.history = [{ ...exam, endedAt: 5000 }];
  const merged = mergeRecords(local, incoming);
  assert.equal(merged.practice.active, null);
  assert.deepEqual(merged.practice.suspended, local.practice.suspended);
  assert.deepEqual(merged.practice.history, incoming.practice.history);
});

test('repeated imports do not revive a closed attempt after newer history displaces it from the recent 50', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = structuredClone(local), engine = createExamEngine(subject);
  const q = subject.QUESTIONS[0], closedId = local.practice.active.id;
  local.practice.history = [{ ...local.practice.active, answers: { [q.id]: q.answer }, checked: [q.id], endedAt: 2000 }];
  local.practice.active = null;
  incoming.practice.history = Array.from({ length: 50 }, (_, i) => ({
    ...engine.makeSession([q.id], 'practice', null, 3000 + i),
    answers: { [q.id]: q.answer }, checked: [q.id], endedAt: 4000 + i,
  }));
  const latestIds = incoming.practice.history.toSorted((a, b) => b.endedAt - a.endedAt).map(s => s.id);
  const store = storage([[subject.practiceKey, JSON.stringify(local.practice)], [subject.courseKey, JSON.stringify(local.course)]]);
  let previous;
  for (let i = 0; i < 3; i++) {
    importBackup({ [subject.id]: incoming }, store);
    const restored = validateBackup(collectBackup(store))[subject.id].practice;
    assert.equal(restored.active, null);
    assert.equal(restored.suspended ?? null, null);
    assert.deepEqual(restored.history.map(s => s.id), latestIds);
    assert.deepEqual(restored.closedSessionIds, [closedId]);
    if (previous) assert.deepEqual(restored, previous);
    previous = restored;
  }
  const anotherDevice = storage();
  importBackup(validateBackup(collectBackup(store)), anotherDevice);
  importBackup({ [subject.id]: incoming }, anotherDevice);
  assert.equal(validateBackup(collectBackup(anotherDevice))[subject.id].practice.active, null);
});

test('merging completed histories without a pending conflict does not accumulate closed-session markers', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = emptyRecord(subject);
  local.practice.history = [{ ...local.practice.active, endedAt: 2000 }];
  local.practice.active = null;
  const merged = mergeRecords(local, incoming);
  assert.deepEqual(merged.practice.closedSessionIds ?? [], []);
  assert.deepEqual(merged.practice.history, local.practice.history);
});

test('invalid external closed-session markers are rejected while valid local markers survive partial recovery', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = structuredClone(local), closedId = local.practice.active.id;
  const store = storage(), validIncoming = emptyRecord(subject);
  for (const markers of ['not-an-array', [1], [''], ['x'.repeat(101)], ['bad<script>']]) {
    const invalid = structuredClone(validIncoming);
    invalid.practice.closedSessionIds = markers;
    assert.throws(() => importBackup({ [subject.id]: invalid }, store), /已完成答卷标记/);
    assert.equal(store.values.size, 0);
  }
  local.practice.active = null;
  local.practice.closedSessionIds = [closedId, 'bad<script>', closedId];
  const raw = JSON.stringify(local.practice);
  store.setItem(subject.practiceKey, raw);
  store.setItem(subject.courseKey, JSON.stringify(local.course));
  const outcome = importBackup({ [subject.id]: incoming }, store);
  const restored = validateBackup(collectBackup(store))[subject.id].practice;
  assert.equal(restored.active, null);
  assert.deepEqual(restored.closedSessionIds, [closedId]);
  assert.equal(collectRecoveryCopies(outcome.recoveryKeys, store).copies[0].snapshots[0].practiceRaw, raw);
});

test('invalid external data is rejected before any existing local record or recovery copy changes', () => {
  const subject = SUBJECTS.options, local = record(subject), incoming = emptyRecord(subject);
  incoming.practice.progress.bad = { attempts: 1, correct: 0, wrong: true };
  const store = storage([[subject.practiceKey, JSON.stringify(local.practice)], [subject.courseKey, '{broken-course']]);
  const before = new Map(store.values);
  assert.throws(() => importBackup({ [subject.id]: incoming }, store), /无效的作答记录/);
  assert.deepEqual(store.values, before);
});

test('a transient storage read failure aborts import instead of replacing unavailable data with an empty record', () => {
  const subject = SUBJECTS.options, local = record(subject);
  const store = storage([[subject.practiceKey, JSON.stringify(local.practice)], [subject.courseKey, JSON.stringify(local.course)]]);
  const before = new Map(store.values), read = store.getItem;
  let reads = 0;
  store.getItem = key => { if (++reads === 1) throw new Error('temporarily denied'); return read(key); };
  assert.throws(() => importBackup({ [subject.id]: emptyRecord(subject) }, store), /原记录未被覆盖/);
  assert.deepEqual(store.values, before);
});

test('failure to save a recovery copy leaves all original records untouched', () => {
  const subject = SUBJECTS.options, store = storage([[subject.practiceKey, '{broken']]);
  const before = new Map(store.values);
  store.setItem = () => { throw new Error('quota'); };
  assert.throws(() => importBackup({ [subject.id]: emptyRecord(subject) }, store), /quota/);
  assert.deepEqual(store.values, before);
});

test('a later multi-subject write failure rolls back merged records and newly created recovery copies', () => {
  const subjects = [SUBJECTS.options, SUBJECTS.fund1], store = storage(), incoming = {};
  for (const subject of subjects) {
    store.setItem(subject.practiceKey, JSON.stringify(record(subject).practice));
    store.setItem(subject.courseKey, '{broken-course');
    incoming[subject.id] = emptyRecord(subject);
  }
  const before = new Map(store.values), write = store.setItem;
  let writes = 0;
  store.setItem = (key, value) => { if (++writes === 6) throw new Error('quota'); return write(key, value); };
  assert.throws(() => importBackup(incoming, store), /quota/);
  assert.deepEqual(store.values, before);
});

test('a recovery copy remains available if the browser also refuses to restore an overwritten original', () => {
  const subject = SUBJECTS.options, local = record(subject), practiceRaw = JSON.stringify(local.practice);
  const store = storage([[subject.practiceKey, practiceRaw], [subject.courseKey, '{broken-course']]);
  const write = store.setItem;
  let writes = 0;
  store.setItem = (key, value) => { if ([3, 4].includes(++writes)) throw new Error('write refused'); return write(key, value); };
  assert.throws(() => importBackup({ [subject.id]: emptyRecord(subject) }, store), /部分本机记录未能自动恢复/);
  const originals = collectRecoveryCopies(listRecoveryCopyKeys(store), store);
  assert.equal(originals.copies[0].snapshots[0].practiceRaw, practiceRaw);
  assert.equal(originals.copies[0].snapshots[0].courseRaw, '{broken-course');
});

test('recovery export accepts only known recovery keys and cannot export unrelated local storage', () => {
  const store = storage([['unrelated-secret', 'private']]);
  assert.deepEqual(listRecoveryCopyKeys(store), []);
  assert.deepEqual(listRecoveryCopyKeys({ getItem: () => { throw new Error('denied'); } }), []);
  assert.throws(() => collectRecoveryCopies(['unrelated-secret'], store), /没有可导出/);
  assert.throws(() => collectRecoveryCopies([], store), /没有可导出/);
});
