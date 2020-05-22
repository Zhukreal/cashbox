import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { history } from 'lib/routing'
import { device } from 'lib/mediaDevice'
import {VIEWTYPE} from 'lib/CONST'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { ChangePassword } from 'features/profile'
import { ShiftStatus } from 'features/product'
import { Button, Modal, StyledButton, IconArrowLeft, FooterMobile } from "ui";
import iconGrid from 'static/img/icons/grid.svg'
import iconGridWhite from 'static/img/icons/grid-white.svg'
import iconList from 'static/img/icons/list.svg'
import iconListWhite from 'static/img/icons/list-white.svg'
import iconLock from 'static/img/icons/lock.svg'
import iconGear from 'static/img/icons/gear.png'
import logo from 'static/img/logo.svg'
import { commonActions } from "../../features/common";

export const SettingsPage = () => {
  const [activeView, setActiveView] = useState('grid')
  const [widthCheck, setWidthCheck] = useState('57')
  const [info, setInfo] = useState({
    rest: false,
    vendorCode: false,
    image: false,
    code: false,
  })
  const [openedModalPassword, setOpenedModalPassword] = useState(false)
  const dispatch = useDispatch()
  const { isOpenedSidebar, isBlurredAll } = useSelector((state) => state.common)
  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  useEffect(() => {
    setActiveView(localStorage.getItem(VIEWTYPE))
  }, [])

  const handleChangeInfo = (type) => {
    setInfo({ ...info, [type]: !info[type] })
  }

  const handleChangeWidthCheck = (width) => {
    setWidthCheck(width)
  }

  const handleCloseModal = (width) => {
    setOpenedModalPassword(false)
  }

  const handleSave = () => {
    localStorage.setItem(VIEWTYPE, activeView)

    dispatch(commonActions.setTypeViewProduct(activeView))
  }

  return (
    <>
      <CustomHeader>
        {isDesktopView && (
          <CHLeft>
            <Link to={'/'}>
              <Logo src={logo} />
            </Link>
            <ShiftStatus />
          </CHLeft>
        )}

        {isMobileView && (
          <>
            <IconArrowLeft onClick={() => history.push('/')} />
            <TitlePage>Настройки</TitlePage>
          </>
        )}
      </CustomHeader>
      <Container>
        <Box>
          <Left>
            <Title>Настройки интерфейса</Title>
            <SubTitle>Отображение товаров:</SubTitle>
            <ViewBox>
              <ViewItem
                onClick={() => setActiveView('grid')}
                active={activeView === 'grid'}
              >
                <Icon src={activeView === 'grid' ? iconGridWhite : iconGrid} />
                Сетка
              </ViewItem>
              <ViewItem
                onClick={() => setActiveView('list')}
                active={activeView === 'list'}
              >
                <Icon src={activeView === 'list' ? iconListWhite : iconList} />
                Список
              </ViewItem>
            </ViewBox>

            <SubTitle>Отображение информации в карточке товаров:</SubTitle>
            <ListVariants>
              <Variant
                onClick={() => handleChangeInfo('rest')}
                active={info.rest}
              >
                остаток на складе
              </Variant>
              <Variant
                onClick={() => handleChangeInfo('vendorCode')}
                active={info.vendorCode}
              >
                артикул
              </Variant>
            </ListVariants>
            <ListVariants>
              <Variant
                onClick={() => handleChangeInfo('image')}
                active={info.image}
              >
                изображение
              </Variant>
              <Variant
                onClick={() => handleChangeInfo('code')}
                active={info.code}
              >
                штрих-код
              </Variant>
            </ListVariants>
          </Left>
          <Right>
            <Title>Общие настройки</Title>
            <SubTitle>Выбор языка:</SubTitle>
            <LangBox>
              <Lang active>RU</Lang>
              <Lang>KZ</Lang>
            </LangBox>

            <SubTitle>Ширина чека:</SubTitle>
            <ListVariants>
              <Variant
                type={1}
                onClick={() => handleChangeWidthCheck('57')}
                active={widthCheck === '57'}
              >
                57 мм
              </Variant>
              <Variant
                type={1}
                onClick={() => handleChangeWidthCheck('80')}
                active={widthCheck === '80'}
              >
                80 мм
              </Variant>
            </ListVariants>
            <ChangePass onClick={() => setOpenedModalPassword(true)}>
              <TextDecoration> Смена пароля</TextDecoration>
              <IconLock src={iconLock} />
            </ChangePass>
          </Right>
        </Box>

        {isDesktopView && (
          <Footer>
            <Button color={'red'} onClick={() => history.push('/')}>
              Отмена
            </Button>
            <Button color={'green'} onClick={handleSave}>Сохранить</Button>
          </Footer>
        )}

        {isMobileView && (
          <FooterMobile
            title={'Сохранить'}
            onOk={handleSave}
            disabled={null}
            isLoading={null}
          />
        )}


      </Container>

      {openedModalPassword && (
        <Modal onClose={handleCloseModal} bgLock>
          <ChangePassword onClose={handleCloseModal} />
        </Modal>
      )}

      {(isOpenedSidebar || openedModalPassword) && <Blur />}
    </>
  )
}

export const Variant = ({ type, onClick, active, children }) => {
  return (
    <VariantStyled type={type} onClick={onClick}>
      <Check>{active && <ActiveDot />}</Check>
      {children}
    </VariantStyled>
  )
}

const Container = styled.div`
  padding: 120px 5% 5%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background: url(${iconGear}) no-repeat;
  
  @media ${device.mobileTablet} {
    padding-top: 100px;
    padding-bottom: 10%
  }
`
const Box = styled.div`
  display: flex;
  //align-items: center;
  //justify-content: center;
  width: 100%;

  @media ${device.mobileTablet} {
    flex-direction: column;
    height: calc(100vh - 200px);
    overflow-y: auto;
    padding-bottom: 5%;
  }
`
const Left = styled.div`
  width: 50%;
  text-align: left;
  border-right: 1px dashed #0e254a42;

  @media ${device.mobileTablet} {
    width: 100%;
    border-right: none;
  }
`
const Right = styled.div`
  width: 45%;
  margin-left: 5%;
  text-align: left;

  @media ${device.mobileTablet} {
    width: 100%;
    margin-left: 0;
    margin-top: 8%;
  }
`
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: rgba(14, 37, 74, 0.1);
  margin-bottom: 10%;

  @media ${device.mobileTablet} {
    display: none;
  }
`
const SubTitle = styled.div`
  font-size: 27px;
  margin-bottom: 4%;

  @media ${device.mobileTablet} {
    font-size: 18px;
    font-weight: bold;
  }
`
const Footer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  ${StyledButton} {
    width: 200px;
    margin: 0 20px;
  }
`
const LangBox = styled.div`
  display: flex;
  margin-bottom: 15%;

  @media ${device.mobileTablet} {
    margin-bottom: 8%;
  }
`
const Lang = styled.div`
  font-size: 30px;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px dashed #0e254a42;
  color: ${(p) => (p.active ? 'var(--green)' : 'rgba(14,37,74,0.31)')};
  cursor: pointer;

  @media ${device.mobileTablet} {
    font-size: 20px;
  }

  :last-child {
    border-right: none;
  }
`
const ViewBox = styled.div`
  display: flex;
  margin-bottom: 10%;
`
const ViewItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 35px;
  width: 180px;
  height: 55px;
  border-radius: 30px;
  background-color: ${(p) => (p.active ? 'var(--green)' : '#ffffff')};
  color: ${(p) => (p.active ? '#ffffff' : '#B6BDC8')};
  border: 1px solid ${(p) => (p.active ? 'inherit' : '#B6BDC8')}
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
  user-select: none;
  
  @media ${device.mobileTablet} {
   width: 150px;
   height: 40px;
   border-radius: 20px;
   padding: 0 25px
  }
  
`
const Icon = styled.img`
  height: 24px;

  @media ${device.mobileTablet} {
    height: 18px;
  }
`
const ListVariants = styled.div`
  display: flex;
  margin-bottom: 5%;

  @media ${device.mobileTablet} {
    flex-direction: column;
    margin-bottom: 0;
  }
`
const VariantStyled = styled.div`
  width: ${(p) => (p.type ? '150px' : '300px')};
  font-size: 23px;
  font-family: GilroyLight;
  display: flex;
  align-items: center;
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  @media ${device.mobileTablet} {
    width: 100%;
    font-size: 18px;
    margin-bottom: 10px;
    padding-left: 2px;
  }
`
const Check = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  box-shadow: var(--shadow-card);
  margin-right: 15px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`
const ActiveDot = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: var(--green);
`
const ChangePass = styled.div`
  font-size: 30px;
  color: var(--blue);
  display: flex;
  align-items: center;
  margin-top: 10%;
  cursor: pointer;

  @media ${device.mobileTablet} {
    font-size: 18px;
  }
`
const IconLock = styled.img`
  margin-left: 20px;

  @media ${device.mobileTablet} {
    height: 20px;
  }
`
const TextDecoration = styled.span`
  text-decoration: underline;
`
const Blur = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.95);
  filter: blur(0px);
  -o-filter: blur(0px);
  -ms-filter: blur(0px);
  -moz-filter: blur(0px);
  -webkit-filter: blur(0x);
`

const CustomHeader = styled.div`
  display: flex;
  width: 100%;
  padding: 0 5%;
  position: fixed;
  height: 120px;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  color: var(--card-text);
  background-color: var(--card);
  box-shadow: var(--shadow-card);

  @media ${device.laptop} {
    height: 100px;
  }

  @media ${device.mobileTablet} {
    height: 80px;
  }
`

const Logo = styled.img`
  width: 144px;
  margin-right: 20px;

  @media ${device.mobileTablet} {
    width: 67px;
  }
  @media ${device.laptop} {
    width: 124px;
  }
`
const CHLeft = styled.div`
  display: flex;
  align-items: center;
`
const TitlePage = styled.div`
  font-size: 25px;
  font-weight: bold;
`
