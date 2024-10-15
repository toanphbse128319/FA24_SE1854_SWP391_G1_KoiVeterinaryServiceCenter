import React, { useState } from 'react';
import { Button } from '@mui/material';
import TrackingBookingDetail from '../Components/TrackingBookingDetail';
import DoctorList from "../Components/Doctor'sSummaryInformation";

const STEPS = {
  SELECT_DOCTOR: 'selectDoctor',
  SELECT_SCHEDULE: 'selectSchedule',
};

const SERVICES = {
  name: "kham ca",
  serviceDeliveryMethod: "truc tuyen",
};

const BookingPage = () => {
  const [selectedService] = useState(SERVICES);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_DOCTOR);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(STEPS.SELECT_SCHEDULE);
  };

  const handleBack = () => {
    if (currentStep === STEPS.SELECT_SCHEDULE) {
      setSelectedDoctor(null);
      setCurrentStep(STEPS.SELECT_DOCTOR);
    }
  };

  const StepButton = ({ step, label }) => (
    <button
      style={{
        width: '10vw',
        height: '7vh',
        borderRadius: '12px',
        fontSize: '1vw',
        fontWeight: '700',
        transition: 'background-color 0.3s, color 0.3s',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
        background: currentStep === step
          ? 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
          : '#FFFFFF',
        color: currentStep === step ? '#FFFFFF' : '#64B0E0',
      }}
      onClick={() => setCurrentStep(step)}
    >
      {label}
    </button>
  );

  return (
    <div className="booking-page" style={{ display: 'flex', marginTop: '10vh', marginLeft: '10vw', gap: '0.05vw' }}>
      <div style={{ marginRight: '80px' }}>
        <TrackingBookingDetail 
          service={selectedService.name} 
          employee={selectedDoctor?.name} 
          serviceDeliveryMethod={selectedService.serviceDeliveryMethod} 
        />
      </div>
      
      <div>
        <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', alignItems: 'center', marginBottom: '3vh' }}>
          <StepButton step={STEPS.SELECT_SCHEDULE} label="Đặt lịch" />
          <StepButton step={STEPS.SELECT_DOCTOR} label="Chọn bác sĩ" />
        </div>

        <div>
          {currentStep === STEPS.SELECT_DOCTOR ? (
            <DoctorList onSelectDoctor={handleDoctorSelect} />
          ) : currentStep === STEPS.SELECT_SCHEDULE ? (
            <>
              <Button onClick={handleBack} className="mt-4">Quay lại chọn bác sĩ</Button>
              {/* Add your schedule selection component here */}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;