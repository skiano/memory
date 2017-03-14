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

| Game Mode | Difficulty | Exmple Match | Total Sets |
| :-------- | :--------- | :----------- | :--------- |
| Classic | Easy | `✈` `✈` | 4 |
| -       | Hard | `✈` `✈` | 8 |
| -       | Triples | `✈` `✈` `✈` | 8 |
| Reflection | Easy | `↑` `↓` | 4 |
| -          | Hard | `↑` `↓` | 8 |
| Fibonacci | Easy | `(8)` `(3 + 5)` | 4 |
| -         | Hard | `(8)` `(3 + 5)` | 8 |
| -         | Insane | `(13)` `(5 + 8)` `(5 + 8)` | 6 |
| Chromatic | Easy | `❤` `❤` / `♡` `♡` | 4 |
| -         | Hard | `❤` `❤` / `♡` `♡` | 8 |
| Namicon | Easy | `☯` `Yin Yang` | 4 |
| -       | Hard | `☯` `Yin Yang` | 8 |
| Double Trouble | Easy | `☯ ★` `☯ ★` | 4 |
| -               | Hard | `☯ ★` `☯ ★` | 8 |

## Dev Setup

```bash
$ git clone https://github.com/skiano/memory.git
$ cd memory/
$ npm install
$ npm run dev
$ open http://localhost:3000
```
This is based on [NYT kyt](https://github.com/NYTimes/kyt)

---

## Roadmap

[Roadmap](https://github.com/skiano/memory/issues/2)
