import { useEffect } from "react"
import {useDispatch} from "react-redux";
import Cookies from "browser-cookies"

import {getAccount} from "../modules/actions";
import {AUTHTOKEN} from '../../../lib/CONST'


export const AccountLoader = ({ children }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        loadSession()
    }, [])

    const loadSession = () => {
        const TOKEN = Cookies.get(AUTHTOKEN)
        if(TOKEN) {
            dispatch(getAccount(TOKEN))
        } else {

        }
    }




    // if (token && !session) return null
    return children
}

