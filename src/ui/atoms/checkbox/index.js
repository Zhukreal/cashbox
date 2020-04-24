import React from 'react'
import { Checkbox as MaterialCheckbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import './style.sass'

export const Checkbox = ({
    name,
    value,
    onChange,
}) => {

    return (
        <MaterialCheckbox
            color="primary"
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}


export const CheckboxWithLabel = ({
    label,
    ...props
}) => {

    return (
        <FormControlLabel
            control={<Checkbox {...props} />}
            label={label}
        />
    )
}

