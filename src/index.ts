import jsSHA from 'jssha'

// utils
const dec2hex = (dec: number) => Math.round(dec).toString(16)
const hex2dec = (hex: string) => parseInt(hex, 16)
const currentEpoch = () => Math.round(new Date().getTime() / 1000.0)

/** encode string into base32 hex presentation */
function base32ToHex(secret: string) {
  let base32chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = ''
  let hex = ''

  for (let i = 0; i < secret.length; i++) {
    let val = base32chars.indexOf(secret.charAt(i).toUpperCase())
    bits += val.toString(2).padStart(5, '0')
  }

  for (let i = 0; i + 4 <= bits.length; i += 4) {
    let chunk = bits.substring(i, i + 4)
    hex = hex + parseInt(chunk, 2).toString(16)
  }
  return hex
}

/** generate HMAC from given time and key in hex */
function keyHash(hexKey: string, hexTime: string) {
  const shaObj = new jsSHA('SHA-1', 'HEX')
  shaObj.setHMACKey(hexKey, 'HEX')
  shaObj.update(hexTime)
  return shaObj.getHMAC('HEX')
}

/** count down to the next update of totp
 * @param epoch unix epoch in seconds, default current time
 * @return 30 to 1 seconds
 */
export const countdown = (epoch: number = currentEpoch()) => 30 - (epoch % 30)

/** returns timebased one time password(TOTP) same as google authenicator
 * @param secret secret sting from service provider
 * @param epoch unix epoch in seconds, default current time
 */
export function createTOTP(secret: string, epoch: number = currentEpoch()) {
  const hexTime = dec2hex(Math.floor(epoch / 30)).padStart(16, '0')
  const hexKey = base32ToHex(secret)
  const hmac = keyHash(hexKey, hexTime)

  const offset = hex2dec(hmac.substring(hmac.length - 1))
  const pos = offset * 2
  const otp = (hex2dec(hmac.substring(pos, pos + 8)) & hex2dec('7fffffff')) + ''
  return otp.substring(otp.length - 6)
}
