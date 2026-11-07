/**
 * orng.wax v3 adaptive credit-bucket gate (educational).
 * Read the bucket before accepting a wager that needs randomness.
 * No live orng.wax. No wasm.
 */

export const MIN_CREDITS = 1;
export const MAX_CREDITS = 1_000_000;
export const MAX_WAGER = 1_000_000_000n;
export const CREDITS_PER_REQUEST = 1;
export const REFILL_PERIOD = 86400;

export type Bucket = {
  dapp: string;
  freeCredits: number;
  paidCredits: number;
  /** Unix seconds when the free bucket next refills. */
  refillAt: number;
  refillAmount: number;
};

export type GateResult =
  | { ok: true; source: "free" | "paid"; creditsLeft: number }
  | { ok: false; reason: "insufficient" | "bad_wager" | "bad_bucket" };

const NAME = /^[a-z1-5.]{1,12}$/;

function assertName(name: string, label: string): void {
  if (!NAME.test(name) || name.startsWith(".") || name.endsWith(".")) {
    throw new Error("bad " + label);
  }
}

/** Starts empty; next free refill is one period ahead. */
export function emptyBucket(dapp: string, nowTs: number): Bucket {
  assertName(dapp, "dapp");
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  return {
    dapp,
    freeCredits: 0,
    paidCredits: 0,
    refillAt: nowTs + REFILL_PERIOD,
    refillAmount: 10,
  };
}

export function maybeRefill(bucket: Bucket, nowTs: number): Bucket {
  if (!Number.isInteger(nowTs) || nowTs < 0) throw new Error("bad nowTs");
  if (nowTs < bucket.refillAt) return { ...bucket };
  if (!Number.isInteger(bucket.refillAmount) || bucket.refillAmount < 0) {
    throw new Error("bad refill");
  }
  return {
    ...bucket,
    freeCredits: Math.min(MAX_CREDITS, bucket.refillAmount),
    refillAt: nowTs + REFILL_PERIOD,
  };
}

export function canRequest(
  bucket: Bucket,
  input: { wager: bigint; nowTs: number },
): GateResult {
  if (input.wager < 1n || input.wager > MAX_WAGER) {
    return { ok: false, reason: "bad_wager" };
  }
  if (!Number.isInteger(input.nowTs) || input.nowTs < 0) {
    return { ok: false, reason: "bad_bucket" };
  }
  const live = maybeRefill(bucket, input.nowTs);
  if (live.freeCredits < 0 || live.paidCredits < 0) {
    return { ok: false, reason: "bad_bucket" };
  }
  if (live.freeCredits >= CREDITS_PER_REQUEST) {
    return {
      ok: true,
      source: "free",
      creditsLeft: live.freeCredits - CREDITS_PER_REQUEST,
    };
  }
  if (live.paidCredits >= CREDITS_PER_REQUEST) {
    return {
      ok: true,
      source: "paid",
      creditsLeft: live.paidCredits - CREDITS_PER_REQUEST,
    };
  }
  return { ok: false, reason: "insufficient" };
}

export function consume(
  bucket: Bucket,
  input: { nowTs: number; source: "free" | "paid" },
): Bucket {
  const live = maybeRefill(bucket, input.nowTs);
  if (input.source === "free") {
    if (live.freeCredits < CREDITS_PER_REQUEST) throw new Error("insufficient free");
    return { ...live, freeCredits: live.freeCredits - CREDITS_PER_REQUEST };
  }
  if (live.paidCredits < CREDITS_PER_REQUEST) throw new Error("insufficient paid");
  return { ...live, paidCredits: live.paidCredits - CREDITS_PER_REQUEST };
}

export function topUpPaid(bucket: Bucket, amount: number): Bucket {
  if (!Number.isInteger(amount) || amount < 1 || amount > MAX_CREDITS) {
    throw new Error("bad amount");
  }
  const next = bucket.paidCredits + amount;
  if (next > MAX_CREDITS) throw new Error("paid overflow");
  return { ...bucket, paidCredits: next };
}

export function acceptWager(
  bucket: Bucket,
  input: { wager: bigint; nowTs: number },
): { gate: GateResult; bucket: Bucket } {
  const gate = canRequest(bucket, input);
  if (!gate.ok) return { gate, bucket };
  return {
    gate,
    bucket: consume(bucket, { nowTs: input.nowTs, source: gate.source }),
  };
}
