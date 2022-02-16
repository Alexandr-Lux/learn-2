import { makeRequest } from '../requests'

export const fetchJournal = (id, period) => {
  return makeRequest({
    url: `/api/objects/${id}/journal?filter=${period}`
  })
}
