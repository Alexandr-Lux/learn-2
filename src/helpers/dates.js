export const transformDate = (beginDate, endDate) => {
  const addStartingZero = (value) => value < 10 ? `0${value}` : value
  const dateForRequest =
    `${beginDate.getFullYear()}-` +
    `${addStartingZero(beginDate.getMonth() + 1)}-` +
    `${addStartingZero(beginDate.getDate())},` +
    `${endDate.getFullYear()}-` +
    `${addStartingZero(endDate.getMonth() + 1)}-` +
    `${addStartingZero(endDate.getDate())}`

  return dateForRequest
}

export const formatDate = (ms) => {
  const date = new Date(ms)
  return `${date.getDate()}.` +
         `${date.getMonth() < 9 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}.` +
         `${date.getFullYear()} -  ` +
         `${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:` +
         `${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`
}
