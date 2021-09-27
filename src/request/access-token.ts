import network from './base';
import { UrlGetAccessToken } from './protocol';
import { AccessTokenResp } from '../types/wechat';

export function getAccessToken(
  appId: string,
  secret: string,
): Promise<AccessTokenResp> {
  return network.get(UrlGetAccessToken, {
    grant_type: 'client_credential',
    appid: appId,
    secret,
  });
}
