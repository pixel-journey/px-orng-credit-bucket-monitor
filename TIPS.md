# Tips — credit gate before requestrand

## Do

- Gate **before** opening a job row and before broadcasting `requestrand`.
- Prefer **free** credits over paid so users burn soft quota first.
- Make fail paths **non-mutating** (acceptWager pattern).
- Schedule free refill explicitly; document the period (here +86400 after fire).

## Don't

- Trust a wallet-supplied “I still have free credits” flag.
- Consume paid when free would have covered the need.
- Open the job then discover credits are empty.

## Sibling funding paths

| Lab | When |
| --- | --- |
| [pay-per-use topup](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) | 0.01 WAX per call from a vault |
| [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) | Stake WAX for free credits |
| [v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter) | Job table + once resolve |

[ORNG-LEARNING-PATH.md](https://github.com/pixel-journey/px-contract-examples-vault/blob/main/docs/ORNG-LEARNING-PATH.md)
