import React from 'react'
import styled from "styled-components"
import {Button, StyledButton} from 'ui'


export const Confirm = ({
    title,
    onOk,
    onCancel,
    isLoading
    } ) => {

    return (
        <Box>
            <Title>{title}</Title>
            <Actions>
                <Button
                    onClick={onCancel}
                    color={'red'}
                    disabled={isLoading}
                >
                    Нет
                </Button>
                <Button
                    onClick={onOk}
                    color={'green'}
                    isLoading={isLoading}
                >
                    Да
                </Button>
            </Actions>
        </Box>
    )
}

export const Box = styled.div`
    
`
export const Title = styled.div`
    font-size: 20px;
`
export const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 8%;
    
    ${StyledButton} {
      height: 50px;
      width: 150px;
      margin: 0 10px;
    }
`







