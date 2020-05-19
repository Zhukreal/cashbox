import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useOnClickOutside from 'use-onclickoutside'
import styled, { css } from 'styled-components'
import DatePicker from 'react-datepicker'
import { device } from 'lib/mediaDevice'
import { useDetectDevice } from 'lib/customHooks/useDetectDevice'
import { emailValidator } from 'lib/validators'
import {
  Input,
  StyledInput,
  Button,
  StyledButton,
  InputDatepicker,
  Select,
  FooterMobile,
  IconAddPerson,
  StyledSelect,
} from 'ui'
import add from 'static/img/icons/add-person.svg'
import { userActions } from '../index'
import 'react-datepicker/dist/react-datepicker.css'

const initial = {
  name: '',
  phone: '',
  email: '',
  gender: '',
  birth_date: '',
}

export const AddUser = () => {
  const [user, setUser] = useState(initial)
  const genders = [
    { value: 'MALE', label: 'М' },
    { value: 'FEMALE', label: 'Ж' },
  ]
  const [errorEmail, setErrorEmail] = useState(null)
  const { showedModalAdd, isLoadingAddNew } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const ref = useRef(null)
  useOnClickOutside(ref, () => dispatch(userActions.setShowedAdd(false)))
  const currentDevice = useDetectDevice()

  useEffect(() => {
    if (user.email) {
      const error = emailValidator(user.email)
      setErrorEmail(error)
    } else {
      setErrorEmail(null)
    }
  }, [user.email])

  const toggleShowed = () => {
    dispatch(userActions.setShowedAdd(!showedModalAdd))
  }

  const onChange = (e) => {
    const { name, value } = e.target

    setUser({ ...user, [name]: value })
  }
  const onChangeBd = (value) => {
    setUser({ ...user, birth_date: value })
  }

  const handleSave = async () => {
    const copy = { ...user }
    try {
      await dispatch(userActions.addNewUser(copy))
      // setUser(initial)
    } catch (e) {
      debugger
    }
  }

  const isMobileView = currentDevice.isMobile || currentDevice.isTablet
  const isDesktopView = currentDevice.isLaptop || currentDevice.isDesktop
  const disabled = !user.name || !user.phone || errorEmail

  return (
    <Box ref={ref}>
      {isMobileView && <IconAddPerson onClick={toggleShowed} />}
      {isDesktopView && (
        <ProfileBtn onClick={toggleShowed}>
          <ProfileAddImg src={add} />
        </ProfileBtn>
      )}

      {showedModalAdd && (
        <UserContainer>
          <Title>Добавить клиента</Title>
          <BoxInputs>
            <Input
              name="name"
              value={user.name}
              onChange={onChange}
              placeholder="ФИО"
              isUnderline={isDesktopView}
              isForm={isMobileView}
            />
            <Input
              type={'tel'}
              name="phone"
              value={user.phone}
              onChange={onChange}
              placeholder="Номер телефона"
              isUnderline={isDesktopView}
              isForm={isMobileView}
            />
            <Input
              name="email"
              value={user.email}
              onChange={onChange}
              placeholder="E-mail"
              error={errorEmail && 'Введите корректный e-mail'}
              isUnderline={isDesktopView}
              isForm={isMobileView}
            />
            {/*<Input*/}
            {/*    type='date'*/}
            {/*    name='birth_date'*/}
            {/*    value={user.birth_date}*/}
            {/*    onChange={onChange}*/}
            {/*    placeholder='Дата рождение'*/}
            {/*    isUnderline*/}
            {/*/>*/}
            <InputDatepicker
              selected={user.birth_date}
              onChange={onChangeBd}
              placeholderText="Дата рождения"
              isUnderline={isDesktopView}
            />
            <Select
              name="gender"
              value={user.gender}
              onChange={onChange}
              options={genders}
              placeholder="Пол"
              isUnderline={isDesktopView}
            />
          </BoxInputs>

          {isMobileView && (
            <FooterMobile
              title={'Добавить'}
              onOk={handleSave}
              disabled={disabled}
              isLoading={isLoadingAddNew}
            />
          )}

          {isDesktopView && (
            <Footer>
              <Button
                onClick={toggleShowed}
                disabled={isLoadingAddNew}
                color="red"
              >
                Отмена
              </Button>
              <Button
                onClick={handleSave}
                color="green"
                disabled={disabled}
                isLoading={isLoadingAddNew}
              >
                Добавить
              </Button>
            </Footer>
          )}
        </UserContainer>
      )}
    </Box>
  )
}

const Box = styled.div``
const BoxInputs = styled.div`
  width: 80%;
  margin: 0 auto;

  @media ${device.mobileTablet} {
    width: 100%;
  }
`

const UserContainer = styled.div`
  position: absolute;
  top: 110px;
  right: 0;
  //max-height: 400px;
  width: 480px;
  padding: 5%;
  border-radius: 30px;
  background: #ffffff;
  box-shadow: var(--shadow-card);

  @media ${device.mobileTablet} {
    width: 100%;
    left: 0;
    top: auto;
    bottom: 0;
    z-index: 3;
    border-radius: 30px 30px 0 0;

    ${StyledInput} {
      border: none;
    }

    ${StyledSelect} {
      margin-top: 10px;
    }
  }

  @media ${device.laptop} {
    width: 400px;
    //max-height: 350px;
    top: 90px;
  }

  ${StyledInput} {
    text-align: center;
  }
`
const ProfileBtn = styled.div`
  height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 86px;
  border-radius: 22px;
  box-shadow: var(--shadow-card);
  cursor: pointer;

  &:hover {
    background-color: #fafafa;
  }

  @media ${device.laptop} {
    height: 54px;
    min-width: 64px;
    border-radius: 20px;
  }
`
const ProfileAddImg = styled.img``
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5%;

  @media ${device.mobileTablet} {
    font-size: 20px;
  }
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15%;

  ${StyledButton} {
    width: 47%;
  }
`
