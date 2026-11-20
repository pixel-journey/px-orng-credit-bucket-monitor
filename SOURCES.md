# Sources

| Source | Use |
| --- | --- |
| [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng) | How credits are actually consumed |
| [RNG tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample) | Request flow |
| [docs.wax.io](https://docs.wax.io/) | WAX contracts |

**Product facts locked by tests:**

- Spend **free** before **paid**. Empty bucket refuses and does **not** debit.
- `acceptWager` is gate + consume in one step. A failed accept leaves the bucket unchanged.
- Refill fires at `refillAt`, not on every read. The sample moves `nextRefillTs` by **86400**.
- Client-reported free counts are not authority. This lab does not read `orng.wax`.

Do not open a job when the gate says no.

## Related labs

| Lab | Topic |
| --- | --- |
| [pay-per-use](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) | 0.01 WAX per missing call |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Stake only after free and paid fail |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job row after the gate |
| [dual-callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent) | Once-resolve after entropy |
| `px-contract-examples-vault` (private index; not this public course) | Curriculum + funding order |
