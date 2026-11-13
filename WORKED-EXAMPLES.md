# Worked examples — credit bucket

## Example A — free path

Bucket with freeCredits 5 → `acceptWager` → source free, freeCredits 4.

## Example B — paid path

freeCredits 0, paidCredits 3 → source paid, paidCredits 2.

## Example C — insufficient

Both zero (and no refill yet) → `insufficient`; bucket unchanged.

## Example D — refill

`nowTs >= refillAt` → freeCredits becomes refillAmount before the gate runs.

## Example E — bad wager

wager 0 or over MAX → `bad_wager`; no consume.

## Example F — topUpPaid

Adds paid credits with overflow guard at MAX_CREDITS.
