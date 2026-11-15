# Security — credit bucket gate

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Empty bucket accept | insufficient; no debit |
| Failed acceptWager | bucket unchanged |
| Wager 0 / oversized | refused |
| topUp 0 | refused |
| consume without balance | throws |
| Bad dapp name | refused |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Authoritative balances | Read oracle / on-chain credit state; do not trust client |
| Race between gate and request | Same action or locked job row |
| Clock for refillAt | Use trusted time; document skew policy |
| Paid top-up custody | Who holds WAX; memo integrity |

No live `orng.wax` reads in this repository.
