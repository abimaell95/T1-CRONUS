function getMonday(date) {
  const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.getFullYear(), date.getMonth(), mondayDate);
}

// get days of current week
function generateDays(date) {
  const mondayDate = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  const mondayOfWeek = new Date(date.getFullYear(), date.getMonth(), mondayDate);
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
