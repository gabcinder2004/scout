import moment from 'moment';

function getDurationBetweenDates(date1, date2) {
  const d1 = moment(date1);
  const d2 = moment(date2);
  return moment.duration(d1.diff(d2));
}

export function diffByHours(date1, date2) {
  return getDurationBetweenDates(date1, date2).asHours();
}

export function diffByDays(date1, date2) {
  return getDurationBetweenDates(date1, date2).asDays();
}
