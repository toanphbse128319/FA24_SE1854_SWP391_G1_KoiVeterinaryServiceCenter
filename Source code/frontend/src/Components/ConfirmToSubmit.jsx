import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    Typography,
    DialogActions,
  } from '@mui/material';

const SimpleConfirmationDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className="py-6">
        <Typography className="text-center text-lg">
          Tôi đã kiểm tra và xác nhận tất cả thông tin là chính xác
        </Typography>
      </DialogContent>
      <DialogActions className="bg-gray-50 p-4">
        <Button 
          onClick={onClose}
          variant="outlined"
          className="w-24"
        >
          Hủy
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          className="w-24 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SimpleConfirmationDialog;