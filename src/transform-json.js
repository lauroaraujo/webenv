function transform (env, config) {
  const parsedEnv = Object.entries(env)
    .filter(([k]) => !config || typeof config[k] === 'object')
    .reduce((acc, [k, v]) => {
      acc[k] = v
      return acc
    }, {})

  return JSON.stringify(parsedEnv)
}

module.exports = transform
