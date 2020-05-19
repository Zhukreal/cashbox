import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { history } from 'lib/routing'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { ChangePassword } from 'features/profile'
import { Common } from 'features/common'
import { Button, Modal, StyledButton } from 'ui'
import iconGrid from 'static/img/icons/grid.svg'
import iconGridWhite from 'static/img/icons/grid-white.svg'
import iconList from 'static/img/icons/list.svg'
import iconListWhite from 'static/img/icons/list-white.svg'
import iconLock from 'static/img/icons/lock.svg'
import iconGear from 'static/img/icons/gear.png'

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

  const handleChangeInfo = (type) => {
    setInfo({ ...info, [type]: !info[type] })
  }

  const handleChangeWidthCheck = (width) => {
    setWidthCheck(width)
  }

  const handleCloseModal = (width) => {
    setOpenedModalPassword(false)
  }

  return (
    <Common>
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
        <Footer>
          <Button color={'red'} onClick={() => history.push('/')}>
            Отмена
          </Button>
          <Button color={'green'}>Сохранить</Button>
        </Footer>
      </Container>

      {openedModalPassword && (
        <Modal onClose={handleCloseModal} bgLock>
          <ChangePassword onClose={handleCloseModal} />
        </Modal>
      )}

      {(isOpenedSidebar || openedModalPassword) && <Blur />}
    </Common>
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
  padding: 0 80px;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //background: url(${iconGear}) no-repeat;
`
const Box = styled.div`
  display: flex;
  //align-items: center;
  //justify-content: center;
  width: 100%;
`
const Left = styled.div`
  width: 50%;
  text-align: left;
  border-right: 1px dashed #0e254a42;
`
const Right = styled.div`
  width: 45%;
  margin-left: 5%;
  text-align: left;
`
const Title = styled.div`
  font-size: 40px;
  font-weight: bold;
  color: rgba(14, 37, 74, 0.1);
  margin-bottom: 10%;
`
const SubTitle = styled.div`
  font-size: 27px;
  margin-bottom: 4%;
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
`
const Lang = styled.div`
  font-size: 30px;
  margin-right: 10px;
  padding-right: 10px;
  border-right: 1px dashed #0e254a42;
  color: ${(p) => (p.active ? 'var(--green)' : 'rgba(14,37,74,0.31)')};
  cursor: pointer;

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
  
`
const Icon = styled.img`
  height: 24px;
`
const ListVariants = styled.div`
  display: flex;
  margin-bottom: 5%;
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
`
const IconLock = styled.img`
  margin-left: 20px;
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
  background: rgba(255, 255, 255, 0.9);
  filter: blur(0px);
  -o-filter: blur(0px);
  -ms-filter: blur(0px);
  -moz-filter: blur(0px);
  -webkit-filter: blur(0x);
`
