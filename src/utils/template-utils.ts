import * as dayjs from 'dayjs';
import { sendTemplateMessage } from 'src/request/template';
import { getWeatherOfCity } from 'src/request/weather';
import { TemplateMessageItem } from 'src/types/template-message';
import {
  daysBetween,
  daysBetweenThisOrNextYear,
  getWeekday,
} from './date-utils';
import { queryRemainHolidayAfterDate } from './holiday-utils';
import getAccessToken from './access-token-utils';

export async function generateTemplateMessage(
  cfg: Record<string, any>,
): Promise<any> {
  const now = dayjs();
  const ret = {};

  ret['toLover'] = generateMessageItem(cfg.toLover);
  ret['today'] = generateMessageItem(now.format('YYYY-MM-DD'));
  ret['weekday'] = generateMessageItem(getWeekday(now.day()));

  // 天数
  ret['loverdays'] = generateMessageItem(
    daysBetween(now, dayjs(cfg.togetherDate)),
  );

  // 生日
  ret['daysUntilBirthday'] = generateMessageItem(
    daysBetweenThisOrNextYear(now, dayjs(cfg.birthday)),
  );

  ret['daysUntilSalary'] = generateMessageItem(
    daysBetween(now, now.date(cfg.wageDay)),
  );

  // 退休
  ret['daysUntilRetire'] = generateMessageItem(
    daysBetween(now, dayjs(cfg.retireDate)),
  );

  // 剩余节假日
  const remainHolidays = await queryRemainHolidayAfterDate(dayjs());
  const holidayStrs = [];
  remainHolidays.forEach((holiday) => {
    holidayStrs.push(`- ${holiday.startday} ${holiday.name}`);
  });
  ret['remainHolidays'] = generateMessageItem(holidayStrs.join('\n'));

  return ret;
}

export async function generateTodayWeatherTemplateMessage(
  city: string,
): Promise<Record<string, TemplateMessageItem>> {
  try {
    const weather = await getWeatherOfCity(city);
    const { realtime } = weather;
    return {
      weather: generateMessageItem(realtime.info),
      temperature: generateMessageItem(realtime.temperature),
      humidity: generateMessageItem(realtime.humidity),
      windDirection: generateMessageItem(realtime.direct),
      windPower: generateMessageItem(realtime.power),
    };
  } catch (err) {
    return {};
  }
}

export function generateMessageItem(
  value: string | number,
  color?: string,
): TemplateMessageItem {
  const _color = color || '#262626';
  return {
    value: `${value}`,
    color: _color,
  };
}

export async function sendTemplate(cfg, templateId, userOpenId, data) {
  const token = await getAccessToken(cfg.appId, cfg.appSecret);

  const resp = await sendTemplateMessage(token, {
    touser: userOpenId,
    template_id: templateId,
    data,
  });
  return resp;
}
