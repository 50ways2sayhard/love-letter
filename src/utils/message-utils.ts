import * as dayjs from 'dayjs';
import { getWeatherOfCity } from '../request/weather';
import { daysBetween, daysBetweenThisOrNextYear } from './date-utils';
import { queryRemainHolidayAfterDate } from './holiday-utils';

const generateMessage = async (cfg: any): Promise<string> => {
  return `
${generateTogetherMessage(cfg.togetherDate, cfg.lover)}
${generateBirthDayMessage(cfg.birthday)}
${generateRetireMessage(cfg.birthdayWithYear, cfg.retireAge)}
${generateWageMessage(cfg.wageDay)}
${await generateWeatherMessage(cfg.city)}
${await generateRecentHolidayMessage()}
`;
};

export const generateTogetherMessage = (
  togetherDate: string,
  lover = '',
): string => {
  const days = daysBetween(dayjs(), dayjs(togetherDate));
  const message = `💕 和${lover}在一起已经${days}天啦`;
  const memorizedMessage =
    days % 100 === 0 ? `, 今天是纪念日哦~enjoy your times` : '';
  return message + memorizedMessage;
};

export const generateBirthDayMessage = (birthday: string) => {
  const days = daysBetweenThisOrNextYear(dayjs(), dayjs(birthday));
  return days === 0
    ? `🎉 今天是你的生日哦！生日快乐`
    : `🎂 还有${days}就要过生日啦`;
};

export const generateRetireMessage = (
  birthdayWithYear: string,
  retireAge: number,
): string => {
  const birthday = dayjs(birthdayWithYear);
  const retireDay = birthday.year(birthday.year() + retireAge);
  const days = daysBetween(dayjs(), retireDay);
  return `👵 离退休还有${days}天哦`;
};

export const generateWageMessage = (wageDay: number): string => {
  const now = dayjs();
  const wageDayjs =
    now.day() > wageDay
    ? now.month(now.month() + 1).date(wageDay)
    : now.date(wageDay);
  return `💰 离发工资还有 ${daysBetween(now, wageDayjs)} 天`;
};

export const generateWeatherMessage = async (city: string): Promise<string> => {
  const weather = await getWeatherOfCity(city);
  const { realtime } = weather;
  return `☁ ️天气 ${realtime.info}, 🌡️ 气温 ${realtime.temperature} ℃, 💧 湿度 ${realtime.humidity}, 🌬 ${realtime.direct}${realtime.power}`;
};

export const generateRecentHolidayMessage = async (): Promise<string> => {
  const remainHolidays = await queryRemainHolidayAfterDate(dayjs());
  const holidayStrs = ['🎊 今年剩余假期：'];
  remainHolidays.forEach((holiday) => {
    holidayStrs.push(`- ${holiday.startday} ${holiday.name}`);
  });
  return holidayStrs.join('\n');
};

export default generateMessage;
