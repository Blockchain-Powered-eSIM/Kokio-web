// Checks the data calculator's arithmetic. Run: node --experimental-strip-types scripts/check-data-usage.mjs

import assert from "node:assert/strict";

import { defaultHours, estimateGb } from "../lib/esim/data-usage.ts";

assert.equal(estimateGb(1, { browsing: 3 }), 0.3);
assert.equal(estimateGb(10, { video: 4 }), 10);
assert.equal(estimateGb(1, { "video-calls": 1 }), 0.6);
assert.equal(estimateGb(7, {}), 0);
// 7 days of the defaults: 7 x (0.3 + 0.072 + 0.125) = 3.479, rounded up.
assert.equal(estimateGb(7, defaultHours()), 3.5);

console.log("Data usage checks passed.");
