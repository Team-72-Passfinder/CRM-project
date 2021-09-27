import React, { useState, useEffect } from 'react'

import { FilledInput, InputLabel, FormControl, FormHelperText, Typography } from '@mui/material'

function StandardInput({ label, name, value, setValue, required, type }) {
    const emptyFieldErrorMessage = 'This field is required'
    const invalidEmailErrorMessage = 'invalid email'
    const invalidTelErrorMessage = 'Must only contain numbers'

    function isError() {
        if (required) {
            return value === ''
        }

        if (value !== '') {
            switch (type) {
                case 'email':
                    return !/\S+@\S+\.\S+/.test(value)
                case 'tel':
                    return isNaN(value)
                default:

            }
        }
    }

    function generateHelperText() {
        if (required) {
            return (
                value === '' &&
                <FormHelperText error>
                    {emptyFieldErrorMessage}
                </FormHelperText>
            )
        }

        if (value !== '') {
            switch (type) {
                case 'email':
                    return (
                        !/\S+@\S+\.\S+/.test(value) && 
                        <FormHelperText error>
                            {invalidEmailErrorMessage}
                        </FormHelperText>
                    )
                case 'tel':
                    return (isNaN(value) && 
                        <FormHelperText error>
                            {invalidTelErrorMessage}
                        </FormHelperText>
                    )
                default:
            }
        }
    }


    return (
        <FormControl margin="dense" variant="filled">
            <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                {label}
            </Typography>
            <FilledInput
                id={name}
                sx={{
                    width: '300px',
                    height: '40px',
                    borderRadius: '5px',
                    '&.Mui-error': {
                        background: '#FBB5B1',
                        border: '1px solid #F9202B',
                    },
                    '& input:not(:placeholder-shown)': {
                        height: '0px',
                    }
                }}
                disableUnderline={true}
                hiddenLabel={true}
                onChange={e => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                error={isError()}
            />
            {generateHelperText()}
        </FormControl>
    )
}

export default StandardInput