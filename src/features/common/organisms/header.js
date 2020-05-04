import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, {css} from "styled-components"
import { device } from 'lib/mediaDevice'
import {authActions} from 'features/auth'
import {profileActions} from 'features/profile'
import {commonActions} from 'features/common'
import {ProductSections} from 'features/product'
import {Sidebar} from "./sidebar";
import {Container, Row, Col, Button, StyledButton, Input, BoxInput} from "ui";
import logo from 'static/img/logo.png'
import burger from 'static/img/burger.png'
import add from 'static/img/add.png'

export const Header = () => {
    const [isHover, setIsHover] = useState(false)
    const { isOpenedSidebar } = useSelector(state => state.common)
    const dispatch = useDispatch()

    const toggleSidebar = () => {
        dispatch(commonActions.toggleSidebar())
    }

    const handleLogout = () => {
        dispatch(authActions.logout())
        toggleSidebar()
    }

    const toggleHover = () => {
        setIsHover(prev => !prev)
    }

    return (
        <HeaderBox>
            <Container>
                <HeaderRow>
                    <LeftBox>
                        <LeftBoxControls>
                            <IconSidebar onClick={toggleSidebar} >
                                <IconBurger src={burger} />
                            </IconSidebar>
                            <Logo src={logo} />
                            <Status onMouseEnter={toggleHover} onMouseLeave={toggleHover} />
                            {isHover && <CashStatus>Касса заблокирована</CashStatus>}
                        </LeftBoxControls>
                        <Input
                            placeholder='Поиск товара/кода'
                            isSearch
                        />
                        {/*<FilterCategory>Популярные</FilterCategory>*/}
                        <ProductSections />
                    </LeftBox>
                    <RightBox>
                        <Input
                            placeholder='Введите номер/ФИО клиента'
                            isSearch
                        />
                        <ProfileBtn onClick={() => handleLogout()}>
                            <ProfileAddImg src={add} />
                        </ProfileBtn>
                    </RightBox>
                </HeaderRow>

                { isOpenedSidebar && <Sidebar handleLogout={handleLogout} /> }
            </Container>
        </HeaderBox>
    )
}


const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  position: fixed;
  height: 120px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  color: var(--card-text);
  background-color: var(--card);
  border-color: var(--borders);
  
  @media ${device.laptop} { 
    height: 100px
  }
  
`
const InfoBox = styled.div`
  
`
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const LeftBoxControls = styled.div`
    min-width: 280px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
`
const IconSidebar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  cursor: pointer;
  
  @media ${device.laptop} { 
    width: 54px;
    height: 54px;
    border-radius: 27px;
  }
`
const IconBurger = styled.img`
  @media ${device.laptop} { 
    width: 24px;
  }
`
const Logo = styled.img`
  width: 144px;
  
  @media ${device.laptop} { 
    width: 124px;
  }
`
const FilterCategory = styled.div`
  font-size: 16px;
`
const LeftBox = styled.div`
    width: calc(100% - 530px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ${BoxInput} {
      margin: 0 20px 0 50px;
    }
    ${StyledButton} {
      width: 320px;
      padding: 0 15px;
    }
    
    @media ${device.laptop} { 
      width: calc(100% - 450px);
    }
`

const RightBox = styled.div`
    width: 480px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    //padding-left: 30px;
    
   ${BoxInput} {
      margin-right: 20px;
    }
    
    @media ${device.laptop} { 
      width: 400px;
    }
`
const Status = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: var(--red);
  
  @media ${device.laptop} { 
      width: 24px;
      height: 24px;
      border-radius: 12px;
  }
`
const ProfileBtn = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  border-radius: 22px;
  box-shadow: var(--shadow-card);
  cursor: pointer;
  
  &:hover {
    background-color: #fafafa;
  }
  
  @media ${device.laptop} { 
      height: 54px;
      min-width: 64px;
      border-radius: 20px;
  }
`
const ProfileAddImg = styled.img`
  
`
const CashStatus = styled.div`
    position: absolute;
    right: -45px;
    top: 48px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    background: #ffffff;
    color: var(--red);
    box-shadow: var(--shadow-card);
`
