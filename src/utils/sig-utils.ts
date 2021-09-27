import * as cryptojs from 'crypto-js';
import config from '../config';

export function checkToken(
  signature: string,
  timestamp: string,
  nonce: string,
): boolean {
  const s = [config.token, timestamp, nonce];
  const sorted = s.sort().join('');
  return cryptojs.SHA1(sorted).toString() === signature;
}
