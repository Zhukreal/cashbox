export const formatDate = (date, type) => {
  function z(n) {
    return (n < 10 ? '0' : '') + n
  }

  let d = new Date(date),
    year = d.getFullYear(),
    month = z(d.getMonth() + 1),
    day = z(d.getDate()),
    hours = z(d.getHours()),
    minutes = z(d.getMinutes())


  if(type) return `${hours}:${minutes} ${day}.${month}.${year}`
  return [year, month, day].join('-')
}
