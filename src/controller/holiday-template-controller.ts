import { Controller, HttpCode, Post } from '@nestjs/common';
import HolidayService from 'src/service/holiday-service';
import { sendTemplate } from 'src/utils/template-utils';
import config from '../config';

@Controller('/holiday-template')
export class HolidayTemplateController {
  private readonly templateId = config.templates.holiday;
  constructor(private readonly service: HolidayService) {}

  @Post()
  @HttpCode(204)
  send() {
    this.service.generateTemplate().then((data) => {
      config.userOpenIds.forEach((openId) => {
        console.info(
          `- [HolidayTemplateController] Sending template Holiday to ${openId}`,
        );
        sendTemplate(config, this.templateId, openId, data).catch((err) => {
          console.error(err);
        });
      });
    });
  }
}
