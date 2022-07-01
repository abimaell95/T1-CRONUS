import { CalendarUtils } from '../CalendarUtils';

test('monday of the end of the month', () => {
  const date = new Date(2022, 5, 27, 0, 0, 0, 0);
  expect(CalendarUtils.getWeekLabel(date)).toBe('2022, Junio 27 - Julio 3');
});

test('works normally', () => {
  const date = new Date(2022, 6, 11, 0, 0, 0, 0);
  expect(CalendarUtils.getWeekLabel(date)).toBe('2022, Julio 11 - 17');
});

test('date not null', () => {
  expect(CalendarUtils.getWeekLabel(null)).toBe('');
});

test('works correctly in range', () => {
  const date = new Date(2022, 9, 24, 10, 0, 0, 0);
  expect(CalendarUtils.getCalendarRow(date)).toBe(50);
});

test('out of range upper limit', () => {
  const date = new Date(2022, 9, 24, 18, 0, 0, 0);
  expect(CalendarUtils.getCalendarRow(date)).toBe(-1);
});

test('out of range lower limit', () => {
  const date = new Date(2022, 9, 24, 5, 0, 0, 0);
  expect(CalendarUtils.getCalendarRow(date)).toBe(-1);
});

test('date not null', () => {
  expect(CalendarUtils.getCalendarRow(null)).toBe(-1);
});

test('span is greater than one hour', () => {
  const date1 = new Date(2022, 7, 1, 9, 0, 0, 0);
  const date2 = new Date(2022, 7, 1, 12, 0, 0, 0);
  expect(CalendarUtils.getCalendarSpan(date1, date2)).toBe(-1);
});

test('same datetimes', () => {
  const date1 = new Date(2022, 7, 1, 9, 0, 0, 10);
  const date2 = new Date(2022, 7, 1, 9, 0, 0, 10);
  expect(CalendarUtils.getCalendarSpan(date1, date2)).toBe(-1);
});

test('end datetime before start datetime', () => {
  const date1 = new Date(2022, 7, 1, 12, 0, 0, 0);
  const date2 = new Date(2022, 7, 1, 9, 0, 0, 0);
  expect(CalendarUtils.getCalendarSpan(date1, date2)).toBe(-1);
});

test('works correctly', () => {
  const date1 = new Date(2022, 7, 1, 9, 0, 0, 0);
  const date2 = new Date(2022, 7, 1, 10, 0, 0, 0);
  expect(CalendarUtils.getCalendarSpan(date1, date2)).toBe(12);
});

test('start date not null', () => {
  const date = new Date(2022, 7, 1, 9, 0, 0, 0);
  expect(CalendarUtils.getCalendarSpan(null, date)).toBe(-1);
});

test('end date not null', () => {
  const date = new Date(2022, 7, 1, 9, 0, 0, 0);
  expect(CalendarUtils.getCalendarSpan(date, null)).toBe(-1);
});
