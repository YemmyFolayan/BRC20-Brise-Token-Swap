import { SWAP_API } from 'backend'

export const getAllLock = () => {
  return fetch(`${SWAP_API}/lock`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getLockById = (lock_id) => {
  return fetch(`${SWAP_API}/lock/${lock_id}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getAllTokens = () => {
  return fetch(`${SWAP_API}/lock/tokens`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getLocksByToken = (token_address) => {
  return fetch(`${SWAP_API}/locks/${token_address}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export default getAllLock
