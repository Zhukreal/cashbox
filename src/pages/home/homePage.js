import React from "react";
import { useSelector, useDispatch } from 'react-redux'
import { device } from 'lib/mediaDevice'
import {Common} from 'features/common'
import {ProductList, ProductGroups} from 'features/product'
import {commonActions} from 'features/common'
import {CartList} from 'features/cart'
import styled from "styled-components";

export const HomePage = () => {
    const dispatch = useDispatch()
    const { isOpenedSidebar } = useSelector(state => state.common)
    const { searchUser } = useSelector(state => state.user)
    const isBlurred = isOpenedSidebar || searchUser

    const handleCloseSidebar = () => {
        dispatch(commonActions.showSidebar(false))
    }



    return (
        <Common>
            <FlexBlock>
                <ProductsBox>
                    <ProductList />
                    <ProductGroups />
                </ProductsBox>
                <CartBox>
                    <CartList />
                </CartBox>
                { isBlurred && <Blur onClick={() => handleCloseSidebar()} />}
            </FlexBlock>
        </Common>
    )
}


const FlexBlock = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 120px);
  position: relative;
`
const ProductsBox = styled.div`
  position:relative;
  width: calc(100% - 480px);
  max-width: calc(100% - 480px);
  
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
