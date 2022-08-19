import { SWAP_API } from 'backend'

export const getAllPresale = () => {
  return fetch(`${SWAP_API}/presale`, {
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

export const getPresaleById = (sale_id) => {
  return fetch(`${SWAP_API}/presale/${sale_id}`, {
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

export default getAllPresale
