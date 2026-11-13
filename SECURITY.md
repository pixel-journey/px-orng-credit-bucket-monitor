# Security notes — credit gate

| Mitigated | Behavior |
| --- | --- |
| Bad wager | refused, no debit |
| Insufficient | refused, no debit |
| Paid overflow | topUp refused |

Production: read authoritative oracle state; do not trust client-reported free credits.
