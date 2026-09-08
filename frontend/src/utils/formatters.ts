export function cn(...values: Array<string | false | null | undefined>): string {
  return values.filter(Boolean).join(' ')
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value)
}

export function formatDate(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function formatDateTime(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

// Formats a plain "YYYY-MM-DD" input value (e.g. from a date field) as
// "DD/MM/YYYY" — used by summary panels that echo back a date the user
// just picked, without the "Sep" month-name styling of `formatDate`.
export function formatDateNumeric(isoDate: string): string {
  if (!isoDate) return '-'
  const [year, month, day] = isoDate.split('-')
  return `${day}/${month}/${year}`
}

// "01 Sep 2026 08:15" — formatDate's day/short-month/year plus a
// colon-separated time, for panels (e.g. Price Detail's System
// Information / Price History) that need both in one readable string.
export function formatDateTimeLong(value: string | Date): string {
  const date = typeof value === 'string' ? new Date(value) : value
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${formatDate(date)} ${hours}:${minutes}`
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
