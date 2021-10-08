import { Controller, HttpCode, Post } from '@nestjs/common';
import { DailyRemindService } from 'src/service/daily-remind-service';
import config from '../config';
import { sendTemplate } from '../utils/template-utils';

@Controller('/daily-template')
export class DailyTemplateController {
  private readonly templateId = config.templates.daily;
  constructor(private readonly service: DailyRemindService) {}

  @Post()
  @HttpCode(204)
  send() {
    const data = this.service.generateTemplate(config);
    config.userOpenIds.forEach((openId) => {
      console.info(`Sending template ${this.templateId} to ${openId}`);
      sendTemplate(config, this.templateId, openId, data).catch((err) => {
        console.error(err);
      });
    });
  }
}
