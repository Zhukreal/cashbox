import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'
import { useInfiniteScroll } from 'lib/customHooks/useInfinityScroll'
import {productActions, productSelectors, Skeleton} from "features/product";
import {cartActions} from "features/cart";
import { Modal, Confirm } from "ui"
import plusIcon from 'static/img/icons/plus.png'
import emptyPhoto from 'static/img/no-photo.png'

export const ProductList = () => {
    const [productConfirm, setProductConfirm] = useState({})
    const dispatch = useDispatch()
    const { isLoading, skip, take, hasMore, searchFilter, activeSorting, activeGroup } = useSelector(state => state.product)
    const products  = useSelector(productSelectors.products())
    const { currency } = useSelector(state => state.profile)

    useEffect( () => {
        dispatch(productActions.resetFilters())
        dispatch(productActions.getProducts({}))
    }, [dispatch, searchFilter, activeSorting, activeGroup.id])


    const fetchMoreListItems = async () => {
        console.log('hasMore', hasMore)
        if(!hasMore) {
            setIsFetching(false);
            return
        }
        setIsFetching(true);
        await dispatch(productActions.getProducts({isMore: true}))
        setIsFetching(false);
    }
    const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems);

    const handleAddToCart = (product) => {
        const currentCount = product.currentCount
        console.log(currentCount)
        if(currentCount) {
            dispatch(cartActions.addToCart(product))
        } else {
            setProductConfirm(product)
        }
    }
    const handleAddToCartAfterConfirm = () => {
        dispatch(cartActions.addToCart(productConfirm))
        setProductConfirm({})
    }

    if(isLoading && !products.length) return <Skeleton />
    if(searchFilter && !products.length) return <Loading>По вышему запросу ничего не найдено...</Loading>
    return (
        <>
            <ProductsRow>
                {products.map((item, key) =>
                    <ProductCol
                        key={`${item.id}-${key}`}
                        url={item.image}
                    >
                        <ProductInfo>
                            <ProductName>{item.name}</ProductName>
                            <ProductCode>Код: {item.barcode}</ProductCode>
                            <ProductCode>Остаток: {item.currentCount} {item.unit}</ProductCode>
                            <ProductPrice>{item.base_price} {currency}</ProductPrice>
                            <AddIcon onClick={() => handleAddToCart(item)}>
                                <PlusIcon src={plusIcon} />
                            </AddIcon>
                        </ProductInfo>

                    </ProductCol>
                )}
                <LoadingMore>
                    {hasMore ?
                        isFetching && 'Загружаем еще...'
                        :
                        ''
                    }
                </LoadingMore>
            </ProductsRow>

            {productConfirm.id &&
                <Modal onClose={() => setProductConfirm({})}>
                    <Confirm
                        title={'Количество превышает наличие. Продолжить?'}
                        onOk={handleAddToCartAfterConfirm}
                        onCancel={() => setProductConfirm({})}
                    >

                    </Confirm>
                </Modal>
            }

        </>
    )
}


const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-between;
  width: 100%;
  padding-bottom: 110px;
  //height: calc(100vh - 220px);
  //max-height: calc(100vh - 220px);
  
   @media ${device.mobileTablet} { 
     padding: 0 10%;
  }
  
  @media ${device.laptop} { 
     padding-bottom: 90px;
  }
`
const ProductCol = styled.div`
  display: flex;
  flex: 0 1 calc(25% - 3em);
  margin: 1em;
  position: relative;
  height: 420px;
  //border: 1px solid grey;
  border-radius: 30px;
  box-sizing: border-box;
   background: #E7E9ED url(${emptyPhoto}) center 85px no-repeat;
  
  ${(props) =>
    props.url &&
    css`
      background: #E7E9ED url(${props.url});
      background-size: cover;
  `}
  
    @media ${device.mobileTablet} { 
      flex: 0 1 100%;
       height: 320px;
    }
    
    @media ${device.laptop} { 
      flex: 0 1 calc(33.333% - 3em);
    }
`
const ProductInfo = styled.div`
    position: absolute;
    height: 200px;
    background-color: #ffffff;
    padding: 20px;
    bottom: 2%;
    width: 96%;
    left: 2%;
    border-radius: 30px;
    
    @media ${device.mobileTablet} { 
       height: 150px;
    }
`
const ProductName = styled.div`
    font-size: 26px;
    margin-bottom: 20px;
    height: 60px;
    overflow-y: hidden;
    word-wrap: break-word;
    
    @media ${device.mobileTablet} { 
      height: 40px;
      font-size: 20px;
      margin-bottom: 15px;
    }
`
const ProductCode = styled.div`
  font-size: 15px;
  color: #6D82A3;  
  
  @media ${device.mobileTablet} { 
      font-size: 13px;
    }
`
const ProductPrice = styled.div`
  font-size: 26px;
  position: absolute;
  bottom: 30px;
  
  @media ${device.mobileTablet} { 
      font-size: 20px;
      bottom: 20px;
    }
`
const AddIcon = styled.div`
  width: 56px;
  height: 56px;
  font-size: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 20px;
  right: 20px;
  border-radius: 28px;
  color: #ffffff;
  background-color: var(--blue);
  
  &:hover {
    cursor: pointer;
    background-color: var(--blue-hover);
  }
  
  @media ${device.mobileTablet} { 
      width: 40px;
      height: 40px;
      font-size: 20px;
    }
`
const PlusIcon = styled.img`
    @media ${device.mobileTablet} { 
      width: 16px;
      height: 16px;
    }
`

const LoadingMore = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    font-size: 14px;
    height: 50px;
    padding-top: 10px;
    color: #cacaca;
`
const Loading = styled.div`
    font-size: 15px;
    text-align: center;
    color: grey;
`





