// Holiday
export const UrlGetHolidaysByYear = 'http://v.juhe.cn/calendar/year';
export const UrlGetRecentHolidays = 'http://v.juhe.cn/calendar/month';
export const UrlGetHolidayInfo = 'http://apis.juhe.cn/fapig/calendar/day.php';

// Weather
export const UrlGetWeatherByCity = 'http://apis.juhe.cn/simpleWeather/query';

// WeChat access token
export const UrlGetAccessToken = 'https://api.weixin.qq.com/cgi-bin/token';

// WeChat template message
export const UrlPostWechatTemplateMessage =
  'https://api.weixin.qq.com/cgi-bin/message/template/send';

export const UrlGetCalyunRealtimeWeather = (
  token: string,
  cityPosition: string,
): string => {
  return `https://api.caiyunapp.com/v2.5/${token}/${cityPosition}/realtime.json`;
};
