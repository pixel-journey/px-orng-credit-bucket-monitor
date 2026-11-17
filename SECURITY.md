# Security — adaptive credit bucket gate

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty bucket accept | insufficient; **no debit** |
| Failed acceptWager | bucket **unchanged** |
| Wager 0 / oversized | refused |
| topUp 0 | refused |
| consume without balance | throws |
| Bad dapp name | refused |

Prefer **free** credits over paid. Gate and consume are one step.

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Authoritative balances | Read oracle / on-chain credit state; **do not trust client free counts** |
| Race between gate and request | Same action or locked job row |
| Clock for refillAt | Trusted time; document skew policy |
| Paid top-up custody | Who holds WAX; memo integrity |

## Attack angles

1. Client invents free credits.
2. Partial consume on a failed accept.
3. Opening a job when the gate said no.
4. Burning paid before free is exhausted.

## Honesty limits

Local policy model only — no live `orng.wax` reads. Related: [topup](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) · [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) · [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter).
