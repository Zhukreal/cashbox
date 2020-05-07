import React from 'react'
import styled, {css} from "styled-components"
import { device } from 'lib/mediaDevice';

export const CashBoxList = ({ list, active, setActive }) => {
    return (
        <CashBox>
            {list.map(item =>
                <CashBoxItem
                    key={item.id}
                    active={item.store_id === active}
                    onClick={() => setActive(item.store_id)}
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
    
    @media ${device.mobile} {       
      flex-direction: row;
      margin-bottom: 30px;
      max-height: 310px;
    }
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
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
   
   ${(p) =>
    p.active &&
    css`
        border: 1px solid var(--blue);
        //box-shadow: 0px 3px 6px #4f87de59;
        color: var(--blue);
    `}
   
   @media ${device.mobile} {       
      width: 100%;
      height: 40px;
      font-size: 17px;
      justify-content: center;
    }
    
   @media ${device.laptop} {       
      height: 60px;
      font-size: 22px;
   }
`

