# Worked examples — ORNG credit bucket

Dapp `pxrngdapp`, `T0 = 1_700_000_000`.

## canRequest / acceptWager

Empty bucket → `insufficient`. Free preferred: free 3 + paid 5, wager 1 → source **free**, creditsLeft **2**.

Free 0 + paid 2 → source **paid**.

`acceptWager` with free 2 → free becomes **1**. Insufficient accept is a **no-op** (bucket unchanged).

Wager `0` or `1_000_000_001` refused.

## refill

free 0, refillAt T0+100, refillAmount 10:

| nowTs | freeCredits |
| --- | --- |
| T0+50 | 0 |
| T0+100 | **10**, next refillAt T0+100+86400 |

## topUp / consume

`topUpPaid(..., 7)` → paid 7; amount 0 refused. Consume free/paid on empty throws.

Bad dapp name `BadName` refused on emptyBucket.

Gate only — no live orng credit table read.
