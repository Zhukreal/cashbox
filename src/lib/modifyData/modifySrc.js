import {PATHTOFILE} from '../CONST/'

export const modifySrc = (src, type) => {
    let empty = '';

    // switch (type) {
    //     case 'offer':
    //         empty = defaultOffer;
    //         break;
    //     case 'person':
    //         empty = emptyAvatar;
    //         break;
    //     case 'coverProfile':
    //         empty = defaultCoverProfile;
    //         break;
    // }

    if(!src) return empty;

    if(/^((http|https|www|ftp):\/\/)/.test(src)) {
        return src;
    }

    return `${PATHTOFILE}/${src}`
}