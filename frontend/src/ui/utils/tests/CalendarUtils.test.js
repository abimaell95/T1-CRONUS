import { CalendarUtils } from '../CalendarUtils';

test('works correctly in range', () => {
  const date = new Date(2022, 11, 24, 10, 0, 0, 0);
  expect(CalendarUtils.getCalendarRow(date)).toBe(50);
});
