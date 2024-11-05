import React, { useState } from 'react';
import Map from './MapPicker'
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box
} from '@mui/material';

const CustomerEditDialog = ({ open, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState({
    phone: initialData.phone || '',
    address: initialData.address || ''
  });

  const [errors, setErrors] = useState({});
  const [adddress, setAdddress] = useState(formData.address);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.phone.match(/^\d{10}$/)) {
      newErrors.phone = 'Số điện thoại phải có 10 chữ số';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Vui lòng nhập địa chỉ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
      onClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle
        sx={{
          background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
          color: 'white',
          fontWeight: 700
        }}
      >
        Cập nhật thông tin liên lạc
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 1 }}>
          <TextField
            fullWidth
            label="Số điện thoại"
            value={formData.phone}
            text='number'
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            error={!!errors.phone}
            helperText={errors.phone}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Địa chỉ"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            error={!!errors.address}
            helperText={errors.address}
            multiline
            rows={1}
            variant="outlined"
          />
          <div style={{
            width:'100%',
            height:'35vh',
          }}>
          <Map
          address={formData.address}
          />
          </div>
        
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: '#f5f5f5',
            color: '#333',
            '&:hover': {
              backgroundColor: '#e0e0e0'
            }
          }}
        >
          Hủy
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{
            background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
            '&:hover': {
              background: 'linear-gradient(90deg, #5299c7 25%, rgba(20, 180, 230, 0.75) 75%)'
            }
          }}
        >
          Lưu thay đổi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CustomerSummary = ({ name, phone, address, onUpdateInfo }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Box sx={{ maxWidth: '450px', width: '100%' }}>
      <Card 
        elevation={3} 
        sx={{ 
          borderRadius: '15px',
          overflow: 'hidden'
        }}
      >
        <CardHeader
          sx={{
            background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
            color: 'white',
          }}
          title={
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              Thông tin khách đặt hẹn
            </Typography>
          }
        />
        
        <CardContent>
          <Box sx={{ mb: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                Tên:
              </Typography>
              <Typography sx={{ ml: 1, fontSize: '20px' }}>
                {name}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                Số điện thoại:
              </Typography>
              <Typography sx={{ ml: 1, fontSize: '20px' }}>
                {phone}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold', fontSize: '20px' }}>
                Địa chỉ:
              </Typography>
              <Typography sx={{ ml: 1, fontSize: '20px' }}>
                {address}
              </Typography>
            </Box>
          </Box>
        </CardContent>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
          <Button
            variant="contained"
            onClick={() => setDialogOpen(true)}
            sx={{
              background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
              fontWeight: 'bold',
              padding: '10px',
              borderRadius: '10px',
              '&:hover': {
                background: 'linear-gradient(90deg, #5299c7 25%, rgba(20, 180, 230, 0.75) 75%)'
              }
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              Thay đổi thông tin<br />liên lạc
            </Typography>
          </Button>
        </Box>
      </Card>

      <CustomerEditDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={onUpdateInfo}
        initialData={{ phone, address }}
      />
    </Box>
  );
};

export default CustomerSummary;