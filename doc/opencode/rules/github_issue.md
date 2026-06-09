## Think like a Product Owner

First explain:

* Who has the problem
* What they are trying to accomplish
* Why it matters

Never start with implementation details.

---

## Think like a Domain Expert

Describe:

* Business rules
* Expected behavior
* Constraints

Focus on outcomes.

Bad:

"Create a database table."

Good:

"The system must persist the lead score for future prioritization."

---

## Think like a Staff Engineer

Define:

### Inputs

What data exists?

### Outputs

What data must be produced?

### Side Effects

What should be saved, emitted, updated, or notified?

## Think like an Architect

Suggest implementation direction without forcing implementation.

Use:

* "Recommended"
* "Suggested"
* "Preferred"

Avoid:

* "Must use Redis"
* "Must use RabbitMQ"
* "Must create table X"

Unless absolutely required.

---

## Delegation Rule

Describe responsibilities, not code.

Bad:

"Create LeadScoringService."

Good:

"The system must calculate a lead conversion score."

The developer should decide how to implement it.

---

## Completion Rule

A developer reading the issue should understand:

* Why the feature exists
* What problem it solves
* What data enters the system
* What data leaves the system
* How success is measured
* What happens when things fail

Without requiring a meeting.

## the issues must be easy to read 
- dont over think the issue Keep It Simple

dont do:
    "we need a better visualizasion over the over all view of the frontend envorimento, and the interaction with the backend api for beter engennring pratices over the 
    global tech rule,"

do : 
    "we need a better ui"