import React, {useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux";
import styled, { css } from "styled-components"
import {useDetectDevice} from "lib/customHooks/useDetectDevice"
import {device} from "lib/mediaDevice";
import {useDebounce} from "lib/customHooks/useDebounce";
import {commonActions} from "features/common";
import {userActions, UsersList} from "features/user";
import {NewProduct, productActions, productSelectors} from "features/product";
import {cartActions, cartSelectors, Payment, Check} from "features/cart";
import {Button, Modal, StyledButton} from 'ui'
import { DesktopView } from '../ui/desktop-view'
import { MobileView } from '../ui/mobile-view'


export const Cart = () => {
    const [isShowedMobileCart, setShowedMobileCart] = useState(false)
    const [openedModal, setOpenedModal] = useState(false)
    const [openedModalPayment, setOpenedModalPayment] = useState(false)
    const [openedModalCheck, setOpenedModalCheck] = useState(false)
    const [editable, setEditable] = useState({})
    const [searchU, setSearchU] = useState('')
    const debouncedSearchU = useDebounce(searchU, 300);

    const { currency } = useSelector(state => state.profile)
    const { searchUser, client, showedModalAdd } = useSelector(state => state.user)
    const products = useSelector(state => cartSelectors.getProducts(state))
    const totalInfo = useSelector(state => cartSelectors.getTotalInfo(state))
    const dispatch = useDispatch()
    const currentDevice = useDetectDevice()

    useEffect(() => {
           if(debouncedSearchU) dispatch(userActions.getUsers(debouncedSearchU))
        },[debouncedSearchU]
    );
    const onChangeSearchUsers = (e) => {
        const {value} = e.target
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
    const handleRemoveProduct = (e,id) => {
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
    }

    const handleClickBlur = (e) => {
        console.log('click')
    }

    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    return (
        <CartWrapper
            isShowedMobileCart={isShowedMobileCart && products.length}
        >
            {isDesktopView  &&
                <DesktopView
                    products={products}
                    editable={editable}
                    currency={currency}
                    totalInfo={totalInfo}
                    handleEdit={handleEdit}
                    handleRemoveProduct={handleRemoveProduct}
                    handleAddOne={handleAddOne}
                    handleRemoveOne={handleRemoveOne}
                    handleClearCart={handleClearCart}
                    handleOpenModalPayment={handleOpenModalPayment}
                />
            }
            {isMobileView &&
                <>
                    <MobileView
                        isShowedMobileCart={isShowedMobileCart}
                        setShowedMobileCart={setShowedMobileCart}
                        client={client}
                        searchU={searchU}
                        onChangeSearchUsers={onChangeSearchUsers}
                        products={products}
                        editable={editable}
                        currency={currency}
                        totalInfo={totalInfo}
                        handleEdit={handleEdit}
                        handleRemoveProduct={handleRemoveProduct}
                        handleAddOne={handleAddOne}
                        handleRemoveOne={handleRemoveOne}
                        handleClearCart={handleClearCart}
                        handleOpenModalPayment={handleOpenModalPayment}
                        handleClearClient={handleClearClient}
                    />
                    {searchUser && <UsersList/>}
                    {(searchUser || showedModalAdd) && <Blur onClick={handleClickBlur} />}
                </>
            }


            {openedModal &&
            <Modal
                onClose={handleCloseModal}
                noPadding
            >
                <NewProduct
                    onClose={handleCloseModal}
                    editable={editable}
                />
            </Modal>
            }

            {openedModalPayment &&
            <Modal
                onClose={handleCloseModalPayment}
                noPadding
            >
                <Payment
                    onSuccess={onSuccessPayment}
                    onClose={handleCloseModalPayment}
                />
            </Modal>
            }

            {openedModalCheck &&
            <Modal
                onClose={handleCloseModalPayment}
                noPadding
            >
                <Check
                    onClose={handleCloseModalPayment}
                />
            </Modal>
            }


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
      height: auto;
      z-index: 1002;
      
      ${p => p.isShowedMobileCart && css`
         height: 100vh;
        width: 100vw;
        top: 0;
        left: 0;
        background-color: #ffffff;
        z-index: 1002;
      ` }
     
  }
  
  @media ${device.laptop} { 
      max-width: 400px;
  }
`

const Blur = styled.div`
    width: 100%;
    height: calc(100% - 100px);
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(255,255,255,0.9);
    -webkit-filter: blur(0px);
    filter: blur(0px);
    -o-filter: blur(0px);
    -ms-filter: blur(0px);
    -moz-filter: blur(0px);
    -webkit-filter: blur(0x);
    z-index: 2;
`