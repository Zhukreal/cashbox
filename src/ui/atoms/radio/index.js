import React from 'react'
import { Radio as MaterialRadio } from '@material-ui/core';

export const Radio = ({
    name,
    checked,
    value,
    onChange,
    disabled
}) => {
    return (
        <MaterialRadio
            name={name}
            checked={checked}
            value={value}
            onChange={onChange}
            disabled={disabled}
            // inputProps={{ 'aria-label': 'A' }}
        />
    )
}