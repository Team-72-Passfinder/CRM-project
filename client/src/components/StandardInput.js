import React from 'react';

import {
  FilledInput,
  FormControl,
  FormHelperText,
  Typography,
} from '@mui/material';
import { validateDate } from '@mui/lab/internal/pickers/date-utils';

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
  const invalidEmailErrorMessage = 'invalid email';
  const invalidTelErrorMessage = 'Must only contain numbers';

  function isError(val) {
    if (validateDate !== '') {
      switch (type) {
        case 'email':
          if (setErrors !== undefined) {
            if (!/\S+@\S+\.\S+/.test(val)) {
              setErrors((prev) => ({ ...prev, email: true }));
            } else {
              setErrors((prev) => ({ ...prev, email: false }));
            }
          }
          return !/\S+@\S+\.\S+/.test(val);
        case 'tel':
          return isNaN(val);
        default:
      }
    }
  }

  function generateHelperText(val) {
    if (val !== '') {
      switch (type) {
        case 'email':
          return (
            !/\S+@\S+\.\S+/.test(val) && (
              <FormHelperText error>{invalidEmailErrorMessage}</FormHelperText>
            )
          );
        case 'tel':
          return (
            isNaN(val) && (
              <FormHelperText error>{invalidTelErrorMessage}</FormHelperText>
            )
          );
        default:
      }
    }
  }

  if (label === 'Biography') {
    return (
      <FormControl margin="dense" variant="filled">
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
            setValue((prev) => ({ ...prev, [name]: e.target.value }))}
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
          isError(e.target.value);
        }}
        value={value}
        error={error}
        required={required}
        type={type}
      />
      {generateHelperText(value)}
    </FormControl>
  );
}

export default StandardInput;
