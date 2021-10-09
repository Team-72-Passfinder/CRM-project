import React, { useEffect, useState } from 'react';

import { Stack, Avatar, TextField, Box, Button } from '@mui/material';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import DatePicker from '@mui/lab/DatePicker';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

import { getContact, updateContact } from '../../api';
import Navbar from '../../components/Navbar';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

const formList = [
  {
    label: 'First Name',
    type: 'text',
    required: true,
  },
  {
    label: 'Last Name',
    type: 'text',
    required: true,
  },
  {
    label: 'Date of Birth',
    type: 'date',
  },
  {
    label: 'Email',
    type: 'email',
  },
  {
    label: 'Phone number',
    type: 'tel',
  },
  {
    label: 'Job Title',
    type: 'tags',
  },
  {
    label: 'Tags',
    type: 'tags',
  },
  {
    label: 'Biography',
    type: 'para',
  },
];

function EditContact() {
  const [contact, setContact] = useState();

  const emptyFieldErrorMessage = 'This field is required';
  const invalidEmailErrorMessage = 'invalid email';
  const invalidTelErrorMessage = 'Must only contain numbers';

  useEffect(() => {
    getContact(window.location.pathname.split('/')[3]).then((res) =>
      setContact(res)
    );
  }, []);

  function callSave() {
    updateContact(contact);
    window.location.href = '/socials/' + contact._id
  }

  function getContactData(key) {
    switch (key) {
      case 'First Name':
        return contact.firstName;
      case 'Last Name':
        return contact.lastName;
      case 'Bio':
        return contact.biography;
      case 'Email':
        return contact.email;
      case 'Phone number':
        return contact.phoneNumber;
      case 'Date of Birth':
        return new Date(contact.dateOfBirth);
      case 'Job Title':
        return contact.jobTitle;
      case 'Tags':
        return contact.tags;
      case 'Biography':
        return contact.biography;
      default:
        return null;
    }
  }

  function setContactData(key, value) {
    switch (key) {
      case 'First Name':
        setContact((prev) => ({ ...prev, firstName: value }));
        break;
      case 'Email':
        setContact((prev) => ({ ...prev, email: value }));
        break;
      case 'Date of Birth':
        setContact((prev) => ({ ...prev, dateOfBirth: value }));
        break;
      case 'Phone number':
        setContact((prev) => ({ ...prev, phoneNumber: value }));
        break;
      case 'Job Title':
        setContact((prev) => ({ ...prev, jobTitle: value }));
        break;
      case 'Tags':
        setContact((prev) => ({ ...prev, tags: value }));
        break;
      case 'Biography':
        setContact((prev) => ({ ...prev, biography: value }));
        break;
      default:
        break;
    }
  }

  function generateHelperText(element) {
    if (element.required) {
      return getContactData(element.label) === '' && emptyFieldErrorMessage;
    }

    if (getContactData(element.label) !== '') {
      switch (element.type) {
        case 'email':
          return (
            !/\S+@\S+\.\S+/.test(contact.email) && invalidEmailErrorMessage
          );
        case 'tel':
          return isNaN(contact.phoneNumber) && invalidTelErrorMessage;
        default:
      }
    }
  }

  function isError(element) {
    if (element.required) {
      return getContactData(element.label) === '';
    }
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <div>
        <Navbar />
        <Stack
          sx={{ my: 2 }}
          alignItems="center"
          spacing={2}
        >
          <div key="avatar">
            <input
              id="uploadImage"
              accept="image/*"
              type="file"
              style={{ display: 'none' }}
            />
            <label htmlFor="uploadImage">
              {contact !== null || contact.avatar === '' ? (
                <Avatar
                  key="avatar"
                  sx={{
                    width: 70,
                    height: 70,
                  }}
                >
                  <AddAPhotoIcon />
                </Avatar>
              ) : (
                <Avatar></Avatar>
              )}
            </label>
          </div>
          {contact && (
            <React.Fragment>
              {contact !== undefined &&
                formList.map((element) => {
                  switch (element.type) {
                    //Case of displaying date
                    case 'date':
                      return (
                        <React.Fragment key={element.label}>
                          <DatePicker
                            disableFuture
                            label={element.label}
                            value={getContactData(element.label)}
                            onChange={(newValue) => {
                              setContactData(element.label, newValue);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{ width: '300px', maxWidth: '80vw' }}
                                size="small"
                              />
                            )}
                          />
                        </React.Fragment>
                      );
                    // Case of tags displaying
                    case 'tags':
                      return (
                        <Stack spacing={3} sx={{ width: 300 }} >
                          <Autocomplete
                            multiple
                            defaultValue={getContactData(element.label)}
                            options={[].map((option) => option)}
                            freeSolo
                            renderTags={(value, getTagProps) =>
                              value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                              ))
                            }
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                key={element.label}
                                label={element.label}
                              />
                            )}
                            onChange={(e) =>
                              setContactData(element.label, e.target.value)
                            }
                          />
                        </Stack>
                      );
                    // Case of bio text paragraph
                    case 'para':
                      return (
                        <TextField
                          key={element.label}
                          sx={{
                            width: '300px',
                          }}
                          multiline
                          label={element.label}
                          type={element.type}
                          size="small"
                          onChange={(e) =>
                            setContactData(element.label, e.target.value)
                          }
                          defaultValue={getContactData(element.label)}
                        />
                      );
                    // Normal text box 
                    default:
                      return (
                        <TextField
                          key={element.label}
                          sx={{
                            width: '300px',
                            maxWidth: '80vw',
                          }}
                          label={element.label}
                          type={element.type}
                          size="small"
                          error={isError(element)}
                          onChange={(e) =>
                            setContactData(element.label, e.target.value)
                          }
                          defaultValue={getContactData(element.label)}
                          helperText={generateHelperText(element)}
                        />
                      );
                  }
                })}
            </React.Fragment>
          )}
          <Button
            sx={{ width: '300px', maxWidth: '80vw' }}
            variant="contained"
            onClick={callSave}
          >
            Save
          </Button>
        </Stack>
      </div>
    </LocalizationProvider>
  );
}

export default EditContact;
