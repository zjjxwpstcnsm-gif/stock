/** Bounded, resumable shuffle bags. Infinite means cycling a finite bank, not AI-generated questions. */
export const DRILL_SCHEMA = 1;
export const MAX_BATCH = 200;
const unique = values => Array.isArray(values) && new Set(values).size === values.length;
const counter = value => Number.isSafeInteger(value) && value >= 0;
function shuffled(ids, random) {
  const result = [...ids];
  for (let i = result.length - 1; i > 0; i--) {
    const value = random();
    if (!Number.isFinite(value) || value < 0 || value >= 1) throw new RangeError('随机数必须在 [0, 1) 内');
    const j = Math.floor(value * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function take(drill, previousId, random) {
  const next = { ...drill, pool: [...drill.pool], remaining: [...drill.remaining] };
  if (!next.remaining.length) {
    next.remaining = shuffled(next.pool, random);
    next.cycle += 1;
    if (next.remaining.length > 1 && next.remaining[0] === previousId) {
      [next.remaining[0], next.remaining[1]] = [next.remaining[1], next.remaining[0]];
    }
  }
  // End at the cycle boundary: session IDs stay unique for grading and backups.
  const ids = next.remaining.splice(0, next.batchSize);
  return { ids, drill: next };
}
export function createDrill(pool, { batchSize = 10, endless = false, instant = true } = {}, random = Math.random) {
  if (!unique(pool) || !pool.length || pool.some(id => typeof id !== 'string' || !id)) throw new TypeError('题池必须包含不重复的题目ID');
  if (!Number.isInteger(batchSize) || batchSize < 1 || batchSize > MAX_BATCH) throw new RangeError('每组题数须为1至200的整数');
  if (typeof endless !== 'boolean' || typeof instant !== 'boolean') throw new TypeError('模式设置无效');
  return take({ schema: DRILL_SCHEMA, pool: [...pool], remaining: [], batchSize, endless, instant, cycle: 0, batches: 0, answered: 0, correct: 0 }, null, random);
}
export function advanceDrill(session, correct, random = Math.random) {
  const { drill, ids, checked } = session;
  if (!drill || !counter(correct) || correct > checked.length || checked.length > ids.length) throw new TypeError('无法续接无效的刷题记录');
  const totals = { ...drill, batches: drill.batches + 1, answered: drill.answered + checked.length, correct: drill.correct + correct };
  if (![totals.batches, totals.answered, totals.correct].every(counter)) throw new RangeError('累计记录超过安全整数范围，请开始新练习');
  return take(totals, ids[ids.length - 1], random);
}
export function validDrill(session, bankIds) {
  if (session.drill === undefined) return true; // Legacy sessions remain compatible.
  const d = session.drill;
  if (!d || session.mode !== 'practice' || d.schema !== DRILL_SCHEMA || typeof d.endless !== 'boolean' || typeof d.instant !== 'boolean') return false;
  if (!Number.isInteger(d.batchSize) || d.batchSize < 1 || d.batchSize > MAX_BATCH || !counter(d.cycle) || d.cycle < 1) return false;
  if (![d.batches, d.answered, d.correct].every(counter) || d.correct > d.answered || d.answered > d.batches * MAX_BATCH) return false;
  if (!unique(d.pool) || !d.pool.length || d.pool.length > bankIds.size || d.pool.some(id => !bankIds.has(id))) return false;
  const pool = new Set(d.pool);
  if (!unique(d.remaining) || d.remaining.length > pool.size || d.remaining.some(id => !pool.has(id))) return false;
  if (session.ids.length > Math.min(d.batchSize, pool.size) || session.ids.some(id => !pool.has(id) || d.remaining.includes(id))) return false;
  return true;
}
