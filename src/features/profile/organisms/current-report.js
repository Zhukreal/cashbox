import React, {useState, useEffect} from 'react'
import styled, {css} from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import { device } from 'lib/mediaDevice'
import {profileActions} from "features/profile"
import {Button, StyledButton, Print} from "ui"
import closeGray from 'static/img/icons/close-gray.png'
import iconPrint from 'static/img/icons/print.png'



export const CurrentReport = ({onClose}) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const { isLoadingReport, currentReport } = useSelector( state => state.profile )

    useEffect(() => {
        loadReport().then()
    }, [])

    const loadReport = async () => {
        try {
            await dispatch(profileActions.loadCurrentReport())
        } catch (e) {
            console.log(e)
            setError(true)
        }
    }

    const handlePrint = () => {

    }


    return (
        <Print
            title={'X отчет'}
            data={currentReport}
            onPrint={handlePrint}
            onClose={onClose}
            isLoadingReport={isLoadingReport}
            error={error}
        />
    )
}

