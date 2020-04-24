import * as React from "react"
import { Link } from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import styled from "styled-components"
import {authActions} from 'features/auth'
import {Container, Row, Col, Button} from "ui";


export const Header = () => {
    const { profile } = useSelector(state => state)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(authActions.logout())
    }

    return (
        <HeaderBox>
            <Container>
                <Row justify="space-between">
                    <Col justify='center'>
                        <Link to={'/'}>Home page</Link>
                    </Col>
                    <Col>
                        {profile.id ?
                            <InfoBox>
                                {`${profile.firstName} ${profile.lastName}`}
                                <Button onClick={handleLogout} size='small' >Logout</Button>
                            </InfoBox>
                            :
                            <Link to={'/login'}>Login</Link>
                        }
                    </Col>
                </Row>
            </Container>
        </HeaderBox>
    )
}


const HeaderBox = styled.header`
  display: flex;
  width: 100%;
  position: fixed;
  height: 7rem;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-sizing: border-box;
  box-shadow: 0 -1rem 4rem rgba(36, 37, 38, 0.3);
  color: var(--card-text);
  background-color: var(--card);
  border-color: var(--borders);
`
const InfoBox = styled.div`
  
`


