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
| Free preferred over paid | free 3 + paid 5, wager 1 → source **free** |

## Funding order (do not reorder)

```text
1. Free credits  (this lab)
2. Paid credits  (pay-per-use topup)
3. Stake         (auto-stake) — shortfall only
```

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
5. Charging free + paid + stake for one call.

## Honesty limits

Local policy model only — no live `orng.wax` reads.

| Sibling | Distinction |
| --- | --- |
| [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) | 0.01 WAX per missing call |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Last-resort stake plan |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve |

[wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) · [docs.wax.io](https://docs.wax.io/).
