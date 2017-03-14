# Memory

Welocme to Memory, with a twist.

You can play classic memory, or even look for matches of three, but you can also play other modes, each of which has its own type of matching. For example, in `Classic` mode, a set may be two `☯` cards, but in `Fibonacci` a pait could be the `8` card and the `3+5` card.

## Rules

* All cards begin face down.
* The player turns one card face up, and then a second.
  * If they match, the pair is removed from the game.
  * If they do not match, both cards turn back over.
* The game ends when the player finds all matching pairs.

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

## Setup

```bash
$ npm install
$ npm run dev
$ open http://localhost:3000
```
This is based on [NYT kyt](https://github.com/NYTimes/kyt)

---

## Roadmap

[Roadmap](https://github.com/skiano/memory/issues/2)
