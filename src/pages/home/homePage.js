import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {useDebounce} from 'lib/customHooks/useDebounce'
import {useIdle} from 'lib/customHooks/useIdle'

import {Common} from 'features/common'
import {offersActions, OffersList} from 'features/offers'
import {Input} from "ui"

export const HomePage = () => {
    const dispatch = useDispatch()
    const { offers, filteredOffers, skip, take, isLoading, hasMore, isFirstRequest } = useSelector(state => state.offers)
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 1000);


    useEffect(() => {
        if(isFirstRequest) getOffers()
    }, [])

    useEffect(() => {
        if(debouncedSearch) dispatch(offersActions.getOffersByFilter(debouncedSearch))
        },[debouncedSearch]
    );

    const getOffers = () => {
        dispatch(offersActions.getOffers(skip, take))
    }

    return (
        <Common>
             Home page

            <Input
                name='text'
                type='search'
                value={search}
                label={'Search'}
                onChange={e => setSearch(e.target.value)}
            />
            {/*<OffersList*/}
            {/*    offers={search ? filteredOffers : offers}*/}
            {/*    isLoading={isLoading}*/}
            {/*    showMore={() => getOffers()}*/}
            {/*    hasMore={search ? false : hasMore}*/}
            {/*    isFirstRequest={isFirstRequest}*/}
            {/*/>*/}
        </Common>
    )
}