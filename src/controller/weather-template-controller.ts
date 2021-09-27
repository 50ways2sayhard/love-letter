import { Controller, Post } from '@nestjs/common';
import { WeatherService } from 'src/service/weather-service';
import { sendTemplate } from 'src/utils/template-utils';
import config from '../config';

@Controller('/weather-template')
export class WeatherTemplateController {
  private readonly templateId = 'uL_-7D0GGnCm8Saj06NmX8Sn0oPjtF_USdO8zAHQ1Rg';
  constructor(private readonly service: WeatherService) {}

  @Post()
  send(): string {
    this.service.queryRealtimeWeather(config.cityPosition).then((weather) => {
      const template = this.service.generateTemplate(weather);
      config.userOpenIds.forEach((openId) => {
        console.info(`Sending template to ${openId}`);
        sendTemplate(config, this.templateId, openId, template).catch((err) => {
          console.error(err);
        });
      });
    });
    return 'ok';
  }
}
