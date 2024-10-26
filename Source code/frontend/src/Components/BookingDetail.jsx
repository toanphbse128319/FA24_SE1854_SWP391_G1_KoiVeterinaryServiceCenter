import React, { useState, useEffect } from 'react';
import { TextField, Button, Card, CardContent, Typography, IconButton, Badge, Box, Dialog, DialogTitle, DialogContent, DialogActions, Tooltip } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const ServiceSelection = ({bookingId, services = [], isOpen, onClose, deliveryMethod }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    serviceID: '',
    NoteResult: '',
    AnimalStatusDescription: '',
    ConsultDoctor: '',
    DrugList: '',
    PoolStatusDescription: '',
    ConsultTechnician: '',
    MaterialList: ''
  });

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.Price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  const handleConfirmServices = () => {
    setShowConfirmation(true);
  };

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const handleServiceSelect = (service) => {
    const existingService = cartItems.find(item => item.ServiceID === service.ServiceID);
    if (existingService && !isEditing) {
      alert('Dịch vụ này đã có trong giỏ hàng!');
      return;
    }
    setSelectedService(service);
    setFormData({
      ...formData,
      serviceID: service.ServiceID
    });
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedCartItems = cartItems.map(item =>
        item.serviceID === formData.serviceID ? { ...selectedService, ...formData } : item
      );
      setCartItems(updatedCartItems);
      setIsEditing(false);
    } else {
      const newCartItem = {
        ...selectedService,
        ...formData
      };
      setCartItems([...cartItems, newCartItem]);
    }
    setSelectedService(null);
    setFormData({
      serviceID: '',
      NoteResult: '',
      AnimalStatusDescription: '',
      ConsultDoctor: '',
      DrugList: '',
      PoolStatusDescription: '',
      ConsultTechnician: '',
      MaterialList: ''
    });
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleRemoveFromCart = (serviceID) => {
    setCartItems(cartItems.filter(item => item.serviceID !== serviceID));
    if (formData.serviceID === serviceID) {
      setSelectedService(null);
      setFormData({
        serviceID: '',
        NoteResult: '',
        AnimalStatusDescription: '',
        ConsultDoctor: '',
        DrugList: '',
        PoolStatusDescription: '',
        ConsultTechnician: '',
        MaterialList: ''
      });
      setIsEditing(false);
    }
  };

  const handleUpdateService = (item) => {
    setSelectedService({
      ...item,
      ServiceID: item.serviceID
    });
    setFormData(item);
    setShowCart(false);
    setIsEditing(true);
  };

  const handleFinalSubmit = () => {
    console.log("Cart Items:", cartItems);
    console.log("Id booking:", bookingId);
    setShowConfirmation(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className=" rounded-lg w-11/12 max-w-6xl h-5/6 overflow-hidden relative flex flex-col" onClick={e => e.stopPropagation()}
         style={{
          background: '#E8F2F7',
      }}
      >
        <div className="absolute top-4 right-4 z-10">
          <IconButton onClick={onClose}>
          <CloseIcon sx={{ color: '#64B0E0', fontSize: '25px', }} />
          </IconButton>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 p-6 overflow-y-auto">
            <div className="flex items-center mb-4">
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Tìm kiếm dịch vụ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon className="mr-2" sx={{ color: '#64B0E0', fontSize: '26px', }} />
                }}
              />
              <Badge badgeContent={cartItems.length} color="primary" className="ml-2">
                <IconButton onClick={() => setShowCart(true)}>
                  <ShoppingCartIcon sx={{ color: '#64B0E0', fontSize: '25px', }} />
              
                </IconButton>
              </Badge>
            </div>

            <div className="space-y-4">
              {filteredServices.map((service) => (
                <Card
                  key={service.ServiceID}
                  className="hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleServiceSelect(service)}
                >
                  <CardContent>
                    <Typography variant="h6" className="font-bold">{service.Name}</Typography>
                    <Typography variant="body2" className="mt-2">{service.Description}</Typography>
                    <Typography variant="subtitle1" className="mt-2 text-blue-600">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(service.Price)}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto"
          style={{
            background: '#E8F2F7',
        }}>
            {selectedService ? (
              <Card className="p-4" >
                <Typography variant="h6" className="mb-4 font-bold">
                  {isEditing ? 'Chỉnh sửa dịch vụ: ' : 'Chi tiết dịch vụ: '}{selectedService.Name}
                </Typography>

                <TextField
                  fullWidth
                  label="Kết quả khám"
                  variant="outlined"
                  className="mb-4"
                  value={formData.NoteResult}
                  onChange={(e) => setFormData({ ...formData, NoteResult: e.target.value })}
                  multiline
                  rows={4}
                />

                {selectedService.ServiceDeliveryMethodID === 'SDM001' && (
                  <div className="space-y-4">
                    <TextField
                      fullWidth
                      label="Tình trạng động vật"
                      variant="outlined"
                      value={formData.AnimalStatusDescription}
                      onChange={(e) => setFormData({ ...formData, AnimalStatusDescription: e.target.value })}
                      multiline
                      rows={2}
                    />
                    <TextField
                      fullWidth
                      label="Bác sĩ tư vấn"
                      variant="outlined"
                      value={formData.ConsultDoctor}
                      onChange={(e) => setFormData({ ...formData, ConsultDoctor: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      label="Danh sách thuốc"
                      variant="outlined"
                      value={formData.DrugList}
                      onChange={(e) => setFormData({ ...formData, DrugList: e.target.value })}
                      multiline
                      rows={2}
                    />
                  </div>
                )}

                {selectedService.ServiceDeliveryMethodID === 'SDM003' && (
                  <div className="space-y-4">
                    <TextField
                      fullWidth
                      label="Tình trạng hồ"
                      variant="outlined"
                      value={formData.PoolStatusDescription}
                      onChange={(e) => setFormData({ ...formData, PoolStatusDescription: e.target.value })}
                      multiline
                      rows={2}
                    />
                    <TextField
                      fullWidth
                      label="Kỹ thuật viên tư vấn"
                      variant="outlined"
                      value={formData.ConsultTechnician}
                      onChange={(e) => setFormData({ ...formData, ConsultTechnician: e.target.value })}
                    />
                    <TextField
                      fullWidth
                      label="Danh sách vật tư"
                      variant="outlined"
                      value={formData.MaterialList}
                      onChange={(e) => setFormData({ ...formData, MaterialList: e.target.value })}
                      multiline
                      rows={2}
                    />
                  </div>
                )}

                <Button
                  variant="contained"
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700"
                  onClick={handleSubmit}
                  style={{
                    fontSize:'17px',
                    
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
                }}
                >
                  {isEditing ? 'Cập nhật dịch vụ' : 'Thêm vào giỏ'}
                </Button>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full">
                <Typography variant="h6" className="text-gray-400">
                  Chọn một dịch vụ để xem chi tiết
                </Typography>
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-gray-100 border-t mt-auto">
          <Button
            variant="contained"
            fullWidth
            className="h-12 "
            style={{
              fontSize:'17px',
              fontWeight:'550',
              background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)',
          }}
            onClick={handleConfirmServices}
            disabled={cartItems.length === 0}
          >
            Gửi ({cartItems.length} dịch vụ)
          </Button>
        </div>

        <Dialog
          open={showCart}
          onClose={() => setShowCart(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <span>Giỏ dịch vụ đã chọn</span>
              <IconButton onClick={() => setShowCart(false)}>
              <CloseIcon sx={{ color: '#64B0E0', fontSize: '25px', }} />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {cartItems.map((item) => (
              <Box
                key={item.serviceID}
                className="p-3 mb-2 relative hover:bg-gray-100 rounded"
              >
                <Tooltip
                  title={
                    <div>
                      {item.NoteResult && <p>Kết quả: {item.NoteResult}</p>}
                      {item.AnimalStatusDescription && <p>Tình trạng động vật: {item.AnimalStatusDescription}</p>}
                      {item.ConsultDoctor && <p>Lời dặn: {item.ConsultDoctor}</p>}
                      {item.DrugList && <p>Thuốc: {item.DrugList}</p>}
                      {item.PoolStatusDescription && <p>Tình trạng hồ: {item.PoolStatusDescription}</p>}
                      {item.ConsultTechnician && <p>Lời dặn: {item.ConsultTechnician}</p>}
                      {item.MaterialList && <p>Vật tư: {item.MaterialList}</p>}
                    </div>
                  }
                >
                  <div className="cursor-pointer" onClick={() => handleUpdateService(item)}>
                    <Typography variant="subtitle1">{item.Name}</Typography>
                    <Typography variant="body2">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.Price)}
                    </Typography>
                  </div>
                </Tooltip>
                <IconButton
                  size="small"
                  className="absolute top-2 right-2"
                  onClick={() => handleRemoveFromCart(item.serviceID)}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            ))}
          </DialogContent>
        </Dialog>

        <Dialog
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            <div className="flex justify-between items-center">
              <span>Xác nhận dịch vụ</span>
              <IconButton onClick={() => setShowConfirmation(false)}>
              <CloseIcon style={{ 
              
              
                fontSize: '64px' }} />
              </IconButton>
            </div>
          </DialogTitle>
          <DialogContent dividers>
            {cartItems.map((item) => (
              <Box
                key={item.serviceID}
                className="p-4 mb-3 bg-gray-50 rounded-lg"
              >
                <Typography variant="subtitle1" className="font-semibold">
                  {item.Name}
                </Typography>
                <Typography variant="body1" className="text-blue-600 my-1">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.Price)}
                </Typography>
                <div className="mt-2 space-y-1 text-gray-700">
                  {item.NoteResult && (
                    <Typography variant="body2">Kết quả: {item.NoteResult}</Typography>
                  )}
                  {item.AnimalStatusDescription && (
                    <Typography variant="body2">Tình trạng động vật: {item.AnimalStatusDescription}</Typography>
                  )}
                  {item.ConsultDoctor && (
                    <Typography variant="body2">Bác sĩ: {item.ConsultDoctor}</Typography>
                  )}
                  {item.DrugList && (
                    <Typography variant="body2">Thuốc: {item.DrugList}</Typography>
                  )}
                  {item.PoolStatusDescription && (
                    <Typography variant="body2">Tình trạng hồ: {item.PoolStatusDescription}</Typography>
                  )}
                  {item.ConsultTechnician && (
                    <Typography variant="body2">Kỹ thuật viên: {item.ConsultTechnician}</Typography>
                  )}
                  {item.MaterialList && (
                    <Typography variant="body2">Vật tư:
                    {item.MaterialList}</Typography>
                  )}
                </div>
              </Box>
            ))}
            <Box className="mt-4 p-4 bg-blue-50 rounded-lg">
              <Typography variant="h6" className="text-blue-800">
                Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions className="p-4">
            <Button
              onClick={() => setShowConfirmation(false)}
              variant="outlined"
              className="w-32"
            >
              Hủy
            </Button>
            <Button
              onClick={handleFinalSubmit}
              variant="contained"
              className="bg-blue-600 hover:bg-blue-700 w-32"
            >
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default ServiceSelection;