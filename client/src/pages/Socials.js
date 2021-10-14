import React, { useEffect, useState, useRef } from 'react'

import { Box, Typography, Fab, IconButton, Dialog, DialogTitle, DialogContent, Select, MenuItem, Autocomplete, TextField } from '@mui/material'

import SortIcon from '@mui/icons-material/Sort';
import AddIcon from '@mui/icons-material/Add';

import { getContacts } from '../api'
import Navbar from '../components/Navbar'

import AddContact from '../components/Socials/AddContact';
import Header from '../components/Socials/Header';
import ContactList from '../components/Socials/ContactList';

function Socials() {
    const [contacts, setContacts] = useState([])
    const [search, setSearch] = useState('')
    const [tab, setTab] = useState('All')
    const [open, setOpen] = React.useState(false)
    const [openDialog, setOpenDialog] = useState(false)
    const [sortBy, setSortBy] = useState("Recently added")
    const [filter, setFilter] = useState([])

    const progressing = useRef(true);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    function handleOpenDialog() {
        setOpenDialog(prev => !prev)
    }

    function sort(data) {
        return data.sort((a, b) => {
            switch (sortBy) {
                case "Oldest added":
                    return new Date(a.createdAt) - new Date(b.createdAt)
                case "Recently added":
                    return new Date(b.createdAt) - new Date(a.createdAt)
                default:
                    return new Date(b.createdAt) - new Date(a.createdAt)
            }
        })
    }

    // Used to get contact list when the page loads.
    useEffect(() => {
        getContacts().then(res => {
            setTimeout(() => {
                progressing.current = false
                setContacts(res)
            }, 200)
        })
    }, [])

    useEffect(() => {
        sort(contacts)
    }, [sortBy])

    return (
        <Box 
            sx={{
                display: 'flex',
                overflow: { xs: 'hidden', },
                flexDirection: { xs: 'column', sm: 'row' },
                width: '100vw',
                height: '100vh',
                background: { xs: 'white', sm: '#F7F7F7' }
            }} 
        >
            <Navbar active="Socials" />
            <Box sx={{ flexGrow: { xs: 0, sm: 1 }, display: { sm: 'flex' }, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', height: '90vh', background: '#F7F7F7', }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: { xs: '100%',  sm: '500px', md: '400px', lg: '600px' }, maxWidth: { xs: '100%' }, background: 'white', borderRadius: { xs: '0px', sm: '20px' }, paddingY: { xs: 0, sm: '20px' }, boxShadow: { xs: 'none', sm: '4px 4px 4px rgba(0, 0, 0, 0.25)'}, }}>
                        <Header handleClickOpen={handleClickOpen} sortBy={sortBy} setSortBy={setSortBy} setSearch={setSearch} tab={tab} handleTabChange={handleTabChange} />
                        <ContactList contacts={contacts} search={search} filter={filter} progressing={progressing} />
                    </Box>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', alignItems: 'center', width: '300px', height: '400px', background: 'white', mx: '20px', borderRadius: '20px', paddingY: '30px', boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.25)', }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                            <Typography sx={{ fontSize: '22px', fontWeight: 500, mb: '20px', }}>
                                Search filter
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%' }}>
                            <Typography sx={{ fontWeight: 600 }}>
                                Sort by
                            </Typography>
                            <Select
                                value={sortBy}
                                variant="standard"
                                onChange={e => setSortBy(e.target.value)}
                                disableUnderline
                            >
                                <MenuItem value="Oldest added">
                                    Oldest added
                                </MenuItem>
                                <MenuItem value="Recently added">
                                    Recently added
                                </MenuItem>
                                <MenuItem value="Recently viewed">
                                    Recently viewed
                                </MenuItem>
                                <MenuItem value="Least contacted">
                                    Least contacted
                                </MenuItem>
                            </Select>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '80%', my: '20px' }}>
                            <Typography sx={{ fontWeight: 600 }}>
                                Tags
                            </Typography>
                            <Autocomplete
                                id="auto"
                                multiple
                                options={['family', 'assistant']}
                                onChange={(event, newValue) => { setFilter(newValue) }}
                                value={filter}
                                disableClearable
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
            <Fab sx={{ position: 'fixed', right: 16, bottom: 16, display: { md: 'none' } }} onClick={handleOpenDialog}>
                <SortIcon />
            </Fab>
            {/* Add dialog content here */}
            <Dialog open={openDialog} onClose={handleOpenDialog}  fullWidth>
                <DialogTitle>
                    Search filter
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography>
                            Sort by
                        </Typography>
                        <Select 
                            value={sortBy}
                            variant="standard"
                            onChange={e => setSortBy(e.target.value)}
                            disableUnderline
                        >
                            <MenuItem value="Oldest added">
                                Oldest added
                            </MenuItem>
                            <MenuItem value="Recently added">
                                Recently added
                            </MenuItem>
                            <MenuItem value="Recently viewed">
                                Recently viewed
                            </MenuItem>
                            <MenuItem value="Least contacted">
                                Least contacted
                            </MenuItem>
                        </Select>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Typography>
                            Tags
                        </Typography>
                        <Autocomplete
                            id="auto"
                            multiple
                            options={['family', 'assistant']}
                            onChange={(event, newValue) => {setFilter(newValue)}}
                            value={filter}
                            disableClearable
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                />
                            )}
                        />
                    </Box>
                </DialogContent>
            </Dialog>
            <AddContact open={open} setOpen={setOpen} contacts={contacts} setContacts={setContacts} progressing={progressing} />
        </Box>
    )
}

export default Socials