import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { device, useDetectDevice } from 'lib/mediaDevice'
import {Common} from 'features/common'
import {ProductList, ProductGroups} from 'features/product'
import {commonActions} from 'features/common'
import {Cart} from 'features/cart'
import styled from "styled-components";

export const HomePage = () => {
    const dispatch = useDispatch()
    const { isOpenedSidebar, isBlurredAll } = useSelector(state => state.common)
    const { searchUser, showedModalAdd } = useSelector(state => state.user)
    const { isBlurredProducts } = useSelector(state => state.product)
    const isBlurred = isOpenedSidebar || searchUser || showedModalAdd || isBlurredAll
    const isBlurred2 = isBlurredProducts
    const currentDevice = useDetectDevice()

    const handleCloseSidebar = () => {
        dispatch(commonActions.showSidebar(false))
    }

    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    return (
        <Common>
            <FlexBlock>
                <ProductsBox>
                    <ProductList />
                    <ProductGroups />
                </ProductsBox>
                <CartBox>
                    <Cart />
                </CartBox>
                { isBlurred && <Blur onClick={() => handleCloseSidebar()} />}
                { isBlurred2 && <Blur2 />}
            </FlexBlock>
        </Common>
    )
}


const FlexBlock = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 120px);
  position: relative;
  
  @media ${device.mobileTablet} { 
      flex-direction: column;
    }
`
const ProductsBox = styled.div`
  position:relative;
  width: calc(100% - 480px);
  max-width: calc(100% - 480px);
  
  @media ${device.mobileTablet} { 
      width: 100%;
      max-width: 100%;
    }
  
  @media ${device.laptop} { 
      width: calc(100% - 400px);
      max-width: calc(100% - 400px);
    }
`
const CartBox = styled.div`
  width: 100%;
  max-width: 480px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  position: relative;
  //padding-left: 30px;
  //background-color: #f0faff;
  
  @media ${device.mobileTablet} { 
      max-width: 100%;
      display: none;
  }
  
  @media ${device.laptop} { 
      max-width: 400px;
  }
`
const Blur = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    -moz-filter: blur(0px);
    -webkit-filter: blur(0x);
`
const Blur2 = styled(Blur)`
  width: calc(100% - 480px);
  max-width: calc(100% - 480px);
  
  @media ${device.laptop} { 
      width: calc(100% - 400px);
      max-width: calc(100% - 400px);
    }
`