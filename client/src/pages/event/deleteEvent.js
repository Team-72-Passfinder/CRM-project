import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog, Button } from '@mui/material';

import { deleteEvent } from '../../api';

function DeleteEvent(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function clickDeleteEvent() {
    deleteEvent(props.eventId).then((res) => {
      handleClose();
      window.location.href = '/events/';
    });
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this event?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{ width: 30, my: '10px', mr: '10px' }}
            color="primary"
            variant="contained"
            onClick={clickDeleteEvent}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeleteEvent;
