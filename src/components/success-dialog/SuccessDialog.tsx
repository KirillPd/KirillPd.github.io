import * as React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
}

export const SuccessDialog: React.FC<Props> = ({ open, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        You solved the puzzle! 🎉🎉🎉
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Everything was OKay.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cool!</Button>
      </DialogActions>
    </Dialog>
  );
};
