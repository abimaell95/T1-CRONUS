import { DateUtils } from '../DateUtils';

test('testing retrieve monday when is monday', () => {
  const date = new Date(2022, 5, 27, 0, 0, 0, 0);
  const monday = DateUtils.getMonday(date);
  expect(monday.getDate()).toBe(27);
});

test('testing retrieve monday when is sunday', () => {
  const date = new Date(2022, 6, 3, 0, 0, 0, 0);
  const monday = DateUtils.getMonday(date);
  expect(monday.getDate()).toBe(27);
});

test('testing retrieve monday when is sunday', () => {
  const date = null;
  const monday = DateUtils.getMonday(date);
  expect(monday).toBe(null);
});

test('testing generate week array from monday date', () => {
  const date = new Date(2022, 5, 27);
  const weekArray = DateUtils.generateDays(date);
  expect(weekArray.length).toBe(7);
  expect(weekArray[0].getDate()).toBe(date.getDate());
});

test('testing generate week array from sunday date', () => {
  const date = new Date(2022, 6, 3);
  const weekArray = DateUtils.generateDays(date);
  expect(weekArray.length).toBe(7);
  expect(weekArray[weekArray.length - 1].getDate()).toBe(date.getDate());
});

test('testing generate week array from null', () => {
  const date = null;
  const weekArray = DateUtils.generateDays(date);
  expect(weekArray.length).toBe(0);
  expect(weekArray).toEqual([]);
});
