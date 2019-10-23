const parse = require('./parse')

describe('ENV Parser', () => {
  it('Returns all env variables if no config is provided', () => {
    const env = {
      ENV_VAR: 'environment_variable',
      env: 'lowercase_var',
      valWithSpace: 'value with space',
      '.unsusual key': 'value',
      number: '123'
    }

    const parsedEnv = parse(env)
    expect(parsedEnv).not.toBe(env)
    expect(parsedEnv).toEqual(env)
  })

  it('Ignores variables not present in config file', () => {
    const env = {
      LICENSE_KEY: 'abc1234',
      ENV: 'development'
    }

    const config = {
      LICENSE_KEY: {}
    }

    expect(parse(env, config)).toEqual({ LICENSE_KEY: 'abc1234' })
  })

  it('Ignores variables not present in config file', () => {
    const env = {
      APP_PORT: '1234',
      ENV: 'development'
    }

    const config = {
      APP_PORT: {}
    }

    expect(parse(env, config)).toEqual({ APP_PORT: '1234' })
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

    expect(parse(env, config)).toEqual({ API_NAME: 'api-name', APP_PORT: '5678' })
  })
})
