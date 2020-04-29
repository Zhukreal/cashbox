import React from "react"
import styled, {css} from "styled-components"
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

export const Sidebar = () => {

    return (
        <SidebarBox>
            <SidebarItem>
                <SidebarItemIcon src={icon1} />
                Закрытие смены (Z отчет)
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon2} />
                Текущий отчет (X отчет)
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon3} />
                Отмена последней операции
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon4} />
                Возврат продажи
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon5} />
                Возврат покупки
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon6} before6 />
                <SidebarItemIcon src={icon62} after6 />
                Внесение наличных в смену
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon72} before7 />
                <SidebarItemIcon src={icon7} after7 />
                Изъятие наличных из кассы
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon8} />
                Информация
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon9} />
                Настройки
            </SidebarItem>
            <SidebarItem>
                <SidebarItemIcon src={icon10} />
                Панель администратора
            </SidebarItem>
        </SidebarBox>
    )
}

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
    top: 120px;
    background-color: white;
    border: 1px solid #e2e2e2;
    box-shadow: var(--shadow-card);
    
    ${SidebarItem}:last-child {
      border-bottom: none;
    }
`


