import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import { getCaiyunRealTimeWeather } from 'src/request/weather';
import { TemplateMessageItem } from 'src/types/template-message';
import { CaiyunRealtimeWeather } from 'src/types/weather';
import { generateMessageItem } from 'src/utils/template-utils';

@Injectable()
export class WeatherService {
  private config: any;

  queryRealtimeWeather(cityPosition: string): Promise<CaiyunRealtimeWeather> {
    return getCaiyunRealTimeWeather(cityPosition);
  }

  generateTemplate(
    realtimeWeather: CaiyunRealtimeWeather,
  ): Record<string, TemplateMessageItem> {
    const ret = {};
    const now = dayjs();

    // 时间
    ret['current'] = generateMessageItem(now.format('MM-DD HH:mm'));

    // 温度
    ret['temperature'] = generateMessageItem(
      Math.round(realtimeWeather.temperature),
    );
    ret['apparent_temperature'] = generateMessageItem(
      Math.round(realtimeWeather.apparent_temperature),
    );

    // 降雨
    const { intensity } = realtimeWeather.precipitation.local;
    const precipitation = intensity === 0 ? '没下雨' : '正在下雨，记得带伞哦';
    ret['local_precipitation'] = generateMessageItem(precipitation);
    ret['nearest_precipition'] = generateMessageItem(
      Math.round(realtimeWeather.precipitation.nearest.distance),
    );

    // 空气质量 & 天空
    ret['air_quality'] = generateMessageItem(
      realtimeWeather.air_quality.description.chn,
    );

    // 生活指数
    ret['comfort'] = generateMessageItem(
      realtimeWeather.life_index.comfort.desc,
    );

    // 建议
    const suggestion = this.getSuggestion(realtimeWeather);
    ret['suggestion'] = generateMessageItem(suggestion);
    return ret;
  }

  getSuggestion(realtimeWeather: CaiyunRealtimeWeather): string {
    const { index } = realtimeWeather.life_index.comfort;
    if (index <= 3) {
      return '天气较热，注意避暑哦~';
    } else if (index <= 5) {
      return '现在比较凉爽，但也要注意不能着凉哦^_^';
    } else {
      return '天气较冷，注意添衣保暖~';
    }
  }
}
