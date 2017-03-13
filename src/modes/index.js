import slugify from 'slugify'
import classic from './mode.classic'
import mirrored from './mode.mirrored'
import colors from './mode.colors'
import tuples from './mode.tuples'
import formula from './mode.formula'

const gameModes = [
  classic,
  mirrored,
  colors,
  tuples,
  formula,
].map(mode => Object.assign({}, mode, {
  slug: slugify(mode.title.toLowerCase()),
  levels: mode.levels.map(level => Object.assign({
    slug: slugify(level.difficulty),
  }, level)),
}))

/** for friendly url mapping */
export const modeMap = {}

gameModes.forEach((mode, modeId) => {
  const levels = {}

  mode.levels.forEach((level, levelId) => (
    levels[level.slug] = levelId
  ))

  modeMap[mode.slug] = {
    levels,
    id: modeId,
  }
})

export default gameModes
