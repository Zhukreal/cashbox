import React, {useRef, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import useOnClickOutside from "use-onclickoutside";
import styled, { css } from "styled-components"
import DatePicker from "react-datepicker"
import { device } from 'lib/mediaDevice'
import {Input, StyledInput, Button, StyledButton, InputDatepicker, Select} from 'ui'
import add from "static/img/add.png";
import {userActions} from "../index";
import "react-datepicker/dist/react-datepicker.css";


export const AddUser = () => {
    const [user, setUser] = useState( {
        name: '',
        phone: '',
        email: '',
        gender: '',
        birth_date: ''
    })
    const genders = [
        {value: 1, label: 1},
        {value: 2, label: 2}
    ]
    const { showedModalAdd } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const ref = useRef(null)
    useOnClickOutside(ref, () => dispatch(userActions.setShowedAdd(false)))

    const toggleShowed = () => {
        return
        dispatch(userActions.setShowedAdd(!showedModalAdd))
    }

    const onChange = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value})
    }
    const onChangeBd = value => {
        setUser({...user, birth_date: value})
    }


    return (
        <Box ref={ref}>
            <ProfileBtn onClick={toggleShowed}>
                <ProfileAddImg src={add}/>
            </ProfileBtn>

            { showedModalAdd &&
                <UserContainer>
                    <Title>Добавить клиента</Title>
                    <BoxInputs>
                        <Input
                            name='name'
                            value={user.name}
                            onChange={onChange}
                            placeholder='ФИО'
                            isUnderline
                        />
                        <Input
                            name='phone'
                            value={user.phone}
                            onChange={onChange}
                            placeholder='Номер телефона'
                            isUnderline
                        />
                        <Input
                            name='email'
                            value={user.email}
                            onChange={onChange}
                            placeholder='E-mail'
                            isUnderline
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
                            placeholderText='Дата рождения'
                        />
                        <Select
                            name='gender'
                            value={user.gender}
                            onChange={onChange}
                            options={genders}
                            placeholder='Пол'
                        />
                    </BoxInputs>

                    <Footer>
                        <Button
                            onClick={toggleShowed}
                            color='red'
                        >
                            Отмена
                        </Button>
                        <Button
                            color='green'
                        >
                            Добавить
                        </Button>
                    </Footer>
                </UserContainer>

            }
        </Box>
    )
}

const Box = styled.div`

`
const BoxInputs = styled.div`
  width: 80%;
  margin: 0 auto;
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
const ProfileAddImg = styled.img`
  
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 5%;
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










