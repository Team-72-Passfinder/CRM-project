import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import { Tab, Tabs } from '@mui/material'
import React from 'react'

function VerticalTabs({ tabs, tab, handleTabChange }) {
    return (
        <TabContext value={tab}>
            <Tabs sx={{ padding: '20px' }} orientation="vertical" value={tab} onChange={handleTabChange}>
                {
                    tabs.map(tab => (
                        <Tab label={tab.key} key={tab.key} value={tab.key} />
                    ))
                }
            </Tabs>
            {
                tabs.map(tab => (
                    <TabPanel sx={{  borderRadius: '20px', background: 'white', justifyContent: 'center' }} key={tab.key} value={tab.key}>
                        {tab.panel}
                    </TabPanel>
                ))
            }
        </TabContext>
    )
}

export default VerticalTabs