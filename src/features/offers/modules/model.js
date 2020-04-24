import {modifySrc} from "../../../lib/modifyData/modifySrc";

export const toOfferModel = (offer) => {
    return {
        ...offer,
        avatarUrl: modifySrc(offer.avatarUrl, 'offer')
    }
}