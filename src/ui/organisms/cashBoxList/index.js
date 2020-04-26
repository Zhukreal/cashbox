import React from 'react'
import styled, {css} from "styled-components"
import {Container, Row, Col, Button} from "ui";

export const CashBoxList = ({ list, active, setActive }) => {
    return (
        <CashBox>
            {list.map(item =>
                <CashBoxItem
                    key={item}
                    active={item === active}
                    onClick={() => setActive(item)}
                >
                    Касса № {item}
                </CashBoxItem>
            )}
        </CashBox>
    )
}

const CashBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    max-height: 200px;
    margin-bottom: 50px;
    overflow-y: auto;
`

const CashBoxItem = styled.div`
   display: flex;
   align-items: center;
   width: 49%;
   height: 40px;
   padding: 0 20px;
   margin-bottom: 20px;
   border-radius: 20px;
   border: 1px solid #d3d3d3;
   box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.161);
   cursor: pointer;
   
   ${(p) =>
    p.active &&
    css`
      border-color: blue;
    `}
`