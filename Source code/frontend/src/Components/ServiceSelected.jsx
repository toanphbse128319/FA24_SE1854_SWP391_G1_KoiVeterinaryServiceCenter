import React, { useState, useEffect } from 'react';
import Confirm from './ConfirmToSubmit';
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
  Info as InfoIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const INITIAL_FISH_PROFILE = {
  AnimalProfileID: '',
  Name: '',
  TypeID: 'AT1',
  Size: 0,
  Age: 0,
  Color: '',
  Description: '',
  Sex: true,
  Picture: ''
};

const INITIAL_POOL_PROFILE = {
  PoolProfileID:'',
  Name: '',
  Note:'',
  Width: '',
  Description: '',
  Height: '',
  Depth: '',
  Picture:'',
};
const INITIAL_FORM_STATE = {
    ServiceID: '',
    NoteResult: '',
    AnimalStatusDescription: '',
    ConsultDoctor: '',
    DrugList: '',
    PoolStatusDescription: '',
    ConsultTechnician: '',
    MaterialList: ''
  };
const BookingActions = ({
  bookingId,
  isOpen,
  onSubmitSuccess, 
  onClose,
  deliveryMethod,
  initialFishCount = 1,
  initialPoolCount = 0,
  selectedService,
  bookingDetail,
}) => {
    console.log('day la bôking detail ben selected sẻvice' +bookingDetail)
    console.log('Service ID:', bookingDetail?.ServiceID);
  const [activeTab, setActiveTab] = useState(0);
  const [currentStep, setCurrentStep] = useState('CheckInFish');

  const [additionalFishCount, setAdditionalFishCount] = useState(0);
  const [additionalPoolCount, setAdditionalPoolCount] = useState(0);
  const [fishProfiles, setFishProfiles] = useState([]);
  const [poolProfiles, setPoolProfiles] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFishProfile, setCurrentFishProfile] = useState(INITIAL_FISH_PROFILE);
  const [currentPoolProfile, setCurrentPoolProfile] = useState(INITIAL_POOL_PROFILE);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isIncidental, setIsIncidental] = useState(false);
  const totalFishCount = initialFishCount + Number(additionalFishCount);
  const totalPoolCount = initialPoolCount + Number(additionalPoolCount);   
  const [error, setError] = useState('');

  useEffect(() => {
    setCurrentStep(activeTab === 0 ? 'CheckInFish' : 'SelectServices');
  }, [activeTab]);

//hàm gửi  thông tin cá  , hô đặt trc về api
  // const handleSubmitProfiles = async () => {
  //   if (!isProfileLimitReached()) {
  //     setError('Please complete all profiles before submitting');
  //     return;
  //   }
  //   setError(null);
  //   console.log(fishProfiles)
  //   try {
  //     const response = await fetch('http://localhost:5145/api/AnimalProfile/addProfiles', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         AnimalProfile: fishProfiles,
  //         PoolProfile: poolProfiles
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`API error: ${response.status}`);
  //     }

  //     const data = await response.text();
  //     console.log('Profiles submitted successfully:', data);

  //     // Handle successful submission
  //     setShowConfirmation(false);
  //     setIsIncidental(true);
  //   } catch (error) {
  //     console.error('Error submitting profiles:', error);
  //     setError(error.message);
  //   } 
  // };

  const handleSubmitProfiles = () => {
     setActiveTab(1);
  };
   if (!isOpen) return null;
  const isProfileLimitReached = () => {
    return fishProfiles.length >= totalFishCount && poolProfiles.length >= totalPoolCount;
  };

  const isProfilesComplete = () => {
    return fishProfiles.length === totalFishCount && poolProfiles.length === totalPoolCount;
  };

  const handleProfileSubmit = (skip = false) => {
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

  const handleTabChange = (newValue) => {
    if (newValue === 1 && !isProfilesComplete()) {
      return;
    }
    setActiveTab(newValue);
  };




  const handleSubmit = async () => {
    try {
       console.log('day la fish va pool '+ fishProfiles,poolProfiles)

       const bookingDetail1 ={
        BookingDetailID: bookingDetail.BookingDetailID,
        BookingID: bookingId,
        ServiceID: selectedService.ServiceID,
        UnitPrice: selectedService.Price,
        Incidental: true,
        NoteResult: formData.NoteResult,
        AnimalStatusDescription: formData.AnimalStatusDescription,
        ConsultDoctor: formData.ConsultDoctor,
        DrugList: formData.DrugList,
        PoolStatusDescription: formData.PoolStatusDescription,
        ConsultTechnician: formData.ConsultTechnician,
        MaterialList: formData.MaterialList,
       }
          const response = await fetch('http://localhost:5145/api/BookingDetail/update', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              AnimalProfile: fishProfiles,
              PoolProfile: poolProfiles,
              BookingDetail:bookingDetail1
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to change booking status');
          }
    
          const data = await response.text();
          console.log('Status changed successfully:'+ data);
    
          // Xử lý sau khi gọi API thành công
          setShowConfirmation(false);
          setIsIncidental(true);
          onClose();
          if (onSubmitSuccess) {
            onSubmitSuccess();
          }
    
        } catch (error) {
          console.error('Error changing status:'+ error);
        }
  };

  const handleFinalSubmit = () => {
    console.log('Submitting:', {
      fishProfiles,
      poolProfiles,
      selectedService,
      bookingId,
      formData,
    });
    setShowConfirmation(false);
    setIsIncidental(true);
    onClose();
    if (onSubmitSuccess) {
        onSubmitSuccess(); // Gọi callback để cập nhật state ở component cha
      }
  };

  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };
  console.log('day la service dat trc ' +selectedService);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-11/12 max-w-6xl h-5/6 overflow-hidden relative flex flex-col">
        {/* Header with Tabs */}
        <div className="p-4 border-b" style={{
          background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)'
        }}>
          <Tabs
            value={activeTab}
            onChange={(event, newValue) => handleTabChange(newValue)}
            sx={{
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.5)',
                opacity: 0.7,
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
              icon={<InfoIcon />}
              label="Thông tin cá và hồ"
            />
            <Tab
              icon={<InfoIcon />}
              label="Thông tin dịch vụ"
              disabled={!isProfilesComplete()}
            />
          </Tabs>
        </div>
  
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
            <Tooltip title="Danh sách cá và hồ">
              <IconButton>
                <InfoIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Badge>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </div>
  
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          {currentStep === 'CheckInFish' && (
            <div className="p-6">
              {isProfileLimitReached() && (
                <Alert severity="warning">
                  Đã đạt đến giới hạn số lượng ghi nhận !
                </Alert>
              )}
  
              {/* Initial Count Card */}
              {(initialFishCount > 0 || initialPoolCount > 0) && (
                <Card className="p-5 mb-6">
                  <Typography variant="h6">Số lượng ban đầu</Typography>
                  {initialFishCount > 0 && (
                    <Typography>Số cá: {initialFishCount}</Typography>
                  )}
                  {initialPoolCount > 0 && (
                    <Typography>Số hồ: {initialPoolCount}</Typography>
                  )}
                </Card>
              )}
  
              {/* Profile Input Form */}
              {!isProfileLimitReached() && (
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
  
                  {/* Form Navigation Buttons */}
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
  
          {/* Services Step */}
          {currentStep === 'SelectServices' && (
            <div className="p-6">
              {selectedService && (
                <Card className="p-4">
                  <Typography variant="h6" className="mb-4 font-bold">
                    Chi tiết dịch vụ: {selectedService.Name}
                  </Typography>
  
                  {/* Animal Service Fields */}
                  {(selectedService.ServiceDeliveryMethodID === 'SDM1' || selectedService.ServiceDeliveryMethodID === 'SDM4') && (
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
  
                  {/* Pool Service Fields */}
                  {selectedService.ServiceDeliveryMethodID === 'SDM2' && (
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
  
                  {/* Submit Button */}
                  <Button
                    variant="contained"
                    className="mt-4 w-full"
                    onClick={handleSubmit}
                    sx={{
                      fontSize: '17px',
                      background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                    }}
                  >
                    Gửi
                  </Button>
                </Card>
              )}
            </div>
          )}
        </div>
  
        {/* Footer */}
        {currentStep === 'CheckInFish' && isProfileLimitReached() && (
          <div className="p-4 border-t bg-white">
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmitProfiles}
              style={{
                background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
              }}
            >
              Tiếp tục
            </Button>
          </div>
        )}
  
        {/* Confirmation Dialog */}
        <Confirm
          open={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleFinalSubmit}
        />
      </div>
    </div>
  );
};

export default BookingActions;
