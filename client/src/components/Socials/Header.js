/* eslint-disable no-useless-escape */
import React from 'react';

import { Box, Stack, Paper, InputBase, IconButton } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import PillTab from './PillTabs';

function Header({
  sortBy,
  setSortBy,
  setSearch,
  handleClickOpen,
  tab,
  handleTabChange,
}) {
  return (
    <Box>
      <Stack
        sx={{
          width: '368px',
          maxWidth: '90vw',
        }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Paper
          sx={{
            background: '#EBEBEB',
            width: '316px',
            maxWidth: '90%',
            mr: '10px',
            my: '10px',
          }}
          elevation={0}
        >
          <InputBase
            sx={{ ml: '10px', width: '296px', maxWidth: '90%' }}
            placeholder="Search for contacts"
            onChange={(e) => {
              setSearch(
                e.target.value.replace(
                  /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                  '\\$&'
                )
              );
            }}
          />
        </Paper>
        <IconButton onClick={handleClickOpen} size="large">
          <AddIcon />
        </IconButton>
      </Stack>
      <PillTab tab={tab} handleTabChange={handleTabChange} />
    </Box>
  );
}

export default Header;
