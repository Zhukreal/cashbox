import {API_URL, PATH_TO_FILE} from 'lib/CONST'
import noPhoto from 'static/img/test.png'

export const toModel = ( product ) => {
    let rest = null,
        stores = product.stores || []
    const storeId = localStorage.getItem('store')
    product.stores.forEach((store) => {
        if(storeId === store.id && store.rest !== null) {
            rest = store.rest
        }
    })

    return {
        ...product,
        discount: product.discount || 0,
        rest: rest,
        image: product.image_url ? `${PATH_TO_FILE}/${product.image_url}` : null
    }
}