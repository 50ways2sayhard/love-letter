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
  animal?: string;
  aviod?: string;
  cnDay?: string;
  day?: string;
  desc?: string;
  gzDate?: string;
  gzMonth?: string;
  gzYear?: string;
  isBidMonth?: string;
  lDate?: string;
  lMonth?: string;
  lunarDate?: string;
  lunaYear?: string;
  month?: string;
  oDate?: string;
  suit?: string;
  term?: string;
  type?: string;
  value?: string;
  year?: string;
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
  info?: string;
  wid?: string;
  temperature?: string;
  humidity?: string;
  direct?: string;
  power?: string;
  aqi?: string;
}

export interface JuHeFutureWeather {
  date?: string;
  temperature?: string;
  weather?: string;
  direct?: string;
}

export interface JuHeWeather {
  realtime: JuHeRealTimeWeather;
  future: JuHeFutureWeather[];
}
