import React from 'react'
import { Switch as MaterialSwitch } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export const Switch = ({
    name,
    checked,
    value,
    onChange,
    disabled
}) => {
    return (
        <MaterialSwitch
            name={name}
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            // inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
    )
}


export const SwitchWithLabel = ({
    label,
    ...props
}) => {
    return (
        <FormControlLabel
            control={<Switch {...props} />}
            label={label}
        />
    )
}
