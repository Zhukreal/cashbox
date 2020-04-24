import React from 'react'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        width: '100%'
    },
});

export const Input = ({
    variant,
    type,
    name,
    label,
    value,
    onChange,
    placeholder,
    error
}) => {
    const classes = useStyles()
    return (
        <TextField
            variant={variant}
            type={type}
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            helperText={error}
            className={classes.root}
        />
    )
}

