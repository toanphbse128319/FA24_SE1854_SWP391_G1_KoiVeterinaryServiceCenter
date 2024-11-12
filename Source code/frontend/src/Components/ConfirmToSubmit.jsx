import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  Dialog,
  DialogContent, 
  DialogActions,
  Typography,
  Button
} from '@mui/material';

const ConfirmDialog = ({ message, onClose, onConfirm }) => {
  return (
    <Dialog 
      open={true}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      
      <DialogActions>
        <Button 
          onClick={onClose}
          variant="outlined"
        >
          Hủy
        </Button>
        
        <Button
          onClick={() => {
            if (onConfirm) {
              onConfirm();
            }
          }}
          variant="contained"
          sx={{
            fontSize: '15px',
            background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #5299c7 25%, rgba(28, 180, 229, 0.75) 75%)'
            }
          }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const showConfirm = (message, onConfirm = null) => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);

    const cleanup = () => {
      try {
        root.unmount();
        if (document.body.contains(container)) {
          document.body.removeChild(container);
        }
      } catch (error) {
        console.error('Cleanup error:', error);
      }
    };

    const handleClose = () => {
      cleanup();
      resolve(false);
    };

    const handleConfirm = () => {
      cleanup();
      if (onConfirm) {
        onConfirm();
      }
      resolve(true);
    };

    root.render(
      <ConfirmDialog
        message={message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
    );
  });
};

window.showConfirm = showConfirm;

export default ConfirmDialog;