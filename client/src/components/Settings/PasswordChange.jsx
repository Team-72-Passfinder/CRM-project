import React, { useEffect, useState } from 'react'

import { Box, Button, Alert } from '@mui/material'
import StandardInput from '../StandardInput'

import { updateUser } from '../../api';

function PasswordChange() {
    const [content, setContent] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    const [disableSumbit, setDisableSubmit] = useState(true)
    const [alert, setAlert] = useState('')

    function changePassword() {
        updateUser(content).then(null, reason => {
            if (reason === 'Wrong password') {
                setAlert(
                    <Alert severity='error'>
                        Wrong existing password
                    </Alert>
                )
            }
        })
    }

    useEffect(() => {
        if(content.confirmNewPassword !== '' && content.confirmNewPassword !== content.newPassword) {
            setAlert(<Alert severity="error">New password do not match</Alert>)
        } else {
            setAlert()
        }
        
        if(content.oldPassword && content.newPassword && content.confirmNewPassword) {
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [content])

    return (
        <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', }}>
            {alert}
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'center', }}>
                <Box sx={{ mr: '40px' }}>
                    <StandardInput label="Old password" name="oldPassword" value={content.oldPassword} setValue={setContent} />
                </Box>
                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', justifyContent: 'center', }}>
                    <StandardInput label="New passowrd" name="newPassword" value={content.newPassword} setValue={setContent} />
                    <StandardInput label="Confirm password" name="confirmNewPassword" value={content.confirmNewPassword} setValue={setContent} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: 'end', alignItems: 'end' }}>
                <Button sx={{ width: '200px', height: '40px', mt: '40px' }} variant="contained" disabled={disableSumbit} onClick={changePassword}>
                    Confirm
                </Button>
            </Box>
        </Box>
    )
}

export default PasswordChange