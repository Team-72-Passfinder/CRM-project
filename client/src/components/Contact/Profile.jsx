import React from 'react'

import { Stack, Box, Typography } from '@mui/material'

function Profile({ info }) {
    function getContactData(key) {
        switch (key) {
            case 'Bio':
                return info.biography
            case 'Email':
                return info.email
            case 'Phone number':
                return info.phoneNumber
            case 'Date Of Birth':
                return (
                    new Date(info.dateOfBirth).getDate() + '/'
                    + new Date(info.dateOfBirth).getMonth() + '/'
                    + new Date(info.dateOfBirth).getFullYear()
                )
            default:
                return null;
        }
    }

    return (
        <Stack>
            {
                ['Bio', 'Email', 'Phone number', 'Date Of Birth'].map((item) => {
                    let data = getContactData(item)

                    if (data === "") {
                        return null
                    }

                    return (
                        <Box sx={{ my: '5px' }}>
                            <Typography sx={{ fontSize: '14px', fontWeight: 400, }} color='textSecondary'>
                                {item}
                            </Typography>
                            <Typography sx={{ fontSize: '16px', fontWeight: 500, color: '#272727' }} color='textPrimary'>
                                {data}
                            </Typography>
                        </Box>
                    )
                })
            }
        </Stack>
    )
}

export default Profile