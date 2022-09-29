# TOTP Auth

Easy-to-use timebased one time password(TOTP) generator, competible with Google Authenticator.

[![npm](https://img.shields.io/npm/v/totp-auth)](https://www.npmjs.com/package/totp-auth)
[![NPM](https://img.shields.io/npm/l/totp-auth)](https://opensource.org/licenses/ISC)

## Installation

```shell
# pnpm
pnpm i totp-auth

# npm
npm i totp-auth
```

## Usage

```js
import { createTOTP, countdown } from "totp-auth"
import { setInterval } from "timers/promises"

//secret from service provider
const secret = "abcd1234"

let totp = createTOTP(secret)
let expire = countdown()

// current TOTP and expiring time in seconds
console.log(`TOTP: ${totp}, expire: ${expire}`)

// keep counting down and refresh TOTP every 30 sec
for await (let _ of setInterval(1000)) {
  const cnt = countdown()
  if (cnt >= expire) totp = createTOTP(secret)
  expire = cnt
  console.log(`TOTP: ${totp}, expire: ${expire}`)
}
```

Note: for those need to extract secret keys from Google Authenticator, please refer:

https://github.com/krissrex/google-authenticator-exporter

## Source Code

https://github.com/hoishing/totp-auth

### code logic

1. create base32 representation of the credential
1. calculate HMAC hash from the credential with current time
1. shift and trim 6 digit TOTP from the hash above

### Tests

Both `createTOTP` and `countdown` are pure functions. Unit test with [Jest](https://jestjs.io/) are included.

The TOTP output could also simply verified by Google Authenticator.

## Credits

Algorithum ref: http://jsfiddle.net/russau/ch8PK/
HMAC lib: https://github.com/Caligatio/jsSHA

## Need Help?

Open a [github issue](https://github.com/hoishing/totp-auth/issues) or ping me on [Twitter](https://twitter.com/hoishing)
