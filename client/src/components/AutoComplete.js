import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormControl, Typography } from '@mui/material';

export default function Tags({ label, name, value, setValue }) {
  const [data, setData] = React.useState([]);

  return (
    <FormControl margin="dense" variant="filled">
      <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
        {label}
      </Typography>
      <Stack spacing={3} sx={{ width: 300 }}>
        <Autocomplete
          multiple
          id={name}
          value={data}
          options={[].map((option) => option)}
          freeSolo
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                onDelete={() => {
                  setValue((prev) => ({
                    ...prev,
                    [name]: data.filter((elem) => elem !== option),
                  }));
                  setData(data.filter((elem) => elem !== option));
                }}
              />
            ))
          }
          renderInput={(params) => <TextField {...params} variant="filled" />}
          onChange={(e, newVal) => {
            setValue((prev) => ({ ...prev, [name]: newVal }));
            setData(newVal);
          }}
        />
      </Stack>
    </FormControl>
  );
}
