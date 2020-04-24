import React from 'react'
import {RadioGroup as MaterialRadioGroup} from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Radio } from '../../atoms';

export const RadioGroup = ({
    name,
    checked,
    value,
    onChange
}) => {
    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <MaterialRadioGroup aria-label="gender" name={name} value={value} onChange={onChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
                <FormControlLabel value="disabled" disabled control={<Radio disabled />} label="(Disabled option)" />
            </MaterialRadioGroup>
        </FormControl>
    )
}