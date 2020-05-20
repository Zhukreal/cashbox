import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import { authActions } from 'features/auth'
import { ChooseCashbox } from 'features/profile'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import {
  Button,
  ButtonIcon,
  StyledButton,
  Input,
  StyledInput,
  StyledInputMask,
  BoxInput,
  CashBoxList,
  Modal,
  Text,
} from 'ui'
import bgLogin from 'static/img/bg-login.png'
import bgLoginLaptop from 'static/img/bg-login-laptop.png'
import bgLoginMobile from 'static/img/bg-login-mobile2.png'
import logo from 'static/img/logo.svg'
import arrowRight from 'static/img/icons/arrow-right-white.svg'

export const LoginPage = () => {
  const dispatch = useDispatch()
  const { isAuth } = useSelector((state) => state.profile)
  const { isLoading, isExpiredSession, isFailureConnection } = useSelector(
    (state) => state.auth,
  )
  const currentDevice = useDetectDevice()

  const [data, setData] = useState({
    phone: '',
    password: '',
    // phone: '1323213213',
    // password: '111111',
  })
  const [error, setError] = useState(null)
  const [errors, setErrors] = useState({})

  const phoneNumbers = data.phone.replace(/\D/g, '')
  const isValidForm = Boolean(
    phoneNumbers.length === 11 &&
      data.password &&
      !errors.phone &&
      !errors.password,
  )

  useEffect(() => {
    // validateForm()
  }, [data])

  // const validateForm = () => {
  // setErrors({...errors,
  //     email: emailValidator(data.email),
  //     password: passwordValidator(data.password),
  // })
  // }

  const onChange = (e) => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
    setError(false)
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    // if(!isValidForm) {
    //     validateForm()
    //     return
    // }
    let obj = {
      username: phoneNumbers.substring(1),
      password: data.password,
      grant_type: 'password',
    }
    try {
      await dispatch(authActions.login(obj))
    } catch (e) {
      setError(true)
    }
  }

  const handleCloseModal = () => {
    dispatch(authActions.setExpiredSession(false))
    dispatch(authActions.setFailureConnection(false))
  }

  console.log('render login')

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop

  if (isExpiredSession || isFailureConnection) {
    return (
      <LoginContainer>
        {isMobileView && (
          <FormBox>
            {isExpiredSession && (
              <Text fz={15} mb={30}>
                Сессия была отключена так как вы бездействовали некоторое время
              </Text>
            )}
            {isFailureConnection && (
              <Text fz={15} mb={30}>
                Сессия была отключена по причине отсутствия связи
              </Text>
            )}
            <EnterMobile>
              <EMText>Возобновить</EMText>
              <ButtonIcon
                onClick={handleCloseModal}
                disabled={!isValidForm || isLoading}
                isLoading={isLoading}
                icon={arrowRight}
              ></ButtonIcon>
            </EnterMobile>
          </FormBox>
        )}
        {isDesktopView && (
          <Modal>
            {isExpiredSession && (
              <Text fz={30} mb={30}>
                Сессия была отключена так как вы бездействовали некоторое время
              </Text>
            )}
            {isFailureConnection && (
              <Text fz={30} mb={30}>
                Сессия была отключена по причине отсутствия связи
              </Text>
            )}
            <div>
              <Button onClick={handleCloseModal} color="green">
                Продолжить сессию
              </Button>
            </div>
          </Modal>
        )}
      </LoginContainer>
    )
  }

  return (
    <LoginContainer>
      {!isAuth && (
        <FormBox>
          <Logo src={logo} alt="logo" />
          <H2>Войти в систему:</H2>
          {error && <Error>Логин или пароль введены неверно</Error>}
          <form onSubmit={handleSubmitForm}>
            <Input
              type="tel"
              label="Введите номер телефона:"
              name="phone"
              value={data.phone}
              onChange={onChange}
              placeholder="+7(___)___-__-__"
              readOnly={isLoading}
              error={data.phone && errors.phone}
              isForm
              isInputMask
              mask="+7 (999) 999-99-99"
              alwaysShowMask
            />
            <Input
              name="password"
              type="password"
              value={data.password}
              onChange={onChange}
              placeholder="Пароль"
              readOnly={isLoading}
              error={data.password && errors.password}
              isForm
            />

            {isMobileView ? (
              <EnterMobile>
                <EMText>Войти в систему</EMText>
                <ButtonIcon
                  disabled={!isValidForm || isLoading}
                  isLoading={isLoading}
                  icon={arrowRight}
                ></ButtonIcon>
              </EnterMobile>
            ) : (
              <Button
                type="submit"
                isLoading={isLoading}
                disabled={!isValidForm}
                isUpperCase
              >
                Войти
              </Button>
            )}
          </form>
        </FormBox>
      )}

      {isAuth && (
        <FormBox>
          <Logo src={logo} alt="logo" />
          <H2 isCashbox>Выбор кассы:</H2>
          <ChooseCashbox />
        </FormBox>
      )}
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
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(14, 37, 74, 0.2);
  }

  @media ${device.mobile}, ${device.tablet} {
    background: url(${bgLoginMobile});
    background-size: cover;
    padding: 0;
    align-items: flex-end;
    height: auto;
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
  min-height: 600px;
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

  @media ${device.mobileTablet} {
    width: 100%;
    height: auto;
    min-height: auto;
    padding: 10% 7%;
    //padding-bottom: 150px;
    border-radius: 50px 50px 0 0;

    ${StyledButton} {
      padding: 0 5rem;
    }
    ${StyledInput}, ${StyledInputMask} {
      border: none;
      margin-bottom: 10px;
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

  @media ${device.mobile}, ${device.tablet} {
    width: 90px;
    margin-bottom: 11%;
  }
`
const H2 = styled.h2`
  font-size: 40px;
  font-family: 'GilroyBold', sans-serif;
  margin-bottom: 7%;
  
    ${(p) =>
      p.isCashbox &&
      css`
        margin-top: 0;
      `}
    
    @media ${device.mobile}, ${device.tablet} {
      display: none;       
      font-size: 30px;
    };
    
    @media ${device.laptop} {       
      font-size: 34px;
    }
`
const Error = styled.div`
  margin: 10px 0;
  font-size: 14px;
  font-weight: bold;
  color: var(--red);
`
const EnterMobile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`
const EMText = styled.div`
  font-family: GilroyBold;
  font-size: 25px;
  color: var(--blue);
`
