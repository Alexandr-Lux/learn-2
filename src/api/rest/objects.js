import { makeRequest } from '../requests'

export const fetchSummaryInfo = () => {
  return makeRequest({
    url: '/api/summary'
  })
}

export const fetchObjects = () => {
  return makeRequest({
    url: '/api/objects'
  })
}
