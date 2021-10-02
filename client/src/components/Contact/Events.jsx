import React from 'react'

import { Stack, Card, CardContent, Box, Typography, AvatarGroup } from '@mui/material'

const months = [
    { key: 1, value: 'January' },
    { key: 2, value: 'February' },
    { key: 3, value: 'March' },
    { key: 4, value: 'April' },
    { key: 5, value: 'May' },
    { key: 6, value: 'June' },
    { key: 7, value: 'July' },
    { key: 8, value: 'August' },
    { key: 9, value: 'September' },
    { key: 10, value: 'October' },
    { key: 11, value: 'November' },
    { key: 12, value: 'December' },
]

function Events({ events }) {
    return (
        <Stack>
            {
                events.map(event => (
                    <Card sx={{ my: '10px', background: 'white', borderRadius: '10px' }} raised>
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'row', }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContents: 'center', mr: '20px' }}>
                                    <Typography sx={{ fontSize: '24px', fontWeight: 900, color: '#272727' }}>
                                        {new Date(event.dateTime).getDate()}
                                    </Typography>
                                    <Typography sx={{ fontSize: '14px', fontWeight: 400, color: '#272727' }}>
                                        {months[new Date(event.dateTime).getMonth()].value.substring(0, 3)}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'column', color: '#272727' }}>
                                    <Typography sx={{ fontSize: '16px', fontWeight: 700, my: '5px' }}>
                                        {event.name}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '300' }}>
                                        {new Date(event.dateTime).toTimeString().substring(0,5)}
                                    </Typography>
                                    <AvatarGroup max={3}>
                                        {

                                        }
                                    </AvatarGroup>
                                </Box>
                            </Box>
                        </CardContent>
                    </Card>
                ))
            }
        </Stack>
    )
}

export default Events