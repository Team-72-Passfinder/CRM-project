import React, { useEffect, useState } from 'react';

import {
  Box, Dialog, Slide, IconButton, AppBar, Toolbar, Typography, Avatar, FilledInput, FormControl, Button, Alert, Tabs, Tab, InputBase, Paper, Stack
} from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';
import CreateIcon from '@mui/icons-material/Create';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import StandardInput from '../../components/StandardInput';
import AutoComplete from '../../components/AutoComplete';
import ViewUserInfo from '../../components/Contact/ViewUserInfo';

import { addContact, getContacts, searchUser, addByUserId } from '../../api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function AddContact({ open, setOpen, setContacts, progressing }) {
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: new Date(),
    biography: '',
    jobTitle: [],
    tags: [],
  });
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [addDisable, setAddDisable] = useState(true);
  const [alert, setAlert] = useState();
  const [user, setUser] = useState();
  const [tab, setTab] = useState('Add manually');
  const [search, setSearch] = useState('')

  const handleClose = () => {
    setOpen(false);
  };

  const tabStyle = {
    minWidth: '50px',
    maxWidth: '50px',
    height: '50px',
    margin: '10px 10px', '&.Mui-selected': { color: 'white', zIndex: 1, }
  }
  const wrapperBoxStyle = {
    display: 'flex',
    width: '100vw',
    flexDirection: 'column',
    alignItems: 'center',
  }

  function saveContact() {
    addContact(contact).then(
      (res) => {
        if (
          contact.firstName === res.firstName &&
          contact.lastName === res.lastName
        ) {
          progressing.current = true;
          handleClose();
          getContacts().then((res) => {
            setTimeout(() => {
              progressing.current = false;
              setContacts(res);
            }, 200);
          });
        }
      },
      (reason) => {
        setAlert(<Alert severity="error">Failed to save contact</Alert>);
      }
    );
  }

  function handleSearchUser() {
    searchUser(search).then(res => {
      // If error message: 404/400/500
      if (!res) {
        setUser({ status: 'error' });
        setAddDisable(true);
        return;
      }
      // Else, set user's info
      setUser(res);
      setAddDisable(false);
    });
  }

  // Used to add from user
  function add() {
    addByUserId(user._id).then(
      (res) => {
        if (res) {
          //window.location.href = '/socials/' + res._id
          progressing.current = true;
          handleClose();
          getContacts().then((res) => {
            setTimeout(() => {
              progressing.current = false;
              setContacts(res);
            }, 200);
          },

            (reason) => {
              setAlert(<Alert severity="error">Failed to add contact</Alert>);
            }
          );
        }
      });
  }

  useEffect(() => {
    const inputs = document.querySelectorAll('input');

    Array.from(inputs).filter((input) => {
      if (input.required === true) {
        if (!input.validity.valid) {
          setSubmitDisabled(true);
        } else {
          setSubmitDisabled(false);
        }
      }
    });
  }, [contact]);

  useEffect(() => {
    if (contact.firstName === '' || contact.lastName === '') {
      setSubmitDisabled(true);
    } else {
      setSubmitDisabled(false);
    }
  }, [contact]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ background: 'white', boxShadow: 'none' }} position="static">
        <Toolbar>
          <IconButton
            sx={{
              color: 'black',
            }}
            edge="start"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={wrapperBoxStyle} >
        <TabContext value={tab}>
          <Tabs
            //orientation="vertical"
            sx={{ minHeight: '70px', background: '#F7F7F7', borderRadius: '5px', }}
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
            onChange={(e, newVal) => setTab(newVal)}
          >
            <Tab
              sx={tabStyle}
              icon={<CreateIcon />}
              value="Add manually"
            />
            <Tab
              sx={tabStyle}
              icon={<AccountBoxIcon />}
              value="Add from user"
            />
          </Tabs>
          <TabPanel value="Add manually">
            <Box sx={wrapperBoxStyle} >
              <Box
                sx={{ width: '300px', justifyContent: 'center', mt: '10px', mb: '20px', }} >
                <Typography sx={{ fontSize: '24px', fontWeight: 700 }}>
                  Contact form
                </Typography>
              </Box>
              {alert}
              <div key="avatar">
                <input id="uploadImage" accept="image/*" type="file" style={{ display: 'none' }} />
                <label htmlFor="uploadImage">
                  <Avatar key="avatar" sx={{ width: 70, height: 70, }} >
                    <AddAPhotoIcon />
                  </Avatar>
                </label>
              </div>
              <StandardInput id="firstName" label="First name" name="firstName" value={contact.firstName} setValue={setContact} required={true} type="text" />
              <StandardInput id="lastName" label="Last name" name="lastName" value={contact.lastName} setValue={setContact} required={true} type="text" />
              <StandardInput id="email" label="Email" name="email" value={contact.email} setValue={setContact} required={false} type="email" />
              <StandardInput id="phoneNumber" label="Phone number" name="phoneNumber" value={contact.phoneNumber} setValue={setContact} required={false} type="tel" />
              <StandardInput id="biography" label="Biography" name="biography" value={contact.biography} setValue={setContact} required={false} type="text" />
              <AutoComplete id="jobTitle" label="Job Title" name="jobTitle" value={contact.jobTitle} setValue={setContact} />
              <AutoComplete id="tags" label="Tags" name="tags" value={contact.tags} setValue={setContact} />
              <LocalizationProvider dateAdapter={DateAdapter}>
                <FormControl margin="dense" variant="filled">
                  <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none" >
                    Date of birth
                  </Typography>
                  <DatePicker
                    id="dateOfBirth"
                    value={contact.dateOfBirth}
                    disableFuture
                    onChange={(newValue) => {
                      setContact((prev) => ({ ...prev, dateOfBirth: newValue }));
                    }}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <FilledInput
                          sx={{
                            width: '300px',
                            height: '40px',
                            borderRadius: '5px',
                            '&.Mui-error': {
                              background: '#FBB5B1',
                              border: '1px solid #F9202B',
                            },
                            '& input:not(:placeholder-shown)': {
                              height: '0px',
                            },
                          }}
                          disableUnderline={true}
                          hiddenLabel={true}
                          endAdornment={InputProps?.endAdornment}
                          ref={inputRef}
                          {...inputProps}
                        />
                      </Box>
                    )}
                  />
                </FormControl>
              </LocalizationProvider>
              <Button
                sx={{
                  width: 300,
                  my: '10px',
                  '&.MuiButton-disableElevation': {
                    boxShadow: `(${submitDisabled} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'`,
                  },
                }}
                color="primary"
                variant="contained"
                disableElevation
                disabled={submitDisabled}
                onClick={saveContact}
              >
                Save
              </Button>
            </Box>
          </TabPanel>

          <TabPanel value="Add from user">
            <Box sx={wrapperBoxStyle} >
              <Box
                sx={{ width: '300px', justifyContent: 'center', mt: '10px', mb: '20px', }} >
                <Typography sx={{ fontSize: '21px', fontWeight: 600 }}>
                  Search with username or email
                </Typography>
                <Stack
                  sx={{ width: '350px', maxWidth: '90vw', }}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Paper sx={{ background: '#EBEBEB', width: '316px', maxWidth: '90%', mr: '10px', my: '10px' }} elevation={0}>
                    <InputBase sx={{ ml: '10px', height: '30px', width: '296px', maxWidth: '90%' }} placeholder='Search with username/email' onChange={(e) => { setSearch(e.target.value) }} />
                  </Paper>
                  <IconButton color="primary" size="large" onClick={handleSearchUser}>
                    <ArrowForwardIcon />
                  </IconButton>
                </Stack>
                <ViewUserInfo info={user} />
              </Box>
              <Button
                sx={{
                  width: 300,
                  my: '10px',
                  '&.MuiButton-disableElevation': {
                    boxShadow: `(${addDisable} && 'none') || '4px 4px 20px 5px rgba(223, 120, 97, 0.25)'`,
                  },
                }}
                color="primary"
                variant="contained"
                disableElevation
                disabled={addDisable}
                onClick={add}
              >
                Add
              </Button>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Dialog>
  );
}

export default AddContact;
