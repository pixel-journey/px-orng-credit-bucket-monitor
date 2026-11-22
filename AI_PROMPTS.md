# AI handoff — credit bucket monitor

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | How credits are consumed |
| [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) | Next funding step |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Last funding step |

## Non-negotiables

1. Spend **free** before **paid**. Empty bucket refuses and does **not** debit.
2. `acceptWager` is gate + consume in one step. Failed accept leaves the bucket unchanged.
3. Refill fires at `refillAt`, not on every read. Sample moves `nextRefillTs` by **86400**.
4. Client-reported free counts are not authority. This lab does not read `orng.wax`.
5. Do not open a job when the gate says no.
6. Funding order for one call: **free → paid → top-up → stake**.

## Prompt seeds

- "Free 1, paid 5 — which is consumed first?"
- "Empty bucket acceptWager — balances unchanged?"
- "Show refill only at refillAt, not every poll."
- "Wire v3 starter only after the gate passes."

## Do not

- Debit on failed accept.
- Trust client free counts as chain truth.
- Charge top-up and stake before free/paid.
