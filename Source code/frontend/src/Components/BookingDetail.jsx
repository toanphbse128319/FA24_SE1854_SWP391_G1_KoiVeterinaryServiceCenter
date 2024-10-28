import React, { useState, useEffect } from 'react';
import { 
  Alert,
  Badge,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography 
} from '@mui/material';

import { 
  Search as SearchIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  ReceiptLong as ReceiptLongIcon,
  ShoppingCart as ShoppingCartIcon 
} from '@mui/icons-material';

// Sub-components

import ProfileListModal from './PorfileList';

// Constants
const INITIAL_FORM_STATE = {
  serviceID: '',
  NoteResult: '',
  AnimalStatusDescription: '',
  ConsultDoctor: '',
  DrugList: '',
  PoolStatusDescription: '',
  ConsultTechnician: '',
  MaterialList: ''
};

const INITIAL_FISH_PROFILE = {
  Name: '',
  TypeID: 'AT1',
  Size: '',
  Age: '',
  Color: '',
  Description: '',
  Sex: '',
  Picture: ''
};

const INITIAL_POOL_PROFILE = {
  Name: '',
  Width: '',
  Height: '',
  Depth: '',
  Description: ''
};

const FishPoolServiceSelection = ({ 
  bookingId, 
  services = [], 
  isOpen, 
  onClose, 
  deliveryMethod,
  initialFishCount = 1,
  initialPoolCount = 1
}) => {
  // Tab and Step Management
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState('CheckInFish');
  
  // Search and Edit State
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Profile Management
  const [additionalFishCount, setAdditionalFishCount] = useState(0);
  const [additionalPoolCount, setAdditionalPoolCount] = useState(0);
  const [fishProfiles, setFishProfiles] = useState([]);
  const [poolProfiles, setPoolProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFishProfile, setCurrentFishProfile] = useState(INITIAL_FISH_PROFILE);
  const [currentPoolProfile, setCurrentPoolProfile] = useState(INITIAL_POOL_PROFILE);

  // Service and Cart Management
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Dialog State
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Computed Values
  const totalFishCount = initialFishCount + Number(additionalFishCount);
  const totalPoolCount = initialPoolCount + Number(additionalPoolCount);

  // Effects
  useEffect(() => {
    setCurrentStep(activeTab === 0 ? 'CheckInFish' : 'SelectServices');
  }, [activeTab]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.Price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    const filtered = services.filter(service =>
      service.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  // Tab Management
  const handleTabChange = (event, newValue) => {
    if (newValue === 1 && !isProfilesComplete()) {
      return;
    }
    setActiveTab(newValue);
  };

  // Profile Management Functions
  const isProfileLimitReached = () => {
    return fishProfiles.length >= totalFishCount && poolProfiles.length >= totalPoolCount;
  };

  const isProfilesComplete = () => {
    return fishProfiles.length === totalFishCount && poolProfiles.length === totalPoolCount;
  };

  const handleProfileSubmit = (skip = false) => {
    if (isProfileLimitReached()) {
      alert('Đã đạt đến giới hạn số lượng đánh giá!');
      return;
    }

    const isPoolProfile = currentIndex >= totalFishCount;
    
    if (skip) {
      if (isPoolProfile) {
        setPoolProfiles([...poolProfiles, { ...INITIAL_POOL_PROFILE }]);
      } else {
        setFishProfiles([...fishProfiles, { ...INITIAL_FISH_PROFILE }]);
      }
    } else {
      if (isPoolProfile) {
        setPoolProfiles([...poolProfiles, { ...currentPoolProfile }]);
        setCurrentPoolProfile(INITIAL_POOL_PROFILE);
      } else {
        setFishProfiles([...fishProfiles, { ...currentFishProfile }]);
        setCurrentFishProfile(INITIAL_FISH_PROFILE);
      }
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleUpdateFishProfile = (index, updatedProfile) => {
    const newFishProfiles = [...fishProfiles];
    newFishProfiles[index] = updatedProfile;
    setFishProfiles(newFishProfiles);
  };

  const handleUpdatePoolProfile = (index, updatedProfile) => {
    const newPoolProfiles = [...poolProfiles];
    newPoolProfiles[index] = updatedProfile;
    setPoolProfiles(newPoolProfiles);
  };

  // Service Management Functions
  const handleServiceSelect = (service) => {
    const existingService = cartItems.find(item => item.ServiceID === service.ServiceID);
    if (existingService && !isEditing) {
      alert('Dịch vụ này đã có trong giỏ hàng!');
      return;
    }
    setSelectedService(service);
    setFormData({ ...formData, serviceID: service.ServiceID });
  };

  const resetServiceForm = () => {
    setSelectedService(null);
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (isEditing) {
      const updatedCartItems = cartItems.map(item =>
        item.serviceID === formData.serviceID ? { ...selectedService, ...formData } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...selectedService, ...formData }]);
    }
    resetServiceForm();
  };

  const handleRemoveFromCart = (serviceID) => {
    setCartItems(cartItems.filter(item => item.serviceID !== serviceID));
    if (formData.serviceID === serviceID) {
      resetServiceForm();
    }
  };

  const handleUpdateService = (item) => {
    setSelectedService({ ...item, ServiceID: item.serviceID });
    setFormData(item);
    setShowCart(false);
    setIsEditing(true);
  };

  const handleFinalSubmit = () => {
    console.log('Submitting:', {
      fishProfiles,
      poolProfiles,
      cartItems
    });
    setShowConfirmation(false);
    onClose();
  };

  // Utility Functions
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  // Form Handling
  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleFishProfileChange = (field) => (event) => {
    setCurrentFishProfile({
      ...currentFishProfile,
      [field]: event.target.value
    });
  };

  const handlePoolProfileChange = (field) => (event) => {
    setCurrentPoolProfile({
      ...currentPoolProfile,
      [field]: event.target.value
    });
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-6xl h-5/6 overflow-hidden relative flex flex-col">
        {/* Header with Tabs */}
        <div className="p-4 border-b">
          <Tabs value={activeTab} onChange={handleTabChange}>
            <Tab 
              icon={<InfoIcon />} 
              label="Thông tin cá và hồ" 
            />
            <Tab
              icon={<ReceiptLongIcon />}
              label="Thông tin dịch vụ"
              disabled={!isProfilesComplete()}
            />
          </Tabs>
        </div>
  
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 z-10 flex items-center">
          <ProfileListModal
            fishProfiles={fishProfiles}
            poolProfiles={poolProfiles}
            onUpdateFishProfile={handleUpdateFishProfile}
            onUpdatePoolProfile={handleUpdatePoolProfile}
          />
          <Badge badgeContent={cartItems.length} color="primary">
            <IconButton onClick={() => setShowCart(true)}>
              <ShoppingCartIcon className="text-blue-400" />
            </IconButton>
          </Badge>
          <IconButton onClick={onClose}>
            <CloseIcon className="text-blue-400" />
          </IconButton>
        </div>
  
        {/* Profile Information Tab */}
        {currentStep === 'CheckInFish' && (
          <div className="p-6 overflow-y-auto">
            <div className="space-y-6">
              {isProfileLimitReached() && (
                <Alert severity="warning">
                  Đã đạt đến giới hạn số lượng đánh giá!
                </Alert>
              )}
  
              {/* hiện số cá và số hồ ban đầu*/}
              <div className="grid grid-cols-2 gap-6">
                {(initialFishCount > 0 || initialPoolCount > 0) && (
                  <Card className="p-5">
                    <Typography variant="h6">Số lượng ban đầu</Typography>
                    {initialFishCount > 0 && (
                      <Typography>Số cá: {initialFishCount}</Typography>
                    )}
                    {initialPoolCount > 0 && (
                      <Typography>Số hồ: {initialPoolCount}</Typography>
                    )}
                  </Card>
                )}
  
                <Card className="p-5">
                  <Typography variant="h6">Số lượng phát sinh</Typography>
                  <TextField
                    label="Số cá phát sinh"
                    type="number"
                    value={additionalFishCount}
                    onChange={(e) => setAdditionalFishCount(Math.max(0, parseInt(e.target.value) || 0))}
                    className="mb-4"
                    fullWidth
                    disabled={isProfileLimitReached()}
                  />
                  <TextField
                    label="Số hồ phát sinh"
                    type="number"
                    value={additionalPoolCount}
                    onChange={(e) => setAdditionalPoolCount(Math.max(0, parseInt(e.target.value) || 0))}
                    fullWidth
                    disabled={isProfileLimitReached()}
                  />
                </Card>
              </div>
  
              {/* Profile Form */}
              {(totalFishCount > 0 || totalPoolCount > 0) && !isProfileLimitReached() && (
                <Card className="p-4">
                  <Typography variant="h6">
                    {currentIndex < totalFishCount ? 'Thông tin cá' : 'Thông tin hồ'}
                    ({currentIndex + 1}/{totalFishCount + totalPoolCount})
                  </Typography>
  
                  {currentIndex < totalFishCount ? (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <TextField
                        label="Tên"
                        value={currentFishProfile.Name}
                        onChange={handleFishProfileChange('Name')}
                      />
                      <TextField
                        label="Kích thước"
                        value={currentFishProfile.Size}
                        onChange={handleFishProfileChange('Size')}
                      />
                      <TextField
                        label="Tuổi"
                        value={currentFishProfile.Age}
                        onChange={handleFishProfileChange('Age')}
                      />
                      <TextField
                        label="Màu sắc"
                        value={currentFishProfile.Color}
                        onChange={handleFishProfileChange('Color')}
                      />
                      <TextField
                        label="Mô tả"
                        value={currentFishProfile.Description}
                        onChange={handleFishProfileChange('Description')}
                      />
                      <TextField
                        label="Giới tính"
                        value={currentFishProfile.Sex}
                        onChange={handleFishProfileChange('Sex')}
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <TextField
                        label="Tên hồ"
                        value={currentPoolProfile.Name}
                        onChange={handlePoolProfileChange('Name')}
                      />
                      <TextField
                        label="Chiều rộng"
                        value={currentPoolProfile.Width}
                        onChange={handlePoolProfileChange('Width')}
                      />
                      <TextField
                        label="Chiều cao"
                        value={currentPoolProfile.Height}
                        onChange={handlePoolProfileChange('Height')}
                      />
                      <TextField
                        label="Độ sâu"
                        value={currentPoolProfile.Depth}
                        onChange={handlePoolProfileChange('Depth')}
                      />
                      <TextField
                        label="Mô tả"
                        value={currentPoolProfile.Description}
                        onChange={handlePoolProfileChange('Description')}
                      />
                    </div>
                  )}
  
                  <div className="flex justify-end gap-4 mt-4">
                    <Button 
                      variant="outlined" 
                      onClick={() => handleProfileSubmit(true)}
                    >
                      Bỏ qua
                    </Button>
                    <Button 
                      variant="contained" 
                      onClick={() => handleProfileSubmit(false)}
                    >
                      Tiếp theo
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
  
        {/* Service Selection Tab */}
        {currentStep === 'SelectServices' && (
          <div className="flex flex-1 overflow-hidden">
            {/* Service List */}
            <div className="w-1/2 p-6 overflow-y-auto">
              <div className="flex items-center mb-4">
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Tìm kiếm dịch vụ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon className="mr-2 text-blue-400 text-2xl" />
                  }}
                />
              </div>
  
              <div className="space-y-4">
                {filteredServices.map((service) => (
                  <Card
                    key={service.ServiceID}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleServiceSelect(service)}
                  >
                    <CardContent>
                      <Typography variant="h6" className="font-bold">
                        {service.Name}
                      </Typography>
                      <Typography variant="body2" className="mt-2">
                        {service.Description}
                      </Typography>
                      <Typography variant="subtitle1" className="mt-2 text-blue-600">
                        {formatCurrency(service.Price)}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
  
            {/* Service Details */}
            <div className="w-1/2 p-6 bg-gray-50 overflow-y-auto">
              {selectedService ? (
                <Card className="p-4">
                  <Typography variant="h6" className="mb-4 font-bold">
                    {isEditing ? 'Chỉnh sửa dịch vụ: ' : 'Chi tiết dịch vụ: '}
                    {selectedService.Name}
                  </Typography>
  
                  <TextField
                    fullWidth
                    label="Kết quả khám"
                    variant="outlined"
                    className="mb-4"
                    value={formData.NoteResult}
                    onChange={handleFormChange('NoteResult')}
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
                        onChange={handleFormChange('AnimalStatusDescription')}
                        multiline
                        rows={2}
                      />
                      <TextField
                        fullWidth
                        label="Bác sĩ tư vấn"
                        variant="outlined"
                        value={formData.ConsultDoctor}
                        onChange={handleFormChange('ConsultDoctor')}
                      />
                      <TextField
                        fullWidth
                        label="Danh sách thuốc"
                        variant="outlined"
                        value={formData.DrugList}
                        onChange={handleFormChange('DrugList')}
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
                        onChange={handleFormChange('PoolStatusDescription')}
                        multiline
                        rows={2}
                      />
                      <TextField
                        fullWidth
                        label="Kỹ thuật viên tư vấn"
                        variant="outlined"
                        value={formData.ConsultTechnician}
                        onChange={handleFormChange('ConsultTechnician')}
                      />
                      <TextField
                        fullWidth
                        label="Danh sách vật tư"
                        variant="outlined"
                        value={formData.MaterialList}
                        onChange={handleFormChange('MaterialList')}
                        multiline
                        rows={2}
                      />
                    </div>
                  )}
  
                  <Button
                    variant="contained"
                    className="mt-4 w-full"
                    onClick={handleSubmit}
                    sx={{
                      fontSize: '17px',
                      background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
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
        )}
  
        {/* Cart Dialog */}
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
                <CloseIcon className="text-blue-400 text-2xl" />
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
                  <div 
                    className="cursor-pointer" 
                    onClick={() => handleUpdateService(item)}
                  >
                    <Typography variant="subtitle1">{item.Name}</Typography>
                    <Typography variant="body2">
                      {formatCurrency(item.Price)}
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
  
        {/* Submit Button */}
        <div className="p-4 bg-gray-100 border-t">
          <Button
            variant="contained"
            fullWidth
            className="h-12"
            sx={{
              fontSize: '17px',
              fontWeight: '550',
              background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
            }}
            onClick={handleFinalSubmit}
            disabled={cartItems.length === 0}
          >
            Gửi ({cartItems.length} dịch vụ)
          </Button>
        </div>
      </div>
    </div>
  );};

export default FishPoolServiceSelection;