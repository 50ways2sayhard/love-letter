import { Dayjs } from 'dayjs';

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六'];

export function daysBetween(start: Dayjs, end: Dayjs): number {
  return Math.abs(start.diff(end, 'day'));
}

export function daysBetweenThisOrNextYear(start: Dayjs, end: Dayjs): number {
  const _end = end.year(start.year());
  return daysBetween(
    start,
    start.isAfter(_end) ? _end.year(start.year() + 1) : _end,
  );
}

export function getWeekday(index: number): string {
  return `星期${WEEKDAYS[index]}`;
}
