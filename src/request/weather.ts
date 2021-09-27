import { JuHeWeather } from 'src/types/api';
import { CaiyunRealtimeWeather } from 'src/types/weather';
import config from '../config';
import network from './base';
import { UrlGetCalyunRealtimeWeather, UrlGetWeatherByCity } from './protocol';

export const getWeatherOfCity = (city: string): Promise<JuHeWeather> =>
  network
    .get(UrlGetWeatherByCity, {
      key: config.weatherQueryKey,
      city,
    })
    .then((ret) => ret.result);

export function getCaiyunRealTimeWeather(
  cityPosition: string,
): Promise<CaiyunRealtimeWeather> {
  return network
    .get(UrlGetCalyunRealtimeWeather(config.caiyunWeatherApiKey, cityPosition))
    .then((ret) => ret.result.realtime);
}
