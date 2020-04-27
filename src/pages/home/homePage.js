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
    const [search, setSearch] = useState('')
    // const debouncedSearch = useDebounce(search, 1000);


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
  min-height: calc(100vh - 15rem);
  position: relative;
`
const ProductsBox = styled.div`
  width: calc(100% - 300px);
  max-height: calc(100vh - 15rem);
  padding-right: 40px;
`
const CartBox = styled.div`
  width: 300px;
  max-width: 300px;
  height: calc(100vh - 15rem);
  overflow-y: auto;
  position: relative;
  //background-color: #f0faff;
`

