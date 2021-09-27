import { TemplateMessageReq } from 'src/types/template-message';
import { createUrlWithParams } from 'src/utils/string-utils';
import network from './base';
import { UrlPostWechatTemplateMessage } from './protocol';

export function sendTemplateMessage(
  accessToken: string,
  message: TemplateMessageReq,
): Promise<any> {
  return network.post(
    createUrlWithParams(UrlPostWechatTemplateMessage, {
      access_token: accessToken,
    }),
    message,
  );
}
