function parse (env, config) {
  return Object.entries(env)
    .filter(([k]) => !config || typeof config[k] === 'object')
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})
}

module.exports = parse
