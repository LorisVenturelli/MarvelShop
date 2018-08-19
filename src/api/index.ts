const API_URL = 'https://gateway.marvel.com:443/v1/public'
const API_KEY = '552047a68134184a0ef52f1a273e8c32'

export const API = {
  getLastProducts: (limit = 12) => {
    return fetch(
      `${API_URL}/comics?apikey=${API_KEY}&orderBy=-onsaleDate&hasDigitalIssue=false&limit=${limit}`
    )
      .then((res) => res.json())
      .then((result) => result.data.results)
  },
  getProductDetail: (id: number) => {
    return fetch(`${API_URL}/comics/${id}?apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => result.data.results[0])
  },
  search: (query: string, limit = 20, page = 1) => {
    return fetch(
      `${API_URL}/comics?apikey=${API_KEY}&titleStartsWith=${query}&orderBy=-onsaleDate&hasDigitalIssue=false&limit=${limit}&offset=${page -
        1}`
    )
      .then((res) => res.json())
      .then((result) => result.data)
  },
}
