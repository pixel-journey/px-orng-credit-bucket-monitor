# Gate wagers on the adaptive credit bucket

> **Domain:** WAX ORNG — credit bucket before randomness  
> **Sources:** [SOURCES.md](SOURCES.md)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Free credits first, then paid. Apply pending free refill when due. Refuse zero/oversized wagers; **do not debit on a failed gate**.

**Code under test:** `npm test`. Teaching model of v3 adaptive credits — live balances still from the oracle service.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng).

## Learning materials

| Doc | Role |
| --- | --- |
| [EDUCATION.md](EDUCATION.md) | Beginner → masterclass |
| [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md) | Free, paid, refill, fail |
| [TIPS.md](TIPS.md) | Gate before escrow |
| [SECURITY.md](SECURITY.md) | No debit on fail |
| [SOURCES.md](SOURCES.md) | Official |

```bash
npm test
```

MIT — Pixel Journey
