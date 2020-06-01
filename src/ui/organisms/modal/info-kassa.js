import React from 'react'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { Button, StyledButton } from 'ui'

export const Info = ({ data, onCancel }) => {
  return (
    <Box>
      <Content>
        <Left>
          <Title>Информация о кассе</Title>
          <WrapperBorder>
            <WLT>
              <Label>Кассир:</Label>
              <Text>{data.cashier_display}</Text>
            </WLT>
            <WLT>
              <Label>Торговая точка:</Label>
              <Text>{data.store_display}</Text>
            </WLT>
            <WLT>
              <Label>Касса:</Label>
              <Text>{data.cash_display}</Text>
            </WLT>
            <WLT>
              <Label>Заводской номер кассы:</Label>
              <Text>{data.cash_manufacturer_number}</Text>
            </WLT>
            <WLT>
              <Label>Связь с ОФД:</Label>
              <Status color={data.color}>{data.status}</Status>
            </WLT>
          </WrapperBorder>
        </Left>
        <Right>
          <Title>Информация о смене</Title>

          <WLT>
            <Label>Наличных в кассе:</Label>
            <Text green >{data.total_sum} {data.currency}</Text>
          </WLT>
          <WLT>
            <Label>Номер смены:</Label>
            <Text>{data.number}</Text>
          </WLT>
          <WLT>
            <Label>Время открытия смены:</Label>
            <Text>{data.openDate}</Text>
          </WLT>
          <WLT>
            <Label>Чеков за сегодня:</Label>
            <Text>{data.operations_count}</Text>
          </WLT>
        </Right>
      </Content>
      <WrapButton>
        <Button onClick={onCancel} variant={'outlined'}>
          Закрыть
        </Button>
      </WrapButton>
    </Box>
  )
}

const Box = styled.div`
  width: 700px;

  @media ${device.laptop} {
    width: 450px;
  }

  @media ${device.mobileTablet} {
    width: 100%;
    height: calc(100vh - 170px);
    overflow-y: auto;
  }
`
const Content = styled.div`
  display: flex;

  @media ${device.mobileTablet} {
    flex-direction: column;   
  }
`
const Left = styled.div`
  width: 50%;
  text-align: left;

  @media ${device.mobileTablet} {
    width: 100%;
    margin-bottom: 15px;
  }
`
const Right = styled.div`
  width: 45%;
  margin-left: 5%;
  text-align: left;

  @media ${device.mobileTablet} {
    width: 100%;
    margin: 0;
  }
`
const WrapperBorder = styled.div`
  border-right: 1px dashed #0e254a42;

  @media ${device.mobileTablet} {
    border-right: none;
    border-bottom: 1px dashed #0e254a42;
  }
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10%;

  @media ${device.laptop} {
    font-size: 20px;
  }

  @media ${device.mobileTablet} {
    font-size: 20px;
    color: var(--blue);
    //margin-bottom: 5%;
  }
`
const Label = styled.div`
  font-size: 20px;
  margin-bottom: 2%;
  color: #0e254a;
  opacity: 0.6;

  @media ${device.laptop} {
    font-size: 16px;
  }
  @media ${device.mobileTablet} {
    font-size: 16px;
  }
`
const Text = styled.div`
  font-size: 25px;
  margin-bottom: 5%;
  color: ${(p) => (p.green ? 'var(--green)' : 'inherit')};

  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.mobileTablet} {
    font-size: 16px;
  }
`
const Status = styled.div`
  font-size: 25px;
  color: ${p => p.color ? p.color : '#000000'};
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    font-size: 20px;
  }
  @media ${device.mobileTablet} {
    font-size: 16px;
  }

  ::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: ${p => p.color ? p.color : '#ffffff'};
    margin-left: 10px;

    @media ${device.laptop} {
      width: 12px;
      height: 12px;
      border-radius: 6px;
    }
    
    @media ${device.mobileTablet} {
      width: 10px;
      height: 10px;
      border-radius: 5px;
    }
  }
`
const WrapButton = styled.div`
  text-align: center;
  margin-top: 30px;

  ${StyledButton} {
    padding: 0 50px;
  }
  
  @media ${device.mobileTablet} {
    display: none;
  }
`
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`
const WLT = styled.div`
  @media ${device.mobileTablet} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5%;
    
     ${Label} {
      //width: 50%;
      padding-right: 10px;
      margin: 0;
      
    }

    ${Text} {
      //width: 50%;
      text-align: right;
      margin: 0;
      font-weight: bold;
    }

   
  }
`
