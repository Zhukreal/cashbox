import React, {useState} from "react"
import {useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {device} from 'lib/mediaDevice'


export const ShiftStatus = () => {
    const [isHover, setIsHover] = useState(false)
    const { currentShift } = useSelector(state => state.profile)

    let status = '',
        color = ''
    switch(currentShift.ofd_status) {
        case 'ONL':
            status = 'Режим онлайн'
            color = '#25D77E'
            break;
        case 'OFL':
            status = 'Автономный режим'
            color = '#ffff54'
            break;
        case 'BLK':
            color = '#F16F58'
            status = 'Касса заблокирована'
            break;
        case 'SBL':

            break;
    }

    // ONL - работа с ОФД в нормальном режиме(ONLINE),
    // OFL - работа кассы в автономном режиме (OFFLINE),
    // BLK - касса в режиме блокировки(BLOCKED),
    // SBL - касса в режиме серверной блокировки,
    // ITG - нарушение целостности данных.


    const toggleHover = () => {
        setIsHover(prev => !prev)
    }

    return (
        <StatusBox>
            <Status
                onMouseEnter={toggleHover}
                onMouseLeave={toggleHover}
                color={color}
            />
            {isHover && status &&
            <CashStatus color={color}>
                {status}
            </CashStatus>
            }
        </StatusBox>
    )
}

const StatusBox = styled.div`
  position: relative;
`
const Status = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  box-shadow: var(--shadow-card);
  
  ${(p) => p.color && css`
         background-color: ${p.color};
  `}
  
 
  
  @media ${device.mobileTablet} { 
    width: 12px;
    height: 12px;
    border-radius: 6px;
  }
  
  @media ${device.laptop} { 
      width: 24px;
      height: 24px;
      border-radius: 12px;
  }
`

const CashStatus = styled.div`
    position: absolute;
    min-width: 120px;
    text-align: center;
    right: -45px;
    top: 35px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: bold;
    background: #ffffff;
    color: var(--red);
    box-shadow: var(--shadow-card);
    z-index: 3;
    
     ${(p) => p.color && css`
         color: ${p.color};
  `}
     
     @media ${device.mobileTablet} { 
        top: 15px;
      }
`




