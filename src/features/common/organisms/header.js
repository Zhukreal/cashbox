import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { useDebounce } from 'lib/customHooks/useDebounce'
import { authActions } from 'features/auth'
import { userActions, UsersList, AddUser } from 'features/user'
import { productActions, ShiftStatus } from 'features/product'
import { commonActions } from 'features/common'
import { ProductSections, ProductSorting } from 'features/product'
import { Sidebar } from './sidebar'
import { Container, Input, BoxInput, InputDatepicker } from 'ui'
import logo from 'static/img/logo.png'
import ImgClose from 'static/img/icons/close-gray.png'

export const Header = () => {
  const dispatch = useDispatch()
  const [searchP, setSearchP] = useState('')
  const [searchU, setSearchU] = useState('')
  const debouncedSearchU = useDebounce(searchU, 300)
  const debouncedSearchP = useDebounce(searchP, 300)
  const { searchUser, client } = useSelector((state) => state.user)
  const currentDevice = useDetectDevice()

  const location = useLocation()

  useEffect(() => {
    // console.log('debouncedSearchU', debouncedSearchU)
    if (debouncedSearchU) dispatch(userActions.getUsers(debouncedSearchU))
  }, [debouncedSearchU])

  useEffect(() => {
    dispatch(productActions.setSearch(debouncedSearchP))
  }, [debouncedSearchP])

  const handleLogout = () => {
    dispatch(authActions.logout())
    dispatch(commonActions.showSidebar(false))
  }

  const onChangeSearchUsers = (e) => {
    const { value } = e.target
    setSearchU(value)
  }
  const onChangeSearchProducts = (e) => {
    const { value } = e.target
    setSearchP(value)
  }
  const handleClearClient = () => {
    setSearchU('')
    dispatch(userActions.setClient({}))
  }

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop


  return (
    <HeaderBox>
      <Container>
        {isDesktopView && (
          <HeaderRow>
            <LeftBox>
              <LeftBoxControls>
                <Sidebar handleLogout={handleLogout} />
                <Link to={'/'}>
                  <Logo src={logo} />
                </Link>
                <ShiftStatus />
              </LeftBoxControls>
              <WrapSearch>
                <Input
                  type="search"
                  value={searchP}
                  onChange={onChangeSearchProducts}
                  placeholder="Поиск товара/кода"
                  isSearch
                />
              </WrapSearch>
              <ProductSorting />
              <ProductSections />
            </LeftBox>
            <RightBox>
              {searchUser && <UsersList />}
              {client.id ? (
                <ClientInfo>
                  <ClientName>{client.name}</ClientName>
                  <ClientPhone>{client.phone}</ClientPhone>
                </ClientInfo>
              ) : (
                <Input
                  type="search"
                  value={searchU}
                  onChange={onChangeSearchUsers}
                  placeholder="Введите номер/ФИО клиента"
                  isSearch
                />
              )}
              {client.id ? (
                <ClearClient onClick={handleClearClient}>
                  <img src={ImgClose} alt="" />
                </ClearClient>
              ) : (
                <AddUser />
              )}
            </RightBox>
          </HeaderRow>
        )}

        {isMobileView &&
          <HeaderRowMobile>
              <HeaderRowMobileTop>
                <HML>
                  <Sidebar handleLogout={handleLogout} />
                  <ProductSections />
                </HML>
                <HMR>
                  <ShiftStatus />
                  <Logo src={logo} />
                </HMR>
              </HeaderRowMobileTop>
              <ProductSorting />
              <HeaderRowMobileSearch>
                <Input
                  type="search"
                  value={searchP}
                  onChange={onChangeSearchProducts}
                  placeholder="Поиск товара/кода"
                  isSearch
                />
              </HeaderRowMobileSearch>
          </HeaderRowMobile>
        }
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

  @media ${device.mobileTablet} {
    height: 160px;
  }

  @media ${device.laptop} {
    height: 100px;
  }
`
const InfoBox = styled.div``
const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const HeaderRowMobile = styled.div`
  display: flex;
  min-height: 160px;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`
const HeaderRowMobileTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const HeaderRowMobileSearch = styled.div`
  padding: 0 10%;
`

const LeftBoxControls = styled.div`
  min-width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  @media ${device.laptop} {
    min-width: 250px;
  }
`
const Logo = styled.img`
  width: 144px;

  @media ${device.mobileTablet} {
    width: 67px;
  }
  @media ${device.laptop} {
    width: 124px;
  }
`
const Sorting = styled.div`
  font-size: 16px;
`
const LeftBox = styled.div`
    width: calc(100% - 530px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    // ${BoxInput} {
    //   margin: 0 20px 0 50px;
    //  
    //   @media ${device.laptop} { 
    //       margin-left: 20px;
    //     }
    // }
    
    @media ${device.laptop} { 
      width: calc(100% - 450px);
    }
`
const WrapSearch = styled.div`
  width: 100%;
  position: relative;

  margin: 0 20px 0 50px;
  @media ${device.laptop} {
    margin-left: 20px;
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
const HML = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 200px;
`
const HMR = styled(HML)`
  width: 95px;
`

const ClientInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 68px;
  width: 100%;
  margin-right: 20px;
  padding: 5%;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: var(--shadow-card);

  @media ${device.laptop} {
    height: 54px;
  }
`
const ClientName = styled.div`
  font-size: 18px;

  @media ${device.laptop} {
    font-size: 16px;
  }
`
const ClientPhone = styled.div`
  font-size: 16px;
  width: 150px;

  @media ${device.laptop} {
    font-size: 14px;
    width: 130px;
  }
`

const ClearClient = styled.div`
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
