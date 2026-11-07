# Security

| Surface | Closed by |
| --- | --- |
| Wager with empty bucket | insufficient refused |
| Debit on failed gate | acceptWager no-op |
| Zero / oversized wager | bad_wager |
| Negative balances | bad_bucket |

Not claimed: live orng.wax table reads, stake memo, wasm.
