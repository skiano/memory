`-` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`-` `☯` `-` `-`<span>&nbsp; | &nbsp;</span>`❄` `☯` `⍨` `♘`<br/>
`★` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`★` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`★` `❄` `♠` `❄`<br/>
`-` `-` `★` `-`<span>&nbsp; | &nbsp;</span>`-` `-` `★` `-`<span>&nbsp; | &nbsp;</span>`♘` `✈` `★` `⍨`<br/>
`-` `-` `-` `-`<span>&nbsp; | &nbsp;</span>`-` `☯` `-` `-`<span>&nbsp; | &nbsp;</span>`✈` `☯` `❄` `♠`<br/>

# Memory

Welocme to Memory, with a twist.

You can play classic memory, or even look for matches of three, but you can also play other modes, each of which has its own type of matching. For example, in the __Classic__ mode, a set may be two `☯` cards. However, in the __Fibonacci__ mode, a pair could be the `8` card and the `3+5` card.

## Rules

* All cards begin face down.
* The player turns one card at a time face up.
  * If they match, but the set is incomplete, they stay face up on the table.
  * If they match, and the set is complete, the set is removed from the game.
  * If they do not match, all the face up cards are turned over.
* The game ends when the player finds all matching sets.

## Game Modes

| Game Mode | Description | Good Match | Bad Match |
| :-------- | :---------- | :--------- | :-------- |
| Classic | Find sets with matching symbols | `✈` = `✈` | `✈` != `☯`
| Spin | Find sets with matching symbol and orientation | `↑` = `↑` | `↓` != `↑` |
| Namicon | Find sets with matching meanings | `★` = `star` | `☯` != `star` |
| Chromatic | Find sets with matching symbol and color | `★` = `★` | `★` != `☆` |
| Double Trouble | Find sets where both symbols match | `★☯` = `★☯` | `★☯` != `☯★` |
| Fibonacci | Find sets where card values match | `8` = `5 + 3` | `13` != `5+3` |

More modes can be added by creating a new configuration in `src/modes`

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
