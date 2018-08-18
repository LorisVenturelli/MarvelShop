const URL = 'https://gateway.marvel.com:443/v1/public'
const API_KEY = '552047a68134184a0ef52f1a273e8c32'

export default {
  getProducts: (callback: any) => {
    fetch(
      `${URL}/series?apikey=${API_KEY}&contains=magazine&orderBy=-startYear&limit=20`
    )
      .then((res) => res.json())
      .then((result) => {
        callback(result.data.results)
      })
  },
  getProductDetail: (id: number) => {
    return fetch(`${URL}/series/${id}?apikey=${API_KEY}`)
      .then((res) => res.json())
      .then((result) => result.data.results[0])
  },
}
