import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { device } from 'lib/mediaDevice'
import { useDebounce } from 'lib/customHooks/useDebounce'
import { commonActions } from 'features/common'
import { userActions, UsersList } from 'features/user'
import { NewProduct, productActions, productSelectors } from 'features/product'
import { cartActions, cartSelectors, Payment, Check } from 'features/cart'
import { Button, Modal, StyledButton } from 'ui'
import { DesktopView } from '../ui/desktop-view'
import { MobileView } from '../ui/mobile-view'

export const Cart = () => {
  const [isShowedMobileCart, setShowedMobileCart] = useState(false)
  const [openedModal, setOpenedModal] = useState(false)
  const [openedModalPayment, setOpenedModalPayment] = useState(false)
  const [openedModalCheck, setOpenedModalCheck] = useState(false)
  const [editable, setEditable] = useState({})
  const [searchU, setSearchU] = useState('')
  const debouncedSearchU = useDebounce(searchU, 300)

  const { isOpenedSidebar, settings, mode } = useSelector((state) => state.common)
  const { currency } = useSelector((state) => state.profile)
  const { searchUser, client, showedModalAdd } = useSelector(
    (state) => state.user,
  )
  const products = useSelector((state) => cartSelectors.getProducts(state))
  const totalInfo = useSelector((state) => cartSelectors.getTotalInfo(state))
  const dispatch = useDispatch()
  const currentDevice = useDetectDevice()

  useEffect(() => {
    if(isShowedMobileCart) {
      console.log('hidden')
      document.body.style.overflow = 'hidden';
    } else {
      console.log('unset')
      document.body.style.overflow = 'unset';
    }
  }, [isShowedMobileCart])

  useEffect(() => {
    dispatch(userActions.getUsers(debouncedSearchU))
  }, [debouncedSearchU])
  const onChangeSearchUsers = (e) => {
    const { value } = e.target
    setSearchU(value)
  }

  const handleAddOne = (e, product) => {
    e.stopPropagation()
    dispatch(cartActions.addToCart(product))
  }
  const handleRemoveOne = (e, product) => {
    e.stopPropagation()
    dispatch(cartActions.removeOne(product))
  }
  const handleClearCart = () => {
    setShowedMobileCart(false)
    dispatch(cartActions.clearCart())
  }
  const handleRemoveProduct = (e, id) => {
    e.stopPropagation()
    dispatch(cartActions.removeProduct(id))
  }

  const handleEdit = (product) => {
    setEditable(product)
    dispatch(productActions.setBlur(true))
    setOpenedModal(true)
  }

  const handleCloseModal = () => {
    setEditable({})
    dispatch(productActions.setBlur(false))
    setOpenedModal(false)
  }

  const handleOpenModalPayment = () => {
    dispatch(commonActions.setBlurredAll(true))
    setOpenedModalPayment(true)
  }
  const handleCloseModalPayment = () => {
    dispatch(commonActions.setBlurredAll(false))
    setOpenedModalPayment(false)
    setOpenedModalCheck(false)
  }

  const onSuccessPayment = () => {
    dispatch(cartActions.clearCart())
    setOpenedModalPayment(false)
    setOpenedModalCheck(true)
  }

  const handleClearClient = () => {
    setSearchU('')
    dispatch(userActions.setClient({}))
    dispatch(userActions.setSearch(''))
  }

  const handleClickBlur = (e) => {
    dispatch(userActions.setShowedAdd(false))
  }

  const handleCloseMobileCart = () => {
    setShowedMobileCart(false)
    dispatch(userActions.setShowedAdd(false))
  }

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  // console.log('isShowedMobileCart', isShowedMobileCart)
  // console.log('products.length', products.length)

  const isShowedMobileCartCondition = isShowedMobileCart && products.length || isShowedMobileCart && openedModalCheck

  return (
    <CartWrapper isShowedMobileCart={isShowedMobileCartCondition}>
      {isDesktopView && (
        <DesktopView
          products={products}
          editable={editable}
          currency={currency}
          totalInfo={totalInfo}
          mode={mode}
          handleEdit={handleEdit}
          handleRemoveProduct={handleRemoveProduct}
          handleAddOne={handleAddOne}
          handleRemoveOne={handleRemoveOne}
          handleClearCart={handleClearCart}
          handleOpenModalPayment={handleOpenModalPayment}
        />
      )}
      {(!isOpenedSidebar && isMobileView ) && (
        <>
          <MobileView
            isShowedMobileCart={isShowedMobileCart}
            setShowedMobileCart={setShowedMobileCart}
            handleCloseMobileCart={handleCloseMobileCart}
            client={client}
            searchU={searchU}
            onChangeSearchUsers={onChangeSearchUsers}
            products={products}
            editable={editable}
            currency={currency}
            totalInfo={totalInfo}
            mode={mode}
            handleEdit={handleEdit}
            handleRemoveProduct={handleRemoveProduct}
            handleAddOne={handleAddOne}
            handleRemoveOne={handleRemoveOne}
            handleClearCart={handleClearCart}
            handleOpenModalPayment={handleOpenModalPayment}
            handleClearClient={handleClearClient}
          />
          {searchUser && <UsersList />}
          {(searchUser) && <Blur onClick={handleClickBlur} />}
          {(showedModalAdd) && <Blur2 onClick={handleClickBlur} />}
        </>
      )}

      {openedModal && (
        <Modal onClose={handleCloseModal} noPadding>
          <NewProduct onClose={handleCloseModal} editable={editable} />
        </Modal>
      )}

      {openedModalPayment && (
        <Modal onClose={handleCloseModalPayment} noPadding>
          <Payment
            onSuccess={onSuccessPayment}
            onClose={handleCloseModalPayment}
          />
        </Modal>
      )}

      {openedModalCheck && (
        <Modal onClose={handleCloseModalPayment} noPadding>
          <Check onClose={handleCloseModalPayment} />
        </Modal>
      )}
    </CartWrapper>
  )
}

const CartWrapper = styled.div`
  width: 100%;
  max-width: 480px;
  height: calc(100vh - 120px);
  overflow-y: auto;
  position: relative;
  //padding-left: 30px;
  //background-color: #f0faff;

  @media ${device.mobileTablet} {
    position: fixed;
    width: 100%;
    height: 70px;
    bottom: 13px;
    z-index: 5;

    ${(p) =>
      p.isShowedMobileCart &&
      css`
        height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #ffffff;
        z-index: 1002;
      `}
  }

  @media ${device.laptop} {
    max-width: 400px;
  }
`

const Blur = styled.div`
  width: 100%;
  height: calc(100% - 160px);
  position: absolute;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  -webkit-filter: blur(0px);
  filter: blur(0px);
  -o-filter: blur(0px);
  -ms-filter: blur(0px);
  -moz-filter: blur(0px);
  -webkit-filter: blur(0x);
  z-index: 2;
`
const Blur2 = styled(Blur)`
height: calc(100% - 80px);
`
