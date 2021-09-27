# Love-Letter

## Description

用于给你的他 / 她推送微信提醒的服务。

## Precondition

### 申请聚合数据 API Key

* [天气预报](https://www.juhe.cn/docs/api/id/73)
* [万年历](https://www.juhe.cn/docs/api/id/73)
* [节假日信息查询](https://www.juhe.cn/docs/api/id/606)

### 申请彩云天气 API

* [彩云 API](https://caiyunapp.com/api/weather)

### 添加模板

每日提醒模板：
```
❤️ 亲爱的{{toLover.DATA}}，早上好~
📆 今天是{{today.DATA}}, {{weekday.DATA}}
💕 我们在一起已经{{loverdays.DATA}}天~
🎂 还有 {{daysUntilBirthday.DATA}} 天就要过生日啦
💰 离发工资还有 {{daysUntilSalary.DATA}} 天嗷
👵 离退休还有 {{daysUntilRetire.DATA}} 天哦
🎊 今年剩余假期：
{{remainHolidays.DATA}}
今天也是元气满满的一天，加油吧！
```

天气提醒模板：
```
⏰ 现在是 {{current.DATA}}, 开始播报天气啦~
🌡 当前气温 {{temperature.DATA}}℃, 体感温度{{apparent_temperature.DATA}}℃
☔️ 现在{{local_precipitation.DATA}}, 最近降雨在{{nearest_precipition.DATA}} 公里外
🌈 当前空气质量: {{air_quality.DATA}}
👕 穿衣指数 {{comfort.DATA}}
🔔 {{suggestion.DATA}}
```

### 生成并填写配置

生成配置：

```bash
$ mv src/config-example.ts src/config.ts
```

然后按照注释填写信息即可。


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Road Map

1. 优化代码
2. 添加数据库和缓存
3. 更多消息模板支持
