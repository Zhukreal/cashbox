import React, {useState, useEffect} from "react";
import { Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"

import {emailValidator, passwordValidator} from "lib/validators";
import {useProgressiveImage} from 'lib/customHooks/useProgressiveImage'
import {authActions} from 'features/auth'
import { device } from 'lib/mediaDevice';
import {Button, StyledButton, Input, H2} from "ui";
import bgLogin from 'static/img/bg_login.png'
import preBgLogin from 'static/img/pre_bg_login.png'
import bgLoginMobile from 'static/img/bg_login_mobile.png'
import preBgLoginMobile from 'static/img/pre_bg_login_mobile.png'
import logo from 'static/img/logo.png'


export const LoginPage = () => {
    const dispatch = useDispatch()
    const { isAuth } = useSelector( state => state.profile )
    const { isLoading } = useSelector( state => state.auth )
    const loadedBI = useProgressiveImage(bgLogin)

    const [data, setData] = useState({
        email: '',
        password: ''
    })
    const [errors, setErrors] = useState({})
    const isValidForm = Boolean(data.phone && data.password && !errors.phone && !errors.password)

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

    const handleSubmitForm = e => {
        e.preventDefault()
        if(!isValidForm) {
            validateForm()
            return
        }
        dispatch(authActions.login(data))
    }

    if (isAuth) return <Redirect to={"/"} />;
    return (
        <LoginContainer loaded={loadedBI}>
            <FormBox>
                <Logo src={logo} alt='logo' />
                <H2>Войти в систему:</H2>
                <form onSubmit={handleSubmitForm} >
                    <Input
                        type='tel'
                        label='Введите номер телефона:'
                        name='phone'
                        value={data.phone}
                        onChange={onChange}
                        placeholder='+7(___)___-__-__'
                        error={data.phone && errors.phone}
                        isForm
                    />
                    <Input
                        name='password'
                        type='password'
                        value={data.password}
                        onChange={onChange}
                        placeholder='Пароль'
                        error={data.password && errors.password}
                        isForm
                    />
                    <Button
                        type="submit"
                        isLoading={isLoading}
                        disabled={!isValidForm}
                        isUpperCase
                    >
                        Далее
                    </Button>
                </form>
            </FormBox>
        </LoginContainer>
    )
}


const LoginContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;  
    padding: 5rem;
  
    @media ${device.mobile} { 
      background: url(${ props => props.loaded ? bgLoginMobile : preBgLoginMobile});
      background-size: cover;
      padding: 1rem;
    }
  
  background: url(${ props => props.loaded ? bgLogin : preBgLogin});
  background-size: cover;
`

const FormBox = styled.div`
    width: 50%;
    max-width: 750px;
    display: flex;
    flex-flow: column;
    flex-shrink: 0;
    padding: 5rem 5rem 10rem;
    border-radius: 30px;
    box-sizing: border-box;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.161);
    background-color: #ffffff;
    
    ${H2} {
      margin-bottom: 3rem;
    }
    
    ${StyledButton} {
      padding: 0 15rem;
      font-family: 'GilroyBold', sans-serif;
    }
    
    @media ${device.mobile} { 
      width: 100%;
      padding: 2rem 1rem 3rem;
      
      ${StyledButton} {
          padding: 0 5rem;
      }
    }
`

const Logo = styled.img`
  width: 122px;
  margin: 0 auto 3rem auto;  
`
