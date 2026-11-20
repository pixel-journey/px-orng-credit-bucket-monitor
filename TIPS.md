# Tips — credit gate before requestrand

Spend **free** credits before **paid**. If neither covers the need, refuse and **do not** open a job. Fail paths must not change the bucket (`acceptWager` pattern).

## Do

- Gate **before** `openJob` and before any `requestrand` body is considered sendable.
- Refill free credits on an explicit schedule (this lab: fire at `T0+100` sets `nextRefillTs = T0+100+86400`).
- Document the period next to the product copy ("one free roll per day").

## Don't

- Trust a wallet flag "I still have free credits."
- Consume paid when free would have covered the call.
- Open the job, then discover the bucket is empty (RAM spent, oracle never asked, or worse: oracle asked and unpaid).

## Common mistakes

1. Decrementing credits and then throwing on a later check (user loses a roll, gets no entropy).
2. Refilling on every read instead of when `now >= nextRefillTs`.
3. Letting paid credits go negative and "borrowing" into tomorrow's free refill.
4. Skipping this gate because testnet `orng.wax` felt free.

## Nice-to-have extensions (other labs)

| Gap | Lab |
| --- | --- |
| 0.01 WAX per missing call | [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) |
| Stake WAX for a free-credit grant | [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) |
| Job row after the gate passes | [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) |
| Per-account daily cap besides oracle credits | [invariant kit](https://github.com/pixel-journey/px-invariant-kit) counter |

Path: `px-contract-examples-vault` (private index; not this public course).
