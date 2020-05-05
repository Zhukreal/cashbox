import React from "react"
import {useSelector} from "react-redux";
import styled, { css } from "styled-components"
import { device } from 'lib/mediaDevice'


export const UsersList = () => {
    const { users, isLoadingUsers } = useSelector(state => state.user)

    if(isLoadingUsers) return (
        <UserContainer>
            <Loading>Поиск...</Loading>
        </UserContainer>
    )

    return (
        <UserContainer>
            {users.length ?
                <UsersBox>
                    {users.map((item, key) =>
                        <User key={item.id}>
                            <Name>{item.name}</Name>
                            <Phone>{item.phone ? item.phone : 'нет номера'}</Phone>
                        </User>
                    )}
                </UsersBox>
                :
                <Loading>Ничего не найдено</Loading>
            }
        </UserContainer>
    )
}

const UserContainer = styled.div`
    position: absolute;
    top: 110px;
    min-height: 87px;
    max-height: 400px;
    width: 375px;
    padding: 10px;
    border-radius: 30px;
    background: #ffffff;
    box-shadow: var(--shadow-card);
    
    @media ${device.laptop} { 
        width: 315px;
        max-height: 350px;
        top: 90px;
    }
    
`
const UsersBox = styled.div`
  height: 100%;
  overflow-y: auto;
`
const User = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 47px;
  margin: 10px 2px;
  padding: 5%;
  border-radius: 20px;
  background: #ffffff;
  box-shadow: var(--shadow-card);
  
  &:hover {
    cursor: pointer;
    //font-weight: bold;
    border: 1px solid #f0f0f0;
  }
`
const Name = styled.div`
    font-size: 15px;
    
`
const Phone = styled(Name)`
  min-width: 105px;
  text-align: right;
`

const Loading = styled.div`
  height: 47px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
  color: grey;
`
