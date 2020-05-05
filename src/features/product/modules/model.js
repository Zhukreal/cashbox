import {API_URL} from 'lib/CONST'
import noPhoto from 'static/img/test.png'

export const toModel = ( product ) => {

    return {
        ...product,
        image: product.image_url ? `${API_URL}/${product.image_url}` : null
    }
}