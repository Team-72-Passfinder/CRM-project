import React, { useState, useEffect } from 'react';

import {
  FilledInput,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';

function StandardInput({
  label,
  name,
  value,
  setValue,
  required,
  type,
  width,
  sx,
  error,
  setErrors,
}) {
  const emptyFieldErrorMessage = 'This field is required';
  const invalidEmailErrorMessage = 'invalid email';
  const invalidTelErrorMessage = 'Must only contain numbers';

  function isError() {
    if (value !== '') {
      switch (type) {
        case 'email':
          if (!/\S+@\S+\.\S+/.test(value)) {
            setErrors((prev) => ({ ...prev, email: true }));
          } else {
            setErrors((prev) => ({ ...prev, email: false }));
          }
          return !/\S+@\S+\.\S+/.test(value);
        case 'tel':
          return isNaN(value);
        default:
      }
    }
  }

  function generateHelperText() {
    if (value !== '') {
      switch (type) {
        case 'email':
          return (
            !/\S+@\S+\.\S+/.test(value) && (
              <FormHelperText error>{invalidEmailErrorMessage}</FormHelperText>
            )
          );
        case 'tel':
          return (
            isNaN(value) && (
              <FormHelperText error>{invalidTelErrorMessage}</FormHelperText>
            )
          );
        default:
      }
    }
  }

  if (label === 'Biography') {
    return (
      <FormControl margin="dense" variant="filled" error={true}>
        <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
          {label}
          {required && '*'}
        </Typography>
        <FilledInput
          id={name}
          sx={{
            width: '300px',
            borderRadius: '5px',
            '&.Mui-error': {
              background: '#FBB5B1',
              border: '1px solid #F9202B',
            },
            '& input:not(:placeholder-shown)': {
              height: '0px',
            },
          }}
          multiline
          disableUnderline={true}
          hiddenLabel={true}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [name]: e.target.value }))
          }
          error={true}
          required={required}
        />
        {generateHelperText()}
      </FormControl>
    );
  }

  return (
    <FormControl margin="dense" variant="filled">
      <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
        {label}
        {required && '*'}
      </Typography>
      <FilledInput
        id={name}
        sx={
          sx || {
            width: `${(width !== undefined && width) || '300px'}`,
            maxWidth: '300px',
            height: '40px',
            borderRadius: '5px',
            '&.Mui-error': {
              background: '#FBB5B1',
              border: '1px solid #F9202B',
            },
            '& input:not(:placeholder-shown)': {
              height: '0px',
            },
          }
        }
        disableUnderline={true}
        hiddenLabel={true}
        onChange={(e) => {
          setValue((prev) => ({ ...prev, [name]: e.target.value }));
          isError();
        }}
        value={value}
        error={error}
        required={required}
        type={type}
      />
      {generateHelperText()}
    </FormControl>
  );
}

export default StandardInput;
