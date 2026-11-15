# Education — adaptive credit bucket before randomness

Before accepting a wager that needs `requestrand`, check free then paid credits. Refill free credits on a schedule. Prefer free so paid balance is not burned first.

## Outcomes

1. Show free preferred over paid.
2. Show acceptWager is atomic with the gate (no partial consume on fail).
3. Show refillAt restores free and schedules the next day.

Numbers: [WORKED-EXAMPLES.md](WORKED-EXAMPLES.md).
