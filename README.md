# TOTP Auth

Easy-to-use timebased one time password(TOTP) generator, competible with Google Authenticator.

[![npm](https://img.shields.io/npm/v/totp-auth)](https://www.npmjs.com/package/totp-auth)
[![NPM](https://img.shields.io/npm/l/totp-auth)](https://opensource.org/licenses/BSD-3-Clause)

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

## Test

The package contain unit test with [Jest](https://jestjs.io/). You may also verify the output with Google Authenticator.

## Source Code

<img src="https://api.iconify.design/ant-design/github-filled.svg?color=%23bdb2ff&width=20" style="vertical-align:-0.25rem"/> https://github.com/hoishing/totp-auth
