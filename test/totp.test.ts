import { createTOTP, countdown } from '../src/index'

const secret = 'abcd1234'
const epoch = 1663172706

test('createTOTP', () => {
  expect(createTOTP(secret, epoch)).toBe('511484')
})

test('countdown', () => {
  expect(countdown(epoch)).toBe(24)
})
