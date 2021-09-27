import * as dayjs from 'dayjs';
import { AccessTokenResp } from '../types/wechat';
import { getAccessToken } from '../request/access-token';

const cache = {
  token: '',
  expiredAt: 0,
};

function isExpired(): boolean {
  const now = dayjs();
  return now.unix() >= cache.expiredAt;
}

function setToken(newToken: AccessTokenResp) {
  const now = dayjs();
  cache.token = newToken.access_token;
  cache.expiredAt = now.unix() + newToken.expires_in;
}

export default async function (appId, secret): Promise<string> {
  try {
    if (isExpired()) {
      const newToken = await getAccessToken(appId, secret);
      setToken(newToken);
    }
    return Promise.resolve(cache.token);
  } catch (err) {
    return Promise.resolve(cache.token);
  }
}
