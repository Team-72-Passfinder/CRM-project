import React from 'react'

import { Stack, Box, Typography, Avatar } from '@mui/material'
import Alert from '@mui/material/Alert';

function viewUserInfo({ info }) {

    // Case of nothing
    if (!info) {
        return null;
    }

    // Case of not found
    if (info.status) {
        return (
            <Alert sx={{ width: "322px" }} variant="outlined" severity="error">
                No user is found with this username or email!
            </Alert>
        )
    }

    function getUserData(key) {
        switch (key) {
            case 'Username':
                return info.username
            case 'First Name':
                return info.firstName
            case 'Last Name':
                return info.lastName
            case 'Email':
                return info.email
            case 'Phone Number':
                return info.phoneNumber
            case 'Date Of Birth':
                return (
                    new Date(info.dateOfBirth).getDate() + '/'
                    + new Date(info.dateOfBirth).getMonth() + '/'
                    + new Date(info.dateOfBirth).getFullYear()
                )
            case 'Bio':
                return info.biography
            default:
                return null;
        }
    }

    return (
        <Stack >
            <Avatar sx={{ my: '10px', width: '80px', height: '80px', fontSize: '28px' }}
                style={{ alignSelf: 'center' }}
                alt={info.firstName}
                src="/broken-image.jpg" />
            {
                ['Username', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Date Of Birth', 'Bio'].map((item) => {
                    let data = getUserData(item)

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
        </Stack >
    )
}

export default viewUserInfo