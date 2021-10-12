import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'

import PersonIcon from '@mui/icons-material/Person'
import EventIcon from '@mui/icons-material/Event'

import { Tabs, Tab, Stack, Box, Typography } from '@mui/material'

const tabStyle = {
    minWidth: '50px',
    maxWidth: '50px',
    height: '50px',
    margin: '10px 10px',
    '&.Mui-selected': {
        color: 'white',
        zIndex: 1,
    }
}

function IconPillTabs({ profilePanel, eventsPanel, tab, handleTabChange, setTab }) {
    return (
        <TabContext value={tab}>
            <Tabs
                sx={{
                    minHeight: '70px',
                    background: '#F7F7F7',
                    borderRadius: '10px',
                }}
                TabIndicatorProps={{
                    style: {
                        width: '50px',
                        height: '50px',
                        margin: '10px 0px',
                        borderRadius: '10px',
                        background: '#DF7861',
                        boxShadow: '6px 6px 10px rgba(223, 120, 97, 0.25)',
                        zIndex: 0
                    },
                }}
                value={tab}
                onChange={handleTabChange}
            >
                <Tab
                    sx={tabStyle}
                    icon={<PersonIcon />}
                    value="Profile"
                />
                <Tab
                    sx={tabStyle}
                    icon={<EventIcon />}
                    value="Events"
                />
            </Tabs>
            <TabPanel value="Profile">
                <Stack>
                    {profilePanel}
                </Stack>
            </TabPanel>
            <TabPanel value="Events">
                <Stack>
                    {eventsPanel}
                </Stack>
            </TabPanel>
        </TabContext>
    )
}

export default IconPillTabs