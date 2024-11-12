import React, { useState, useEffect } from 'react';
import Confirm from './ConfirmToSubmit';
import Toast from './Toast';

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
import { Fish } from 'phosphor-react';

import {
  Search as SearchIcon,
  Info as InfoIcon,
  Close as CloseIcon,
  ReceiptLong as ReceiptLongIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';

// Sub-components

import ProfileListModal from './PorfileList';
const numberUtils = {
  // Format giá trị số
  formatNumberValue: (value) => {
    if (value === '' || value === null || value === undefined) return '';
    return String(parseFloat(value) || 0);
  },

  // Xử lý keydown cho input số
  handleNumberKeyDown: (e) => {
    // Danh sách các phím được phép
    const allowedKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Backspace', 'Delete', 'Tab', 'Enter', '.', 'a',
      'ArrowLeft', 'ArrowRight'
    ];

    // Chặn các ký tự không được phép
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    const value = e.target.value;

    // Xử lý dấu thập phân
    if (e.key === '.') {
      // Nếu đã có dấu chấm, không cho nhập thêm
      if (value.includes('.')) {
        e.preventDefault();
        return;
      }

      // Nếu là ký tự đầu tiên, không cho nhập
      if (value.length === 0) {
        e.preventDefault();
        return;
      }

      // Kiểm tra xem ký tự cuối cùng có phải là số không
      const lastChar = value[value.length - 1];
      if (!/\d/.test(lastChar)) {
        e.preventDefault();
        return;
      }
    }
  },

  // Tạo props cho input số
  getNumberInputProps: (unit = '') => ({
    type: "text",
    onKeyDown: numberUtils.handleNumberKeyDown,
    InputProps: unit ? {
      endAdornment: <span className="text-gray-500">{unit}</span>
    } : undefined,
    inputProps: {
      min: 0,
      step: "any",
      inputMode: "decimal",
      pattern: "[0-9]*\\.?[0-9]*"
    }
  })
};
// Constants
const INITIAL_STATES = {
  FISH_PROFILE: {
    AnimalProfileID: '',
    Name: '',
    TypeID: 'AT1',
    Size: 0.0,
    Age: 0.0,
    Color: '',
    Description: '',
    Sex: true,
    Picture: ''
  },
  POOL_PROFILE: {
    PoolProfileID: '',
    Name: '',
    Note: '',
    Width: '',
    Description: '',
    Height: '',
    Depth: '',
    Picture: '',
  },
  FORM: {
    NoteResult: '',
    ExaminationResult: '',
    VetConsult: '',
    Formulary: ''
  }
};


const FishPoolServiceSelection = ({
  bookingId,
  services,
  isOpen,
  onClose,
  servicesSelected,
  booking,
  bookingDetail,
}) => {

console.log('booking'+booking)
console.log('bookingDetail'+bookingDetail.BookingDetailID)

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

  
  const [currentFishProfile, setCurrentFishProfile] = useState(INITIAL_STATES.FISH_PROFILE);
  const [currentPoolProfile, setCurrentPoolProfile] = useState(INITIAL_STATES.POOL_PROFILE);
  const [incidental, setIncidental] = useState(true);
  const [message, setMessage] = useState('');
  const [showInputFields, setShowInputFields] = useState();
  const [showConfirmIncidental, setShowConfirmIncidental] = useState(false);
  const [hasConfirmedCount, setHasConfirmedCount] = useState(false);
  const [showProfileInputs, setShowProfileInputs] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  // Service and Cart Management
  const [filteredServices, setFilteredServices] = useState(services);
  const [selectedService, setSelectedService] = useState();
  const [formData, setFormData] = useState(INITIAL_STATES.FORM);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [hasAnyAdditionalItems, setHasAnyAdditionalItems] = useState(false);
  // Dialog State
  const [showCart, setShowCart] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Computed Values
  const totalFishCount = Number(additionalFishCount);
  const totalPoolCount = Number(additionalPoolCount);

  // Effects
  useEffect(() => {
    setCurrentStep(activeTab === 0 ? 'CheckInFish' : 'SelectServices');
  }, [activeTab]);

  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.Price, 0);
    setTotalAmount(total);
  }, [cartItems]);

  useEffect(() => {
    if(additionalFishCount>0||additionalPoolCount>0){
       setHasAnyAdditionalItems(true);
    }
    if(cartItems.length>0){
      setHasAnyAdditionalItems(true);
   }
   
   
  }, [additionalFishCount, additionalPoolCount,cartItems]);

  useEffect(() => {
    const filtered = services.filter(service => {
      // First check if service is already in cart
      const isInCart = cartItems.some(
        cartItem => cartItem.ServiceID === service.ServiceID
      );
      if (isInCart) {
        return false;
      }
  
      // Then check if service was previously selected
      const isAlreadySelected = servicesSelected?.some(
        selectedService => selectedService.ServiceID === service.ServiceID
      );
      if (isAlreadySelected) {
        return false;
      }
  
      // Skip services with ServiceDeliveryMethodID === 'SDM3'
      if (service.ServiceDeliveryMethodID === 'SDM3') {
        return false;
      }
  
      const matchesSearch = service.Name.toLowerCase().includes(searchTerm.toLowerCase());
  
      // Handle delivery method filtering
      switch (booking.ServiceDeliveryMethodID) {
        case 'SDM1':
          // If preset is SDM1
          if (totalPoolCount > 0) {
            // If there are additional pools, show both SDM1 and SDM2
            return (service.ServiceDeliveryMethodID === 'SDM1' ||
              service.ServiceDeliveryMethodID === 'SDM2') &&
              matchesSearch;
          } else {
            // If no additional pools, only show SDM1
            return service.ServiceDeliveryMethodID === 'SDM1' && matchesSearch;
          }
  
        case 'SDM2':
          // If preset is SDM2
          if (totalFishCount > 0) {
            // If there are additional fish, show both SDM1 and SDM2
            return (service.ServiceDeliveryMethodID === 'SDM1' ||
              service.ServiceDeliveryMethodID === 'SDM2') &&
              matchesSearch;
          } else {
            // If no additional fish, only show SDM2
            return service.ServiceDeliveryMethodID === 'SDM2' && matchesSearch;
          }
  
        case 'SDM4':
          // If preset is SDM4, only show SDM4
          return service.ServiceDeliveryMethodID === 'SDM4' && matchesSearch;
  
        default:
          // Default handling (if no deliveryMethod)
          if (totalPoolCount === 0) {
            return service.ServiceDeliveryMethodID !== 'SDM2' && matchesSearch;
          }
          if (totalFishCount === 0) {
            return service.ServiceDeliveryMethodID !== 'SDM1' && matchesSearch;
          }
          return matchesSearch;
      }
    });
    setFilteredServices(filtered);
  }, [searchTerm, services, totalPoolCount, totalFishCount, booking.ServiceDeliveryMethodID, servicesSelected, cartItems]);
  // Tab Management
  const handleTabChange = (newValue) => {
    if (totalFishCount === 0 && totalPoolCount === 0) {

    }
    if (newValue === 1 && !isProfilesComplete()) {
      return;
    }
    setActiveTab(newValue);
  };

  const validateForm = () => {
    const errors = {};
    
    // Required field validation
    if (!formData.NoteResult.trim()) {
      errors.NoteResult = 'Vui lòng nhập kết quả khám';
    }

    if (!formData.ExaminationResult.trim()) {
      const serviceType = selectedService.ServiceDeliveryMethodID === 'SDM2' ? 'hồ' : 'động vật';
      errors.ExaminationResult = `Vui lòng nhập tình trạng ${serviceType}`;
    }

    if (!formData.VetConsult.trim()) {
      const consultantType = selectedService.ServiceDeliveryMethodID === 'SDM2' ? 'kỹ thuật viên' : 'bác sĩ';
      errors.VetConsult = `Vui lòng nhập thông tin ${consultantType} tư vấn`;
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

// Xử lý dữ liệu trước khi gửi API
const processData = () => {
  const processField = (value, isNumeric = false) => {
    if (!value || value === 'Chưa có dữ liệu') return isNumeric ? 0.0 : 'N/A';
    return isNumeric ? Number(value) : String(value);
  };

  const processedFishProfiles = fishProfiles.map(profile => ({
    AnimalProfileID: profile.AnimalProfileID || "",
    Name: processField(profile.Name) ||`cá ${booking.NumberOfFish + index + 1}`,
    TypeID: profile.TypeID || "AT1", 
    Age: processField(profile.Age, true),
    Color: processField(profile.Color),
    Description: processField(profile.Description),
    Sex: profile.Sex ?? true,
    Picture: processField(profile.Picture)
  }));

  const processedPoolProfiles = poolProfiles.map(profile => ({
    PoolProfileID: profile.PoolProfileID || "",
    Name: processField(profile.Name),
    Note: processField(profile.Note),
    Width: processField(profile.Width, true),
    Height: processField(profile.Height, true),
    Depth: processField(profile.Depth, true),
    Description: processField(profile.Description),
    Picture: processField(profile.Picture)
  }));

  
  let bookingDetails = [];

  if (cartItems.length > 0) {
    bookingDetails = cartItems.map(item => ({
      BookingDetailID: "", 
      BookingID: bookingId,
      ServiceID: item.ServiceID,
      IsIncidental: true,
      NoteResult: item.NoteResult || "string",
      ExaminationResult: item.ExaminationResult || "string",
      VetConsult: item.VetConsult || "string",
      Formulary: item.Formulary || "string"
    }));
  } else {
    bookingDetails = [{
      BookingDetailID: '',
      BookingID: bookingDetail.BookingID,
      ServiceID: bookingDetail.ServiceID,
      IsIncidental: true,
      NoteResult: bookingDetail.NoteResult,
      ExaminationResult: bookingDetail.ExaminationResult,
      VetConsult: bookingDetail.VetConsult,
      Formulary: bookingDetail.Formulary
    }];
  }

  return {
    IncidentalFish: Number(additionalFishCount),
    IncidentalPool: Number(additionalPoolCount),
    BookingDetails: bookingDetails,
    AnimalProfiles: processedFishProfiles,
    PoolProfiles: processedPoolProfiles
    
  };
};




const handleSubmitAPI = async () => {
  try {
    console.log(processData())
    const response = await fetch('http://localhost:5145/api/ServiceUse/addExaminationResult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(processData())
    });

    if (!response.ok) throw new Error('Failed to submit data');
    
    window.showToast("Kết quả đã ghi nhận thành công");
  } catch (error) {
    console.error('Error submitting data:', error);
    window.showToast("Có lỗi xảy ra khi gửi dữ liệu");
  }
};
  const handleInitialCheck = () => {
    window.showConfirm("Xác nhận số lượng cá phát sinh là " + additionalFishCount + " con và số lượng hồ phát sinh là " + additionalPoolCount + " hồ", () => {
      setHasConfirmedCount(true);
      setShowInputFields(true);
    });

  };

  
  // Profile Management Functions
  const isProfileLimitReached = () => {
    if (additionalFishCount === 0 && additionalPoolCount === 0) {
      return hasConfirmedCount;
    }
    return fishProfiles.length >= additionalFishCount && poolProfiles.length >= additionalPoolCount;
  };

  const isProfilesComplete = () => {
    return fishProfiles.length === totalFishCount && poolProfiles.length === totalPoolCount;
  };

  const handleProfileSubmit = (skip = false) => {
    setIncidental(false);

    const isPoolProfile = currentIndex >= totalFishCount;

    if (skip) {
        if (isPoolProfile) {
          const newPoolName = `Hồ ${booking.NumberOfFish + poolProfiles.length + 1}`; 
          setPoolProfiles([...poolProfiles, { ...INITIAL_STATES.POOL_PROFILE, Name: newPoolName }]);
        } else {
          const newFishName = `Cá ${booking.NumberOfFish + fishProfiles.length + 1}`; // Tính toán tên cá
          setFishProfiles([...fishProfiles, { ...INITIAL_STATES.FISH_PROFILE, Name: newFishName }]);

        }
    } else {
        if (isPoolProfile) {
            setPoolProfiles([...poolProfiles, { ...currentPoolProfile }]);
            setCurrentPoolProfile(INITIAL_STATES.POOL_PROFILE);
        } else {
            setFishProfiles([...fishProfiles, { ...currentFishProfile }]);
            setCurrentFishProfile(INITIAL_STATES.FISH_PROFILE);
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
    // Reset editing state
    setIsEditing(false);
    
    // Clear form data and errors
    setFormErrors({});
    
    // Check for existing service in cart
    const existingService = cartItems.find(item => item.ServiceID === service.ServiceID);
    if (existingService && !isEditing) {
      window.showToast('Dịch vụ này đã có trong giỏ hàng!');
      return;
    }
    
    // Set the selected service
    setSelectedService(service);
    
    // Reset any previous messages
    setMessage('');
    
    // Initialize form data with just the service ID
    setFormData({
      NoteResult: '',
      ExaminationResult: '',
      VetConsult: '',
      Formulary: '',
      serviceID: service.ServiceID
    });
  };

  const resetServiceForm = () => {
    setSelectedService(null);
    setFormData(INITIAL_FORM_STATE);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
  
    if (isEditing) {
      const updatedCartItems = cartItems.map(item =>
        item.serviceID === formData.serviceID ? { ...selectedService, ...formData } : item
      );
      setCartItems(updatedCartItems);
      window.showToast('Đã cập nhật thành công');
    } else {
      setCartItems([...cartItems, { ...selectedService, ...formData }]);
      window.showToast('Đã ghi nhận dịch vụ');
    }
  
    // Reset all form data and states
    setFormData({
      NoteResult: '',
      ExaminationResult: '',
      VetConsult: '',
      Formulary: ''
    });
    setSelectedService(null);
    setIsEditing(false);
    setFormErrors({}); // Also clear any form errors
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
  const handleConfirmCount = () => {

    if (additionalFishCount === 0 && additionalPoolCount === 0) {
      setHasConfirmedCount(true);
    } else {
      setShowProfileInputs(true);
      setHasConfirmedCount(true);
    }
  };


  const handleSubmitProfiles = () => {
    setActiveTab(1)
  };

  return (
    <>
      <Toast time={2000} />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-6xl h-5/6 overflow-hidden relative flex flex-col">
          {/* Header Section */}
          <div className="p-4 border-b"
            style={{
              background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
              height: '13.5vh',
            }}>
            <Tabs
              value={activeTab}
              onChange={(event, newValue) => handleTabChange(newValue)}
              sx={{
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.5)',
                  opacity: 0.5,
                  height: '6vh',
                  '&.Mui-selected': {
                    color: 'white',
                    opacity: 1
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white'
                }
              }}
            >
              <Tab
                icon={<Fish size={28} />}
                label="Thông tin cá và hồ"
                disabled={activeTab != 0}
              />
              <Tab
                icon={<ReceiptLongIcon />}
                label="Thông tin dịch vụ"
                disabled={activeTab != 1}
              />
            </Tabs>

            {/* Top right buttons */}
            <div className="absolute top-8 right-8 z-10 flex items-center">
              <Badge
                badgeContent={fishProfiles.length + poolProfiles.length}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                  }
                }}
              >
                <ProfileListModal
                  fishProfiles={fishProfiles}
                  poolProfiles={poolProfiles}
                  onUpdateFishProfile={handleUpdateFishProfile}
                  onUpdatePoolProfile={handleUpdatePoolProfile}
                />
              </Badge>
              <Badge
                badgeContent={cartItems.length}
                color="primary"
                sx={{
                  "& .MuiBadge-badge": {
                    color: "white",
                  }
                }}
              >
                <IconButton onClick={() => setShowCart(true)}>
                  <ShoppingCartIcon sx={{ color: "white" }} />
                </IconButton>
              </Badge>
              <IconButton onClick={onClose}>
                <CloseIcon sx={{ color: "white"}} />
              </IconButton>
            </div>
          </div>

          {/* Main Content Section */}
          <div className="flex-1 overflow-hidden">
            {currentStep === 'CheckInFish' && (
              <div className="p-4">


                {/* nơi nhập số lượng cá phát sinh*/}
                <Card className="p-4 "
                  style={{
                    background: 'white',
                    paddingBottom: '5px',
                    marginBottom: '8px',
                    marginTop: '-15px'
                  }}>
                  <Typography variant="h6">Số lượng phát sinh</Typography>

                  <div className="grid grid-cols-2 gap-2 mt-2 pb-2">


                    <TextField
                      label="Số cá phát sinh"
                      type="number"
                      value={numberUtils.formatNumberValue(additionalFishCount)}
                      onChange={(e) => setAdditionalFishCount(Math.max(0, parseInt(e.target.value) || 0))}
                      fullWidth
                      disabled={hasConfirmedCount}

                    />
                    <TextField
                      label="Số hồ phát sinh"
                      type="number"
                      value={numberUtils.formatNumberValue(additionalPoolCount)}
                      onChange={(e) => setAdditionalPoolCount(Math.max(0, parseInt(e.target.value) || 0))}
                      fullWidth
                      disabled={hasConfirmedCount}
                    />

                    {!hasConfirmedCount && (
                      <Button
                        fullWidth
                        variant="contained"
                        onClick={handleInitialCheck}
                        sx={{
                          gridColumn: 'span 2',
                          background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                        }}
                      >
                        Gửi số phát sinh
                      </Button>
                    )}
                  </div>
                </Card>

                {/*chổ nhập thông tin cá và hồ phát sinh*/}
                {!isProfileLimitReached() && showInputFields && (
                  <Card className="p-3"
                    style={{
                      background: 'white',
                    }}>
                    <Typography variant="h6">
                      {currentIndex < totalFishCount ? 'Thông tin cá' : 'Thông tin hồ'}
                      ({currentIndex + 1}/{totalFishCount + totalPoolCount})
                    </Typography>

                    {currentIndex < totalFishCount ? (
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <TextField
                          label="Tên"
                          value={currentFishProfile.Name}
                          onChange={handleFishProfileChange('Name')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Kích thước"
                          value={numberUtils.formatNumberValue(currentFishProfile.Size)}
                          onChange={handleFishProfileChange('Size')}
                          {...numberUtils.getNumberInputProps('cm')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Tuổi"
                          value={numberUtils.formatNumberValue(currentFishProfile.Age)}
                          onChange={handleFishProfileChange('Age')}
                          {...numberUtils.getNumberInputProps()}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Màu sắc"
                          value={currentFishProfile.Color}
                          onChange={handleFishProfileChange('Color')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Mô tả"
                          value={currentFishProfile.Description}
                          onChange={handleFishProfileChange('Description')}
                          fullWidth
                          multiline
                          rows={1}
                          variant="outlined"
                        />
                        <div className="flex items-center">
                          <Typography component="legend">Giới tính:</Typography>
                          <Button
                            variant={currentFishProfile.Sex ? "contained" : "outlined"}
                            onClick={() => setCurrentFishProfile({ ...currentFishProfile, Sex: true })}
                            sx={{ mx: 1 }}
                          >
                            Đực
                          </Button>
                          <Button
                            variant={!currentFishProfile.Sex ? "contained" : "outlined"}
                            onClick={() => setCurrentFishProfile({ ...currentFishProfile, Sex: false })}
                          >
                            Cái
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-2 mt-1">
                        <TextField
                          label="Tên hồ"
                          value={currentPoolProfile.Name}
                          onChange={handlePoolProfileChange('Name')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều rộng"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Width)}
                          onChange={handlePoolProfileChange('Width')}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều cao"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Height)}
                          onChange={handlePoolProfileChange('Height')}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Độ sâu"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Depth)}
                          onChange={handlePoolProfileChange('Depth')}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Mô tả"
                          value={currentPoolProfile.Description}
                          onChange={handlePoolProfileChange('Description')}
                          fullWidth
                          multiline
                          rows={1.25}
                          variant="outlined"
                          sx={{ gridColumn: 'span 2' }}
                        />
                      </div>
                    )}

                    {/* Form Navigation Buttons */}
                    <div className="flex justify-end gap-4 mt-3">
                      <Button
                        variant="outlined"
                        onClick={() => handleProfileSubmit(true)}
                      >
                        Bỏ qua
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => handleProfileSubmit(false)}
                        style={{
                          background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                        }}
                      >
                        Tiếp theo
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            )}

            {currentStep === 'SelectServices' && (
              <div className="flex h-full">
                {/* Service list section */}
                <div className="w-1/2 p-6 overflow-y-auto ">
                  {/* thanh search*/}
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

                  {/* các thẻ dịch vụ*/}
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

                {/* nơi nhập lời khám*/}
                <div className="w-1/2 p-3 bg-gray-50 overflow-y-auto">
                  {selectedService ? (
                    <Card className="p-3">
                      <Typography variant="h6" className="mb-4 font-bold">
                        {isEditing ? 'Chỉnh sửa dịch vụ: ' : 'Chi tiết dịch vụ: '}
                        {selectedService.Name}
                      </Typography>
                      

                      <TextField
          fullWidth
          label="Tình trạng trước kiểm tra"
          variant="outlined"
          className="mb-4"
          value={formData.NoteResult}
          onChange={handleFormChange('NoteResult')}
          multiline
          rows={4}
          error={!!formErrors.NoteResult}
          helperText={formErrors.NoteResult}
          required
        />
                      {(selectedService.ServiceDeliveryMethodID === 'SDM1' || selectedService.ServiceDeliveryMethodID === 'SDM4') && (
                                    
                        <div className="space-y-4">
                           
                          <TextField
                          fullWidth
                          label="Tình trạng cá sau khi khám"
                          variant="outlined"
              value={formData.ExaminationResult}
              onChange={handleFormChange('ExaminationResult')}
              error={!!formErrors.ExaminationResult}
              helperText={formErrors.ExaminationResult}
              required
                        />
                          <TextField
                            fullWidth
                            label="Bác sĩ tư vấn"
                            variant="outlined"
                            value={formData.VetConsult}
                            onChange={handleFormChange('VetConsult')}
                            error={!!formErrors.VetConsult}
                            helperText={formErrors.VetConsult}
                            required
                          />
                           <TextField
                          fullWidth
                          label="Danh sách thuốc"
                          variant="outlined"
                          value={formData.Formulary}
                          onChange={handleFormChange('Formulary')}
                          multiline
                          rows={2}
                        />
                        </div>
                      )}

                      {selectedService.ServiceDeliveryMethodID === 'SDM2' && (
                        <div className="space-y-4">
                         <TextField
                          fullWidth
                          label="Tình trạng hồ sau khi khám"
                          variant="outlined"
                          value={formData.ExaminationResult}
                          onChange={handleFormChange('ExaminationResult')}
                          multiline
                          rows={2}
                          error={!!formErrors.ExaminationResult}
                          helperText={formErrors.ExaminationResult}
                          required
                        />
                          <TextField
                          fullWidth
                          label="Kỹ thuật viên tư vấn"
                          variant="outlined"
                          value={formData.VetConsult}
                          onChange={handleFormChange('VetConsult')}
                          error={!!formErrors.VetConsult}
                          helperText={formErrors.VetConsult}
                          required
                        />
                          <TextField
                          fullWidth
                          label="Danh sách vật tư"
                          variant="outlined"
                          value={formData.Formulary}
                          onChange={handleFormChange('Formulary')}
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
          </div>

          {/* Bottom Action Bar */}

          <div className="p-2 border-t bg-white">
            {activeTab === 0 ? (
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmitProfiles}
                disabled={!hasConfirmedCount}
                sx={{
                  background: hasConfirmedCount
                    ? 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                    : '#ddd',
                }}
              >
                Tiếp tục
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={handleSubmitAPI}
                disabled={!hasAnyAdditionalItems}
                sx={{
                  background: hasAnyAdditionalItems
                  ? 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                  : '#ddd',
                pointerEvents: hasAnyAdditionalItems ? 'auto' : 'none'                }}
              >
                Gửi
              </Button>
            )}
          </div>
        </div>

      </div>



      <Dialog
  open={showCart}
  onClose={() => setShowCart(false)}
  maxWidth="md"
  fullWidth
>
  <DialogTitle sx={{ color: '#64B0E0' }}>
    <div className="absolute top-3.5 right-10">
      <IconButton 
        onClick={() => setShowCart(false)}
        sx={{ color: '#64B0E0' }}
      >
        <CloseIcon />
      </IconButton>
    </div>
    <div className="flex justify-between items-center">
      <span>Giỏ dịch vụ đã chọn</span>
    </div>
  </DialogTitle>
  <DialogContent 
    dividers
    className="overflow-y-auto bg-gray-100"
    sx={{ padding:'8px' }}
  >
    {cartItems.length === 0 ? (
      <Box className="p-4 text-center text-gray-500">
        Hiện tại không có dịch vụ nào được chọn
      </Box>
    ) : (
      cartItems.map((item) => (
        <Box
          key={item.serviceID}
          className="p-4 mt-0 mb-2 relative hover:bg-gray-100 rounded bg-white rounded-[10px]"
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
            <div>
              <Typography variant="subtitle1">{item.Name}</Typography>
              <Typography variant="body2">
                {formatCurrency(item.Price)}
              </Typography>
            </div>
          </Tooltip>
          <div className="absolute top-6 right-4 flex gap-2">
            <Button
              size="small"
              onClick={() => handleUpdateService(item)}
              sx={{
                color: '#64B0E0',
                border: '1px solid rgba(100, 176, 224, 0.5)',
                '&:hover': {
                  backgroundColor: 'rgba(100, 176, 224, 0.04)'
                }
              }}
            >
              Chỉnh sửa
            </Button>
            <Button
              size="small"
              onClick={() => handleRemoveFromCart(item.serviceID)}
              sx={{ 
                border: '1px solid #8E999E',
                color: '#8E999E',
                '&:hover': {
                  backgroundColor: 'rgba(100, 176, 224, 0.04)'
                }
              }}
            >
              Gỡ
            </Button>
          </div>
        </Box>
      ))
    )}
  </DialogContent>
</Dialog>


    </>
  );
};
export default FishPoolServiceSelection;