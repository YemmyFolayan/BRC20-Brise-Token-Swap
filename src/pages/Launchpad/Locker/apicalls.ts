import { SWAP_API } from 'backend'

export const addBitgertLock = (payload) => {
  return fetch(`${SWAP_API}/lock`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export default addBitgertLock
