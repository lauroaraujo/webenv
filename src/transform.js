function webenv (env, config) {
  return Object.entries(env)
    .filter(([k]) => !config || typeof config[k] === 'object')
    .map(([k, v]) => `module.exports.${k} = '${v}'`)
    .join('\n')
}

module.exports = webenv
