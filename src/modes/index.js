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
].map(mode => Object.assign({
  slug: slugify(mode.title.toLowerCase()),
}, mode))

export default gameModes
