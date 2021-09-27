import React, { useState, useEffect } from 'react'

import { Paper, InputBase } from '@mui/material'

function StandardInput({ label, name }) {
    const [value, setValue] = useState('')

    // function isError() {
    //     if (required) {
    //         return value === ''
    //     }

    //     if (value !== '') {
    //         switch (type) {
    //             case 'email':
    //                 return !/\S+@\S+\.\S+/.test(value)
    //             // case 'tel':
    //             //     return isNaN(value) && invalidTelErrorMessage
    //             default:

    //         }
    //     }
    // }

    useEffect(() => {
        console.log(value)
    })

    return (
        <Paper
            sx={{ 
                display: 'flex', 
                background: '#EBEBEB', 
                width: '316px', 
                maxWidth: '90%', 
                height: '40px', 
                mr: '10px', 
                my: '10px', 
                alignItems: 'center' 
            }} 
            elevation={0}
        >
            <InputBase 
                sx={{ 
                    ml: '10px', 
                    width: '296px'
                }} 
                placeholder={label}
                onChange={e => setValue(e.target.value)}
                value={value}
                
            />
        </Paper>
    )
}

export default StandardInput