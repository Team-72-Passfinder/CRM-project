import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { FormControl, Typography } from '@mui/material'

export default function Tags({ label, name, value, setValue }) {

    const [data, setData] = React.useState([]);

    function addData(event) {
        const dup = data.indexOf(event.target.value);
        if (dup === -1) {
            setData(oldData => [...oldData, event.target.value]);
        }
        //setValue(prev => ({ ...prev, [name]: data }));
    }

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
                            <Chip variant="outlined" label={option} {...getTagProps({ index })}
                                onDelete={() => { setData(data.filter(elem => elem !== option)) }}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="filled"
                        />
                    )}
                    onChange={e => {
                        addData(e);
                        setValue(prev => ({ ...prev, [name]: data }));
                    }}
                />
            </Stack>
        </FormControl>
    );
}
