import React, {useState, useEffect} from 'react'
import styled, {css} from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import { device } from 'lib/mediaDevice';
import {mathRound2} from "lib/math";
import {cartActions, cartSelectors} from "features/cart";
import {Input, StyledInput, Button} from "ui";
import closeGray from 'static/img/icons/close-gray.png'



export const NewProduct = ({onClose, editable = {}}) => {
    const [product, setProduct] = useState({
        base_price: '',
        count: ''
    })

    const [discount, setDiscount] = useState('')
    const [discountCurrency, setDiscountCurrency] = useState('')
    const [total, setTotal] = useState(0)
    const dispatch = useDispatch()
    const products = useSelector(cartSelectors.products())

    useEffect(() => {
        if(editable.id) {
            setProduct({...editable})
            setDiscount(editable.discount)
            setDiscountCurrency(editable.totalDiscount)
        } else {
            let largest = 0;
            products.forEach((item) => {
                if(item.serialNumber > largest) largest = item.serialNumber
            })
            setProduct({...product, name: `Позиция ${largest + 1}`, serialNumber: largest + 1})
        }
    }, [])


    // Calculate total price
    useEffect(() => {
        const totalPrice = product.base_price * product.count
        const currentPrice = mathRound2(totalPrice - discountCurrency)
        setTotal(currentPrice)
    }, [product.base_price, product.count, discountCurrency])

    const onChange = e => {
        const {name, value} = e.target
        // let valueN = value.replace(/\D/g, "");
        let valueN = '',
            dotCount = (value.match(/\./g) || []).length

        console.log(value)
        console.log(dotCount)
        console.log(/^[0-9]*([.][0-9]{1,2})?$/.test(value))

        const isValid = /^[0-9]*([.][0-9]{1,2})?$/.test(value) || (dotCount === 1 && value[value.length - 1] === '.')


        if(isValid) {
             valueN = value
        } else {
            valueN = value.slice(0, -1);
        }

        const price = product.base_price * product.count
        const base_price = product.base_price || 0
        const count = product.count || 0

        switch(name) {
            case 'base_price' :
                if(discount) {
                    const discountCr = mathRound2(valueN * count * (discount / 100))
                    setDiscountCurrency(discountCr)
                }
                setProduct({...product, base_price: valueN})
                break
            case 'count' :
                if(discount) {
                    const discountCr = mathRound2(base_price * valueN * (discount / 100))
                    setDiscountCurrency(discountCr)
                }
                setProduct({...product, count: valueN})
                break
            case 'discount' :
                if(Number(valueN) > 100) valueN = 100
                setDiscount(valueN)
                const discountC = mathRound2(price * (valueN / 100))
                setDiscountCurrency(discountC)
               break
            case 'discountCurrency' :
                if(valueN > price) valueN = price
                setDiscountCurrency(valueN)
                const discountP = mathRound2((valueN/price) * 100 )
                setDiscount(discountP )
                break
        }
    }


    const handleSave = () => {
        let obj = {...product,
            discount: discount
        }

        if(obj.id) {
            dispatch(cartActions.editProduct(obj))
        } else {
            obj.id = new Date().getTime()
            dispatch(cartActions.addToCart(obj))
        }
        onClose()
    }


    const disabled = !Number(product.base_price) || !Number(product.count)

    return (
        <Wrapper>
            <Close onClick={onClose}>
                <img src={closeGray} alt=""/>
            </Close>
            <Box>
                <Title>{product.name}</Title>
                <Wrap>
                    <Input
                        name='base_price'
                        value={product.base_price}
                        onChange={onChange}
                        placeholder='Цена'
                    />
                </Wrap>
                <Wrap>
                    <Input
                        name='count'
                        value={product.count}
                        onChange={onChange}
                        placeholder='Количество'
                    />
                </Wrap>
                <FlexBox>
                    <Input
                        name='discount'
                        value={discount}
                        onChange={onChange}
                        placeholder='Скидка в %'
                    />
                    <Input
                        name='discountCurrency'
                        value={discountCurrency}
                        onChange={onChange}
                        placeholder='Скидка в тнг'
                    />
                </FlexBox>
                <Total>Итого: {total} тнг</Total>
            </Box>
            <Footer>
                <Button
                    onClick={handleSave}
                    disabled={disabled}
                    color={'green'}
                >
                    Сохранить
                </Button>
            </Footer>
        </Wrapper>
    )
}

const Wrapper = styled.div`
  padding: 5%;
  background-color: #4f87de14;
  border-radius: 30px;
  width: 480px;  
  
  
  
  @media ${device.mobile} {
      width: 100%;
    }
    
    @media ${device.desktop} {
      width: 650px
    }
  
`
const Box = styled.div`
  background-color: #ffffff;
  padding: 5%;
  border-radius: 30px;
`
const Wrap = styled.div`
  margin: 5% 0;
`
const Title = styled.div`
  font-size: 20px;
  font-family: GilroyBold;
  text-align: center;
  margin-bottom: 5%;
`
const FlexBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 5% 0 10% 0;
  
  ${StyledInput} {
    width: 95%;
  }
`
const Total = styled.div`
  font-size: 25px;
  font-family: GilroyBold;
  text-align: center;
`
const Footer = styled.div`
  text-align: center;
  margin-top: 5%;
`
const Close = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 5% auto;
    background-color: #ffffff;
    opacity: 0.5;
    cursor: pointer;
`
