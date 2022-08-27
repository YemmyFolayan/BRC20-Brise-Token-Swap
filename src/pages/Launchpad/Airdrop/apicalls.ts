/* eslint-disable */
import { SWAP_API } from 'backend'

const addAirdrop = (payload) => {
  return fetch(`${SWAP_API}/airdrop`, {
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

export default addAirdrop
