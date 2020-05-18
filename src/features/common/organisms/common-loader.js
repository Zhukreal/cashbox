import React, {useCallback, useEffect, useState} from "react"
import {Link, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {history} from "lib/routing";
import {AUTHTOKEN} from 'lib/CONST'
import {apiCheckConnection} from "../../../api/account";
import {authActions} from "../../auth";
import {profileActions} from "../../profile";
import {productActions} from "../../product";


export const CommonLoader = ({ children }) => {
    const { isLoading, skip, take, hasMore, searchFilter, activeSorting, activeGroup } = useSelector(state => state.product)
    const dispatch = useDispatch()
    const TOKEN = localStorage.getItem(AUTHTOKEN)
    const CASHBOX = localStorage.getItem('cashbox')

    const location = useLocation()
    const isLoginPage = location.pathname === '/login'

    // info for first loading
    useEffect(() => {
        if(isLoginPage) {

        } else {
            dispatch(productActions.getGroups())
            dispatch(productActions.getSections())

            const checkCashStatus = () => dispatch(profileActions.checkCashStatus())
            // const requestInterval = 10000 // 10 sec
            const requestInterval = 300000 // 5 min
            checkCashStatus()
            const interval = setInterval(() => checkConnection(), requestInterval);
            const interval2 = setInterval(() => checkCashStatus(), requestInterval);
            return () => {
                clearInterval(interval);
                clearInterval(interval2);
            };
        }
    }, [])

    const checkConnection = useCallback(async () => {
        try {
            const res = await apiCheckConnection()
        } catch(e) {
            dispatch(authActions.setFailureConnection(true))
            dispatch(authActions.logout())
        }
    }, [])



    useEffect( () => {
        if(!isLoginPage) {
            dispatch(productActions.resetFilters())
            dispatch(productActions.getProducts({}))
        }
    }, [dispatch, searchFilter, activeSorting, activeGroup.id])



    // if(!TOKEN) return null
    return children
}

