import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from "react-router-dom";
import {offersActions, offerSelectors} from "../../features/offers"
import {CommonContentTemplate} from '../../features/common/templates'

export const OfferPage = () => {
    const dispatch = useDispatch()
    const { id } = useParams();
    const offer = useSelector(offerSelectors.offerById(id))

    useEffect(() => {
        if(!offer) dispatch(offersActions.getOfferById(id))
    },[])

    return (
        <CommonContentTemplate>

            { offer ?
                <React.Fragment>
                    offer page
                    <div>{offer.id}</div>
                    <div>{offer.name}</div>
                </React.Fragment>
                :
                <div>Loading...</div>
            }
        </CommonContentTemplate>
    )
}