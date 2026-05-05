import { execFileSync, spawnSync } from 'child_process'
import { join } from 'path'

const cliPath = join(__dirname, '..', 'lib', 'cli.js')

beforeAll(() => {
  execFileSync('npm', ['run', 'build'], {
    cwd: join(__dirname, '..'),
    stdio: 'pipe',
  })
})

test('cli returns the current passcode and expiry as json', () => {
  const result = spawnSync('node', [cliPath, 'abcd1234'], {
    encoding: 'utf8',
  })

  expect(result.status).toBe(0)
  expect(result.stderr).toBe('')

  const payload = JSON.parse(result.stdout)

  expect(payload).toEqual({
    passcode: expect.stringMatching(/^\d{6}$/),
    'expire-seconds': expect.any(Number),
  })
  expect(payload['expire-seconds']).toBeGreaterThanOrEqual(1)
  expect(payload['expire-seconds']).toBeLessThanOrEqual(30)
})

test('cli returns json error for missing secret', () => {
  const result = spawnSync('node', [cliPath], {
    encoding: 'utf8',
  })

  expect(result.status).toBe(1)
  expect(result.stdout).toBe('')
  expect(JSON.parse(result.stderr)).toEqual({ error: 'missing secret' })
})

test('cli returns json error for invalid secret', () => {
  const result = spawnSync('node', [cliPath, 'asdf'], {
    encoding: 'utf8',
  })

  expect(result.status).toBe(1)
  expect(result.stdout).toBe('')
  expect(JSON.parse(result.stderr)).toEqual({ error: 'invalid secret' })
})
