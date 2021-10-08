import React from 'react'

import { Stack, Box, Typography } from '@mui/material'
import Chip from '@mui/material/Chip';

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
            case 'Job Title':
                return info.jobTitle
            case 'Tags':
                return info.tags
            default:
                return null;
        }
    }

    return (
        <Stack>
            {
                ['Bio', 'Email', 'Phone number', 'Date Of Birth', 'Job Title', 'Tags'].map((item) => {
                    let data = getContactData(item)

                    if (data === "") {
                        return null
                    }

                    if (item === 'Job Title' || item === 'Tags') {
                        // formating as chips
                        return (
                            <Box sx={{ my: '5px' }}>
                                <Typography sx={{ fontSize: '14px', fontWeight: 400, }} color='textSecondary'>
                                    {item}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    {data.map((elem) => <Chip label={data} variant="outlined" />)}
                                </Stack>
                            </Box>
                        )
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

export default Profile