import React, { useState, useEffect } from 'react';
import Confirm from './ConfirmToSubmit';
import ProfileListModal from './PorfileList';
import Toast from './Toast';
import {
  Alert,
  Badge,
  Button,
  Card,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Fish } from 'phosphor-react';

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
  PoolProfileID: '',
  Name: '',
  Note: '',
  Width: '',
  Description: '',
  Height: '',
  Depth: '',
  Picture: '',
};
const INITIAL_FORM_STATE = {
  NoteResult: '',
  ExaminationResult: '',
  VetConsult: '',
  Formulary: ''
};

const BookingActions = ({
  bookingId,
  isOpen,
  onClose,
  initialFishCount = 0,
  initialPoolCount = 1,
  bookingDetail,
  setIsIncidental,
  service,
}) => {
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
  const [formErrors, setFormErrors] = useState({});
  const totalFishCount = initialFishCount + Number(additionalFishCount);
  const totalPoolCount = initialPoolCount + Number(additionalPoolCount);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    setCurrentStep(activeTab === 0 ? 'CheckInFish' : 'SelectServices');
  }, [activeTab]);

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



  // Helper function to process numeric fields
  const processNumericField = (value) => {
    if (value === 'Chưa có dữ liệu' || value === '') return 0;
    return Number(value) || 0;
  };

  // Helper function to process string fields
  const processStringField = (value) => {
    if (value === 'Chưa có dữ liệu' || value === '') return 'N/A';
    return String(value);
  };

  const processData = (fishProfiles, poolProfiles, bookingDetail) => {
    // Process fish profiles
    const processedFishProfiles = fishProfiles.map(profile => ({
      ...INITIAL_FISH_PROFILE,
      ...profile,
      Size: processNumericField(profile.Size),
      Age: processNumericField(profile.Age),
      Name: processStringField(profile.Name),
      Color: processStringField(profile.Color),
      Description: processStringField(profile.Description),
      Picture: processStringField(profile.Picture),
      // TypeID and Sex retain their original values or defaults
    }));

    // Process pool profiles
    const processedPoolProfiles = poolProfiles.map(profile => ({
      ...INITIAL_POOL_PROFILE,
      ...profile,
      Width: processNumericField(profile.Width),
      Height: processNumericField(profile.Height),
      Depth: processNumericField(profile.Depth),
      Name: processStringField(profile.Name),
      Note: processStringField(profile.Note),
      Description: processStringField(profile.Description),
      Picture: processStringField(profile.Picture),
    }));

    // Process booking detail
    const processedBookingDetail = {
      ...INITIAL_FORM_STATE,
      ...bookingDetail,
      NoteResult: processStringField(bookingDetail.NoteResult),
      ExaminationResult: processStringField(bookingDetail.ExaminationResult),
      VetConsult: processStringField(bookingDetail.VetConsult),
      Formulary: processStringField(bookingDetail.Formulary),
      // Preserve the original values for IDs and IsIncidental
      BookingDetailID: bookingDetail.BookingDetailID,
      BookingID: bookingDetail.BookingID,
      ServiceID: bookingDetail.ServiceID,
      IsIncidental: bookingDetail.IsIncidental
    };

    return {
      AnimalProfile: processedFishProfiles,
      PoolProfile: processedPoolProfiles,
      BookingDetail: processedBookingDetail
    };
  };

  const validateForm = () => {
    const errors = {};
    const isAnimalService = service.ServiceDeliveryMethodID === 'SDM1' || service.ServiceDeliveryMethodID === 'SDM4';
    const isPoolService = service.ServiceDeliveryMethodID === 'SDM2';

    if (isAnimalService) {
      if (!formData.ExaminationResult.trim()) {
        errors.ExaminationResult = 'Vui lòng nhập tình trạng động vật';
      }
      if (!formData.VetConsult.trim()) {
        errors.VetConsult = 'Vui lòng nhập thông tin bác sĩ tư vấn';
      }
    }

    if (isPoolService) {
      if (!formData.ExaminationResult.trim()) {
        errors.ExaminationResult = 'Vui lòng nhập tình trạng hồ';
      }
      if (!formData.VetConsult.trim()) {
        errors.VetConsult = 'Vui lòng nhập thông tin kỹ thuật viên tư vấn';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleShowConfirmation = () => {
    if (validateForm()) {
      setShowConfirmation(true);
    } else {
      setToastMessage('Vui lòng điền đầy đủ thông tin bắt buộc!');
      setShowToast(true);
    }
  };



  //ham gui api
  const handleSubmit = async () => {
    try {

      const bookingDetail1 = {
        BookingDetailID: bookingDetail.BookingDetailID,
        BookingID: bookingId,
        ServiceID: service.ServiceID,
        IsIncidental: false,
        NoteResult: formData.NoteResult,
        ExaminationResult: formData.ExaminationResult,
        VetConsult: formData.VetConsult,
        Formulary: formData.Formulary
      }
      const processedData = processData(fishProfiles, poolProfiles, bookingDetail1);


      const response = await fetch('http://localhost:5145/api/AnimalProfile/addProfiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(processedData),

      });



      if (!response.ok) {
        throw new Error('Failed to change booking status');
      }

      const data = await response.text();
      console.log('Status changed successfully:' + data);
      setToastMessage('Thông tin đơn khám đã được gửi thành công!');
      setShowToast(true);
      setTimeout(() => {
        setIsIncidental(true);
        setShowConfirmation(false);
      }, 1500);
    } catch (error) {
      console.error('Error changing status:' + error);
    }
  };


  const handleFormChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };


  return (
    <>
      <Toast
        message={toastMessage}
        isVisible={showToast}
        onHide={() => setShowToast(false)}
      />
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-11/12 max-w-6xl h-5/6 overflow-hidden relative flex flex-col">
          {/* Header with Tabs */}
          <div className="p-4 border-b" style={{
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
                  height: '6vh',  // Chiều cao của từng tab
                  '&.Mui-selected': {
                    color: 'white',
                    opacity: 1
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white'
                },
                // Chiều cao tối thiểu của Tabs container
              }}
            >
              <Tab
                icon={<Fish size={28} />}
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
              <ProfileListModal
                fishProfiles={fishProfiles}
                poolProfiles={poolProfiles}
                onUpdateFishProfile={handleUpdateFishProfile}
                onUpdatePoolProfile={handleUpdatePoolProfile}
              />
            </Badge>
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto"
            style={{

            }}>
            {currentStep === 'CheckInFish' && (
              <div className="p-6"              >
                {isProfileLimitReached() && (
                  <Alert severity="warning">
                    Đã ghi nhận đầy đủ thông tin!
                  </Alert>
                )}

                {/* Initial Count Card */}
                {(initialFishCount > 0 || initialPoolCount > 0) && (
                  <Card className="p-4 mb-3"
                    style={{

                      background: 'white',
                    }}>
                    <Typography variant="h6">Số lượng đặt trước</Typography>
                    {initialFishCount > 0 && (
                      <Typography>Cá: {initialFishCount}</Typography>
                    )}
                    {initialPoolCount > 0 && (
                      <Typography>Hồ: {initialPoolCount}</Typography>
                    )}
                  </Card>
                )}

                {/* Profile Input Form */}
                {!isProfileLimitReached() && (
                  <Card className="p-4 "
                    style={{


                      background: 'white',
                    }}>
                    <Typography variant="h6">
                      {currentIndex < totalFishCount ? 'Thông tin cá' : 'Thông tin hồ'}
                      ({currentIndex + 1}/{totalFishCount + totalPoolCount})
                    </Typography>

                    {currentIndex < totalFishCount ? (
                      <div className="grid grid-cols-2 gap-2 mt-4"
                      >
                        <TextField
                          label="Tên"
                          value={currentFishProfile.Name}
                          onChange={handleFishProfileChange('Name')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Kích thước"
                          value={currentFishProfile.Size}
                          onChange={handleFishProfileChange('Size')}
                          type="number"
                          InputProps={{
                            endAdornment: <span className="text-gray-500">cm</span>,
                            inputProps: { min: 0 }
                          }}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Tuổi"
                          value={currentFishProfile.Age}
                          onChange={handleFishProfileChange('Age')}
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 }
                          }}
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
                      <div className="grid grid-cols-2 gap-4 mt-1 "

                      >
                        <TextField
                          label="Tên hồ"
                          value={currentPoolProfile.Name}
                          onChange={handlePoolProfileChange('Name')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều rộng"
                          value={currentPoolProfile.Width}
                          onChange={handlePoolProfileChange('Width')}
                          type="number"
                          InputProps={{
                            endAdornment: <span className="text-gray-500">m</span>,
                            inputProps: { min: 0 }
                          }}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều cao"
                          value={currentPoolProfile.Height}
                          onChange={handlePoolProfileChange('Height')}
                          type="number"
                          InputProps={{
                            endAdornment: <span className="text-gray-500">m</span>,
                            inputProps: { min: 0 }
                          }}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Độ sâu"
                          value={currentPoolProfile.Depth}
                          onChange={handlePoolProfileChange('Depth')}
                          type="number"
                          InputProps={{
                            endAdornment: <span className="text-gray-500">m</span>,
                            inputProps: { min: 0 }
                          }}
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

            {/* Services Step */}
            {currentStep === 'SelectServices' && (
              <div className="p-6">
                {service && (
                  <Card className="p-4">
                    <Typography variant="h6" className="mb-4 font-bold">
                      Chi tiết dịch vụ: {service.Name}
                    </Typography>

                    {/* Animal Service Fields */}
                    {(service.ServiceDeliveryMethodID === 'SDM1' || service.ServiceDeliveryMethodID === 'SDM4') && (
                      <div className="space-y-4">
                        <TextField
                          fullWidth
                          label="Tình trạng động vật"
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

                    {/* Pool Service Fields */}
                    {service.ServiceDeliveryMethodID === 'SDM2' && (
                      <div className="space-y-4">
                        <TextField
                          fullWidth
                          label="Tình trạng hồ"
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
                  </Card>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {isProfileLimitReached() && (
            <div className="p-4 border-t bg-white">
              {activeTab === 0 && isProfileLimitReached() && (
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
              )}
              {activeTab === 1 && (
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleShowConfirmation}
                  sx={{
                    fontSize: '17px',
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                  }}
                >
                  Gửi
                </Button>
              )}
            </div>)}

          {/* Confirmation Dialog */}
          <Confirm
            open={showConfirmation}
            onClose={() => setShowConfirmation(false)}
            onConfirm={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export default BookingActions;
