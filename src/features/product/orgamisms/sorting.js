import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {device} from 'lib/mediaDevice'
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'
import {Button, StyledButton} from "ui/atoms/button";
import useOnClickOutside from "use-onclickoutside";
import arrowDown from 'static/img/icons/arrow-down.png'

export const ProductSorting = () => {
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const { sorting, activeSorting } = useSelector(state => state.product)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpened(false))

    useEffect(() => {

    }, [])

    const toggleFull = () => {
        setOpened(!opened)
    }

    const handleSetSorting = (sort) => {
        dispatch(productActions.setSorting(sort))
        setOpened(false)
    }


    return (
        <SortingBox ref={ref}>
           <Active onClick={toggleFull}>
               {activeSorting === 'popularity' && 'Популярные'}
               {activeSorting === 'name' && 'По алфавиту'}
               <Arrow src={arrowDown} reversed={opened}></Arrow>
           </Active>
            {opened &&
            <List>
                {sorting.map(item => {
                    if(item === activeSorting) return null
                    return (
                        <Item key={item} onClick={() => handleSetSorting(item)}>
                            {item === 'popularity' && 'Популярные'}
                            {item === 'name' && 'По алфавиту'}
                        </Item>
                    )
                })}
            </List>
            }
        </SortingBox>
    )
}


const SortingBox = styled.div `
   min-width: 130px;
   margin-right: 20px;
   position: relative;
   cursor: pointer;
 
`
const Active = styled.div `
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const List = styled.div `
    position: absolute;
    width: 100%;
    height: auto;
    top: 30px;
    
`
const Item = styled.div `
  font-size: 15px;
  
  &:hover {
    color: var(--blue);
  }
`
const Arrow = styled.img`
  margin-left: 5px;
  
  ${(p) => p.reversed && css`
         transform: rotate(180deg);
  `}
`