# Education

A dapp that accepts a wager and only then discovers it cannot pay for `requestrand` leaves the player in escrow limbo. The rule is: **read the bucket first**.

Free adaptive credits refill on a schedule. Paid credits are a purchased top-up. Prefer free so pay-per-use balance is not burned while free quota remains.

`acceptWager` is atomic in this lab: either the gate fails and state is unchanged, or one credit is consumed.
