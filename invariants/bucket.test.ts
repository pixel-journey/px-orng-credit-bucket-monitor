import assert from "node:assert/strict";
import test from "node:test";
import {
  acceptWager,
  canRequest,
  consume,
  emptyBucket,
  maybeRefill,
  topUpPaid,
} from "./bucket.ts";

const DAPP = "pxrngdapp";
const T0 = 1_700_000_000;

test("empty bucket refuses a wager", () => {
  const b = emptyBucket(DAPP, T0);
  const g = canRequest(b, { wager: 100n, nowTs: T0 });
  assert.equal(g.ok, false);
  if (!g.ok) assert.equal(g.reason, "insufficient");
});

test("free credits preferred over paid", () => {
  let b = emptyBucket(DAPP, T0);
  b = { ...b, freeCredits: 3, paidCredits: 5 };
  const g = canRequest(b, { wager: 1n, nowTs: T0 });
  assert.equal(g.ok, true);
  if (g.ok) {
    assert.equal(g.source, "free");
    assert.equal(g.creditsLeft, 2);
  }
});

test("paid credits used when free is empty", () => {
  let b = emptyBucket(DAPP, T0);
  b = { ...b, freeCredits: 0, paidCredits: 2 };
  const g = canRequest(b, { wager: 50n, nowTs: T0 });
  assert.equal(g.ok, true);
  if (g.ok) assert.equal(g.source, "paid");
});

test("refill restores free credits at refillAt", () => {
  let b = emptyBucket(DAPP, T0);
  b = { ...b, freeCredits: 0, refillAt: T0 + 100, refillAmount: 10 };
  assert.equal(maybeRefill(b, T0 + 50).freeCredits, 0);
  const live = maybeRefill(b, T0 + 100);
  assert.equal(live.freeCredits, 10);
  assert.equal(live.refillAt, T0 + 100 + 86400);
});

test("acceptWager consumes one free credit", () => {
  let b = emptyBucket(DAPP, T0);
  b = { ...b, freeCredits: 2 };
  const { gate, bucket } = acceptWager(b, { wager: 10n, nowTs: T0 });
  assert.equal(gate.ok, true);
  assert.equal(bucket.freeCredits, 1);
});

test("acceptWager is a no-op on insufficient", () => {
  const b = emptyBucket(DAPP, T0);
  const { gate, bucket } = acceptWager(b, { wager: 10n, nowTs: T0 });
  assert.equal(gate.ok, false);
  assert.deepEqual(bucket, b);
});

test("zero or oversized wager refused", () => {
  let b = emptyBucket(DAPP, T0);
  b = { ...b, freeCredits: 5 };
  assert.equal(canRequest(b, { wager: 0n, nowTs: T0 }).ok, false);
  assert.equal(canRequest(b, { wager: 1_000_000_001n, nowTs: T0 }).ok, false);
});

test("topUpPaid increases paid balance", () => {
  const b = topUpPaid(emptyBucket(DAPP, T0), 7);
  assert.equal(b.paidCredits, 7);
  assert.throws(() => topUpPaid(b, 0), /bad amount/);
});

test("consume without balance throws", () => {
  const b = emptyBucket(DAPP, T0);
  assert.throws(() => consume(b, { nowTs: T0, source: "free" }), /insufficient free/);
  assert.throws(() => consume(b, { nowTs: T0, source: "paid" }), /insufficient paid/);
});

test("bad dapp name refused", () => {
  assert.throws(() => emptyBucket("BadName", T0), /bad dapp/);
});
