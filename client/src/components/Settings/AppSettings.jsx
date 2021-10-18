import React, { useState } from 'react'

import { Box, Stack, Select, FormControl, MenuItem, Typography } from '@mui/material'

function AppSettings() {
    // For reminder repeating
    const [reminerRepeat, setReminerRepeat] = useState('Always');
    const reminderOptions = ['Always', 'Once when login', 'Never'];

    return (
        <Box sx={{ display: 'flex', width: '100%', height: '100%', justifyContent: 'left', alignItems: 'center' }}>
            {/*Reminder Noti Setting*/}
            <Stack direction="row" spacing={5} sx={{ alignItems: 'center' }}>
                <Typography sx={{ fontSize: '22px', fontWeight: 600, color: '#272727' }}>
                    Contact reminder notifications
                </Typography>
                <FormControl >
                    <Select sx={{ width: '180px' }}
                        value={reminerRepeat}
                        onChange={e => setReminerRepeat(e.target.value)}
                    >
                        {reminderOptions.map((op) => (
                            <MenuItem
                                key={op}
                                value={op}
                            >{op}</MenuItem>))}
                    </Select>
                </FormControl>
            </Stack>
            {/*Other settings*/}
        </Box >
    )
}

export default AppSettings