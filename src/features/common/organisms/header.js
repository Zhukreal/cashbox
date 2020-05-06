import React, {useState, useEffect, useRef} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, {css} from "styled-components"
import {device} from 'lib/mediaDevice'
import {useDebounce} from 'lib/customHooks/useDebounce'
import {authActions} from 'features/auth'
import {userActions} from 'features/user'
import {productActions} from 'features/product'
import {commonActions} from 'features/common'
import {ProductSections} from 'features/product'
import {UsersList} from 'features/user'
import {Sidebar} from "./sidebar";
import {Container, Input, BoxInput} from "ui";
import logo from 'static/img/logo.png'
import add from 'static/img/add.png'


export const Header = () => {
    const dispatch = useDispatch()
    const [isHover, setIsHover] = useState(false)
    const [searchP, setSearchP] = useState('')
    const [searchU, setSearchU] = useState('')
    const debouncedSearchU = useDebounce(searchU, 300);
    const debouncedSearchP = useDebounce(searchP, 300);
    const { searchUser } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(userActions.getUsers(debouncedSearchU))
        },[debouncedSearchU]
    );

    useEffect(() => {
        dispatch(productActions.setSearch(debouncedSearchP))
    },[debouncedSearchP]);

    const handleLogout = () => {
        dispatch(authActions.logout())
        dispatch(commonActions.showSidebar(false))
    }

    const toggleHover = () => {
        setIsHover(prev => !prev)
    }

    const onChangeSearchUsers = (e) => {
        const {value} = e.target
        setSearchU(value)
    }
    const onChangeSearchProducts = (e) => {
        const {value} = e.target
        setSearchP(value)
    }


    return (
        <HeaderBox>
            <Container>
                <HeaderRow>
                    <LeftBox>
                        <LeftBoxControls>
                            <Sidebar handleLogout={handleLogout} />
                            <Logo src={logo} />
                            <Status onMouseEnter={toggleHover} onMouseLeave={toggleHover} />
                            {isHover && <CashStatus>Касса заблокирована</CashStatus>}
                        </LeftBoxControls>
                        <Input
                            type='search'
                            value={searchP}
                            onChange={onChangeSearchProducts}
                            placeholder='Поиск товара/кода'
                            isSearch
                        />
                        {/*<FilterCategory>Популярные</FilterCategory>*/}
                        <ProductSections />
                    </LeftBox>
                    <RightBox>
                        {searchUser && <UsersList /> }
                        <Input
                            type='search'
                            value={searchU}
                            onChange={onChangeSearchUsers}
                            placeholder='Введите номер/ФИО клиента'
                            isSearch
                        />
                        <ProfileBtn onClick={() => handleLogout()}>
                            <ProfileAddImg src={add} />
                        </ProfileBtn>
                    </RightBox>
                </HeaderRow>


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
