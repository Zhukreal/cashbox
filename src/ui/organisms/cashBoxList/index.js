import React from 'react'
import styled, {css} from "styled-components"
import { device } from 'lib/mediaDevice';

export const CashBoxList = ({ list, active, setActive }) => {
    return (
        <CashBox>
            {list.map(item =>
                <CashBoxItem
                    key={item.id}
                    active={item.id === active}
                    onClick={() => setActive(item.id)}
                >
                    {item.name}
                </CashBoxItem>
            )}
        </CashBox>
    )
}

const CashBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-height: 280px;
    margin-bottom: 50px;
    padding: 3px;
    overflow-y: auto;
`

const CashBoxItem = styled.div`
   display: flex;
   align-items: center;
   width: 48%;
   height: 70px;
   font-size: 25px;
   padding: 0 20px;
   margin-bottom: 20px;
   border-radius: 22px;
   box-shadow: var(--shadow-card);
   cursor: pointer;
   
   ${(p) =>
    p.active &&
    css`
        border: 1px solid #d7e5ffb3;
        box-shadow: 0px 3px 6px #4f87de59;
        font-weight: bold;
    `}
   
   @media ${device.laptop} {       
      height: 60px;
      font-size: 22px;
    }
`

