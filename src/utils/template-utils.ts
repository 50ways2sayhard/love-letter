import { sendTemplateMessage } from 'src/request/template';
import { TemplateMessageItem } from 'src/types/template-message';
import getAccessToken from './access-token-utils';

export function generateMessageItem(
  value: string | number,
  color?: string,
): TemplateMessageItem {
  const _color = color || '#262626';
  return {
    value: `${value}`,
    color: _color,
  };
}

export async function sendTemplate(cfg, templateId, userOpenId, data) {
  const token = await getAccessToken(cfg.appId, cfg.appSecret);

  const resp = await sendTemplateMessage(token, {
    touser: userOpenId,
    template_id: templateId,
    data,
  });
  return resp;
}
