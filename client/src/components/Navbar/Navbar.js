import React, { useState } from 'react'

import { AppBar, Toolbar, IconButton, Drawer } from '@material-ui/core'
import Menu from '@material-ui/icons/Menu'
import ChevronLeft from '@material-ui/icons/ChevronLeft'

function Navbar() {
    const [open, setOpen] = useState(false)

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={handleDrawerOpen}>
                        <Menu htmlColor='white' />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer anchor={'right'} open={open}>
                <div>
                    <IconButton>
                        <ChevronLeft onClick={handleDrawerClose} />
                    </IconButton>
                </div>
            </Drawer>
        </React.Fragment>
    )
}

export default Navbar