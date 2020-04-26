import React, {useState, useCallback} from "react"
import { useSelector, useDispatch } from 'react-redux'
import {useIdle} from "lib/customHooks/useIdle"
import Cookies from "browser-cookies"
import {AUTHTOKEN} from "lib/CONST"
import {CommonContentTemplate} from '../templates'
import {Text, Button, Modal, InactiveForWhile} from "ui"
import {authActions} from "features/auth"




export const Common = ({ children }) => {
    const dispatch = useDispatch()
    const TOKEN = Cookies.get(AUTHTOKEN)
    const [opened, setOpened] = useState(false)
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
