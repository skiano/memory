## Product Ideas

### Matching variants

Create extended matching ideas

- Tripples [Image, Image, Image]
- Sign/Signified [Image, Word]
- Mirrored [Image, egamI]
- Double/Double [[A, B], [A, B]]
- Formula [10, 7 + 3]

### Increasing difficulty

- triples
- time pressure
- time you have to look at your mistake shrinks over time
- occasionally switch two cards with slide animation

### code thoughts

Can i represent a user move as an async request where if the match fails it emits a failure?

Could i make a growler like thing implemented as Redux middleware?

### scoring

could be negative
  - you loose points when:
    - you already saw the match but you fail to remember it
    - you keep clicking the same start without new information?