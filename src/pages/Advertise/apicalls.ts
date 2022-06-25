import API from '../../backend'

const sendMessage = (payload) => {
  return fetch(`${API}/message`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export default sendMessage
