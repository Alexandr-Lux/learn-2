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

export const fetchObjInfo = (id) => {
  return makeRequest({
    url: `/api/objects/${id}`
  })
}
