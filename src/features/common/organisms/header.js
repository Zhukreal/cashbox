import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"
import {authActions} from 'features/auth'
import {profileActions} from 'features/profile'
import {Sidebar} from "./sidebar";
import {Container, Row, Col, Button, StyledButton, Input, BoxInput} from "ui";
import logo from 'static/img/logo.png'
import burger from 'static/img/burger.png'
import add from 'static/img/add.png'

export const Header = () => {
    const { isOpenedSidebar } = useSelector(state => state.profile)
    const dispatch = useDispatch()


    const toggleSidebar = () => {
        dispatch(profileActions.toggleSidebar())
    }

    const handleLogout = () => {
        dispatch(authActions.logout())
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
                            <Status />
                        </LeftBoxControls>
                        <Input
                            placeholder='Поиск товара/кода'
                            isSearch
                        />
                        {/*<FilterCategory>Популярные</FilterCategory>*/}
                        <Button
                            isHeaderBtn
                        >
                            Секция/Отдел
                        </Button>
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

                { isOpenedSidebar && <Sidebar /> }
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
`
const IconBurger = styled.img`
  
`
const Logo = styled.img`
  width: 144px;
`
const FilterCategory = styled.div`
  font-size: 16px;
`
const LeftBox = styled.div`
    width: calc(100% - 450px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    ${BoxInput} {
      margin: 0 20px;
    }
    ${StyledButton} {
      width: 280px;
      padding: 0 25px;
    }
    
`

const RightBox = styled.div`
    width: 450px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-left: 30px;
    
   ${BoxInput} {
      margin-right: 20px;
    }
`
const Status = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--green);
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
`
const ProfileAddImg = styled.img`
  
`