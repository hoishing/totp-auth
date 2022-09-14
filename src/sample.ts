import { createTOTP, countdown } from './index'

const secret = 'abcd1234' //secret from service provider

let totp = createTOTP(secret)

setInterval(() => {
  const expire = countdown()
  // refresh totp every 30 sec
  if (expire == 30) totp = createTOTP(secret)
  console.log(`totp: ${totp}, countdown: ${expire}`)
}, 1000)
