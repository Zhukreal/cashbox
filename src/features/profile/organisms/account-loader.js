import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux";
import Cookies from "browser-cookies"
import {history} from "lib/routing";
import {getAccount} from "../modules/actions";
import {AUTHTOKEN} from 'lib/CONST'


export const AccountLoader = ({ children }) => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector(state => state.profile)
    const TOKEN = localStorage.getItem(AUTHTOKEN)

    useEffect(() => {
        loadSession()
    }, [])


    const loadSession = () => {
        if(TOKEN) {
            dispatch(getAccount(TOKEN))
        } else {
            history.push('/login')
        }
    }

    // if (TOKEN && !isAuth) return <div>Loading...</div>
    return children
}

