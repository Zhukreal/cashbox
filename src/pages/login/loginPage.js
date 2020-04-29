import React, {useState, useEffect, useRef} from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"
import {history} from "lib/routing";
// import {emailValidator, passwordValidator} from "lib/validators";
// import {useProgressiveImage} from 'lib/customHooks/useProgressiveImage'
import {authActions} from 'features/auth'
import { device, useDetectDevice } from 'lib/mediaDevice';
import {Button, StyledButton, Input, CashBoxList, Modal, Text} from "ui"
import bgLogin from 'static/img/bg-login.png'
import bgLoginLaptop from 'static/img/bg-login-laptop.png'
import bgLoginMobile from 'static/img/bg-login-mobile.png'
// import preBgLogin from 'static/img/pre_bg_login.png'
// import preBgLoginMobile from 'static/img/pre_bg_login_mobile.png'
import logo from 'static/img/logo.png'


export const LoginPage = () => {
    const dispatch = useDispatch()
    const { isAuth, cashes } = useSelector( state => state.profile )

    const { isLoading, isExpiredSession } = useSelector( state => state.auth )
    const currentDevice = useDetectDevice()
    // const inputEl = useRef(null);
    // console.log('inputEl', inputEl)
    // const loadedBI = useProgressiveImage(bgLoginMobile)

    const [data, setData] = useState({
        phone: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const [errors, setErrors] = useState({})
    const [typeView, setTypeView] = useState(1) // typeView: 1 - Login form, 2 - cashbox list
    const [activeCashbox, setActiveCashbox] = useState(null)
    const [isLoadingCashboxes, setIsLoadingCashboxes] = useState(true)

    // const numberPattern = /\d+/g;
    // const phoneNumbers = data.phone.match( numberPattern);
    // console.log(phoneNumbers)
    // console.log(phoneNumbers ? phoneNumbers.join([]) : '')

    const phoneNumbers = data.phone.replace(/\D/g, "");
    console.log(phoneNumbers)
    const isValidForm = Boolean(phoneNumbers.length === 11 && data.password && !errors.phone && !errors.password)

    useEffect(() => {
        validateForm()
    }, [data])

    const validateForm = () => {
        // setErrors({...errors,
        //     email: emailValidator(data.email),
        //     password: passwordValidator(data.password),
        // })
    }

    const onChange = e => {
        const {name, value} = e.target
        setData({...data, [name]: value})
    }

    const handleSubmitForm = async e => {
        e.preventDefault()
        if(!isValidForm) {
            validateForm()
            return
        }
        console.log('data', data)
        try {
            await dispatch(authActions.login(data))
            setTypeView(2)
        } catch (e) {
            setError(true)
        }
    }

    const handleChooseCashbox = () => {
        if(!activeCashbox) return
        localStorage.setItem('cashbox', activeCashbox)
        history.push('/')
    }

    const getListCashbox = () => {

    }



    if(isExpiredSession) {
        return (
            <LoginContainer>
                <Modal >
                    <Text fz={30} mb={30} >Сессия была отключена так как вы бездействовали некоторое время</Text>
                    <div>
                        <Button
                            onClick={() => dispatch(authActions.setExpiredSession(false))}
                            color='green'
                        >
                            Продолжить сессию
                        </Button>
                    </div>
                </Modal>
            </LoginContainer>
        )
    }

    return (
        <LoginContainer>
            {!isAuth &&
            <FormBox>
                <Logo src={logo} alt='logo' />
                <H2>Войти в систему:</H2>
                {error && <Error>Логин или пароль введены неверно</Error>}
                <form onSubmit={handleSubmitForm}>
                    <Input
                        type='tel'
                        label='Введите номер телефона:'
                        name='phone'
                        value={data.phone}
                        onChange={onChange}
                        placeholder='+7(___)___-__-__'
                        readOnly={isLoading}
                        error={data.phone && errors.phone}
                        isForm
                        isInputMask
                        mask="+7 (999) 999-99-99"
                        alwaysShowMask
                    />
                    <Input
                        name='password'
                        type='password'
                        value={data.password}
                        onChange={onChange}
                        placeholder='Пароль'
                        readOnly={isLoading}
                        error={data.password && errors.password}
                        isForm
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!isValidForm}
                        isUpperCase
                    >
                        Войти
                    </Button>
                </form>
            </FormBox>
            }

            {isAuth &&
            <FormBox>
                <Logo src={logo} alt='logo' />
                <H2>Выбор кассы:</H2>
                <CashBoxList
                    list={cashes}
                    active={activeCashbox}
                    setActive={setActiveCashbox}
                />
                <div>
                    <Button
                        onClick={handleChooseCashbox}
                        disabled={!activeCashbox}
                        isLoading={false}
                        isUpperCase
                    >
                        Далее
                    </Button>
                </div>

                {/*{isLoadingCashboxes ?*/}
                {/*    <div>Loading...</div>*/}
                {/*    :*/}
                {/*    <>*/}
                {/*        */}
                {/*    </>*/}
                {/*}*/}
            </FormBox>
            }
        </LoginContainer>
    )
}


const LoginContainer = styled.div`
    width: 100%;
    height: 100vh;
    min-height: 100vh;
    display: flex;
    align-items: center;  
    padding: 8%;
    
    &:after {
     position: absolute;
      content: '';
      left:0; top:0;
      width: 100%;
      height: 100%;
      background-color: rgb(14, 37, 74, 0.2);
    }
  
    @media ${device.mobile}, ${device.tablet} { 
      background: url(${bgLoginMobile});
      background-size: cover;
      padding: 1rem;
    }
    @media ${device.laptop} { 
       background: url(${bgLoginLaptop});
       background-size: cover;
       padding: 4%;
    }
    @media ${device.desktop} { 
       background: url(${bgLogin});
       background-size: cover;
    }  
`

const FormBox = styled.div`
    width: 50%;
    max-width: 800px;
    height: 100%;
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    padding: 5% 5% 3% 5%;
    border-radius: 30px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
    background-color: #ffffff;
    z-index: 2;
    
    ${StyledButton} {
      padding: 0 15rem;
      font-family: 'GilroyBold', sans-serif;
      //margin-top: 5%;
    }
    
    @media ${device.mobile}, ${device.tablet} { 
      width: 100%;
      padding: 2rem 1rem 3rem;
      
      ${StyledButton} {
          padding: 0 5rem;
      }
    }
    
    @media ${device.laptop} {       
      ${StyledButton} {
          padding: 0 10rem;
      }
    }
`
const Logo = styled.img`
  width: 122px;
  margin: 0 auto 9% auto;  
`
const H2 = styled.h2`
  font-size: 40px;
  font-family: 'GilroyBold', sans-serif;
  margin-bottom: 7%;
`
const Error = styled.div`
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--red);
`


