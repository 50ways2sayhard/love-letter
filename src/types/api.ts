import { StringOrUndefined } from './base';
export interface JuHeApiResult<T> {
  error_code: number;
  reason: string;
  result: T;
}

export interface JuHeHoliday {
  name: string;
  startday: string;
}

export interface JuHeHolidayOfYear {
  data: {
    holidaylist: string;
    holiday_list: Array<JuHeHoliday>;
    year: string;
  };
}

export interface JuHeHolidayInfo {
  date: string;
  week: string;
  statusDesc: '节假日' | '工作日' | '周末';
  status: 1 | 2 | null;
  animal: StringOrUndefined;
  aviod: StringOrUndefined;
  cnDay: StringOrUndefined;
  day: StringOrUndefined;
  desc: StringOrUndefined;
  gzDate: StringOrUndefined;
  gzMonth: StringOrUndefined;
  gzYear: StringOrUndefined;
  isBidMonth: StringOrUndefined;
  lDate: StringOrUndefined;
  lMonth: StringOrUndefined;
  lunarDate: StringOrUndefined;
  lunaYear: StringOrUndefined;
  month: StringOrUndefined;
  oDate: StringOrUndefined;
  suit: StringOrUndefined;
  term: StringOrUndefined;
  type: StringOrUndefined;
  value: StringOrUndefined;
  year: StringOrUndefined;
}

interface _JuHeHolidayStatus {
  date: string;
  status: '0' | '1';
}

export interface JuHeRecentHolidayInfo {
  name: string;
  festival: string;
  desc: string;
  rest: string;
  list: _JuHeHolidayStatus[];
}

export interface JuHeRecentHolidays {
  data: {
    year: string;
    'year-month': string;
    holiday: string;
    holiday_array: JuHeRecentHolidayInfo[];
  };
}

export interface JuHeRealTimeWeather {
  info: StringOrUndefined;
  wid: StringOrUndefined;
  temperature: StringOrUndefined;
  humidity: StringOrUndefined;
  direct: StringOrUndefined;
  power: StringOrUndefined;
  aqi: StringOrUndefined;
}

export interface JuHeFutureWeather {
  date: StringOrUndefined;
  temperature: StringOrUndefined;
  weather: StringOrUndefined;
  direct: StringOrUndefined;
}

export interface JuHeWeather {
  realtime: JuHeRealTimeWeather;
  future: JuHeFutureWeather[];
}
