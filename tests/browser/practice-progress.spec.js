import { test, expect } from '@playwright/test';

async function openFund(page) {
  await page.goto('/');
  const id = await page.evaluate(async () => {
    const { SUBJECTS } = await import('/src/subjects.js');
    return Object.values(SUBJECTS).filter(s => s.isFund)
      .sort((a, b) => Object.keys(b.CHAPTERS).length - Object.keys(a.CHAPTERS).length)[0].id;
  });
  await page.goto(`/?subject=${id}#practice`);
  await expect(page.locator('.progress-chapter').first()).toBeVisible();
}

async function seed(page) {
  const expected = await page.evaluate(async () => {
    const { SUBJECT } = await import('/src/subjects.js');
    const ids = Object.keys(SUBJECT.CHAPTERS).map(Number);
    const first = SUBJECT.QUESTIONS.find(q => q.chapter === ids[0]);
    const last = SUBJECT.QUESTIONS.find(q => q.chapter === ids.at(-1));
    const progress = {
      [first.id]: {attempts: 12, correct: 10, wrong: false},
      [last.id]: {attempts: 3, correct: 1, wrong: true},
      'retired-question': {attempts: 10, correct: 10, wrong: false},
    };
    localStorage.setItem(SUBJECT.practiceKey, JSON.stringify({active: null, suspended: null, progress, history: [], saved: []}));
    return {count: ids.length, first: ids[0], last: ids.at(-1), total: SUBJECT.QUESTIONS.length,
      lastTotal: SUBJECT.QUESTIONS.filter(q => q.chapter === ids.at(-1)).length};
  });
  await page.reload();
  return expected;
}

test('every chapter exposes existing, deduplicated progress and filters preserve its denominator', async ({page}) => {
  await openFund(page);
  const data = await seed(page);
  await expect(page.locator('.progress-chapter')).toHaveCount(data.count + 1);
  const all = page.locator('#practice-chapter-0');
  const last = page.locator(`#practice-chapter-${data.last}`);
  await expect(all.locator('.chapter-progress-meta')).toContainText(`已练 2 / ${data.total} 题`);
  await expect(last.locator('.chapter-progress-meta')).toContainText(`已练 1 / ${data.lastTotal} 题`);
  await expect(last.locator('.chapter-progress-detail')).toContainText('待纠正 1 题');
  await page.selectOption('#practice-status', 'unseen');
  await expect(last.locator('.chapter-matched')).toHaveText(`匹配 ${data.lastTotal - 1} 题`);
  await expect(last.locator('.chapter-progress-meta')).toContainText(`已练 1 / ${data.lastTotal} 题`);
  await page.selectOption('#practice-status', 'saved');
  await expect(last.locator('.chapter-matched')).toHaveText('匹配 0 题');
  await expect(last).toBeEnabled();
  await last.click();
  await expect(page.locator('[data-action="start-practice"]')).toBeDisabled();
  await expect(last).toHaveAttribute('aria-pressed', 'true');
  await page.reload();
  await expect(all.locator('.chapter-progress-meta')).toContainText(`已练 2 / ${data.total} 题`);
});

test('choosing a later module retains scroll position, keyboard focus and mobile width', async ({page}) => {
  await openFund(page);
  const last = page.locator('.progress-chapter').last();
  await last.scrollIntoViewIfNeeded();
  const before = await page.locator('.chapter-picker').evaluate(el => el.scrollTop);
  await last.click();
  await expect(last).toBeFocused();
  await expect(last).toHaveAttribute('aria-pressed', 'true');
  const after = await page.locator('.chapter-picker').evaluate(el => el.scrollTop);
  expect(Math.abs(after - before)).toBeLessThan(3);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('confirmed answers update progress immediately while unconfirmed choices do not', async ({page}) => {
  await page.goto('/#practice');
  await page.locator('[data-action="start-practice"]').click();
  await expect(page.locator('#question-title')).toBeVisible();
  const answer = await page.evaluate(async () => {
    const { SUBJECT } = await import('/src/subjects.js');
    const active = JSON.parse(localStorage.getItem(SUBJECT.practiceKey)).active;
    return SUBJECT.QUESTIONS.find(q => q.id === active.ids[0]).answer;
  });
  for (const option of Array.isArray(answer) ? answer : [answer]) await page.locator(`#option-${option}`).click();
  await page.locator('nav [data-view="practice"]').click();
  await expect(page.locator('#practice-chapter-0 .chapter-progress-meta')).toContainText('已练 0 /');
  await page.locator('[data-action="resume"]').click();
  await page.locator('[data-action="check"]').click();
  await page.locator('nav [data-view="practice"]').click();
  await expect(page.locator('#practice-chapter-0 .chapter-progress-meta')).toContainText('已练 1 /');
  await page.reload();
  await expect(page.locator('#practice-chapter-0 .chapter-progress-meta')).toContainText('已练 1 /');
});

test('newly completed chapters keep wrong counts and refresh after cross-tab record changes', async ({page}) => {
  await page.goto('/#practice');
  const chapter = await page.evaluate(async () => {
    const { SUBJECT } = await import('/src/subjects.js');
    const chapter = Number(Object.keys(SUBJECT.CHAPTERS)[0]);
    const progress = Object.fromEntries(SUBJECT.QUESTIONS.filter(q => q.chapter === chapter)
      .map(q => [q.id, {attempts: 1, correct: 0, wrong: true}]));
    const value = JSON.stringify({active: null, suspended: null, progress, history: [], saved: []});
    localStorage.setItem(SUBJECT.practiceKey, value);
    dispatchEvent(new StorageEvent('storage', {key: SUBJECT.practiceKey, newValue: value}));
    return chapter;
  });
  const card = page.locator(`#practice-chapter-${chapter}`);
  await expect(card.locator('.chapter-progress-state')).toHaveText('已练完 · 100%');
  await expect(card.locator('.chapter-progress-detail')).toContainText('未练 0 题');
  await expect(card.locator('.chapter-progress-wrong')).toBeVisible();
});
