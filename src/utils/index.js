export function currency(value, decimalPosition = 2) {
   return '$' + value
       .toFixed(decimalPosition)
       .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}