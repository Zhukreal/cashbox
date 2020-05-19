import React from 'react'
import styled from 'styled-components'
import { device } from 'lib/mediaDevice'
import { Button, StyledButton } from 'ui'

export const Info = ({ data, isLoading, onCancel }) => {
  return (
    <Box>
      <Content>
        <Left>
          <Title>Информация о кассе</Title>
          <WrapperBorder>
            <Label>Кассир:</Label>
            <Text>Иванов Иван Иванович</Text>
            <Label>Торговая точка:</Label>
            <Text>SMALL</Text>
            <Label>Касса:</Label>
            <Text>Касса 1</Text>
            <Label>Заводской номер кассы:</Label>
            <Text>000000001</Text>
            <Label>Связь с ОФД:</Label>
            <Status>Online</Status>
          </WrapperBorder>
        </Left>
        <Right>
          <Title>Информация о смене</Title>

          <Label>Наличных в кассе:</Label>
          <Text green>3 487 029 тнг</Text>
          <Label>Номер смены:</Label>
          <Text>64</Text>
          <Label>Время открытия смены:</Label>
          <Text>10:00 03.09.2020</Text>
          <Label>Чеков за сегодня:</Label>
          <Text>234</Text>
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
`
const Content = styled.div`
  display: flex;
`
const Left = styled.div`
  width: 50%;
  text-align: left;
`
const Right = styled.div`
  width: 45%;
  margin-left: 5%;
  text-align: left;
`
const WrapperBorder = styled.div`
  border-right: 1px dashed #0e254a42;
`
const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 10%;

  @media ${device.laptop} {
    font-size: 20px;
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
`
const Text = styled.div`
  font-size: 25px;
  margin-bottom: 5%;
  color: ${(p) => (p.green ? 'var(--green)' : 'inherit')};

  @media ${device.laptop} {
    font-size: 20px;
  }
`
const Status = styled.div`
  font-size: 25px;
  color: var(--green);
  display: flex;
  align-items: center;

  @media ${device.laptop} {
    font-size: 20px;
  }

  ::after {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color: var(--green);
    margin-left: 10px;

    @media ${device.laptop} {
      width: 12px;
      height: 12px;
      border-radius: 6px;
    }
  }
`
const WrapButton = styled.div`
  text-align: center;
  margin-top: 30px;

  ${StyledButton} {
    padding: 0 50px;
  }
`
const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
`
