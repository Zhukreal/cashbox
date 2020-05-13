import React, {useState, useRef} from "react"
import styled, {css} from "styled-components"
import useOnClickOutside from "use-onclickoutside";
import {useDispatch, useSelector} from "react-redux";
import {device, useDetectDevice} from "lib/mediaDevice";
import {profileActions, CurrentReport} from "features/profile";
import {commonActions} from "features/common";
import icon1 from 'static/img/icons/s-1.png'
import icon2 from 'static/img/icons/s-2.png'
import icon3 from 'static/img/icons/s-3.png'
import icon4 from 'static/img/icons/s-4.png'
import icon5 from 'static/img/icons/s-5.png'
import icon6 from 'static/img/icons/s-6.png'
import icon62 from 'static/img/icons/s-6-2.png'
import icon7 from 'static/img/icons/s-7.png'
import icon72 from 'static/img/icons/s-7-2.png'
import icon8 from 'static/img/icons/s-8.png'
import icon9 from 'static/img/icons/s-9.png'
import icon10 from 'static/img/icons/s-10.png'
// import icon11 from 'static/img/icons/s-11.png'
import icon1w from 'static/img/icons/icon1-w.png'
import icon2w from 'static/img/icons/icon2-w.png'
import icon3w from 'static/img/icons/icon3-w.png'
import icon4w from 'static/img/icons/icon4-w.png'
import icon5w from 'static/img/icons/icon5-w.png'
import icon6w from 'static/img/icons/icon6-w.png'
import icon7w from 'static/img/icons/icon7-w.png'
import icon8w from 'static/img/icons/icon8-w.png'
import icon9w from 'static/img/icons/icon9-w.png'
import icon10w from 'static/img/icons/icon10-w.png'
import icon11w from 'static/img/icons/icon11-w.png'
import close from 'static/img/icons/close.png'
import burger from "../../../static/img/burger.png";
import burgerM from "../../../static/img/icons/burger-m.png";
import {Modal} from "../../../ui/organisms/modal";
import {Confirm} from "../../../ui/organisms";
import {set} from "browser-cookies";



export const Sidebar = ({ handleLogout }) => {
    const [activeItem, setActiveItem] = useState(0)
    const dispatch = useDispatch()

    const { isOpenedSidebar } = useSelector(state => state.common)
    const { isLoadingCloseShift } = useSelector(state => state.profile)
    const currentDevice = useDetectDevice()
    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    const toggleSidebar = (e) => {
        dispatch(commonActions.toggleSidebar())
    }

    const hideSidebar = () => {
        setActiveItem(0)
        dispatch(commonActions.showSidebar(false))
    }

    const handleCloseShift = async () => {
        try {
            await dispatch(profileActions.closeShift())
            setActiveItem(2)
        } catch (e) {

        }
    }
    const handleCloseLast = async () => {
        try {
            await dispatch(profileActions.closeLastProcedure())
        } catch (e) {

        }
    }


    const handleCloseContent = () => {
        setActiveItem(0)
    }



    const ref = useRef(null)
    useOnClickOutside(ref, hideSidebar)
    return (
        <div ref={isMobileView ? null : ref}>
            <Burger src={burgerM} onClick={toggleSidebar} />
            <IconSidebar onClick={toggleSidebar} >
                <IconBurger src={burger} />
            </IconSidebar>
            {isOpenedSidebar &&
            <SidebarBox >
                {isMobileView &&
                <SidebarItem onClick={toggleSidebar} close >
                    <SidebarItemIcon src={close}/>
                </SidebarItem>
                }
                <div >
                    <SidebarItem
                        onClick={() => setActiveItem(1)}
                        active={activeItem === 1}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon1 : icon1w}/>
                        Закрытие смены (Z отчет)
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(2)}
                        active={activeItem === 2}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon2 : icon2w}/>
                        Текущий отчет (X отчет)
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(3)}
                        active={activeItem === 3}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon3 : icon3w}/>
                        Отмена последней операции
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(4)}
                        active={activeItem === 4}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon4 : icon4w}/>
                        Возврат продажи
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(5)}
                        active={activeItem === 5}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon5 : icon5w}/>
                        Возврат покупки
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(6)}
                        active={activeItem === 6}
                    >
                        {isDesktopView &&
                        <>
                            <SidebarItemIcon src={icon6} before6/>
                            <SidebarItemIcon src={icon62} after6/>
                        </>
                        }
                        {isMobileView && <SidebarItemIcon src={icon6w} />}
                        Внесение наличных в смену
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(7)}
                        active={activeItem === 7}
                    >
                        {isDesktopView &&
                        <>
                            <SidebarItemIcon src={isDesktopView ? icon72 : icon7w} before7/>
                            <SidebarItemIcon src={icon7} after7/>
                        </>
                        }
                        {isMobileView && <SidebarItemIcon src={icon7w} />}
                        Изъятие наличных из кассы
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(8)}
                        active={activeItem === 8}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon8 : icon8w}/>
                        Информация
                    </SidebarItem>

                    <SidebarItem
                        onClick={() => setActiveItem(9)}
                        active={activeItem === 9}
                    >
                        <SidebarItemIcon src={isDesktopView ? icon9 : icon9w}/>
                        Настройки
                    </SidebarItem>

                    <LikA href="https://www.tut.by/" target="_blank">
                        <SidebarItem>
                            <SidebarItemIcon src={isDesktopView ? icon10 : icon10w}/>
                            Панель администратора
                        </SidebarItem>
                    </LikA>

                    <SidebarItem onClick={handleLogout}>
                        <SidebarItemIcon src={isDesktopView ? null : icon11w} />
                        Выход
                    </SidebarItem>
                </div>

            </SidebarBox>
            }

            {!!activeItem &&
            <Modal onClose={hideSidebar}>
                {activeItem === 1 &&
                    <Confirm
                        title={'Вы действительно хотите закрыть смену?'}
                        onOk={handleCloseShift}
                        onCancel={handleCloseContent}
                        isLoading={isLoadingCloseShift}
                    />
                }

                {activeItem === 2 &&
                    <CurrentReport
                        onClose={handleCloseContent}
                    />
                }

                {activeItem === 3 &&
                    <Confirm
                        title={'Вы действительно хотите отменить?'}
                        onOk={handleCloseLast}
                        onCancel={handleCloseContent}
                        isLoading={isLoadingCloseShift}
                    />
                }
            </Modal>
            }


        </div>
    )
}

const IconSidebar = styled.div`
  width: 62px;
  height: 62px;
  border-radius: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--green);
  cursor: pointer;
  
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none;   /* Chrome/Safari/Opera */
  -khtml-user-select: none;    /* Konqueror */
  -moz-user-select: none;      /* Firefox */
  -ms-user-select: none;       /* Internet Explorer/Edge */
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
  @media ${device.laptop}, ${device.desktop}  { 
    display: none;
  }
`


const SidebarItem = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    position: relative;
    align-items: center;
    padding: 0 20px 0 75px;
    font-size: 15px;
    border-bottom: 1px solid var(--canvas-text);
    color: ${p => p.active ? '#ffffff' : 'var(--canvas-text);' };
    background-color: ${p => p.active ? 'var(--green)' : 'inherit' };
    
    &:hover {
      cursor: pointer;
      background-color: ${p => p.active ? 'var(--green)' : 'rgba(37,215,126,0.24)' };
    }
    
    ${(p) => p.close && css`
      margin-bottom: 10px;
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
    position: absolute;
    top: 14px;
    left: 22px;
    
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
    `}
    ${(p) =>
    p.before7 &&
    css`
      top: 20px;
      left: 17px;
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
        background-color: #5087DE;
     }
`

const LikA = styled.a`
  text-decoration: none;
  color: inherit;
  
  ${SidebarItem} {
    border-bottom: 1px solid var(--canvas-text)!important;
  }
`

