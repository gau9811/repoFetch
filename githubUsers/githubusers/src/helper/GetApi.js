// helper method

let GetApi = (url) => {
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        return data
      }
    })
}

module.exports = GetApi
