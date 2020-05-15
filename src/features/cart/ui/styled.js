import styled, {css} from "styled-components";
import {StyledButton} from "ui";
import {device} from 'lib/mediaDevice/index'




const CartBox = styled.div`
    width: 100%;
    //width: 270px;
    max-width: inherit;
    position: fixed;
    height: calc(100vh - 150px);
    padding-top: 5px;
    
    
    
    
`
const CartRow = styled.div`
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-between;
    height: calc(100vh - 450px);
    padding: 0 5px;
    overflow-y: auto;
`

const Close = styled.div`
    position: absolute;
    display: none;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: 14px;
    top: 10px;
    left: 10px;
    background-color: #B5B5B5;
    cursor: pointer;
    
    ${(p) =>
    p.active &&
    css`
      background-color: #e6e6e6;
    `}
    
`
const CartItemInfoDiscount = styled.div`
    font-size: 15px;
    color: #6D82A3; 
`
const CartCol = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 100%;
  height: 170px;
  margin-bottom: 2em;
  padding: 0 20px;
  border-radius: 30px;
  box-sizing: border-box;
  color: var(--canvas-text);
  background-color: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
  cursor: pointer;
  
  :hover {
    ${Close} {
      display: ${p => p.active ? 'none' : 'flex' };
    }
  }
  
   
   ${(p) =>
    p.active &&
    css`
      background-color: var(--green);
      color: #ffffff;
      
      ${CartItemInfoDiscount} {
          color: #ffffff;
          opacity: 0.7;
      }
    `}
   
   @media ${device.mobileTablet} { 
      height: 120px;
    }
   
`
const CartTotal = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 250px;
    border-radius: 30px;
    padding: 30px;
    background-color: #ffffff;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
`
const CartItemAvatar = styled.img`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    
     @media ${device.mobileTablet} { 
        width: 60px;
        height: 60px;
        border-radius: 30px;
    }
`
const CartItemInfo = styled.div`
    font-size: 18px;
    width: 180px;
    height: 120px;
    display: flex;
    flex-direction: column;
    //align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    
    @media ${device.mobileTablet} { 
        height: 100px;
         width: calc(100% - 140px);
    }
`
const CartItemInfoTitle = styled.div`
    font-size: 22px;
    max-height: 75px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: GilroyBold, sans-serif;
    
    @media ${device.mobileTablet} { 
        font-size: 16px;
    }
`
const CartItemInfoPrice = styled.div`
    font-size: 28px;
    
    @media ${device.mobileTablet} { 
        font-size: 22px;
    }
`
const CartItemCount = styled.div`
    width: 80px;
    min-width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const CartTotalRow = styled.div`
   display: flex;
   justify-content: space-between;
   margin-bottom: 20px;
`
const CartTotalRowTitle = styled.div`
   white-space: nowrap;
   font-size: 20px;
   
   ${(p) =>
    p.bold &&
    css`
      font-family: GilroyBold, sans-serif;
    `}
`
const CartTotalRowDivider = styled.div`
     width: 100%;
    border-bottom: 1px solid #7d7d7d;
    position: relative;
    top: -5px;
    margin: 0 5px;
`
const CartTotalRowValuer = styled.div`
   font-size: 20px;
   
   ${(p) =>
    p.bold &&
    css`
      font-family: GilroyBold, sans-serif;
    `}
`
const CartBtnBox = styled.div`
   display: flex;
   justify-content: space-between;
   
   ${StyledButton} {
    width: 48%;
   }
`
const CartItemCountIcon = styled.div`
   width: 22px;
   height: 22px;
   font-size: 16px;
   line-height: 22px;
   border-radius: 11px;
   
   color: #ffffff;
   background-color: var(--green);
   cursor: pointer;
   
   
   ${(p) =>
    p.active &&
    css`
      background-color: #ffffff;
      color: var(--green);
    `}
`
const CartItemCountIcon2 = styled(CartItemCountIcon)`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--red);
`

const CartItemCountValue = styled.div`
   font-size: 28px;
   margin: 5px 0;
   
   @media ${device.mobileTablet} { 
        font-size: 22px;
    }
`
const Icon = styled.span`
    position: relative;
    left: 6px;
    top: -1px;
`

const IconImg = styled.img`
    
`

export {CartBox, CartRow, Close, CartItemInfoDiscount, CartCol, CartTotal, CartItemAvatar, CartItemInfo,
    CartItemInfoTitle, CartItemInfoPrice, CartItemCount, CartTotalRow, CartTotalRowTitle, CartTotalRowDivider,
    CartTotalRowValuer, CartBtnBox, CartItemCountIcon, CartItemCountIcon2, CartItemCountValue, Icon, IconImg}