import React, {useState, useEffect} from 'react'
import styled, {css} from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import { device } from 'lib/mediaDevice'
import {emailValidator} from "lib/validators";
import {cartSelectors} from "features/cart"
import {Input, StyledInput, Button, StyledButton, Textarea, StyledTextarea} from "ui"
import IconMail from 'static/img/icons/mail.png'
import IconWatsApp from 'static/img/icons/whatsapp.png'

const initial = {
    name: '',
    phone: '',
    email: ''
}

export const Payment = ({onClose, editable = {}}) => {
    const items = [500, 1000, 2000, 5000, 10000, 20000]
    const [view, setView] = useState(1)
    const [user, setUser] = useState(initial)
    const [typePayment, setTypePayment] = useState('cash')
    const [activeCash, setActiveCash] = useState(500)
    const [sum, setSum] = useState('')
    const [comment, setComment] = useState('')
    const [errorEmail, setErrorEmail] = useState(null)
    const dispatch = useDispatch()
    const { currency } = useSelector(state => state.profile)
    const products = useSelector(cartSelectors.products())
    const totalInfo = useSelector(cartSelectors.totalInfo())

    useEffect(() => {
        setSum(totalInfo.total)
    }, [])

    useEffect(() => {
        if(user.email) {
            const error = emailValidator(user.email)
            setErrorEmail(error)
        } else {
            setErrorEmail(null)
        }
    }, [user.email])

    const onChange = e => {
        const {name, value} = e.target

        setUser({...user, [name]: value})
    }

    const onChangeSum = e => {
        const {value} = e.target
        setSum(value)
    }

    const onChangeComment = e => {
        const {value} = e.target
        setComment(value)
    }

    return (
        <Wrapper>
            {view === 1 &&
            <Box>
                <BoxLeft>
                    <Title>Прием оплаты</Title>
                    <FlexBox>
                        <Type
                            onClick={() => setTypePayment('cash')}
                            active={typePayment === 'cash'}
                        >
                            наличные
                        </Type>
                        <Type
                            onClick={() => setTypePayment('card')}
                            active={typePayment === 'card'}
                        >
                            карта
                        </Type>
                    </FlexBox>
                    <Input
                        type='number'
                        value={sum}
                        onChange={onChangeSum}
                        placeholder='Сумма'
                    />
                    <TextCenter>
                        <Button color={'white'}>
                            Принять
                        </Button>
                    </TextCenter>
                    <Subtitle>
                        Варианты оплаты наличными:
                    </Subtitle>
                    <List>
                       {items.map((item) =>
                           <Item
                               key={item}
                               onClick={() => setActiveCash(item)}
                               active={item === activeCash}
                           >
                               {item}
                           </Item>
                       )}
                    </List>
                </BoxLeft>
                <BoxRight>
                    <Title>Платежи</Title>
                    <Block>
                        <BlockTitle>Итого:</BlockTitle>
                        <BlockValue>12323 {currency}</BlockValue>
                    </Block>
                    <Block>
                        <BlockTitle>Принято:</BlockTitle>
                        <BlockValue>2323 {currency}</BlockValue>
                    </Block>
                    <Divider />

                    <Block>
                        <TextSub>Наличные:</TextSub>
                        <TextSub>12323 {currency}</TextSub>
                    </Block>
                    <Block>
                        <TextSub>Банковская карта:</TextSub>
                        <TextSub>-</TextSub>
                    </Block>

                    <Textarea
                        value={comment}
                        onChange={onChangeComment}
                        placeholder='Комментарий'
                    />
                </BoxRight>
            </Box>
            }

            {view === 2 &&
            <Box>
                <BoxLeft isView2>
                    <Title>Клиент</Title>
                    <Input
                        name='name'
                        value={user.name}
                        onChange={onChange}
                        placeholder='ФИО'
                        isUnderline
                    />
                    <Input
                        type={'tel'}
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
                        error={errorEmail && 'Введите корректный e-mail'}
                        isUnderline
                    />
                    <Subtitle isView2>Отправить: </Subtitle>
                    <Icon>
                        <img src={IconMail}  alt=""/>
                    </Icon>
                    <Icon green>
                        <img src={IconWatsApp}  alt=""/>
                    </Icon>
                </BoxLeft>
                <BoxRight>
                    <Title>Платежи</Title>
                    <Block>
                        <BlockTitle>Итого:</BlockTitle>
                        <BlockValue>12323 {currency}</BlockValue>
                    </Block>
                    <Block>
                        <BlockTitle>Принято:</BlockTitle>
                        <BlockValue>2323 {currency}</BlockValue>
                    </Block>
                    <Divider/>
                    <Block>
                        <TextSub>Наличные:</TextSub>
                        <TextSub>12323 {currency}</TextSub>
                    </Block>
                    <Block>
                        <TextSub>Банковская карта:</TextSub>
                        <TextSub>-</TextSub>
                    </Block>
                    <Divider/>
                    <Block>
                        <BlockTitle>Сдача:</BlockTitle>
                        <BlockValue>1951 {currency}</BlockValue>
                    </Block>
                    <FlexBox isView2>
                        <Button
                            color='red'
                            onClick={onClose}
                        >
                            Закрыть
                        </Button>
                        <Button
                            onClick={null}
                            color='green'
                        >
                            Печать чека
                        </Button>
                    </FlexBox>

                </BoxRight>
            </Box>
            }



        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 5%;
  background: #ffffff;
  border-radius: 30px;
  width: 750px;  
  text-align: left;
 
 
  
  @media ${device.mobile} {
      //width: 100%;
    }
    
    @media ${device.laptop} {
      width: 650px
    }
  
`
const Box = styled.div`
  display: flex;
  justify-content: space-between;
`
const BoxLeft = styled.div`
  width: 47%;
  
  ${StyledInput} {
    width: 100%;
    height: 56px;
    font-size: 20px;
    
     @media ${device.laptop} {
        height: 44px;
      }
  }
  
  ${StyledButton} {
    height: 56px;
    margin: 5% auto;
    padding: 0 40px;
    
    @media ${device.laptop} {
        height: 44px;
      }
  }
  
  ${(p) => p.isView2 && css`
        ${StyledInput} { 
          border-bottom: 1px solid var(--canvas-text);
          padding-left: 0;
          padding-top: 10px!important;
          
          @media ${device.laptop} {
              font-size: 18px;
          }
        }
  `}
  
  
`
const BoxRight = styled.div`
  width: 47%;
  
  ${StyledTextarea} {
      height: 150px;
      margin-top: 5%;
      
      @media ${device.laptop} {
          height: 133px;
      }
  }
`
const Title = styled.div`
  font-size: 35px;
  font-weight: bold;
  margin-bottom: 10%;
  
  @media ${device.laptop} {
      font-size: 28px;
    }
`
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10%;
  
  ${StyledButton} {
    width: 48%;
    height: 46px;
    margin: 0;
    font-size: 18px;
    padding: 0;
  }
  
  ${(p) => p.isView2 && css`
       margin-top: 15%;
       margin-bottom: 0;
  `}
`
const Type = styled.div`
  height: 50px;
  width: 47%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: bold;
  color: ${p => p.active ? '#ffffff' : 'var(--canvas-text)'};
  background-color: ${p => p.active ? 'var(--green)' : '#ffffff'};
  box-shadow: var(--shadow-card);
  cursor: pointer;
 
  
  :hover {
    
  }
`
const TextCenter = styled.div`
  text-align: center;
`
const Subtitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
  margin-bottom: 10px;
  
  @media ${device.laptop} {
     font-size: 17px;
     ${(p) => p.isView2 && css`
        margin-top: 27%;
    `}
    }
    
    ${(p) => p.isView2 && css`
        margin-top: 18%;
        margin-bottom: 15px;
    `}
    
`

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: 0 -5px;
`
const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 1 calc(25% - 10px);
  margin: 5px;
  height: 30px;
  font-size: 20px;
  color: ${p => p.active ? '#ffffff' : 'var(--canvas-text)'};
  background-color: ${p => p.active ? 'var(--green)' : '#ffffff'};
  box-shadow: var(--shadow-card);
  cursor: pointer;
  
  @media ${device.laptop} {
    font-size: 18px;
  }
`

const Block = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`
const BlockTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    
    @media ${device.laptop} {
      font-size: 19px;
    }
  
`
const BlockValue = styled.div`
    font-size: 28px;
    font-weight: bold;
    
    @media ${device.laptop} {
      font-size: 22px;
    }
`
const Divider = styled.div`
    height: 1px;
    border-bottom: 1px solid black;
    margin-bottom: 20px;
`
const TextSub = styled.div`
    font-size: 18px;
    color: rgba(14,37,74,0.51);
    
    @media ${device.laptop} {
      font-size: 16px;
    }
`
const Icon = styled.div`
  height: 70px;
  width: 70px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  margin-right: 20px;
  background-color: ${p => p.green ? `var(--green)` : `var(--red)`};
   box-shadow: var(--shadow-card);
  cursor: pointer;
 
  
  @media ${device.laptop} {
       height: 60px;
      width: 60px;
      border-radius: 30px;
    }
`
