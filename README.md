`-` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`-` `☯` `-` `-`<span>&nbsp; | &nbsp;</span>`❄` `☯` `⍨` `♘`<br/>
`★` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`★` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`★` `❄` `♠` `❄`<br/>
`-` `-` `★` `-`<span>&nbsp; | &nbsp;</span>`-` `-` `★` `-`<span>&nbsp; | &nbsp;</span>`♘` `✈` `★` `⍨`<br/>
`-` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`-` `☯` `-` `-`<span>&nbsp; | &nbsp;</span>`✈` `☯` `❄` `♠`<br/>

# Memory

Welocme to Memory, with a twist.

It’s like the classic game, but you can also play variations, each of which has its own type of matching. For example, in the __Classic__ variation, a set may be two `☯` cards. However, in the __Fibonacci__ variation, a pair could be the `8` card and the `3+5` card.

## Rules

* All cards begin face down.
* The player turns one card at a time face up.
  * If they match, but the set is incomplete, they stay face up on the table.
  * If they match, and the set is complete, the set is removed from the game.
  * If they do not match, all the face up cards are turned over.
* The game ends when the player finds all matching sets.

## Scoring

Every time you find a matching set you get points. How many points you get depends on how many times you saw each card. 

At most, you get 20 points per card in the set. If the card was never seen before, you get all 20 points. If you only saw it once before, you still get all 20 points because it is the best you can do without luck. After that, the card is worth two fewer points each time you see it. So a card you saw twice is only worth 18, and a card you saw three times is worth 16, and so on until you reach zero. You cannot get negative points.

## Game Modes

| Game Mode | Description | Good Match | Bad Match |
| :-------- | :---------- | :--------- | :-------- |
| Classic | Find sets with matching symbols | `✈` = `✈` | `✈` != `☯`
| Spin | Find sets with matching symbol and orientation | `↑` = `↑` | `↓` != `↑` |
| Namicon | Find sets with matching meanings | `★` = `star` | `☯` != `star` |
| Chromatic | Find sets with matching symbol and color | `★` = `★` | `★` != `☆` |
| Double Trouble | Find sets where all card symbols match | `★☯` = `☯★` | `★☯` != `✈★` |
| Fibonacci | Find sets where card values match | `8` = `5 + 3` | `13` != `5+3` |

More modes can are added in `src/modes`

## Dev Setup

```bash
$ git clone https://github.com/skiano/memory.git
$ cd memory/
$ npm install
$ npm run dev
$ open http://localhost:3000
```
This project uses [NYT kyt](https://github.com/NYTimes/kyt)

---

## Roadmap

[Roadmap](https://github.com/skiano/memory/issues/2)
