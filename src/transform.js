const parse = require('./parse')
const DEFAULT_WEBENV_KEY = '__webenv_vars'

function transformToJson (env, config) {
  const parsedEnv = parse(env)
  return JSON.stringify(parsedEnv)
}

function transformToWindow (env, config, webenvKey = DEFAULT_WEBENV_KEY) {
  const jsonEnv = transformToJson(env)
  return `window.${webenvKey}=${jsonEnv}`
}

function transformToES6Module (env, config) {
  const jsonEnv = transformToJson(env)
  return `export default ${jsonEnv}`
}

function transformToCommonJSModule (env, config) {
  const jsonEnv = transformToJson(env)
  return `module.exports=${jsonEnv}`
}

module.exports = {
  transformToWindow,
  transformToJson,
  transformToES6Module,
  transformToCommonJSModule
}
