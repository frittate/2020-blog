const moment = require('moment')

export function constrainChars (text, length) {
  if (text.length > length) {
    return `${text.slice(0, length)}...`
  }
  return text
}

export function dateFormatter (date) {
  return moment(date).format('DD. MMMM YYYY')
}
