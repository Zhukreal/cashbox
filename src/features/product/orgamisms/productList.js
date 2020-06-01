import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { device } from 'lib/mediaDevice'
import { useInfiniteScroll } from 'lib/customHooks/useInfinityScroll'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import {
  productActions,
  productSelectors,
  Skeleton,
  NewProduct,
} from 'features/product'
import { cartActions } from 'features/cart'
import { Modal, Confirm } from 'ui'
import plusIcon from 'static/img/icons/plus.svg'
import emptyPhoto from 'static/img/no-photo.png'

export const ProductList = () => {
  const [productConfirm, setProductConfirm] = useState({})
  const [openedModalNewProduct, setOpenedModalNewProduct] = useState(false)
  const dispatch = useDispatch()
  const {
    isLoading,
    skip,
    take,
    hasMore,
    searchFilter,
    activeSorting,
    activeGroup,
  } = useSelector((state) => state.product)
  const { currency } = useSelector((state) => state.profile)
  const { settings } = useSelector((state) => state.common)
  const products = useSelector((state) => productSelectors.getProducts(state))
  const currentDevice = useDetectDevice()
  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop
  const isShownRest = settings.info.rest
  const isShownVendorCode = settings.info.vendorCode
  const isShownImage = settings.info.image
  const isShownCode = settings.info.code

  const fetchMoreListItems = async () => {
    console.log('hasMore', hasMore)
    if (!hasMore) {
      setIsFetching(false)
      return
    }
    setIsFetching(true)
    await dispatch(productActions.getProducts({ isMore: true }))
    setIsFetching(false)
  }
  const [isFetching, setIsFetching] = useInfiniteScroll(fetchMoreListItems)

  const handleAddToCart = (product) => {
    const currentCount = product.currentCount
    if (currentCount === 0) {
      setProductConfirm(product)
    } else {
      dispatch(cartActions.addToCart(product))
    }
  }
  const handleAddToCartAfterConfirm = () => {
    dispatch(cartActions.addToCart(productConfirm))
    setProductConfirm({})
  }

  const handleAddNew = () => {
    dispatch(productActions.setBlur(true))
    setOpenedModalNewProduct(true)
  }

  const handleCloseModal = () => {
    dispatch(productActions.setBlur(false))
    setOpenedModalNewProduct(false)
  }

  // isShownRest
  // isShownVendorCode
  // isShownImage
  // isShownCode

  const ProductsListView = () => {
    if (settings.view === 'list') {
      return (
        <ProductsRow2>
          <ProductCol2 onClick={() => (isMobileView ? handleAddNew() : null)}>
            <ProductLogo2 src={emptyPhoto} />
            <ProductNameNew>Новый товар</ProductNameNew>
            <ProductPrice2>0 {currency}</ProductPrice2>
            {isDesktopView && (
              <AddIcon2 onClick={() => handleAddNew()}>
                <PlusIcon src={plusIcon} />
              </AddIcon2>
            )}
          </ProductCol2>
          {products.map((item, key) => (
            <ProductCol2
              key={`${item.id}-${key}`}
              url={item.image}
              onClick={() => (isMobileView ? handleAddToCart(item) : null)}
            >
              {isShownImage && <ProductLogo2 src={item.image || emptyPhoto} />}
              <WrapInfoList>
                <ProductName2>{item.name}</ProductName2>
                <ProductCode2>
                  {isShownCode && item.barcode && <>Код: {item.barcode}</>}
                </ProductCode2>
                <ProductCode2>
                  {isShownRest && (
                    <>
                      {item.currentCount !== null &&
                        `Остаток: ${item.currentCount} ${item.unit}`
                      }
                    </>
                  )}
                </ProductCode2>
              </WrapInfoList>
              <ProductPrice2>
                {item.price} {currency}
              </ProductPrice2>
              {isDesktopView && (
                <AddIcon2 onClick={() => handleAddToCart(item)}>
                  <PlusIcon src={plusIcon} />
                </AddIcon2>
              )}
            </ProductCol2>
          ))}
          <LoadingMore>
            {hasMore ? isFetching && 'Загружаем еще...' : ''}
          </LoadingMore>
        </ProductsRow2>
      )
    }

    return (
      <ProductsRow>
        <ProductCol>
          <ProductInfo>
            <ProductName>Новый товар</ProductName>
            <ProductPrice>0 {currency}</ProductPrice>
            <AddIcon onClick={() => handleAddNew()}>
              <PlusIcon src={plusIcon} />
            </AddIcon>
          </ProductInfo>
        </ProductCol>
        {products.map((item, key) => (
          <ProductCol key={`${item.id}-${key}`} url={item.image} isShownImage={isShownImage} >
            <ProductInfo>
              <ProductName>{item.name}</ProductName>
              <ProductCode>
                {isShownCode && item.barcode && <>Код: {item.barcode}</>}
              </ProductCode>
              {item.currentCount !== null && (
                <ProductCode>
                  {isShownRest && (
                    <>
                      {item.currentCount !== null &&
                      `Остаток: ${item.currentCount} ${item.unit}`
                      }
                    </>
                  )}
                </ProductCode>
              )}
              <ProductPrice>
                {item.price} {currency}
              </ProductPrice>
              <AddIcon onClick={() => handleAddToCart(item)}>
                <PlusIcon src={plusIcon} />
              </AddIcon>
            </ProductInfo>
          </ProductCol>
        ))}
        <LoadingMore>
          {hasMore ? isFetching && 'Загружаем еще...' : ''}
        </LoadingMore>
      </ProductsRow>
    )
  }

  if (isLoading) return <Skeleton view={settings.view} />
  if (searchFilter && !products.length)
    return <Loading>По вашему запросу ничего не найдено...</Loading>

  return (
    <>
      <ProductsListView />

      {/*<LoadingMore>*/}
      {/*  Загружаем !!!*/}
      {/*</LoadingMore>*/}

      {productConfirm.id && (
        <Modal onClose={() => setProductConfirm({})}>
          <Confirm
            title={'Количество превышает наличие. Продолжить?'}
            onOk={handleAddToCartAfterConfirm}
            onCancel={() => setProductConfirm({})}
          />
        </Modal>
      )}

      {openedModalNewProduct && (
        <Modal onClose={handleCloseModal} noPadding noBorderRadius>
          <NewProduct onClose={handleCloseModal} />
        </Modal>
      )}
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
      background: #e7e9ed url(${p => p.isShownImage ? props.url : null});
      background-size: cover;
    `}
  
  @media ${device.laptop} { 
      height: 300px;
      flex: 0 1 calc(25% - 2em);
      margin: 0.66em;
      background-position: center 40px;
    };
    
    // @media ${device.laptop} { 
    //   flex: 0 1 calc(33.333% - 3em);
    //   height: 380px;
    //   background-position: center 45px;
    // }
  
    @media ${device.mobileTablet} { 
      flex: 0 1 100%;
       height: 320px;
    };
    
    
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

  @media ${device.laptop} {
    height: 150px;
    border-radius: 20px;
    padding: 10px;
  }

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

  @media ${device.laptop} {
    font-size: 20px;
    height: 50px;
  }

  @media ${device.mobileTablet} {
    height: 40px;
    font-size: 20px;
    margin-bottom: 15px;
  }
`
const ProductCode = styled.div`
  font-size: 15px;
  color: #6d82a3;

  @media ${device.laptop} {
    font-size: 13px;
  }

  @media ${device.mobileTablet} {
    font-size: 13px;
  }
`
const ProductPrice = styled.div`
  font-size: 26px;
  position: absolute;
  bottom: 30px;

  @media ${device.laptop} {
    font-size: 20px;
    bottom: 10px;
  }

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
  cursor: pointer;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;

  &:hover {
    cursor: pointer;
    background-color: var(--blue-hover);
  }

  @media ${device.laptop} {
    width: 40px;
    height: 40px;
    font-size: 20px;
    bottom: 15px;
    right: 15px;
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

const ProductsRow2 = styled.div`
  width: calc(100% - 50px);
  padding-bottom: 110px;

  @media ${device.laptop} {
    padding-bottom: 80px;
  }

  @media ${device.mobileTablet} {
    width: 100%;
    padding: 0;
    margin-top: 5px;
  }
`
const ProductCol2 = styled.div`
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 3%;
  border-radius: 30px;
  box-shadow: var(--shadow-card);

  @media ${device.laptop} {
    height: 60px;
    border-radius: 25px;
  }

  @media ${device.mobileTablet} {
    height: 60px;
  }
`
const WrapInfoList = styled.div`
  width: calc(100% - 180px);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${device.laptop} {
    height: 60px;
    width: calc(100% - 80px);
  }

  @media ${device.mobileTablet} {
    width: calc(100% - 100px);
    height: 60px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 20px;
  }
`

const ProductLogo2 = styled.img`
  width: 58px;
  height: 58px;
  border-radius: 29px;

  @media ${device.laptop} {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }

  @media ${device.mobileTablet} {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
`
const ProductName2 = styled(ProductName)`
  margin: 0;
  height: 80px;
  width: calc(100% - 180px);
  padding: 0 20px;
  overflow-y: hidden;
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    font-size: 20px;
    height: 60px;
  }
  @media ${device.mobileTablet} {
    width: 100%;
    height: auto;
    font-size: 15px;
    margin-bottom: 5px;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
`
const ProductCode2 = styled(ProductCode)`
  min-width: 160px;
  text-align: left;

  @media ${device.laptop} {
  }
  @media ${device.mobileTablet} {
    font-size: 9px;
  }
`
const ProductPrice2 = styled(ProductPrice)`
  position: initial;
  bottom: 0;
  min-width: 120px;

  @media ${device.laptop} {
    font-size: 18px;
  }
  @media ${device.mobileTablet} {
    font-size: 16px;
    min-width: 60px;
    position: initial;
  }
`
const AddIcon2 = styled(AddIcon)`
  position: relative;
  right: auto;
  bottom: auto;
  min-width: 58px;
  bottom: auto;

  @media ${device.laptop} {
    min-width: 40px;
    width: 40px;
    height: 40px;
    border-radius: 20px;
    bottom: auto;
  }
`
const ProductNameNew = styled(ProductName2)`
  width: calc(100% - 240px);

  @media ${device.laptop} {
    width: calc(100% - 200px);
  }
  @media ${device.mobileTablet} {
    width: calc(100% - 80px);
    padding-left: 20px;
  }
`
