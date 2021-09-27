import { StringOrUndefined } from './base';

export type TemplateMessageItem = {
  value: string | number;
  color?: string;
};

export type TemplateMessageReq = {
  touser: string;
  template_id: string;
  url?: string;
  topcolor?: string;
  data: TemplateMessageItem[];
};
