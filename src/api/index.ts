export default {
  getProducts: (callback: any) => {
    fetch(
      'https://gateway.marvel.com:443/v1/public/series?seriesType=collection&contains=comic&orderBy=-modified&limit=20&apikey=552047a68134184a0ef52f1a273e8c32'
    )
      .then(res => res.json())
      .then(result => {
        callback(result.data.results)
      })
  },
}
