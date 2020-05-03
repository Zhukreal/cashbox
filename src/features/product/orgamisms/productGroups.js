import * as React from "react"
import { Link } from "react-router-dom"
import styled, { css } from "styled-components"
import groupIcon from 'static/img/icons/group.png'


export const ProductGroups = () => {

    return (
        <GroupBox>
            <GroupItem>
                <GroupIcon src={groupIcon} />
            </GroupItem>
            <GroupItem>Бакалея</GroupItem>
            <GroupItem>Напитки</GroupItem>
            <GroupItem>Бытовая химия</GroupItem>
            <GroupItem>Товары для быта</GroupItem>
        </GroupBox>
    )
}

const GroupItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    //width: 100%;
    margin-right: 20px;
    padding: 0 20px;
    border-radius: 30px;
    font-size: 26px;
    box-shadow: var(--shadow-card);
     white-space: nowrap;
    overflow-y: hidden;
    text-overflow: ellipsis;
    
    &:hover {
        background-color: #fafafa;
        cursor: pointer;
    }
`
const GroupBox = styled.div`
    position: fixed;
    height: 110px;
    width: 100%;
    max-width: inherit;
    //width: calc(100% - 540px);
    //max-width: calc(100% - 540px);
    display: flex;
    //align-items: center;
    //justify-content: space-between;
    //padding: 0 5px;
    padding-top: 10px;
    bottom: -1px;
    background: #ffffff;
    
    ${GroupItem} {
      &:first-child {
        width: 100px;
      }
      &:last-child {
        margin-right: 0;
      }
    }
    
    &::before {
        content: '';
        width: 100%;
        position: absolute;
        top: -50px;
        height: 50px;
      background-image:linear-gradient(to bottom, rgba(255, 255, 255, 0), #fff 75%)
    }
`

const GroupIcon = styled.img`
  margin: 0 20px;
`


