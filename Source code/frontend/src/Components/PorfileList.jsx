import React, { useState } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, Typography, Box, Tabs, Tab, TextField, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EditIcon from '@mui/icons-material/Edit';

const ProfileListModal = ({ fishProfiles, poolProfiles, onUpdateFishProfile, onUpdatePoolProfile }) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [editingItem, setEditingItem] = useState(null);
  
  const handleClose = () => {
    setOpen(false);
    setEditingItem(null);
  };

  const handleEditFish = (index, profile) => {
    setEditingItem({
      type: 'fish',
      index,
      data: { ...profile }
    });
  };

  const handleEditPool = (index, profile) => {
    setEditingItem({
      type: 'pool',
      index,
      data: { ...profile }
    });
  };

  const handleUpdateProfile = () => {
    if (editingItem.type === 'fish') {
      onUpdateFishProfile(editingItem.index, editingItem.data);
    } else {
      onUpdatePoolProfile(editingItem.index, editingItem.data);
    }
    setEditingItem(null);
  };

  return (
    <div className="relative">
      <IconButton 
        onClick={() => setOpen(true)}
        sx={{ color: '#64B0E0', fontSize: '25px' }}
      >
        <FormatListBulletedIcon />
      </IconButton>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle className="flex justify-between items-center">
          <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
            <Tab label={`Cá (${fishProfiles.length})`} />
            <Tab label={`Hồ (${poolProfiles.length})`} />
          </Tabs>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: '#64B0E0', fontSize: '25px' }} />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          {editingItem ? (
            <Box className="p-4">
              {editingItem.type === 'fish' ? (
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Tên"
                    value={editingItem.data.Name || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Name: e.target.value }
                    })}
                  />
                  <TextField
                    label="Kích thước"
                    value={editingItem.data.Size || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Size: e.target.value }
                    })}
                  />
                  <TextField
                    label="Tuổi"
                    value={editingItem.data.Age || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Age: e.target.value }
                    })}
                  />
                  <TextField
                    label="Màu sắc"
                    value={editingItem.data.Color || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Color: e.target.value }
                    })}
                  />
                  <TextField
                    label="Mô tả"
                    value={editingItem.data.Description || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Description: e.target.value }
                    })}
                  />
                  <TextField
                    label="Giới tính"
                    value={editingItem.data.Sex || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Sex: e.target.value }
                    })}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="Tên hồ"
                    value={editingItem.data.Name || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Name: e.target.value }
                    })}
                  />
                  <TextField
                    label="Chiều rộng"
                    value={editingItem.data.Width || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Width: e.target.value }
                    })}
                  />
                  <TextField
                    label="Chiều cao"
                    value={editingItem.data.Height || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Height: e.target.value }
                    })}
                  />
                  <TextField
                    label="Độ sâu"
                    value={editingItem.data.Depth || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Depth: e.target.value }
                    })}
                  />
                  <TextField
                    label="Mô tả"
                    value={editingItem.data.Description || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      data: { ...editingItem.data, Description: e.target.value }
                    })}
                  />
                </div>
              )}
              <div className="flex justify-end gap-4 mt-4">
                <Button variant="outlined" onClick={() => setEditingItem(null)}>
                  Hủy
                </Button>
                <Button 
                  variant="contained" 
                  onClick={handleUpdateProfile}
                  style={{
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                  }}
                >
                  Cập nhật
                </Button>
              </div>
            </Box>
          ) : (
            <div>
              {activeTab === 0 ? (
                fishProfiles.map((profile, index) => (
                  <Box 
                    key={index}
                    className="p-3 mb-2 border rounded hover:bg-gray-50 flex justify-between items-start"
                  >
                    <div>
                      <Typography variant="subtitle1" className="font-medium">
                        {profile.Name || 'Chưa đặt tên'}
                      </Typography>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Kích thước: {profile.Size || 'N/A'}</div>
                        <div>Tuổi: {profile.Age || 'N/A'}</div>
                        <div>Màu sắc: {profile.Color || 'N/A'}</div>
                        <div>Mô tả: {profile.Description || 'N/A'}</div>
                        <div>Giới tính: {profile.Sex || 'N/A'}</div>
                      </div>
                    </div>
                    <IconButton onClick={() => handleEditFish(index, profile)}>
                      <EditIcon sx={{ color: '#64B0E0' }} />
                    </IconButton>
                  </Box>
                ))
              ) : (
                poolProfiles.map((profile, index) => (
                  <Box 
                    key={index}
                    className="p-3 mb-2 border rounded hover:bg-gray-50 flex justify-between items-start"
                  >
                    <div>
                      <Typography variant="subtitle1" className="font-medium">
                        {profile.Name || 'Chưa đặt tên'}
                      </Typography>
                      <div className="text-sm text-gray-600 mt-1">
                        <div>Chiều rộng: {profile.Width || 'N/A'}</div>
                        <div>Chiều cao: {profile.Height || 'N/A'}</div>
                        <div>Độ sâu: {profile.Depth || 'N/A'}</div>
                        <div>Mô tả: {profile.Description || 'N/A'}</div>
                      </div>
                    </div>
                    <IconButton onClick={() => handleEditPool(index, profile)}>
                      <EditIcon sx={{ color: '#64B0E0' }} />
                    </IconButton>
                  </Box>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProfileListModal;