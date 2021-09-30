import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import {
  daysBetween,
  daysBetweenThisOrNextYear,
  getWeekday,
} from '../utils/date-utils';
import { queryRemainHolidayAfterDate } from '../utils/holiday-utils';
import { generateMessageItem } from '../utils/template-utils';

@Injectable()
export class DailyRemindService {
  async generateTemplate(cfg: Record<string, any>): Promise<any> {
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
}
