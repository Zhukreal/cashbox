import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from 'react-redux'
import {useDebounce} from 'lib/customHooks/useDebounce'
import {useIdle} from 'lib/customHooks/useIdle'

import {Common} from 'features/common'
import {productActions, ProductList} from 'features/product'
import {CartList} from 'features/cart'
import styled from "styled-components";

export const HomePage = () => {
    const dispatch = useDispatch()
    const { products, filteredProducts, skip, take, isLoading, hasMore, isFirstRequest } = useSelector(state => state.product)
    const { isOpenedSidebar } = useSelector(state => state.profile)
    const [search, setSearch] = useState('')
    // const debouncedSearch = useDebounce(search, 1000);

    const test = 'test'
    console.log('test', test)
    const [someHook, setSome] = useState(test)
    console.log('someHook', someHook)


    useEffect(() => {
        getProducts()
    }, [])

    // useEffect(() => {
    //     if(debouncedSearch) dispatch(offersActions.getOffersByFilter(debouncedSearch))
    //     },[debouncedSearch]
    // );

    const getProducts = () => {
        dispatch(productActions.getProducts(skip, take))
    }

    return (
        <Common>
            <FlexBlock>
                <ProductsBox>
                    <ProductList
                        list={search ? filteredProducts : products}
                        isLoading={isLoading}
                        showMore={() => getProducts()}
                        hasMore={search ? false : hasMore}
                        isFirstRequest={isFirstRequest}
                    />
                    { isOpenedSidebar && <Blur /> }
                </ProductsBox>
                <CartBox>
                    <CartList
                        list={products}
                    />
                </CartBox>
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
  width: calc(100% - 450px);
`
const CartBox = styled.div`
  width: 450px;
  max-width: 450px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  position: relative;
  padding-left: 30px;
  //background-color: #f0faff;
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
