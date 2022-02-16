export default (beginDate, endDate) => {
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
