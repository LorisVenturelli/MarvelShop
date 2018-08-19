const API_URL = 'https://gateway.marvel.com:443/v1/public'
const API_KEY = '552047a68134184a0ef52f1a273e8c32'
const CONTAINS = 'magazine'

export const API = {
  getProducts: (callback: any) => {
    fetch(
      `${API_URL}/series?apikey=${API_KEY}&contains=${CONTAINS}&orderBy=-startYear&limit=12`
    )
      .then((res) => res.json())
      .then((result) => {
        callback(result.data.results)
      })
  },
  getProductDetail: (id: number) => {
    return fetch(`${API_URL}/series/${id}?apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => result.data.results[0])
  },
  search: (query: string, limit = 50, offset = 0) => {
    return fetch(
      `${API_URL}/series?apikey=${API_KEY}&titleStartsWith=${query}&contains=${CONTAINS}&orderBy=title&limit=${limit}&offset=${offset}`
    )
      .then((res) => res.json())
      .then((result) => result.data.results)
  },
}
