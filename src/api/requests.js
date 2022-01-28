import axios from 'axios'

// const baseURL = 'https://jsonplaceholder.typicode.com/'
const baseURL = 'https://asudd.ritm3.ru/'

export const makeRequest = ({
  url, method = 'get', data = {}, headers = {}
}) => {
  // const token = localStorage.getItem('token')
  return axios({
    url,
    method,
    data,
    baseURL,
    headers: {
      ...headers
    }
  })
}
