# Worked examples — ORNG credit bucket

Dapp `pxrngdapp`. `T0 = 1_700_000_000`.

## Preference order

Empty bucket → `canRequest` is `insufficient`.

Free 3 + paid 5, wager 1 → source `free`, creditsLeft 2.

Free 0 + paid 2 → source `paid`.

## Refill

Free 0, `refillAt = T0+100`, `refillAmount = 10`.

| nowTs | freeCredits |
| --- | --- |
| T0+50 | 0 |
| T0+100 | 10, next refillAt T0+100+86400 |

## acceptWager

Free 2 → after accept free 1. Insufficient → gate fails and **bucket unchanged**.

Wager `0` or `1_000_000_001` refused. `topUpPaid(7)` → paid 7; amount 0 throws. `consume` on empty free/paid throws. Bad dapp name throws.

No live table read from `orng.wax`.
