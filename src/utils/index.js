export function currency(value, decimalPosition = 2) {
   return '$' + value
       .toFixed(decimalPosition)
       .replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
}

export function valueJoinerWithDelimiter(values, delimiter) {
    return values.filter(val => val).join(delimiter);
}

export function adornItem(item) {
    if(item.preferredProductIndicator === 'Y') {
        return `* ${item.longItemDescription}`
    } else {
        return `${item.longItemDescription}`;
    }    
}