import React from 'react'

import { Box } from '@mui/material'
import StandardInput from '../StandardInput'

function PasswordChange() {
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', padding: '10%',  }}>
            <StandardInput label="Old password" />
            <StandardInput label="New passowrd" />
            <StandardInput label="Confirm password" />
        </Box>
    )
}

export default PasswordChange