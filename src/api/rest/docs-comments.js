import { makeRequest } from '../requests'

export const fetchDocs = (id) => {
  return makeRequest({
    url: `/api/documents/by_object/${id}`
  })
}

export const sendDocs = (data) => {
  return makeRequest({
    url: '/api/documents',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export const deleteDocs = (id) => {
  return makeRequest({
    url: `/api/documents/${id}`,
    method: 'delete'
  })
}

export const fetchComments = (id) => {
  return makeRequest({
    url: `/api/comments/by_object/${id}`
  })
}

export const sendComment = (data) => {
  return makeRequest({
    url: '/api/comments',
    method: 'post',
    data
  })
}

export const deleteComment = (id) => {
  return makeRequest({
    url: `/api/comments/${id}`,
    method: 'delete'
  })
}
