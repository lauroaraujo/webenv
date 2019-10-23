const {
  transformToWindow, transformToJson, transformToES6Module, transformToCommonJSModule
} = require('./transform')

describe(' ENV variable transformer', () => {
  it('Transforms env object into script that saves to window', () => {
    const env = { API_NAME: 'my-app-test', '.unsusual key': 'value' }
    const result = transformToWindow(env)

    expect(result).toBe('window.__webenv_vars={"API_NAME":"my-app-test",".unsusual key":"value"}')
  })

  it('Transforms env object into a json string', () => {
    const env = { API_NAME: 'my-app-test', '.unsusual key': 'value' }
    const result = transformToJson(env)

    expect(result).toBe('{"API_NAME":"my-app-test",".unsusual key":"value"}')
  })

  it('Transforms env object into an ES6 module', () => {
    const env = { API_NAME: 'my-app-test', '.unsusual key': 'value' }
    const result = transformToES6Module(env)

    expect(result).toBe('export default {"API_NAME":"my-app-test",".unsusual key":"value"}')
  })

  it('Transforms env object into a Common JS module', () => {
    const env = { API_NAME: 'my-app-test', '.unsusual key': 'value' }
    const result = transformToCommonJSModule(env)

    expect(result).toBe('module.exports={"API_NAME":"my-app-test",".unsusual key":"value"}')
  })
})
