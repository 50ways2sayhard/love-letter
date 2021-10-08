import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyTemplateController } from './controller/daily-template-controller';
import { HolidayTemplateController } from './controller/holiday-template-controller';
import { WeatherTemplateController } from './controller/weather-template-controller';
import { DailyRemindService } from './service/daily-remind-service';
import HolidayService from './service/holiday-service';
import { WeatherService } from './service/weather-service';

@Module({
  imports: [],
  controllers: [
    AppController,
    DailyTemplateController,
    WeatherTemplateController,
    HolidayTemplateController,
  ],
  providers: [AppService, WeatherService, DailyRemindService, HolidayService],
})
export class AppModule {}
