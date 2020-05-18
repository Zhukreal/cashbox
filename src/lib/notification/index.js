import {NotificationManager} from 'react-notifications';

export const showNotification = (type = 'info', msg ) => {
    let text = ''
    switch (type) {
        case 'error' :
            if(
                msg.response instanceof Object &&
                msg.response.data instanceof Object &&
                msg.response.data.error instanceof Object &&
                msg.response.data.error.message
            ) {
                text = msg.response.data.error.message
            }
            else if(
                msg instanceof Object &&
                msg.response instanceof Object &&
                msg.response.data instanceof Object &&
                (typeof(msg.response.data.error) == 'string' || typeof(msg.response.data.message) == 'string' )
            ) {
                text = msg.response.data.message || msg.data.response.data.error
            }
            else if(
                msg instanceof Object &&
                (typeof(msg.message) == 'string' || typeof(msg.error) == 'string' )
            ) {
                text = msg.message || msg.error
            }
            else if(
                typeof(msg) == 'string'
            ) {
                text = msg
            } else {
                text = 'error'
            }
            break;
        case 'info' :
            if(msg instanceof String || typeof(msg) == 'string') text = msg
            break;
        default :
    }

    console.log(msg)
    NotificationManager[type](text)
}
