export const purePush = (obj, key, item) => {
  const newobj = {}
  newobj[key] = [...obj[key], item]
  return Object.assign({}, obj, newobj)
}

export const pureRemove = (obj, key, item) => {
  const newobj = {}
  newobj[key] = [...obj[key]]
  newobj[key].splice(obj[key].indexOf(item), 1)
  return Object.assign({}, obj, newobj)
}
