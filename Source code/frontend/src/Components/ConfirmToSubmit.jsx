import React from 'react';
import ReactDOM from 'react-dom';
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
      maxWidth="sm"
      fullWidth
    >
      <DialogContent className="py-6">
        <Typography className="text-center text-lg">
          {message}
        </Typography>
      </DialogContent>
      <DialogActions className="bg-gray-50 p-4">
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            fontSize:'15px',
           
          }}
        >
          Hủy
        </Button>
        <Button
          onClick={() => {
            if (onConfirm) {
              onConfirm();
            }
            onClose();
          }}
          variant="contained" 
         
          sx={{
            fontSize:'15px',
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

// Khởi tạo function để show confirm dialog
const showConfirm = (message, onConfirm = null) => {
  return new Promise((resolve) => {
    const containerElement = document.createElement('div');
    document.body.appendChild(containerElement);

    const handleClose = () => {
      ReactDOM.unmountComponentAtNode(containerElement);
      document.body.removeChild(containerElement);
      resolve(false);
    };

    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }
      ReactDOM.unmountComponentAtNode(containerElement);
      document.body.removeChild(containerElement);
      resolve(true);
    };

    ReactDOM.render(
      <ConfirmDialog
        message={message}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />,
      containerElement
    );
  });
};

// Gắn function vào window object
window.showConfirm = showConfirm;

export default ConfirmDialog;