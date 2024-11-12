import React, { useState, useEffect } from 'react';
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
import { Info as InfoIcon, Close as CloseIcon } from '@mui/icons-material';

// Utility để xử lý input số
const numberUtils = {
  formatNumberValue: (value) => {
    if (!value) return '';
    return String(parseFloat(value) || 0);
  },

  handleNumberKeyDown: (e) => {
    const allowedKeys = [
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
      'Backspace', 'Delete', 'Tab', 'Enter', '.', 'a',
      'ArrowLeft', 'ArrowRight'
    ];
    
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
      return;
    }

    // Xử lý nhập dấu thập phân
    if (e.key === '.') {
      const value = e.target.value;
      if (value.includes('.') || !value.length || !/\d/.test(value[value.length - 1])) {
        e.preventDefault();
      }
    }
  },

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
// Các giá trị mặc định cho form
const INITIAL_STATES = {
  FISH_PROFILE: {
    AnimalProfileID: '',
    Name: '',
    TypeID: 'AT1',
    Size: 0,
    Age: 0,
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

const BookingActions = ({
  bookingId,
  isOpen,
  onClose,
  initialFishCount ,
  initialPoolCount ,
  bookingDetail,
  setIsIncidental,
  service,
}) => {
    // States cần thiết cho component
    const [activeTab, setActiveTab] = useState(0);
    const [currentStep, setCurrentStep] = useState('CheckInFish');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fishProfiles, setFishProfiles] = useState([]);
    const [poolProfiles, setPoolProfiles] = useState([]);
    const [currentFishProfile, setCurrentFishProfile] = useState(INITIAL_STATES.FISH_PROFILE);
    const [currentPoolProfile, setCurrentPoolProfile] = useState(INITIAL_STATES.POOL_PROFILE);
    const [formData, setFormData] = useState(INITIAL_STATES.FORM);
    const [formErrors, setFormErrors] = useState({});
  
    // Tính toán tổng số lượng cá và hồ
    const totalFishCount = initialFishCount;
    const totalPoolCount = initialPoolCount;
  useEffect(() => {
    setCurrentStep(activeTab === 0 ? 'CheckInFish' : 'SelectServices');
  }, [activeTab]);

  const handleSubmitProfiles = () => {
    setActiveTab(1);
  };
  if (!isOpen) return null;

  const isProfileLimitReached = () => fishProfiles.length >= totalFishCount && poolProfiles.length >= totalPoolCount;
  const isProfilesComplete = () => fishProfiles.length === totalFishCount && poolProfiles.length === totalPoolCount;

     // Xử lý việc submit profile cá/hồ
  const handleProfileSubmit = (skip = false) => {
    const isPoolProfile = currentIndex >= totalFishCount;
    const newProfile = skip ? 
      (isPoolProfile ? INITIAL_STATES.POOL_PROFILE : INITIAL_STATES.FISH_PROFILE) :
      (isPoolProfile ? currentPoolProfile : currentFishProfile);

    if (isPoolProfile) {
      setPoolProfiles([...poolProfiles, { ...newProfile }]);
      setCurrentPoolProfile(INITIAL_STATES.POOL_PROFILE);
    } else {
      setFishProfiles([...fishProfiles, { ...newProfile }]);
      setCurrentFishProfile(INITIAL_STATES.FISH_PROFILE);
    }

    setCurrentIndex(prev => prev + 1);
  };

// Xử lý cập nhật thông tin profile
const handleUpdateFishProfile = (index, updatedProfile) => {
  setFishProfiles(profiles => {
    const newProfiles = [...profiles];
    newProfiles[index] = updatedProfile;
    return newProfiles;
  });
};

const handleUpdatePoolProfile = (index, updatedProfile) => {
  setPoolProfiles(profiles => {
    const newProfiles = [...profiles];
    newProfiles[index] = updatedProfile;
    return newProfiles;
  });
};

 // Xử lý thay đổi giá trị trong form
 const handleProfileChange = (field, isPool = false) => (event) => {
  const setter = isPool ? setCurrentPoolProfile : setCurrentFishProfile;
  setter(prev => ({ ...prev, [field]: event.target.value }));
};
  const handlePoolProfileChange = (field) => (event) => {
    setCurrentPoolProfile({
      ...currentPoolProfile,
      [field]: event.target.value
    });
  };

   // Xử lý chuyển đổi tab
   const handleTabChange = (newValue) => {
    if (newValue === 1 && !isProfilesComplete()) return;
    setActiveTab(newValue);
  };




  const processNumericField = (value) => {
    if (value === 'Chưa có dữ liệu' || value === '') return 0;
    return Number(value) || 0;
  };
  const processStringField = (value) => {
    if (value === 'Chưa có dữ liệu' || value === '') return 'N/A';
    return String(value);
  };
 
  // Xử lý dữ liệu trước khi gửi API
  const processData = () => {
    const processField = (value, isNumeric = false) => {
      if (!value || value === 'Chưa có dữ liệu') return isNumeric ? 0 : 'N/A';
      return isNumeric ? Number(value) : String(value);
    };

    const processedFishProfiles = fishProfiles.map(profile => ({
      ...INITIAL_STATES.FISH_PROFILE,
      ...profile,
      Size: processField(profile.Size, true),
      Age: processField(profile.Age, true),
      Name: processField(profile.Name),
      Color: processField(profile.Color),
      Description: processField(profile.Description),
      Picture: processField(profile.Picture)
    }));

    const processedPoolProfiles = poolProfiles.map(profile => ({
      ...INITIAL_STATES.POOL_PROFILE,
      ...profile,
      Width: processField(profile.Width, true),
      Height: processField(profile.Height, true),
      Depth: processField(profile.Depth, true),
      Name: processField(profile.Name),
      Note: processField(profile.Note),
      Description: processField(profile.Description),
      Picture: processField(profile.Picture)
    }));

    return {
      AnimalProfile: processedFishProfiles,
      PoolProfile: processedPoolProfiles,
      BookingDetail: {
        ...INITIAL_STATES.FORM,
        ...formData,
        BookingDetailID: bookingDetail.BookingDetailID,
        BookingID: bookingId,
        ServiceID: service.ServiceID,
        IsIncidental: false
      }
    };
  };

// Validate form trước khi submit
const validateForm = () => {
  const errors = {};
  const isAnimalService = service.ServiceDeliveryMethodID === 'SDM1' || service.ServiceDeliveryMethodID === 'SDM4';
  const isPoolService = service.ServiceDeliveryMethodID === 'SDM2';

  if ((isAnimalService || isPoolService) && !formData.ExaminationResult.trim()) {
    errors.ExaminationResult = `Vui lòng nhập tình trạng ${isAnimalService ? 'động vật' : 'hồ'}`;
  }

  if (!formData.VetConsult.trim()) {
    errors.VetConsult = `Vui lòng nhập thông tin ${isAnimalService ? 'bác sĩ' : 'kỹ thuật viên'} tư vấn`;
  }

  setFormErrors(errors);
  return Object.keys(errors).length === 0;
};




  const handleSubmit = async () => {
    if (!validateForm()) {
      window.showToast("Vui lòng điền đầy đủ thông tin bắt buộc");
      return;
    }

    try {
      const response = await fetch('http://localhost:5145/api/AnimalProfile/addProfiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(processData())
      });

      if (!response.ok) throw new Error('Failed to submit data');

      window.showToast("Kết quả đã ghi nhận thành công");
      setTimeout(() => setIsIncidental(true), 1500);
    } catch (error) {
      console.error('Error submitting data:', error);
      window.showToast("Có lỗi xảy ra khi gửi dữ liệu");
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
      <Toast time={2000} />
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
                  height: '6vh',
                  '&.Mui-selected': {
                    color: 'white',
                    opacity: 1
                  }
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'white'
                },
              }}
            >
              <Tab
                icon={<Fish size={28} />}
                label="Thông tin cá và hồ"
                disabled={activeTab !== 0}
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
          <div className="flex-1 overflow-y-auto">
            {currentStep === 'CheckInFish' && (
              <div className="p-6">
                {isProfileLimitReached() && (
                  <Alert severity="warning">
                    Đã ghi nhận đầy đủ thông tin!
                  </Alert>
                )}
  
                {/* Initial Count Card */}
                {(initialFishCount > 0 || initialPoolCount > 0) && (
                  <Card className="p-4 mb-3" style={{ background: 'white' }}>
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
                  <Card className="p-4" style={{ background: 'white' }}>
                    <Typography variant="h6">
                      {currentIndex < totalFishCount ? 'Thông tin cá' : 'Thông tin hồ'}
                      ({currentIndex + 1}/{totalFishCount + totalPoolCount})
                    </Typography>
  
                    {currentIndex < totalFishCount ? (
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <TextField
                          label="Tên"
                          value={currentFishProfile.Name}
                          onChange={handleProfileChange('Name')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Kích thước"
                          value={numberUtils.formatNumberValue(currentFishProfile.Size)}
                          onChange={handleProfileChange('Size')}
                          {...numberUtils.getNumberInputProps('cm')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Tuổi"
                          value={numberUtils.formatNumberValue(currentFishProfile.Age)}
                          onChange={handleProfileChange('Age')}
                          {...numberUtils.getNumberInputProps()}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Màu sắc"
                          value={currentFishProfile.Color}
                          onChange={handleProfileChange('Color')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Mô tả"
                          value={currentFishProfile.Description}
                          onChange={handleProfileChange('Description')}
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
                      <div className="grid grid-cols-2 gap-4 mt-1">
                        <TextField
                          label="Tên hồ"
                          value={currentPoolProfile.Name}
                          onChange={handleProfileChange('Name', true)}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều rộng"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Width)}
                          onChange={handleProfileChange('Width', true)}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Chiều cao"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Height)}
                          onChange={handleProfileChange('Height', true)}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Độ sâu"
                          value={numberUtils.formatNumberValue(currentPoolProfile.Depth)}
                          onChange={handleProfileChange('Depth', true)}
                          {...numberUtils.getNumberInputProps('m')}
                          fullWidth
                          variant="outlined"
                        />
                        <TextField
                          label="Mô tả"
                          value={currentPoolProfile.Description}
                          onChange={handleProfileChange('Description', true)}
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
                    <TextField
                        fullWidth
                        label="Tình trạng trước tra"
                        variant="outlined"
                        className="mb-4"
                        value={formData.NoteResult}
                        onChange={handleFormChange('NoteResult')}
                        multiline
                        rows={4}
                      />
                    {/* Animal Service Fields */}
                    {(service.ServiceDeliveryMethodID === 'SDM1' || service.ServiceDeliveryMethodID === 'SDM4') && (
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
  
                    {/* Pool Service Fields */}
                    {service.ServiceDeliveryMethodID === 'SDM2' && (
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
                  </Card>
                )}
              </div>
            )}
          </div>
  
          {/* Footer */}
          {isProfileLimitReached() && (
            <div className="p-4 border-t bg-white">
              {activeTab === 0 && (
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
                  onClick={handleSubmit}
                  sx={{
                    fontSize: '17px',
                    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
                  }}
                >
                  Gửi
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );};
export default BookingActions;
