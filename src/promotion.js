export const PROMOTION_END = "2026-10-02T00:00:00+02:00";
export const MAX_PROMOTION_TIMER_MS = 2_147_483_647;

export const isPromotionActive = (now = Date.now()) =>
  now < Date.parse(PROMOTION_END);

export const getPromotionTimerDelay = (now = Date.now()) =>
  Math.min(Math.max(Date.parse(PROMOTION_END) - now, 0), MAX_PROMOTION_TIMER_MS);
