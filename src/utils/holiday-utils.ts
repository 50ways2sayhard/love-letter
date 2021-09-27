import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';
import { getHolidayByYear } from 'src/request/holiday';
import { JuHeHoliday } from 'src/types/api';

export const getRemainHolidayAfterDate = (
  date: Dayjs,
  holidays: JuHeHoliday[],
): JuHeHoliday[] => {
  return holidays.filter((holiday) => {
    return dayjs(holiday.startday, 'YYYY-MM-DD').isAfter(date);
  });
};

export const queryRemainHolidayAfterDate = async (
  date: Dayjs,
): Promise<JuHeHoliday[]> => {
  try {
    const holidaysInfo = await getHolidayByYear(date.year());
    return getRemainHolidayAfterDate(date, holidaysInfo.data.holiday_list);
  } catch (err) {
    return [];
  }
};
