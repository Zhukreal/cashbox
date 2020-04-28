import * as React from "react"
import styled from "styled-components"


export const Sidebar = () => {

    return (
        <SidebarBox>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
            <SidebarItem>item</SidebarItem>
        </SidebarBox>
    )
}

const SidebarItem = styled.div`
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    padding: 0 20px;
    border-bottom: 1px solid black;
`

const SidebarBox = styled.div`
    width: 250px;
    position: absolute;
    top: 8rem;
    background-color: white;
    box-shadow: var(--shadow-card);
    
    ${SidebarItem}:last-child {
      border-bottom: none;
    }
    
`


