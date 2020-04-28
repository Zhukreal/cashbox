import React, {useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"
import {authActions} from 'features/auth'
import {profileActions} from 'features/profile'
import {Sidebar} from "./sidebar";
import {Container, Row, Col, Button, Input, BoxInput} from "ui";
import logo from 'static/img/logo.png'

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
                            <IconSidebar onClick={toggleSidebar} />
                            <Logo src={logo} />
                            <Status />
                        </LeftBoxControls>
                        <Input
                            placeholder='Поиск товара/кода'
                            isSearch
                        />
                        <FilterCategory>Популярные</FilterCategory>
                        <Button size='small' >Секция/Отдел</Button>
                    </LeftBox>
                    <RightBox>
                        <Input
                            placeholder='Введите номер/ФИО клиеента'
                            isSearch
                        />
                        <Button onClick={handleLogout} size='small' >Logout</Button>
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
  height: 7rem;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 -1rem 4rem rgba(36, 37, 38, 0.3);
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
const IconSidebar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 1px solid black;
`
const Logo = styled.img`
  width: 122px;
`
const FilterCategory = styled.div`
  font-size: 16px;
`
const LeftBox = styled.div`
    width: calc(100% - 300px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 40px;
    
    ${BoxInput} {
      width: 300px;
    }
`
const LeftBoxControls = styled.div`
    min-width: 220px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const RightBox = styled.div`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
  
   ${BoxInput} {
      width: 200px;
    }
`
const Status = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--green);
`

