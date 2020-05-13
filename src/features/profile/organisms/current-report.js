import React, {useState, useEffect} from 'react'
import styled, {css} from "styled-components"
import {useDispatch, useSelector} from "react-redux"
import { device } from 'lib/mediaDevice'
import {profileActions} from "features/profile"
import {Button, StyledButton} from "ui"
import closeGray from 'static/img/icons/close-gray.png'
import iconPrint from 'static/img/icons/print.png'



export const CurrentReport = ({onClose}) => {
    const [error, setError] = useState(null)
    const dispatch = useDispatch()
    const { isLoadingReport, currentReport } = useSelector( state => state.profile )

    useEffect(() => {
        loadReport().then()
    }, [])

    const loadReport = async () => {
        try {
            await dispatch(profileActions.loadCurrentReport())
        } catch (e) {
            console.log(e)
            setError(true)
        }

    }
    return (
        <Wrapper>
            <Header>
                <Title>X отчет</Title>
                <Close onClick={onClose}>
                    <img src={closeGray} alt=""/>
                </Close>
            </Header>
            <Box>
                {isLoadingReport ?
                    <Loading>Загрузка...</Loading>
                    :
                    <Report>
                        {error && 'Не удалось загрузить'}
                    </Report>

                }
            </Box>
            {currentReport.id &&
                <Footer>
                    <Button
                        onClick={null}
                        disabled={null}
                        color={'green'}
                    >
                        <Icon src={iconPrint}></Icon>
                        Напечатать
                    </Button>
                </Footer>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
  border-radius: 30px;
  width: 370px;  
  
  
  @media ${device.mobile} {
      width: 100%;
    }
    
    @media ${device.desktop} {
      width: 650px
    }
  
`
const Box = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
  background-color: #ffffff;
  padding: 5%;
  min-height: 100px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
`

const Footer = styled.div`
  text-align: center;
  margin-top: 5%;
`
const Close = styled.div`
    width: 24px;
    height: 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    box-shadow: var(--shadow-card);
    opacity: 0.6;
    cursor: pointer;
    
    img {
      width: 8px;
    }
    
    :hover {
      opacity: 0.8;
    }
`
const Report = styled.div`

`
const Loading = styled.div`
  
`
const Icon = styled.img`
  margin-right: 10px;
`

