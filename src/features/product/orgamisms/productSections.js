import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'
import {Button, StyledButton} from "ui/atoms/button";
import useOnClickOutside from "use-onclickoutside";

export const ProductSections = () => {
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const { sections } = useSelector(state => state.product)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpened(false))

    useEffect(() => {
        dispatch(productActions.getSections())
    }, [])

    const showHide = e => {
        console.log('e:', e.target)
    }

    // useEffect(() => {
    //     document.addEventListener('click', showHide);
    //
    //     return () => document.removeEventListener('click', showHide);
    // }, [])

    const toggleFull = () => {
        setOpened(!opened)
    }

    const handleSetSection = (id) => {
        console.log(id)
        setOpened(false)
    }


    return (
        <SectionsBox ref={ref}>
            <Button onClick={toggleFull} >
                Секция/Отдел
            </Button>
            {opened &&
                <List >
                    {sections.map((item, key) =>
                        <Item key={item.id} onClick={() => handleSetSection(item.id)}>{item.name}</Item>
                    )}
                </List>
            }
        </SectionsBox>
    )
}


const SectionsBox = styled.div `
   min-width: 180px;
   position: relative;
   
   ${StyledButton} {
      width: 100%;
      border-radius: 22px;
      font-size: 20px;
      padding: 0 15px;
      z-index: 2;
   }
`
const Item = styled.div `
    padding: 10px;
    font-size: 16px;
    
    &:hover {
      cursor: pointer;
      background-color: rgba(79,135,222,0.13);
    }
`
const List = styled.div `
    position: absolute;
    width: 100%;
    height: auto;
    top: 53px;
    min-height: 70px;
    max-height: 200px;
    padding: 20px 0 10px 0;
    overflow-y: auto;
    background: white;
    border-radius: 0 0 20px 20px;
    box-shadow: var(--shadow-card);
    z-index: 1;
`
