import { Injectable } from '@nestjs/common';
import { queryRemainHolidayAfterDate } from 'src/utils/holiday-utils';
import { generateMessageItem } from 'src/utils/template-utils';
import * as dayjs from 'dayjs';
import { TemplateMessageItem } from 'src/types/template-message';

@Injectable()
export default class HolidayService {
  async generateTemplate(): Promise<Record<string, TemplateMessageItem>> {
    const ret = {};
    const now = dayjs();

    const holidayStrs = [];
    const remainHolidays = await queryRemainHolidayAfterDate(now);
    console.log(remainHolidays);

    if (remainHolidays.length === 0) {
      console.log('hehe');
      ret['remainHolidays'] = generateMessageItem('今年已经没有假期了哦😢');
    } else {
      remainHolidays.forEach((holiday) => {
        holidayStrs.push(`- ${holiday.startday} ${holiday.name}`);
      });

      ret['remainHolidays'] = generateMessageItem(holidayStrs.join('\n'));
    }
    return ret;
  }
}
