import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {device} from 'lib/mediaDevice'
import {productActions} from "features/product";
import groupIcon from 'static/img/icons/group.png'
import {Button, StyledButton} from "ui/atoms/button";
import useOnClickOutside from "use-onclickoutside";

export const ProductSections = () => {
    const [opened, setOpened] = useState(false)
    const dispatch = useDispatch()
    const { sections, activeSection } = useSelector(state => state.product)
    const ref = useRef(null)
    useOnClickOutside(ref, () => setOpened(false))

    useEffect(() => {
        // dispatch(productActions.getSections())
    }, [])

    const toggleFull = () => {
        setOpened(!opened)
    }

    const handleSetSection = (section) => {
        dispatch(productActions.setSection(section))
        setOpened(false)
    }


    return (
        <SectionsBox ref={ref}>
            <Button onClick={toggleFull} >
                {activeSection.id ? activeSection.name : 'Секция/Отдел'}
            </Button>
            {opened &&
                <List>
                    {sections.length ?
                        <>
                            {sections.map((item, key) => {
                                if(item.id === activeSection.id) return null
                                return (
                                    <Item
                                        key={item.id}
                                        onClick={() => handleSetSection(item)}
                                        active={activeSection.id === item.id}
                                    >
                                        {item.name}
                                    </Item>
                                )
                            }
                            )}
                        </>
                        :
                        <Not>Не найдено</Not>
                    }

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
   
   @media ${device.mobileTablet} { 
    max-width: 140px;
    min-width: 140px;
   
    ${StyledButton} {
      font-size: 10px;
      padding: 0 10px;
      height: 32px;
      border-radius: 16px;
      background-color: #ffffff;
      color: var(--primary);
      box-shadow: var(--shadow-card);
   }
  }
   
`
const Item = styled.div `
    padding: 10px;
    font-size: 16px;
    text-align: center;
    
    &:hover {
      cursor: pointer;
      background-color: rgba(79,135,222,0.13);
    }
    
    ${(p) => p.active && css`
         background-color: var(--blue);
         color: #ffffff;
         
          &:hover {
              background-color: var(--blue);
           }
    `}
    
    
    @media ${device.mobileTablet} { 
      font-size: 14px;
      padding: 5px;
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
    
    @media ${device.mobileTablet} { 
      top: 20px;
      min-height: 55px;
    }
    @media ${device.laptop} { 
      top: 38px;
    }
`
const Not = styled.div`
  text-align: center;
  color: grey;
  padding-top: 15px;
  
  @media ${device.mobileTablet} { 
      padding-top: 10px;
    }
`