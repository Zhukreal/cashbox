import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {useDebounce} from 'lib/customHooks/useDebounce'

import {CommonContentTemplate} from 'features/common'
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
        <CommonContentTemplate>
             Home page

            {/*<Input*/}
            {/*    name='text'*/}
            {/*    type='search'*/}
            {/*    value={search}*/}
            {/*    label={'Search'}*/}
            {/*    onChange={e => setSearch(e.target.value)}*/}
            {/*/>*/}
            {/*<OffersList*/}
            {/*    offers={search ? filteredOffers : offers}*/}
            {/*    isLoading={isLoading}*/}
            {/*    showMore={() => getOffers()}*/}
            {/*    hasMore={search ? false : hasMore}*/}
            {/*    isFirstRequest={isFirstRequest}*/}
            {/*/>*/}
        </CommonContentTemplate>
    )
}