import { makeRequest } from '../requests'

export const getToken = ({ username, password }) => {
  return makeRequest({
    url: '/api/login',
    method: 'POST',
    data: `username=${username}&password=${password}`
  })
}
