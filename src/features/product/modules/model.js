import { API_URL, PATH_TO_FILE, MODE } from 'lib/CONST'


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

  const mode = localStorage.getItem(MODE)
  if(mode === 'purchase') price = product.purchase

  return {
    ...product,
    discount: product.discount || 0,
    rest: rest,
    price: price,
    image: product.image_url ? `${PATH_TO_FILE}/${product.image_url}` : null,
  }
}
