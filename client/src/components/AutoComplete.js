import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormControl, Typography } from '@mui/material'

export default function Tags({ label, name, value, setValue }) {
    return (
        <FormControl margin="dense" variant="filled">
            <Typography sx={{ fontSize: '15px', fontWeight: 600 }} margin="none">
                {label}
            </Typography>
            <Stack spacing={3} sx={{ width: 300 }}>
                <Autocomplete
                    multiple
                    id={name}
                    options={options.map((option) => option)}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                        />
                    )}
                    onChange={e => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                />
            </Stack>
        </FormControl>
    );
}

const options = [];