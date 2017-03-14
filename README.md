# Memory

Welocme to Memory, with a twist

You can play classic memory, or even look for matches of three, but you can also play other modes, each of which has it's own type of matching. For example, the Fibonacci mode has numbers and formulas on cards, and you need to find the cards where the totals match. (you may see one card with `8` on it and it matches a card that has `3+5` on it)

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
