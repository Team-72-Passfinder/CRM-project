import React from 'react'

import { Tabs, Tab, } from '@mui/material'

function PillTab({ tab, handleTabChange }) {
    return (
        <Tabs
            sx={{
                width: '368px',
                maxWidth: '90vw',
                height: '40px',
                minHeight: '30px',
                background: '#F7F7F7',
                borderRadius: '30px',
                mb: '10px',
            }}
            TabIndicatorProps={{
                style: {
                    height: '100%',
                    background: '#DF7861',
                    borderRadius: '30px',
                    zIndex: 0
                },
            }}
            variant='fullWidth'
            value={tab}
            onChange={handleTabChange}
        >
            <Tab
                sx={{
                    height: '40px',
                    minHeight: '40px',
                    fontWeight: 600,
                    borderRadius: '30px',
                    '&.Mui-selected': {
                        color: 'white',
                        boxShadow: '4px 4px 20px 5px rgba(223, 120, 97, 0.25)',
                        zIndex: 1
                    }
                }}
                value="All"
                label="All"
            />
            <Tab
                sx={{
                    height: '40px',
                    minHeight: '40px',
                    fontWeight: 600,
                    borderRadius: '30px',
                    '&.Mui-selected': {
                        color: 'white',
                        boxShadow: '-4px -4px 20px 5px rgba(223, 120, 97, 0.25)',
                        zIndex: 1
                    }
                }}
                value="User"
                label="User"
            />
        </Tabs>
    )
}

export default PillTab;