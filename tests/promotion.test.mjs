import assert from "node:assert/strict";
import test from "node:test";
import {
  MAX_PROMOTION_TIMER_MS,
  getPromotionTimerDelay,
  isPromotionActive,
} from "../src/promotion.js";

test("Kennenlernrabatt bleibt am 1. Oktober aktiv und endet am 2. Oktober", () => {
  const lastMillisecond = Date.parse("2026-10-01T23:59:59.999+02:00");
  const expiry = Date.parse("2026-10-02T00:00:00+02:00");

  assert.equal(isPromotionActive(lastMillisecond), true);
  assert.equal(isPromotionActive(expiry), false);
  assert.equal(getPromotionTimerDelay(lastMillisecond), 1);
  assert.equal(
    getPromotionTimerDelay(Date.parse("2026-08-28T00:00:00+02:00")),
    MAX_PROMOTION_TIMER_MS,
  );
});
