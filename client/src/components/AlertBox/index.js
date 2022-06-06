import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Sbutton from '../Sbutton';

// Popup alertbox for confirmation message
const AlertBox = ({open, setOpen, alert}) => {

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div >
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Done</DialogTitle>
        <DialogContent>
            <DialogContentText>
                {alert}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Sbutton text="Ok" onClick={handleClose} />
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AlertBox;