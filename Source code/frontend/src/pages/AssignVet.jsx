
import React, { useState } from 'react';
import { Button } from '@mui/material';
import TrackingBookingDetail from '../Components/TrackingBookingDetail';
import DoctorList from "../Components/Doctor'sSummaryInformation";
import Lich from "../Components/ScheduleCustomer";
import { LineChart } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const STEPS = {
  SELECT_DOCTOR: 'selectDoctor',
  SELECT_SCHEDULE: 'selectSchedule',
  SELECT_DOCTERSCHEDULE: 'selectDocterScheduel',
};

const SERVICES = {
  name: "Virtual Koi Consultation",
  serviceDeliveryMethod: "truc tuyen",
  serviceDeliveryMethodId:"2",
  serviceID: "S002",
  price: 75.00,
};

const AssignVet = () => {
  const [selectedService] = useState(SERVICES);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_SCHEDULE);
  const [role, setRole] = useState('R1');
  const [isFull, setIsFull] = useState(true);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(STEPS.SELECT_DOCTERSCHEDULE);
  };

  const handleStepChange = (step) => {
    if (step === STEPS.SELECT_SCHEDULE) {
      setSelectedDoctor(null);
      setIsFull(true);  // Reset to full view when going back to schedule
    } else if (step === STEPS.SELECT_DOCTOR) {
      setIsFull(false);  // Set to individual view for doctor selection
    }
    setCurrentStep(step);
  };

  const bookingAssign = [
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "1"},
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "2"},
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "1"}
  ];

  const bookingNotAssign = [
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "1"},
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "1"},
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1", slotTable: "1"}

  ];

  const doctors = [
    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1" },
    { name: "Nguyễn Văn B", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E2" },
    { name: "Nguyễn Văn C", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E3" },
    { name: "Nguyễn Văn D", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E4" },
    { name: "Nguyễn Văn E", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E5" },
    { name: "Nguyễn Văn F", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E6" },
    { name: "Nguyễn Văn G", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E7" },
    { name: "Nguyễn Văn H", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E8" },
    { name: "Nguyễn Văn I", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E9" }
  ];

  const StepButton = ({ step, label }) => {
    const isActive = currentStep === step || 
                    (step === STEPS.SELECT_DOCTOR && currentStep === STEPS.SELECT_DOCTERSCHEDUEL);

    return (
      <button
        style={{
          width: '10vw',
          height: '7vh',
          borderRadius: '12px',
          fontSize: '1vw',
          fontWeight: '700',
          transition: 'background-color 0.3s, color 0.3s',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          background: isActive
            ? 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)'
            : '#FFFFFF',
          color: isActive ? '#FFFFFF' : '#64B0E0',
        }}
        onClick={() => handleStepChange(step)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="booking-page" style={{ display: 'flex', marginTop: '10vh', marginLeft: '10vw', gap: '0.05vw' }}>
      <div style={{ marginRight: '80px', marginTop: '10vh' }}>
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
            <DoctorList
              onSelectDoctor={handleDoctorSelect}
              doctors={doctors}
            />
          ) : currentStep === STEPS.SELECT_SCHEDULE ? (
            <Lich
              doctor={null}
              role={role}
              service={selectedService}
              key={'FullScheduel'} 
            />
          ) : currentStep === STEPS.SELECT_DOCTERSCHEDUEL ? (
            <Lich
              doctor={selectedDoctor}
              role={role}
              service={selectedService}
              key={'ScheduelForOnceDocter'}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default AssignVet;