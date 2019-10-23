const webenv = require('./transform-json')

describe('ENV variable transformer', () => {
  it('Transforms env object into a JSON string', () => {
    const env = { API_NAME: 'my-app-test' }
    const result = webenv(env)

    expect(result).toBe('{"API_NAME":"my-app-test"}')
  })

  it('Ignores variables not present in config file', () => {
    const env = {
      LICENSE_KEY: 'abc1234',
      ENV: 'development'
    }

    const config = {
      LICENSE_KEY: {}
    }

    expect(webenv(env, config)).toBe('{"LICENSE_KEY":"abc1234"}')
  })

  it('Ignores variables not present in config file', () => {
    const env = {
      APP_PORT: '1234',
      ENV: 'development'
    }

    const config = {
      APP_PORT: {}
    }

    expect(webenv(env, config)).toBe('{"APP_PORT":"1234"}')
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

    expect(webenv(env, config)).toBe('{"API_NAME":"api-name","APP_PORT":"5678"}')
  })
})
