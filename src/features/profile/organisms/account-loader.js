import { useEffect } from "react"
import {useDispatch} from "react-redux";
import Cookies from "browser-cookies"
import {history} from "lib/routing";
import {getAccount} from "../modules/actions";
import {AUTHTOKEN} from 'lib/CONST'
import {useIdle} from "../../../lib/customHooks/useIdle"


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
            history.push('/login')
        }
    }



    // if (!TOKEN) return null
    return children
}

