import { Controller, Post } from '@nestjs/common';
import config from '../config';
import { generateTemplateMessage, sendTemplate } from '../utils/template-utils';

@Controller('/daily-template')
export class DailyTemplateController {
  private readonly templateId = config.templates.daily;
  @Post()
  send() {
    // TODO: cache weather and holiday data
    generateTemplateMessage(config).then((data) => {
      config.userOpenIds.forEach((openId) => {
        console.info(`Sending template ${this.templateId} to ${openId}`);
        sendTemplate(config, this.templateId, openId, data).catch((err) => {
          console.error(err);
        });
      });
    });
  }
}
