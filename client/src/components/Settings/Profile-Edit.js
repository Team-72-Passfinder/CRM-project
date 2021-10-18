import React, { useState, useEffect } from 'react'

import { Box, Avatar, Button } from '@mui/material'
import StandardInput from '../StandardInput'

import { me, updateUserDetail } from '../../api'

const input = {
    width: '300px',
    maxWidth: '300px',
    height: '40px',
    borderRadius: '5px',
    '&.Mui-error': {
        background: '#FBB5B1',
        border: '1px solid #F9202B',
    },
    '& input:not(:placeholder-shown)': {
        height: '0px',
    }
}

function ProfileEdit({ setCurrent }) {
    const [user, setUser] = useState()

    useEffect(() => {
        me().then(res => {
            setUser({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNumber: res.phoneNumber || "",
            })
        })
    }, [])

    function saveChanges() {
        console.log(user)
        delete user.email
        updateUserDetail(user).then(res => {
            console.log(res)
            setUser({
            firstName: res.firstName,
            lastName: res.lastName,
            email: res.email,
            phoneNumber: res.phoneNumber,
            })
        }
        )
    }

    return (
        user !== undefined &&
        <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, height: '100%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'  }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: { xs: 'column', md: 'row' }, width: { md: '100%' } }}>
                <Avatar sx={{ width: '80px', height: '80px', fontSize: '28px' }} alt={user.firstName} src="/broken-image.jpg" />
                <Button sx={{ height: '40px' }}>
                    Update
                </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { sm: 'space-between' } }}>
                <Box sx={{ mr: { xs: 0, md: '20px' } }}>
                    <StandardInput sx={input} label="First name" value={user.firstName} />
                </Box>
                <StandardInput label="Last name" name="lastName" value={user.lastName} setValue={setUser} />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: { sm: 'space-between' } }}>
                <Box sx={{ mr: { xs: 0, md: '20px' } }}>
                    <StandardInput sx={input} label="Email" value={user.email} disable={true} />
                </Box>
                <StandardInput label="Phone number" name="phoneNumber" value={user.phoneNumber} setValue={setUser} type='tel' required={false} />
            </Box>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: { xs: 'center', md: 'end' }, alignItems: { md: 'end' } }}>
                <Button sx={{ width: '150px', height: '40px', background: 'gray', mt: '10px', mr: '10px' }} variant="contained" onClick={e => setCurrent()}>
                    Cancel
                </Button>
                <Button sx={{ width: '150px', height: '40px', mt: '10px' }} variant="contained" onClick={saveChanges}>
                    Save
                </Button>
            </Box>
        </Box>
    )
}

export default ProfileEdit