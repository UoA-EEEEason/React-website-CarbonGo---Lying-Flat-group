import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function timeSince(date) {
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 60) { // less than a minute
    return parseInt(secondsPast) + ' seconds ago';
  }
  if (secondsPast < 3600) { // less than an hour
    return parseInt(secondsPast / 60) + ' minutes ago';
  }
  if (secondsPast <= 86400) { // less than a day
    return parseInt(secondsPast / 3600) + ' hours ago';
  }
  if (secondsPast <= 2592000) { // less than a month
    return parseInt(secondsPast / 86400) + ' days ago';
  }
  if (secondsPast <= 31536000) { // less than a year
    return parseInt(secondsPast / 2592000) + ' months ago';
  }
  return parseInt(secondsPast / 31536000) + ' years ago';
}

