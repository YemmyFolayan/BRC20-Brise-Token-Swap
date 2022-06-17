const API = `https://api.nomics.com/v1/currencies/ticker?key=9c34b8d924af87a41651ef42956ceba1&interval=1d,30d&convert=USD&platform-currency=BRISE2&per-page=100&page=1`

// get token data
const getTokens = () => {
  const headersList = {
    Accept: '*/*',
  }

  return fetch(`${API}`, {
    method: 'GET',
    headers: headersList
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export default getTokens
