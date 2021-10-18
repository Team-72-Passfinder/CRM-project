import React from 'react';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Dialog, Button } from '@mui/material';
import { sendEmailInvite } from '../api';

function EventInvite(props) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function clickSendInvite() {
    sendEmailInvite(props.eventId).then((res) => {
      handleClose();
      window.location.reload();
    });
  }

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Invite
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Send invite to event through emails?</DialogTitle>
        <DialogActions sx={{ mr: '20px' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{ width: 30, my: '10px' }}
            color="primary"
            variant="contained"
            onClick={clickSendInvite}
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default EventInvite;
