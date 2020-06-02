import { API_URL, PATH_TO_FILE } from 'lib/CONST'


export const toModel = (product) => {
  let rest = null,
    price = 0,
    stores = product.stores || []
  const storeId = localStorage.getItem('store')
  stores.forEach((store) => {
    if (storeId === store.id && store.rest !== null) {
      rest = store.rest
      price = store.price
    }
  })

  return {
    ...product,
    discount: product.discount || 0,
    rest: rest,
    priceStore: price,
    image: product.image_url ? `${PATH_TO_FILE}/${product.image_url}` : null,
  }
}
