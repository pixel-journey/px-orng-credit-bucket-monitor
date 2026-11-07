# px-orng-credit-bucket-monitor

> **Trust:** private educational lab (Tier B)  
> **Quest:** 010 — read the v3 adaptive credit bucket before a wager  
> **Vault:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)

Gate a randomness-backed wager on free credits first, then paid. Apply a pending free refill when `nowTs >= refillAt`. Refuse zero/oversized wagers and do not debit on a failed gate.

**Real code:** `npm test`. No live `orng.wax`, no wasm.

## Run

```bash
npm test
```

MIT — Pixel Journey
