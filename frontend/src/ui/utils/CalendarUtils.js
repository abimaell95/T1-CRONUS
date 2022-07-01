const stateMap = {
  1: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
  2: 'text-amber-700 bg-amber-100 hover:bg-amber-200',
  3: 'text-emerald-700 bg-emerald-100 hover:bg-emerald-200',
  4: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
  5: 'text-slate-700 bg-slate-100 hover:bg-slate-200',
  6: 'text-rose-700 bg-rose-100 hover:bg-rose-200',
};

const stateColorBadgeMap = {
  1: 'bg-slate-200',
  2: 'bg-amber-200',
  3: 'bg-emerald-200',
  4: 'bg-slate-200',
  5: 'bg-slate-200',
  6: 'bg-rose-200',
};

const stepColorMap = {
  1: {
    bg: 'bg-gray-100 ',
    text: 'text-gray-800 ',
  },
  2: {
    bg: 'bg-yellow-100 ',
    text: 'text-yellow-800 ',
  },
  3: {
    bg: 'bg-green-100 ',
    text: 'text-green-800 ',
  },
  4: {
    bg: 'bg-gray-100 ',
    text: 'text-gray-800 ',
  },
  5: {
    bg: 'bg-gray-100 ',
    text: 'text-gray-800 ',
  },
  6: {
    bg: 'bg-gray-100 ',
    text: 'text-gray-800 ',
  },
};

const monthMap = {
  0: 'Ene',
  1: 'Febr',
  2: 'Mar',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Ago',
  8: 'Sept',
  9: 'Oct',
  10: 'Nov',
  11: 'Dic',
};

const dayMap = {
  0: 'Dom',
  1: 'Lun',
  2: 'Mar',
  3: 'Mie',
  4: 'Jue',
  5: 'Vie',
  6: 'Sab',
};

function getStateColor(id) {
  return stateMap[id];
}

function getStateColorBadgeMap(id) {
  return stateColorBadgeMap[id];
}

function getStepColor(id) {
  return stepColorMap[id];
}

/*
 @first_test : date - end of month
 @second_test : works correctly - not end of month :D
 @third_test : date not null
*/
function getWeekLabel(date) {
  if (date == null) {
    return '';
  }
  const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);
  if (date.getMonth() === date2.getMonth()) {
    return `${date.getFullYear()}, ${monthMap[date.getMonth()]} ${date.getDate()} - ${date2.getDate()}`;
  }
  return `${date.getFullYear()}, ${monthMap[date.getMonth()]} ${date.getDate()} - ${monthMap[date2.getMonth()]} ${date2.getDate()}`;
}

function strDayOfWeek(date) {
  return `${dayMap[date.getDay()]}`;
}

/*
 @first_test : date - if out of range upper returns -1
 @second_test : date - if out of range lower returns -1
 @third_test : date - works correctly in range
 @fourth_test : date not null
*/
function getCalendarRow(date) {
  if (date == null || date.getHours() < 6 || date.getHours() > 17) {
    return -1;
  }
  return (date.getHours() * 12) - 70;
}

/*
@first_test : date > 1 hour range returns - 1
@second_test : endDate == startDate returns -1
@third_test : endDate < startDate return -1
@fourth_test : date - works correctly
@fifth_test : date not null -1
*/
function getCalendarSpan(startDate, endDate) {
  if (!startDate || !endDate || startDate >= endDate) {
    return -1;
  }
  const diff = endDate.getHours() - startDate.getHours();
  return diff > 1 ? -1 : diff * 12;
}

export const CalendarUtils = {
  getStateColor,
  getStepColor,
  getStateColorBadgeMap,
  getWeekLabel,
  strDayOfWeek,
  getCalendarRow,
  getCalendarSpan,
};
