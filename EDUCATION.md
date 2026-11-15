# Education — adaptive credit bucket before randomness

> **Rung:** `npm test` passes. This is a **gate** over a local bucket model. It does not read `orng.wax` tables or broadcast `requestrand`.  
> **The test is the rule.**

Official service: [wax-orng](https://github.com/worldwide-asset-exchange/wax-orng). Sample path: [RNG smart contract tutorial](https://docs.wax.io/build/tutorials/create-wax-rng-smart-contract/rng_sample).

Curriculum order: job table ([v3 starter](https://github.com/pixel-journey/px-orng-v3-randnotify-starter)) → dual callback → **this gate** → [pay-per-use topup](https://github.com/pixel-journey/px-orng-pay-per-use-topup-vault) / [auto-stake](https://github.com/pixel-journey/px-orng-auto-wax-stake-manager) → game labs.

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Prefer free credits over paid; refuse empty bucket |
| Intermediate | Show acceptWager is atomic with the gate; scheduled refill |
| Masterclass | Separate gate math from live oracle accounting; no trust of client free counts |

---

## Beginner — one scene

Dapp `pxrngdapp`, time `T0`. Empty bucket cannot accept a wager (`insufficient`).

Bucket with free 3 and paid 5, wager 1 → source **free**, creditsLeft **2**. When free is 0 and paid is 2 → source **paid**.

`acceptWager` with free 2 succeeds and leaves free **1**. An insufficient accept leaves the bucket **unchanged** (no partial consume).

Wager `0` or absurdly large `1_000_000_001` refused.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).

### Words

| Word | Meaning here |
| --- | --- |
| Free credits | Soft quota that refills on a schedule |
| Paid credits | Prepaid calls (topped up elsewhere) |
| acceptWager | Gate + consume in one step; fail ⇒ no mutation |
| refillAt | Unix time when free credits restore |

---

## Intermediate — refill and top-up

Free 0, refillAt `T0+100`, refillAmount 10:

| nowTs | freeCredits |
| --- | --- |
| T0+50 | 0 |
| T0+100 | 10; next refillAt T0+100+86400 |

`topUpPaid(..., 7)` raises paid to 7; amount 0 refused. `consume` on empty free/paid throws.

Bad dapp name refused at bucket creation.

### Attack → test

| Attack | Lab behavior |
| --- | --- |
| Accept without credits | insufficient; no debit |
| Fail mid-accept | bucket unchanged |
| Zero / oversized wager | refused |
| Invent free credits client-side | this lab is local only — production must read oracle |

---

## Masterclass — gate vs chain

Live ORNG tracks deposits, stakes, and adaptive free quotas on-chain. This repository models the **policy** you enforce in the dapp before opening a job:

1. Prefer free so paid balance is not burned first.  
2. Never open a job when the gate says no.  
3. Treat refill and top-up as separate funding paths (siblings labs).

Do not ship a client-reported free balance as authority. After a successful gate, still bind `assoc_id` to the wager and resolve once ([dual callback](https://github.com/pixel-journey/px-orng-dual-callback-idempotent)).

### Exercises

1. Free 1, paid 0, need 2 — canRequest?  
2. Why is acceptWager a no-op on fail?  
3. Does this repo call `orng.wax`? (No.)

---

## What this course will not teach

- Live credit table schema on `orng.wax`
- RSA threshold delivery or signature verify
- Fair game math after entropy arrives
