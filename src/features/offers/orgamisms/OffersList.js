import * as React from "react"
import { Link } from "react-router-dom"

import {OfferAvatar} from 'features/offers/atoms/offer-avatar'
import {Row} from 'ui'

export const OffersList = ( {
        offers,
        isLoading,
        showMore,
        hasMore,
        isFirstRequest
    }) => {

    if(isFirstRequest) return <div>Loading...</div>
    return (
        <div className=''>
            {offers.map(item =>
                <Link to={`/offers/${item.id}`} key={item.id}>
                    <Row>
                        <OfferAvatar src={item.avatarUrl} />
                        <div>{item.name}</div>
                    </Row>
                </Link>
            )}
            {isLoading && <div>Loading...</div>}
            {(!isLoading && hasMore) && <div onClick={showMore}>Show more</div> }
        </div>
    )
}




