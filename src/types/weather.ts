// 风
export interface CaiyunWindData {
  speed: number;
  direction: number;
}

// 降水
export interface CaiyunPrecipitationData {
  local: {
    status: string;
    datasource: string;
    intensity: number;
  };
  nearest: {
    status: string;
    distance: number;
    intensity: number;
  };
}

export interface CaiyunAirQuality {
  pm25: number;
  pm10: number;
  o3: number;
  so2: number;
  no2: number;
  co: number;
  aqi: {
    chn: number;
    usa: number;
  };
  description: {
    use: string;
    chn: string;
  };
}

interface CaiyunLifeIndexDescription {
  index: number;
  desc: string;
}

export interface CaiyunLifeIndex {
  ultraviolet: CaiyunLifeIndexDescription;
  comfort: CaiyunLifeIndexDescription;
}

// 彩云实时天气
export interface CaiyunRealtimeWeather {
  status: string;
  temperature: number;
  humidity: number;
  cloudrate: number;
  skycon: string;
  visibility: number;
  dswrf: number;
  wind: CaiyunWindData;
  pressure: number;
  apparent_temperature: number;
  precipitation: CaiyunPrecipitationData;
  air_quality: CaiyunAirQuality;
  life_index: CaiyunLifeIndex;
  primary: number;
}
