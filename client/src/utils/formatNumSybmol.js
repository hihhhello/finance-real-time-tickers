export function formatNumSybmol(num) {
  return +num === 0 || num < 0
    ? num
    : `+${Intl.NumberFormat("ru-RU").format(num)}`;
}
