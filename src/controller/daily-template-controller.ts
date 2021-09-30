import { Controller, Post } from '@nestjs/common';
import { DailyRemindService } from 'src/service/daily-remind-service';
import config from '../config';
import { sendTemplate } from '../utils/template-utils';

@Controller('/daily-template')
export class DailyTemplateController {
  private readonly templateId = config.templates.daily;
  constructor(private readonly service: DailyRemindService) {}

  @Post()
  send() {
    // TODO: cache weather and holiday data
    this.service.generateTemplate(config).then((data) => {
      config.userOpenIds.forEach((openId) => {
        console.info(`Sending template ${this.templateId} to ${openId}`);
        sendTemplate(config, this.templateId, openId, data).catch((err) => {
          console.error(err);
        });
      });
    });
  }
}
