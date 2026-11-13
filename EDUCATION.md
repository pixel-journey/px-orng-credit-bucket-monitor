# Education — adaptive credit bucket gate

> **Rung:** `npm test` passes. Models the **shape** of free-then-paid credits before a randomness wager.  
> Live balances still come from [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## What you should be able to do

| Level | Skill |
| --- | --- |
| Beginner | Prefer free credits, then paid |
| Intermediate | Apply pending refill when `nowTs >= refillAt` |
| Masterclass | Failed gate must not debit |

## Beginner

Each randomness request costs `CREDITS_PER_REQUEST` (1). Gate returns `source: "free" | "paid"` or `insufficient`.

## Intermediate

`maybeRefill` sets free credits to `refillAmount` (capped) and schedules the next period when the clock passes `refillAt`. `acceptWager` only consumes after a successful gate.

## Masterclass

This is **not** a substitute for reading live oracle tables. It teaches product policy: never open an expensive game path when the dapp cannot pay the RNG fee.

## Will not teach

Live Hyperion/table reads or automatic WAX staking (see stake-manager / topup vault).
