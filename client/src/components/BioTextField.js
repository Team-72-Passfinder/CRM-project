import React from 'react'

import { FormControl, Typography } from '@mui/material'
import TextField from '@mui/material/TextField';

function BioTextField({ label, name, setValue }) {

    return (
        <FormControl margin="dense" variant="filled">
            <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                {label}
            </Typography>
            <TextField
                id={name}
                sx={{
                    width: '300px',
                    //height: '200px',
                    borderRadius: '5px',
                    '& input:not(:placeholder-shown)': {
                        height: '0px',
                    }
                }}
                multiline
                disableUnderline={true}
                hiddenLabel={true}
                onChange={e => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                required={false}
            //type='text'
            />
        </FormControl>
    )
}

export default BioTextField