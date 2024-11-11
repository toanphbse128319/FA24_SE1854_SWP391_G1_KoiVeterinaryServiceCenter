import React, { useState, useEffect } from 'react';
import TrackingBookingDetail from '../Components/TrackingBookingDetail';
import DoctorList from "../Components/Doctor'sSummaryInformation";
import Lich from "../Components/ScheduleCustomer";
import GetAPIURL from '../Helper/Utilities'
import { FetchAPI } from '../Helper/Utilities';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const STEPS = {
  SELECT_DOCTOR: 'selectDoctor',
  SELECT_SCHEDULE: 'selectSchedule',
  SELECT_DOCTERSCHEDUEL: 'selectDocterScheduel',
};

//const SERVICES = {
//  name: "Virtual Koi Consultation",
//  serviceDeliveryMethod: "truc tuyen",
//  serviceDeliveryMethodId: "2",
//  serviceID: "S002",
//  price: 75.00,
//};
//
//function FetchVetList( { setDoctors } ){
//    let url = GetAPIURL("/Employee/getbyrolename?info=Veterinarian");
//        fetch(url)
//            .then( response => response.json() )
//            .then( json => setDoctors( json ) )
//            .catch( error => console.error( error ) );
//}
//
//function FetchScheduleList( { setSchedules , date } ){
//    let url = GetAPIURL("/Schedule/get30daysschedule?date=" + date);
//        fetch(url)
//            .then( response => response.json() )
//            .then( json => setSchedules( json ) )
//            .catch( error => console.error( error ) );
//}
//
//function FetchSlotTableList( { setSlotTable , date } ){
//    let url = GetAPIURL("/Schedule/getslotin30days?date=" + date);
//        fetch(url)
//            .then( response => response.json() )
//            .then( json => setSlotTable( json ) )
//            .catch( error => console.error( error ) );
//}
//
//const DoctorSchedule = [
//  { ScheduleID: 'SCH1', EmployeeID: 'E3', Date: '2024-11-01', Status: 'Active' },
//  { ScheduleID: 'SCH2', EmployeeID: 'E3', Date: '2024-11-02', Status: 'Active' },
//  { ScheduleID: 'SCH3', EmployeeID: 'E3', Date: '2024-11-03', Status: 'Active' },
//  { ScheduleID: 'SCH4', EmployeeID: 'E3', Date: '2024-11-04', Status: 'Active' },
//];

//const SlotSchedule = [
//  { SlotTableID: 'ST1', ScheduleID: 'SCH1', Slot: 1, SlotCapacity: 10, SlotOrdered: 5, SlotStatus: 1 },
//  { SlotTableID: 'ST2', ScheduleID: 'SCH1', Slot: 2, SlotCapacity: 10, SlotOrdered: 6, SlotStatus: 1 },
//  { SlotTableID: 'ST3', ScheduleID: 'SCH1', Slot: 3, SlotCapacity: 10, SlotOrdered: 7, SlotStatus: 1 },
//  { SlotTableID: 'ST4', ScheduleID: 'SCH1', Slot: 4, SlotCapacity: 10, SlotOrdered: 8, SlotStatus: 1 },
//];
//

const BookingPage = () => {
    const location = useLocation();

    if( location.state == undefined )
        return <div> Missing information </div>;
    // If location.state is undefined, the || {} part ensures that you don't try to destructure undefined, thus preventing an error
    const { service, sdm } = location.state || {};
    const [DoctorSchedule, SetDoctorSchedule] = useState([]);
    const [SlotSchedule, SetSlotSchedule] = useState([]);
  const [selectedService] = useState(service);
    const [selectedSDM] = useState(sdm);
  const [selectedDoctor, SetSelectedDoctor] = useState(null);
  const [currentStep, SetCurrentStep] = useState(STEPS.SELECT_SCHEDULE);
  const [doctors, SetDoctors] = useState([]);
  const [role] = useState('R1');
  const [isFull, SetIsFull] = useState(true);
  const [filteredDoctorSchedule, SetFilteredDoctorSchedule] = useState([]);
  const [filteredSlotSchedule, SetFilteredSlotSchedule] = useState([]);

    //This state is use to ensure the webpage get all the information it need to work, removing this will makr other part throw error
    const [loading, SetLoading] = useState(true);
    
    console.log( DoctorSchedule );
    useEffect(() => {
        async function GetData(){
            try {
                // Set loading to true before fetching
                let currentDate = new Date().toISOString().split("T")[0];
                SetLoading(true);
                FetchAPI({ endpoint: '/Employee/getbyrolename?info=Veterinarian' }).then( response => response.json().then( json => SetDoctors( json ) ) );
                FetchAPI({ endpoint: '/Schedule/get30daysschedule?date=' + currentDate }).then( response => response.json().then( json => {
                    SetDoctorSchedule( json.filter( schedule => sdm.Name.toLowerCase().includes(schedule.Note.toLowerCase()) ));
                } ) );
                FetchAPI({ endpoint: '/Schedule/getslotin30days?date=' + currentDate }).then( response => response.json().then( json => SetSlotSchedule( json ) ) );
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                // Set loading to false after fetching
                SetLoading(false);
            }
        }
        GetData();
    }, []);

    useEffect(() => {
        //SetDoctorSchedule();
    }, []);

  useEffect(() => {
    if (selectedDoctor) {
      const doctorSchedules = DoctorSchedule.filter(
        schedule => schedule.EmployeeID === selectedDoctor.EmployeeID
      );
      SetFilteredDoctorSchedule(doctorSchedules);

      const doctorSlots = SlotSchedule.filter(slot =>
        doctorSchedules.some(schedule => schedule.ScheduleID === slot.ScheduleID)
      );
      SetFilteredSlotSchedule(doctorSlots);
    } else {
      SetFilteredDoctorSchedule(DoctorSchedule);
      SetFilteredSlotSchedule(SlotSchedule);
    }
  }, [selectedDoctor, doctors, DoctorSchedule, SlotSchedule]);


    if(loading){
        return (
            <div>Loading...</div>
        );
    }
    
  const handleDoctorSelect = (doctor) => {
    SetSelectedDoctor(doctor);
    SetCurrentStep(STEPS.SELECT_DOCTERSCHEDUEL);
    SetIsFull(false);
  };

  const handleStepChange = (step) => {
    if (step === STEPS.SELECT_SCHEDULE) {
      SetSelectedDoctor(null);
      SetIsFull(true);
    } else if (step === STEPS.SELECT_DOCTOR) {
      SetIsFull(false);
    }
    SetCurrentStep(step);
  };
    
        //[
//    { name: "Nguyễn Văn A", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E1" },
//    { name: "Nguyễn Văn B", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E2" },
//    { name: "Nguyễn Văn C", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E3" },
//    { name: "Nguyễn Văn D", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E4" },
//    { name: "Nguyễn Văn E", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E5" },
//    { name: "Nguyễn Văn F", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E6" },
//    { name: "Nguyễn Văn G", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E7" },
//    { name: "Nguyễn Văn H", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E8" },
//    { name: "Nguyễn Văn I", degree: "Thạc sĩ", schedule: "Thứ 2, 5", EmployeeID: "E9" }
  //];

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
      {selectedDoctor && (
        <TrackingBookingDetail
          service={selectedService.Name}
          employee={selectedDoctor.FirstName + " " + selectedDoctor.LastName }
          serviceDeliveryMethod={selectedSDM.Name}
        />
      )}
      {selectedDoctor == null && (
        <TrackingBookingDetail
          service={selectedService.Name}
          employee={null}
          serviceDeliveryMethod={selectedSDM.Name}
        />
      ) }
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
              sdm={selectedSDM}
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

      <style >{`
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
