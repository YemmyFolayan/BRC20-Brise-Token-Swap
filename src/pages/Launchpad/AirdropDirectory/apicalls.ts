/* eslint-disable */
import { SWAP_API } from 'backend'

export const getAllAirdrop = () => {
  return fetch(`${SWAP_API}/airdrop`, {
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

export const getAirdropById = (airdrop_id) => {
  return fetch(`${SWAP_API}/airdrop/${airdrop_id}`, {
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

export default getAllAirdrop
