const DATE_ONLY = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

function validateDate(value, label) {
  if (typeof value !== 'string' || !DATE_ONLY.test(value) || value.startsWith('0000-')) {
    throw new RangeError(`${label} must be a calendar date in YYYY-MM-DD format.`);
  }

  const datetime = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(datetime.getTime()) || datetime.toISOString().slice(0, 10) !== value) {
    throw new RangeError(`${label} must be a calendar date in YYYY-MM-DD format.`);
  }
}

export function compareDeliveryWindow(earliest, latest, needBy) {
  validateDate(earliest, 'earliest');
  validateDate(latest, 'latest');
  validateDate(needBy, 'needBy');
  if (earliest > latest) {
    throw new RangeError('latest must be on or after earliest.');
  }

  if (latest <= needBy) return 'within-deadline';
  if (earliest > needBy) return 'after-deadline';
  return 'may-miss-deadline';
}
