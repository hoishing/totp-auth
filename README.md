# TOTP Auth

Easy-to-use timebased one time password(TOTP) generator, competible with Google Authenticator.

## Usage

```js
import { totp, countdown } from 'totp-auth'

const secret = 'abcd1234' //secret from service provider

let totp = createTOTP(secret)

setInterval(() => {
  const expire = countdown()
  // refresh totp every 30 sec
  if (expire == 30) totp = createTOTP(secret)
  console.log(`totp: ${totp}, countdown: ${expire}`)
}, 1000)
```

## Test

The package contain unit test with [Jest](https://jestjs.io/). You may also verify the output with Google Authenticator.
