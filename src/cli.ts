#!/usr/bin/env node

import { countdown, createTOTP, currentEpoch } from './index'

const INVALID_SECRET = 'invalid secret'

function writeJson(stream: NodeJS.WriteStream, payload: Record<string, string | number>) {
  stream.write(`${JSON.stringify(payload)}\n`)
}

function main(argv: string[]) {
  const secret = argv[2]

  if (!secret) {
    writeJson(process.stderr, { error: 'missing secret' })
    process.exitCode = 1
    return
  }

  const epoch = currentEpoch()
  const passcode = createTOTP(secret, epoch, INVALID_SECRET)

  if (passcode === INVALID_SECRET) {
    writeJson(process.stderr, { error: INVALID_SECRET })
    process.exitCode = 1
    return
  }

  writeJson(process.stdout, {
    passcode,
    'expire-seconds': countdown(epoch),
  })
}

main(process.argv)
