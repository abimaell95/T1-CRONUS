/*
@first_test : date is monday
@second_test : date is sunday
@second_test : date is null ggggg
*/
function getMonday(date) {
  const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), mondayDate);
}

/*
@first_test : date is monday - [first]] is that monday - 7 len
@second-test : date is sunday - [last] is that sunday - 7 len
@third_test : date is null - [] - 0 len
*/
function generateDays(date) {
  const mondayOfWeek = getMonday(date);
  const days = [];

  for (let i = 0; i < 7; i += 1) {
    const currentDay = new Date(
      mondayOfWeek.getFullYear(),
      mondayOfWeek.getMonth(),
      mondayOfWeek.getDate() + i,
    );
    days.push(currentDay);
  }
  return days;
}

function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth().toString().length > 1 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`;
  const day = date.getDate();
  return `${year}-${month}-${day}`;
}

function fullDatetoString(date) {
  return `${date.getDate()} de ${new Intl.DateTimeFormat('es-US', { month: 'long' }).format(date)} del ${date.getFullYear()}`;
}

function getFormatStringDate(date) {
  return date.toISOString().split('T')[0];
}

function getScheduleListFormat(schedules) {
  return schedules.map((time, idx) => ({
    label: `${time.start}:00-${time.end}:00`,
    id: idx,
  }));
}

export const DateUtils = {
  getMonday,
  generateDays,
  dateToString,
  fullDatetoString,
  getFormatStringDate,
  getScheduleListFormat,
};
