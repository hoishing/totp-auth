# TOTP Auth

Easy-to-use timebased one time password(TOTP) generator, competible with Google Authenticator.

[![npm](https://img.shields.io/npm/v/totp-auth)](https://www.npmjs.com/package/totp-auth)
[![NPM](https://img.shields.io/npm/l/totp-auth)](https://opensource.org/licenses/BSD-3-Clause)

## Installation

```shell
# pnpm
pnpm i totp-auth

# npm
npm i totp-auth
```

## Usage

```js
import { createTOTP, countdown } from 'totp-auth'

const secret = 'abcd1234' //secret from service provider

let totp = createTOTP(secret)

setInterval(() => {
  const expire = countdown()
  // refresh totp every 30 sec
  if (expire == 30) totp = createTOTP(secret)
  console.log(`totp: ${totp}, countdown: ${expire}`)
}, 1000)
```

Note: for those need to extract secret from Google Authenticator, please refer:

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

### Credits

Algorithum ref: http://jsfiddle.net/russau/ch8PK/
HMAC lib: https://github.com/Caligatio/jsSHA

## Need Help?

Open a [github issue](https://github.com/hoishing/totp-auth/issues) or ping me on [Twitter](https://twitter.com/hoishing)
