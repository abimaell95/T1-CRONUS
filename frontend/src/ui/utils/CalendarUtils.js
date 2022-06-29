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

function getWeekLabel(date) {
  const date2 = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 6);

  if (date.getMonth() === date2.getMonth()) {
    return `${date.getFullYear()}, ${monthMap[date.getMonth()]} ${date.getDate()} - ${date2.getDate()}`;
  }
  return `${date.getFullYear()}, ${monthMap[date.getMonth()]} ${date.getDate()} - ${monthMap[date2.getMonth()]} ${date2.getDate()}`;
}

function strDayOfWeek(date) {
  return `${dayMap[date.getDay()]}`;
}

export const calendarUtils = {
  getStateColor,
  getStateColorBadgeMap,
  getWeekLabel,
  strDayOfWeek,
};
