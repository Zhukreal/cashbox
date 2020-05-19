import React from 'react'
import styled, {css} from "styled-components";
import {device} from "lib/mediaDevice";
import {StyledInput, StyledButton, StyledTextarea} from "ui";

export const Wrapper = styled.div`
  padding: 5%;
  background: #ffffff;
  border-radius: 30px;
  width: ${p => p.isReceipt ? '400px' : '750px'}
  text-align: left;
 
 
  
  @media ${device.mobile} {
      width: 100%;
      height: 100vh;
      overflow-y: auto;
      border-radius: 0;
      padding: 0;
    }
    
    @media ${device.laptop} {
      width: ${p => p.isReceipt ? '400px' : '650px'}
    }
  
`
export const Box = styled.div`
  display: flex;
  justify-content: space-between;
  
  @media ${device.mobile} {
      flex-direction: column;
      //height: 510px;
      margin-top: calc(100vh - 510px);
      height: 510px;
      border-radius: 30px 30px 0 0 ;
      box-shadow: var(--shadow-card);
      padding: 5%;
      justify-content: flex-start;
      
      ${p => p.isView2 && css`
      margin-top: calc(100vh - 550px);
      height: 550px;
    `}
    }
  
`
export const BoxLeft = styled.div`
  width: 47%;
  
  @media ${device.mobile} {
      width: 100%;
      order: 2
    }
  
  ${StyledInput} {
    width: 100%;
    height: 56px;
    font-size: 20px;
    
     @media ${device.laptop} {
        height: 44px;
      }
  }
  
  ${StyledButton} {
    height: 56px;
    margin: 5% auto;
    padding: 0 40px;
    
    @media ${device.laptop} {
        height: 44px;
      }
  }
  
  ${(p) => p.isView2 && css`
        ${StyledInput} { 
          border-bottom: 1px solid var(--canvas-text);
          padding-left: 0;
          padding-top: 10px!important;
          
          @media ${device.laptop} {
              font-size: 18px;
          }
        }
  `}
  
  
`
export const BoxRight = styled.div`
  width: 47%;
  
   @media ${device.mobile} {
      width: 100%;
      margin-bottom: 20px;
    }
  
  ${StyledTextarea} {
      height: 150px;
      margin-top: 5%;
      
      
       @media ${device.mobileTablet} {
          height: 70px;
      }
      
      @media ${device.laptop} {
          height: 133px;
      }
  }
`
export const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10%;
  
  @media ${device.mobile} {
      display: none;
    }
  
  @media ${device.laptop} {
      font-size: 28px;
    }
`
export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10%;
  
   @media ${device.mobile} {
       margin-bottom: 20px;
    }
  
  ${StyledButton} {
    width: 48%;
    height: 46px;
    margin: 0;
    font-size: 18px;
    padding: 0;
  }
  
  ${(p) => p.isView2 && css`
       margin-top: 15%;
       margin-bottom: 0;
  `}
`
export const Type = styled.div`
  height: 50px;
  width: 47%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${p => p.active ? '#ffffff' : 'var(--canvas-text)'};
  background-color: ${p => p.active ? 'var(--green)' : '#ffffff'};
  box-shadow: var(--shadow-card);
  cursor: pointer;
 
  
  :hover {
    
  }
`
export const TextCenter = styled.div`
  text-align: center;
`
export const Subtitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 10px;
  
  @media ${device.mobileTablet} {
     ${(p) => p.isView2 && css`
        display: none;
    `}
  }
  
  @media ${device.laptop} {
     font-size: 17px;
     ${(p) => p.isView2 && css`
        margin-top: 27%;
    `}
  }
    
    ${(p) => p.isView2 && css`
        margin-top: 18%;
        margin-bottom: 15px;
    `}
    
    
    
`
export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -5px;
`
export const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 calc(25% - 10px);
  margin: 5px;
  height: 30px;
  font-size: 20px;
  color: ${p => p.active ? '#ffffff' : 'var(--canvas-text)'};
  background-color: ${p => p.active ? 'var(--green)' : '#ffffff'};
  box-shadow: var(--shadow-card);
  cursor: pointer;
  
  @media ${device.laptop} {
    font-size: 18px;
  }
`
export const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`
export const BlockTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    
    @media ${device.mobile} {
      font-size: 18px;
    }
    
    @media ${device.laptop} {
      font-size: 19px;
    }
  
`
export const BlockValue = styled.div`
    font-size: 28px;
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
    
     @media ${device.mobile} {
      font-size: 20px;
    }
    
    @media ${device.laptop} {
      font-size: 22px;
    }
`
export const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
`
export const TextSub = styled.div`
    font-size: 18px;
    max-width: 170px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: rgba(14,37,74,0.51);
    
     @media ${device.mobile} {
      font-size: 14px;
    }
    
    @media ${device.laptop} {
      font-size: 16px;
    }
`
export const Icon = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  margin-right: 20px;
  background-color: ${p => p.green ? `var(--green)` : `var(--red)`};
   box-shadow: var(--shadow-card);
  cursor: pointer;
  
  ${p => p.isLoading && css`
      opacity: 0.6;
      cursor: progress;
   `}
 
 @media ${device.mobile} {
      height: 40px;
      width: 40px;
      border-radius: 20px;
      
      img {
        width: 20px;
      }
    }
  
  @media ${device.laptop} {
       height: 60px;
      width: 60px;
      border-radius: 30px;
    }
`
export const Loading = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    color: white;
    background: rgba(0,0,0,0.98);
    opacity: 0.3;
    border-radius: 30px;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
     z-index: 2;
`
export const SpinnerBox = styled.span`
    display: inline-block;
    width: 200px;
    height: 200px;
    //background-color: grey;
    position: absolute;
    top: 33%;
    //left: 50%;
    margin-top: -12px;
    margin-left: -12px;
`
export const HMobile = styled.div`
 
  @media ${device.mobile} {
      position: absolute;
      top: 20px;
      left: 5%;
    }
`
export const Spinner = () => <svg className="circular" viewBox="22 22 44 44">
    <circle className="path" fill="none" r="20" cx="44" cy="44" strokeWidth="3"/>
</svg>


