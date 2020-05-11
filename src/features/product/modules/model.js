import {API_URL, PATH_TO_FILE} from 'lib/CONST'
import noPhoto from 'static/img/test.png'

export const toModel = ( product ) => {

    return {
        ...product,
        image: product.image_url ? `${PATH_TO_FILE}/${product.image_url}` : null
    }
}