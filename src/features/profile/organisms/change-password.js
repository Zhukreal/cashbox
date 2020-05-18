import React, {useEffect, useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import styled, { css } from "styled-components"
import DatePicker from "react-datepicker"
import { device } from 'lib/mediaDevice'
import {useDetectDevice} from "lib/customHooks/useDetectDevice";
import { emailValidator } from 'lib/validators'
import {Input, StyledInput, Button, StyledButton, InputDatepicker, Select, FooterMobile, IconAddPerson, StyledSelect} from 'ui'



export const ChangePassword = ({onClose}) => {
    const [user, setUser] = useState({
        password: '',
        newPassword: '',
        newPasswordConfirm: ''
    })
    const dispatch = useDispatch()
    const currentDevice = useDetectDevice()
    const isMobileView = currentDevice.isMobile || currentDevice.isTablet
    const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

    useEffect(() => {
        // if(user.email) {
        //     const error = emailValidator(user.email)
        //     setErrorEmail(error)
        // } else {
        //     setErrorEmail(null)
        // }
    }, [])

    const toggleShowed = () => {
        // dispatch(userActions.setShowedAdd(!showedModalAdd))
    }

    const onChange = e => {
        const {name, value} = e.target
        setUser({...user, [name]: value})
    }


    const handleSave = async () => {
        const copy = {...user}
        try {
            // await dispatch(userActions.addNewUser(copy))
            // setUser(initial)
        } catch (e) {
            debugger
        }
    }


    const disabled = !user.password || !user.newPassword || !user.newPasswordConfirm || user.newPassword !== user.newPasswordConfirm

    return (
        <Box>
            <UserContainer>
                <Title>Сменить пароль</Title>
                <BoxInputs>
                    <Input
                        name='password'
                        value={user.password}
                        onChange={onChange}
                        placeholder='Текущий пароль'
                        // isUnderline={isDesktopView}
                        isForm
                    />
                    <Input
                        type={'password'}
                        name='newPassword'
                        value={user.newPassword}
                        onChange={onChange}
                        placeholder='Новый пароль'
                        // isUnderline={isDesktopView}
                        isForm
                    />
                    <Input
                        type={'password'}
                        name='newPasswordConfirm'
                        value={user.newPasswordConfirm}
                        onChange={onChange}
                        placeholder='Повторите пароль'
                        // error={errorEmail && 'Введите корректный e-mail'}
                        // isUnderline={isDesktopView}
                        isForm
                    />
                </BoxInputs>



                {/*{isMobileView &&*/}
                {/*<FooterMobile*/}
                {/*    title={'Добавить'}*/}
                {/*    onOk={handleSave}*/}
                {/*    disabled={disabled}*/}
                {/*    isLoading={isLoadingAddNew}*/}
                {/*/>*/}
                {/*}*/}

                {isDesktopView &&
                <Footer>
                    <Button
                        onClick={onClose}
                        disabled={null}
                        color='red'
                    >
                        Отмена
                    </Button>
                    <Button
                        onClick={handleSave}
                        color='green'
                        disabled={disabled}
                        isLoading={null}
                    >
                        Сменить
                    </Button>
                </Footer>
                }
            </UserContainer>
        </Box>
    )
}


const Box = styled.div`
  width: 550px;
`

const BoxInputs = styled.div`
  width: 90%;
  margin: 0 auto;
  
  ${StyledInput} {
    border-color: rgba(14,37,74,0.3);
  }
  
  @media ${device.mobileTablet} { 
        width: 100%;
    }
`

const UserContainer = styled.div`
   
    
`
const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 8%;
  
  @media ${device.mobileTablet} { 
        font-size: 20px;
    }
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10% auto 0 auto;
 
 ${StyledButton} {
     width: 180px;
     min-width: 180px;
     margin: 0 10px;
  }
`










