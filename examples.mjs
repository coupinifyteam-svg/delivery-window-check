import assert from 'node:assert/strict';
import { compareDeliveryWindow } from './delivery-window-check.mjs';

const needBy = '2026-12-18';
const examples = [
  ['2026-12-14', '2026-12-18', 'within-deadline'],
  ['2026-12-16', '2026-12-20', 'may-miss-deadline'],
  ['2026-12-19', '2026-12-21', 'after-deadline'],
];

const results = examples.map(([earliest, latest, expected]) => {
  const result = compareDeliveryWindow(earliest, latest, needBy);
  assert.equal(result, expected);
  return { earliest, latest, needBy, result };
});

console.table(results);
