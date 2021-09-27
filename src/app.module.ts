import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DailyTemplateController } from './controller/daily-template-controller';
import { WeatherTemplateController } from './controller/weather-template-controller';
import { WeatherService } from './service/weather-service';

@Module({
  imports: [],
  controllers: [
    AppController,
    DailyTemplateController,
    WeatherTemplateController,
  ],
  providers: [AppService, WeatherService],
})
export class AppModule {}
