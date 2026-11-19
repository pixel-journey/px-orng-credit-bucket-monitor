# Worked examples — ORNG credit bucket

Dapp `pxrngdapp`, `T0 = 1_700_000_000`.

## canRequest / acceptWager

Empty bucket → `insufficient`. Free preferred: free 3 + paid 5, wager 1 → source **free**, creditsLeft **2**.

Free 0 + paid 2 → source **paid**.

`acceptWager` with free 2 → free becomes **1**. Insufficient accept is a **no-op** (bucket unchanged — no partial consume).

Wager `0` or `1_000_000_001` refused.

## refill

free 0, refillAt T0+100, refillAmount 10:

| nowTs | freeCredits |
| --- | --- |
| T0+50 | 0 |
| T0+100 | **10**, next refillAt T0+100+86400 |

Refill fires at `refillAt`, not on every read.

## topUp / consume

`topUpPaid(..., 7)` → paid 7; amount 0 refused. Consume free/paid on empty throws.

Bad dapp name `BadName` refused on emptyBucket.

## Funding order for one call

1. **Free** (this lab) — prefer before paid  
2. **Paid** — [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) (`0.01 WAX` per missing call)  
3. **Stake** — [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) only for remaining shortfall  

Do not charge all paths for one call. Do not open a job when the gate said no.

Gate only — no live orng credit table read. Client-reported free counts are not authority.
