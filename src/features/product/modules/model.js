import {API_URL} from 'lib/CONST'
import testImage from 'static/img/test.png'

export const toModel = (product) => {
    return {
        ...product,
        // image: `${API_URL}/uploads/${product.image}`
        image: testImage
    }
}