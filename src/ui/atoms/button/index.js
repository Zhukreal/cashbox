import React from 'react'
import styled from "styled-components"
import { Button as ButtonMaterial } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';


export const Button = (
    {
        type,
        variant = 'contained',
        color = 'primary',
        size = 'medium' ,
        disabled,
        isLoading,
        startIcon,
        endIcon,
        onClick,
        children
    }) => {

    return (
        <StyledButton
            type={type}
            variant={variant}
            color={color}
            size={size}
            startIcon={startIcon}
            endIcon={endIcon}
            onClick={onClick}
            disabled={disabled || isLoading}
            // className={classes.button}
        >
            {children}
            {isLoading && <StyledCircularProgress size={20} />}
        </StyledButton>
    )
}


export const StyledButton = styled(ButtonMaterial)({
    height: '34px'
});

const StyledCircularProgress = styled(CircularProgress)({
    color: 'grey',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -10,
    marginLeft: -10
});
