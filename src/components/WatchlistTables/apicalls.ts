
const API = `https://api.nomics.com/v1/currencies/ticker?key=dd407177db9f965ba2824dfd7f7840acf4a5949f&interval=1d,30d&convert=INR&platform-currency=BRISE2&per-page=100&page=1`

// get token data
const getTokens = () => {
  return fetch(`${API}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export default getTokens;