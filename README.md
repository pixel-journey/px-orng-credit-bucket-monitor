# Gate wagers on the adaptive credit bucket

> **Domain:** WAX ORNG — credit bucket before randomness  
> **Catalog:** [px-contract-examples-vault](https://github.com/pixel-journey/px-contract-examples-vault)  
> **Path:** [ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)

**Goal:** Gate a randomness-backed wager on **free credits first, then paid**. Apply a pending free refill when `nowTs >= refillAt`. Refuse zero/oversized wagers and do not debit on a failed gate.

**Code under test:** `npm test`. No live `orng.wax`, no wasm. Models the v3 adaptive credit shape for teaching; live balances still come from the oracle service.

**Official:** [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). **Sample:** [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

```bash
npm test
```

MIT — Pixel Journey
