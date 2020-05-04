import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'
import {Button} from "ui/atoms/button";

export const ProductSections = () => {
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const { sections } = useSelector(state => state.product)


    useEffect(() => {
        dispatch(productActions.getSections())
    }, [])

    const toggleFull = () => {
        setOpened(!opened)
    }


    return (
        <>
            <Button
                isHeaderBtn
            >
                Секция/Отдел
            </Button>
        </>
    )
}

