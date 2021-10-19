import React, { useEffect, useState } from 'react'

import { Box, Button, Alert } from '@mui/material'
import StandardInput from '../StandardInput'

import { updateUserPassword } from '../../api';

function PasswordChange({ setCurrent }) {
    const [content, setContent] = useState({ oldPassword: '', newPassword: '', confirmNewPassword: '' });
    const [disableSumbit, setDisableSubmit] = useState(true)
    const [alert, setAlert] = useState('')

    function changePassword() {
        updateUserPassword(content).then(null, reason => {
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
        <Box sx={{ display: 'flex', width: { xs: '100vw', md: 'auto' }, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}>
            {alert}
            <Box sx={{ display: 'flex', width: '100%', flexDirection: { xs: 'column', md: 'row'}, justifyContent: 'center', alignItems: { xs: 'center', md: 'initial' } }}>
                <Box sx={{ mr: { md: '20px' } }}>
                    <StandardInput label="Old password" name="oldPassword" type="password" value={content.oldPassword} setValue={setContent} />
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', }}>
                    <StandardInput label="New passowrd" name="newPassword" type="password" value={content.newPassword} setValue={setContent} />
                    <StandardInput label="Confirm password" name="confirmNewPassword" type="password" value={content.confirmNewPassword} setValue={setContent} />
                </Box>
            </Box>
            <Box sx={{ display: 'flex', width: '100%', justifyContent: { xs: 'center', md: 'end' }, mt: '20px' }}>
                <Button sx={{ width: '150px', height: '40px', background: 'gray', mr: '10px' }} variant="contained" onClick={e => setCurrent()}>
                    Cancel
                </Button>
                <Button sx={{ width: '150px', height: '40px', }} variant="contained" disabled={disableSumbit} onClick={changePassword}>
                    Confirm
                </Button>
            </Box>
        </Box>
    )
}

export default PasswordChange