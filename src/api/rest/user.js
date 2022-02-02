import { makeRequest } from '../requests'

export const getUser = () => {
  return makeRequest({
    url: '/api/user'
  })
}
