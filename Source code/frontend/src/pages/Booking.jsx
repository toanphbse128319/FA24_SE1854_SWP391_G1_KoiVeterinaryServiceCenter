import React, { useState, useEffect } from 'react';
import TrackingBookingDetail from '../Components/TrackingBookingDetail';
import DoctorList from "../Components/Doctor'sSummaryInformation";
import Lich from "../Components/ScheduleCustomer";
const STEPS = {
  SELECT_DOCTOR: 'selectDoctor',
  SELECT_SCHEDULE: 'selectSchedule',
  SELECT_DOCTERSCHEDUEL: 'selectDocterScheduel',
};

const SERVICES = {
  name: "Virtual Koi Consultation",
  serviceDeliveryMethod: "truc tuyen",
  serviceDeliveryMethodId: "2",
  serviceID: "S002",
  price: 75.00,
};

const doctors = [
  { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1" },
  { name: "Nguyễn Văn B", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E2" },
  { name: "Nguyễn Văn C", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E3" },
  // ... other doctors
];

const DocterSchedule = [
  { ScheduleID: 'SCH1', EmployeeID: 'E3', Date: '2024-11-01', Status: 'Active' },
  { ScheduleID: 'SCH2', EmployeeID: 'E3', Date: '2024-11-02', Status: 'Active' },
  { ScheduleID: 'SCH3', EmployeeID: 'E3', Date: '2024-11-03', Status: 'Active' },
  { ScheduleID: 'SCH4', EmployeeID: 'E3', Date: '2024-11-04', Status: 'Active' },
];

const SlotSchedule = [
  { SlotTableID: 'ST1', ScheduleID: 'SCH1', Slot: 1, SlotCapacity: 10, SlotOrdered: 5, SlotStatus: 1 },
  { SlotTableID: 'ST2', ScheduleID: 'SCH1', Slot: 2, SlotCapacity: 10, SlotOrdered: 6, SlotStatus: 1 },
  { SlotTableID: 'ST3', ScheduleID: 'SCH1', Slot: 3, SlotCapacity: 10, SlotOrdered: 7, SlotStatus: 1 },
  { SlotTableID: 'ST4', ScheduleID: 'SCH1', Slot: 4, SlotCapacity: 10, SlotOrdered: 8, SlotStatus: 1 },
];

const BookingPage = () => {
  const [selectedService] = useState(SERVICES);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_SCHEDULE);
  const [role] = useState('R1');
  const [isFull, setIsFull] = useState(true);
  const [filteredDoctorSchedule, setFilteredDoctorSchedule] = useState([]);
  const [filteredSlotSchedule, setFilteredSlotSchedule] = useState([]);

  useEffect(() => {
    if (selectedDoctor) {
      const doctorSchedules = DocterSchedule.filter(
        schedule => schedule.EmployeeID === selectedDoctor.EmployeeID
      );
      setFilteredDoctorSchedule(doctorSchedules);

      const doctorSlots = SlotSchedule.filter(slot =>
        doctorSchedules.some(schedule => schedule.ScheduleID === slot.ScheduleID)
      );
      setFilteredSlotSchedule(doctorSlots);
    } else {
      setFilteredDoctorSchedule(DocterSchedule);
      setFilteredSlotSchedule(SlotSchedule);
    }
  }, [selectedDoctor]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setCurrentStep(STEPS.SELECT_DOCTERSCHEDUEL);
    setIsFull(false);
  };

  const handleStepChange = (step) => {
    if (step === STEPS.SELECT_SCHEDULE) {
      setSelectedDoctor(null);
      setIsFull(true);
    } else if (step === STEPS.SELECT_DOCTOR) {
      setIsFull(false);
    }
    setCurrentStep(step);
  };

  const StepButton = ({ step, label }) => {
    const isActive = currentStep === step || 
                    (step === STEPS.SELECT_DOCTOR && currentStep === STEPS.SELECT_DOCTERSCHEDUEL);

    return (
      <button
        className={`step-button ${isActive ? 'active' : ''}`}
        onClick={() => handleStepChange(step)}
      >
        {label}
      </button>
    );
  };

  return (
    <div className="booking-page">
      <div className="tracking-detail">
        <TrackingBookingDetail
          service={selectedService.name}
          employee={selectedDoctor?.name}
          serviceDeliveryMethod={selectedService.serviceDeliveryMethod}
        />
      </div>

      <div className="main-content">
        <div className="step-buttons">
          <StepButton step={STEPS.SELECT_SCHEDULE} label="Đặt lịch" />
          <StepButton step={STEPS.SELECT_DOCTOR} label="Chọn bác sĩ" />
        </div>

        <div className="content-area">
          {currentStep === STEPS.SELECT_DOCTOR && (
            <DoctorList
              onSelectDoctor={handleDoctorSelect}
              doctors={doctors}
            />
          )}
          
          {(currentStep === STEPS.SELECT_SCHEDULE || currentStep === STEPS.SELECT_DOCTERSCHEDUEL) && (
            <Lich
              doctor={selectedDoctor}
              role={role}
              service={selectedService}
              SlotSchedule={filteredSlotSchedule}
              DocterSchedule={filteredDoctorSchedule}
              key={selectedDoctor ? 'DoctorSchedule' : 'FullSchedule'}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .booking-page {
          display: flex;
          margin-top: 96px;
          margin-left: 96px;
          gap: 2px;
        }

        .tracking-detail {
          margin-right: 80px;
          margin-top: 96px;
        }

        .main-content {
          flex: 1;
        }

        .step-buttons {
          display: flex;
          gap: 32px;
          justify-content: center;
          align-items: center;
          margin-bottom: 48px;
        }

        .step-button {
          width: 160px;
          height: 48px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          border: none;
          cursor: pointer;
          background: white;
          color: #64B0E0;
        }

        .step-button.active {
          background: linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%);
          color: white;
        }

        .step-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .content-area {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;