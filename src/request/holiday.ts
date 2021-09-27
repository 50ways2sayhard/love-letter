import {
  JuHeApiResult,
  JuHeHolidayInfo,
  JuHeHolidayOfYear,
  JuHeRecentHolidays,
} from 'src/types/api';
import config from '../config';
import network from './base';
import {
  UrlGetHolidayInfo,
  UrlGetHolidaysByYear,
  UrlGetRecentHolidays,
} from './protocol';

export const getHolidayByYear = (year: number): Promise<JuHeHolidayOfYear> =>
  network
    .get(UrlGetHolidaysByYear, {
      year,
      key: config.calendarQueryKey,
    })
    .then((ret) => ret.result);

export const getHolidayInfo = (
  date: string,
  detail: boolean,
): Promise<JuHeApiResult<JuHeHolidayInfo>> =>
  network
    .get(UrlGetHolidayInfo, {
      date,
      detail: +detail,
      key: config.holidayQueryKey,
    })
    .then((ret) => ret.result);

export const getRecentHolidays = (
  yearMonth: string,
): Promise<JuHeRecentHolidays> =>
  network
    .get(UrlGetRecentHolidays, {
      'year-month': yearMonth,
      key: config.calendarQueryKey,
    })
    .then((ret) => ret.result);
