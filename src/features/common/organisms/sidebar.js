import React, {useRef} from "react"
import styled, {css} from "styled-components"
import useOnClickOutside from "use-onclickoutside";
import {useDispatch, useSelector} from "react-redux";
import {device, useDetectDevice} from "lib/mediaDevice";
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
import {commonActions} from "../index";
import burger from "../../../static/img/burger.png";
import burgerM from "../../../static/img/icons/burger-m.png";


export const Sidebar = ({ handleLogout }) => {
    const dispatch = useDispatch()
    const ref = useRef(null)
    useOnClickOutside(ref, () => dispatch(commonActions.showSidebar(false)))
    const { isOpenedSidebar } = useSelector(state => state.common)
    const currentDevice = useDetectDevice()
    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    const toggleSidebar = (e) => {
        dispatch(commonActions.toggleSidebar())
    }


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
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon1 : icon1w}/>
                        Закрытие смены (Z отчет)
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon2 : icon2w}/>
                        Текущий отчет (X отчет)
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon3 : icon3w}/>
                        Отмена последней операции
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon4 : icon4w}/>
                        Возврат продажи
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon5 : icon5w}/>
                        Возврат покупки
                    </SidebarItem>
                    <SidebarItem>
                        {isDesktopView &&
                        <>
                            <SidebarItemIcon src={icon6} before6/>
                            <SidebarItemIcon src={icon62} after6/>
                        </>
                        }
                        {isMobileView && <SidebarItemIcon src={icon6w} />}
                        Внесение наличных в смену
                    </SidebarItem>
                    <SidebarItem>
                        {isDesktopView &&
                        <>
                            <SidebarItemIcon src={isDesktopView ? icon72 : icon7w} before7/>
                            <SidebarItemIcon src={icon7} after7/>
                        </>
                        }
                        {isMobileView && <SidebarItemIcon src={icon7w} />}
                        Изъятие наличных из кассы
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon8 : icon8w}/>
                        Информация
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon9 : icon9w}/>
                        Настройки
                    </SidebarItem>
                    <SidebarItem>
                        <SidebarItemIcon src={isDesktopView ? icon10 : icon10w}/>
                        Панель администратора
                    </SidebarItem>
                    <SidebarItem onClick={handleLogout}>
                        <SidebarItemIcon src={isDesktopView ? null : icon11w} />
                        Выход
                    </SidebarItem>
                </div>

            </SidebarBox>
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
    color: var(--canvas-text);
    border-bottom: 1px solid var(--canvas-text);
    
    &:hover {
      cursor: pointer;
      background-color: #f4f8ff;
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



