import React, {useState, useEffect, useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux'
import {useIdle} from "lib/customHooks/useIdle"
import {apiCheckConnection} from 'api/account'
import {AUTHTOKEN} from "lib/CONST"
import {history} from "lib/routing";
import {authActions} from "features/auth"
import {CommonContentTemplate} from '../templates'
import {Text, Button, Modal, InactiveForWhile} from "ui"

export const Common = ({ children }) => {
    const dispatch = useDispatch()
    const TOKEN = localStorage.getItem(AUTHTOKEN)
    const CASHBOX = localStorage.getItem('cashbox')
    const [opened, setOpened] = useState(false)

    useEffect(() => {
        if(!CASHBOX) history.push('/login')
    }, [])

    const checkConnection = useCallback(async () => {
        try {
            const res = await apiCheckConnection()
            console.log('checkConnection', res)
        } catch(e) {
            console.log('checkConnection error', e)
            dispatch(authActions.setFailureConnection(true))
            dispatch(authActions.logout())
        }
    }, [])

    useEffect(() => {
        // const requestInterval = 10000 // 10 sec
        const requestInterval = 300000 // 5 min
        // const requestInterval = 600000 // 10 min
        const interval = setInterval(() => checkConnection(), requestInterval);
        return () => {
            clearInterval(interval);
        };
    }, [])


    const handleWarn = () => {
        setOpened(true)
    };
    const handleLogout = () => {
        dispatch(authActions.setExpiredSession(true))
        dispatch(authActions.logout())
    }
    useIdle(handleWarn, handleLogout)

    const handleContinueSession = () => {
        setOpened(false)
    }

    if(!TOKEN) return null

    return (
        <CommonContentTemplate>
            {children}

            {opened &&
                <Modal >
                    <InactiveForWhile
                        handleContinueSession={handleContinueSession}
                        handleLogout={handleLogout}
                    />
                </Modal>
            }
        </CommonContentTemplate>
    )
}
