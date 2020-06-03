import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'
import useOnClickOutside from 'use-onclickoutside'
import { useDispatch, useSelector } from 'react-redux'
import { device } from 'lib/mediaDevice'
import { history } from 'lib/routing'
import { showNotification } from 'lib/notification'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import {
  profileActions,
  CurrentReport,
  CashKassa,
  InfoKassa,
} from 'features/profile'
import { commonActions, commonReducer } from 'features/common'
import { cartReducer } from 'features/cart'
import { Modal, Confirm, IconArrowLeft } from 'ui'
import icon1 from 'static/img/icons/icon1.svg'
import icon2 from 'static/img/icons/icon2.svg'
import icon3 from 'static/img/icons/icon3.svg'
import icon4 from 'static/img/icons/icon4.svg'
import icon5 from 'static/img/icons/icon5.svg'
import icon6 from 'static/img/icons/icon6.svg'
import icon62 from 'static/img/icons/icon6-2.svg'
import icon7 from 'static/img/icons/icon7.svg'
import icon72 from 'static/img/icons/icon7-2.svg'
import icon8 from 'static/img/icons/icon8.svg'
import icon9 from 'static/img/icons/icon9.svg'
import icon10 from 'static/img/icons/icon10.svg'
import icon11 from 'static/img/icons/icon11.svg'
import icon1w from 'static/img/icons/icon1-w.svg'
import icon2w from 'static/img/icons/icon2-w.svg'
import icon3w from 'static/img/icons/icon3-w.svg'
import icon4w from 'static/img/icons/icon4-w.svg'
import icon5w from 'static/img/icons/icon5-w.svg'
import icon6w from 'static/img/icons/icon6-w.svg'
import icon7w from 'static/img/icons/icon7-w.svg'
import icon8w from 'static/img/icons/icon8-w.svg'
import icon9w from 'static/img/icons/icon9-w.svg'
import icon10w from 'static/img/icons/icon10-w.svg'
import icon11w from 'static/img/icons/icon11-w.svg'
import close from 'static/img/icons/close.png'
import burger from 'static/img/icons/burger-desktop.svg'
import burgerM from 'static/img/icons/burger-mobile.svg'
import bgMobile from 'static/img/bg-login-mobile.png'

export const Sidebar = ({ handleLogout }) => {
  const [activeItem, setActiveItem] = useState(0)
  const dispatch = useDispatch()

  const { isOpenedSidebar, settings, mode } = useSelector(
    (state) => state.common,
  )
  const { isLoadingCloseShift, currentShift } = useSelector(
    (state) => state.profile,
  )
  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop
  const isShowedModal =
    Boolean(activeItem) && activeItem !== 4 && activeItem !== 5

  useEffect(() => {
    if(isOpenedSidebar) {
      console.log('hidden')
      document.body.style.overflow = 'hidden';
    } else {
      if(!isShowedModal) {
        console.log('unset')
        document.body.style.overflow = 'unset';
      }
    }
  }, [isOpenedSidebar])

  useEffect(() => {
    if(isShowedModal) {
      console.log('hidden 2')
      document.body.style.overflow = 'hidden';
    } else {
      console.log('unset 2')
      document.body.style.overflow = 'unset';
    }
  }, [isShowedModal])


  useEffect(() => {
    if (isMobileView) dispatch(commonActions.showSidebar(false))
  }, [activeItem])

  const toggleSidebar = (e) => {
    dispatch(commonActions.toggleSidebar())
  }

  const hideSidebar = () => {
    setActiveItem(0)
    if (isOpenedSidebar) dispatch(commonActions.showSidebar(false))
  }

  const handleCloseShift = async () => {
    try {
      await dispatch(profileActions.closeShift())
      setActiveItem(2)
    } catch (e) {}
  }
  const handleCloseLast = async () => {
    try {
      await dispatch(profileActions.closeLastProcedure())
      // handleCloseContent()
      hideSidebar()
    } catch (e) {}
  }

  const handleSwitchMode = async (mode) => {
    dispatch(commonReducer.setMode(mode))
    dispatch(cartReducer.clearCart())
    switch (mode) {
      case 'sale':
        showNotification('info', 'Продажа')
        break
      case 'return_sale':
        showNotification('info', 'Возврат продажи')
        break
      case 'purchase':
        showNotification('info', 'Покупка')
        break
      case 'return_purchase':
        showNotification('info', 'Возврат покупки')
        break
      default:
    }
    hideSidebar()
  }

  const handleSetActiveWithCheckCash = (type) => {
    if (!currentShift.id) {
      showNotification('error', 'Нет информации о кассе')
    } else {
      setActiveItem(type)
    }
  }

  const handleCloseContent = () => {
    setActiveItem(0)
  }

  const goToSettings = () => {
    hideSidebar()
    history.push('/settings')
  }



  const ref = useRef(null)
  useOnClickOutside(ref, hideSidebar)
  return (
    <div ref={isMobileView ? null : ref}>
      <Burger src={burgerM} onClick={toggleSidebar} />
      <IconSidebar onClick={toggleSidebar}>
        <IconBurger src={burger} />
      </IconSidebar>

      {isOpenedSidebar && (
        <SidebarBox>
          {isMobileView && (
            <SidebarItem onClick={toggleSidebar} close>
              <IconWrap>
                <SidebarItemIcon src={close} />
              </IconWrap>
            </SidebarItem>
          )}
          <div>
            <SidebarItem
              onClick={() => setActiveItem(1)}
              active={activeItem === 1}
            >
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon1 : icon1w} />
              </IconWrap>
              Закрытие смены (Z отчет)
            </SidebarItem>

            <SidebarItem
              onClick={() => setActiveItem(2)}
              active={activeItem === 2}
            >
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon2 : icon2w} />
              </IconWrap>
              Текущий отчет (X отчет)
            </SidebarItem>

            <SidebarItem
              onClick={() => setActiveItem(3)}
              active={activeItem === 3}
            >
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon3 : icon3w} />
              </IconWrap>
              Отмена последней операции
            </SidebarItem>

            <SidebarItem
              onClick={() => handleSwitchMode('sale')}
              active={mode === 'sale'}
            >
              <IconWrap>
                {/*<SidebarItemIcon src={isDesktopView ? icon4 : icon4w} />*/}
              </IconWrap>
              Продажа
            </SidebarItem>

            <SidebarItem
              onClick={() => handleSwitchMode('return_sale')}
              active={mode === 'return_sale'}
            >
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon4 : icon4w} />
              </IconWrap>
              Возврат продажи
            </SidebarItem>

            {settings.purchaseEnabled && (
              <>
                <SidebarItem
                  onClick={() => handleSwitchMode('purchase')}
                  active={mode === 'purchase'}
                >
                  <IconWrap>
                    {/*<SidebarItemIcon src={isDesktopView ? icon4 : icon4w} />*/}
                  </IconWrap>
                  Покупка
                </SidebarItem>

                <SidebarItem
                  onClick={() => handleSwitchMode('return_purchase')}
                  active={mode === 'return_purchase'}
                >
                  <IconWrap>
                    <SidebarItemIcon src={isDesktopView ? icon5 : icon5w} />
                  </IconWrap>
                  Возврат покупки
                </SidebarItem>
              </>
            )}

            <SidebarItem
              onClick={() => handleSetActiveWithCheckCash(6)}
              active={activeItem === 6}
            >
              {isDesktopView && (
                <IconWrap>
                  <SidebarItemIcon src={icon6} before6 />
                  <SidebarItemIcon src={icon62} after6 />
                </IconWrap>
              )}
              {isMobileView && (
                <IconWrap>
                  <SidebarItemIcon src={icon6w} />
                </IconWrap>
              )}
              Внесение наличных в смену
            </SidebarItem>

            <SidebarItem
              onClick={() => handleSetActiveWithCheckCash(7)}
              active={activeItem === 7}
            >
              {isDesktopView && (
                <IconWrap>
                  <SidebarItemIcon
                    src={isDesktopView ? icon72 : icon7w}
                    before7
                  />
                  <SidebarItemIcon src={icon7} after7 />
                </IconWrap>
              )}
              {isMobileView && (
                <IconWrap>
                  <SidebarItemIcon src={icon7w} />
                </IconWrap>
              )}
              Изъятие наличных из кассы
            </SidebarItem>

            <SidebarItem
              onClick={() => handleSetActiveWithCheckCash(8)}
              active={activeItem === 8}
            >
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon8 : icon8w} />
              </IconWrap>
              Информация
            </SidebarItem>

            <SidebarItem onClick={goToSettings}>
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon9 : icon9w} />
              </IconWrap>
              Настройки
            </SidebarItem>

            <SidebarItem isForLink>
              <LikA href="https://www.tut.by/" target="_blank">
                <IconWrap>
                  <SidebarItemIcon src={isDesktopView ? icon10 : icon10w} />
                </IconWrap>
                Панель администратора
              </LikA>
            </SidebarItem>

            <SidebarItem onClick={handleLogout}>
              <IconWrap>
                <SidebarItemIcon src={isDesktopView ? icon11 : icon11w} />
              </IconWrap>
              Выход
            </SidebarItem>
          </div>
        </SidebarBox>
      )}

      {isMobileView && isShowedModal && (
        <Background>
          <IconArrowLeft onClick={handleCloseContent} />
        </Background>
      )}

      {isShowedModal && (
        <Modal onClose={null}>
          {activeItem === 1 && (
            <Confirm
              title={'Вы действительно хотите закрыть смену?'}
              onOk={handleCloseShift}
              onCancel={handleCloseContent}
              isLoading={isLoadingCloseShift}
            />
          )}

          {activeItem === 2 && <CurrentReport onClose={handleCloseContent} />}

          {activeItem === 3 && (
            <Confirm
              title={'Вы действительно хотите отменить?'}
              onOk={handleCloseLast}
              onCancel={handleCloseContent}
              isLoading={isLoadingCloseShift}
            />
          )}

          {activeItem === 6 && (
            <CashKassa
              type={1}
              title={'Наличных в кассе:'}
              cancelText={'Отмена'}
              okText={'Внести'}
              onCancel={handleCloseContent}
              onSuccess={hideSidebar}
            />
          )}

          {activeItem === 7 && (
            <CashKassa
              type={2}
              title={'Наличных в кассе:'}
              cancelText={'Отмена'}
              okText={'Изъять'}
              onCancel={handleCloseContent}
              onSuccess={hideSidebar}
            />
          )}

          {activeItem === 8 && (
            <InfoKassa
              type={2}
              title={'Наличных в кассе:'}
              cancelText={'Отмена'}
              okText={'Изъять'}
              onCancel={handleCloseContent}
              onSuccess={hideSidebar}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 50px;
`
const IconSidebar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  box-shadow: var(--shadow-card);
  cursor: pointer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  @media ${device.mobileTablet} {
    display: none;
  }

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
const Burger = styled.img`
  @media ${device.laptop}, ${device.desktop} {
    display: none;
  }
`

const SidebarItem = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 20px 0 0px;
    font-size: 15px;
    border-bottom: 1px solid var(--canvas-text);
    color: ${(p) => (p.active ? '#ffffff' : 'var(--canvas-text);')};
    background-color: ${(p) => (p.active ? 'var(--green)' : 'inherit')};
    
    &:hover {
      cursor: pointer;
      background-color: ${(p) =>
        p.active ? 'var(--green)' : 'rgba(37,215,126,0.24)'};
    }
    
    ${(p) =>
      p.close &&
      css`
        margin-bottom: 10px;
      `}
    
    ${(p) =>
      p.isForLink &&
      css`
        padding-left: 0;
      `}
    
    
    
    @media ${device.mobileTablet} { 
        color: white;
        border-bottom: none;
        
         &:hover {
          cursor: pointer;
          background-color: inherit;
        }
     }
`

const SidebarItemIcon = styled.img`
    //position: relative;
    //top: 14px;
    //left: 22px;
    height: 20px;
    
    ${(p) =>
      p.before6 &&
      css`
        left: 18px;
      `}
    
    ${(p) =>
      p.after6 &&
      css`
        top: 20px;
        left: 40px;
        height: auto;
      `}
    ${(p) =>
      p.before7 &&
      css`
        top: 20px;
        left: 17px;
        height: auto;
      `}
    
    ${(p) =>
      p.after7 &&
      css`
        left: 29px;
      `}
`

const SidebarBox = styled.div`
  width: 380px;
  position: absolute;
  top: 100px;
  max-height: calc(100vh - 150px);
  overflow-y: auto;
  background-color: white;
  border: 1px solid #e2e2e2;
  box-shadow: var(--shadow-card);
  z-index: 10;

  ${SidebarItem}:last-child {
    border-bottom: none;
  }

  @media ${device.mobileTablet} {
    width: 100%;
    left: 0;
    top: 0;
    height: 100vh;
    max-height: 100vh;
    background-color: #5087de;
    z-index: 1011;
  }
`

const LikA = styled.a`
  text-decoration: none;
  color: inherit;
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  //padding-left: 75px;
  padding-right: 0px;
`

const Background = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 5;
  background: #ffffff url(${bgMobile});
  background-size: cover;
  padding: 5%;

  // ${IconArrowLeft} {
  //   position: relative;
  //   top: 5%;
  //   left: 5%;
  // };
  
`
