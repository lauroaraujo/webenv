const webenv = require('./transform')

describe('ENV variable transformer', () => {
  it('Transforms env object into a JS module', () => {
    const env = { API_NAME: 'my-app-test' }
    const result = webenv(env)

    const expected = 'module.exports.API_NAME = \'my-app-test\''

    expect(result).toBe(expected)
  })

  it('Ignores variables not present in config file', () => {
    const env = {
      APP_PORT: '1234',
      ENV: 'development'
    }

    const config = {
      APP_PORT: {}
    }

    const expected = 'module.exports.APP_PORT = \'1234\''
    expect(webenv(env, config)).toBe(expected)
  })

  it('Handles multiple variables correctly', () => {
    const env = {
      CI_USELESS_VAR: 'abc123',
      API_NAME: 'api-name',
      APP_PORT: '5678',
      ENV: 'development'
    }

    const config = {
      API_NAME: {
        required: true
      },
      APP_PORT: {
        required: false
      }
    }

    const expected = `
module.exports.API_NAME = 'api-name'
module.exports.APP_PORT = '5678'
    `.trim()

    expect(webenv(env, config)).toBe(expected)
  })
})
