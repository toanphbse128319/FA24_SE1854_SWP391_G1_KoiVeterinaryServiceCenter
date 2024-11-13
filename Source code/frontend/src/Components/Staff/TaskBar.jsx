import React, { useState, useEffect } from 'react';
import AssignVet from './AssignVet';
import ManageUser from './ManageUser';
import AddSchedule from './AddSchedule';
import { useNavigate } from 'react-router-dom';
import { FetchAPI } from "../../Helper/Utilities";

function AddDate({date, amount}){
    let temp = date;

    temp.setDate( temp.getDate() + amount );
    return temp.toISOString().split("T")[0]
}

async function fetchBooking(){
    let currentDate = new Date();
    let from = AddDate({date: currentDate, amount: 2});
    
    let to = AddDate({date: currentDate, amount: 32});
    let response = await FetchAPI({ endpoint: `/Booking/getbookingfromto?from=${from}&to=${to}` })
    if ( !response.ok )
        return null;
    return await response.json();
}

async function fetchVet(){
    let response = await FetchAPI({ endpoint: '/Employee/getbyrolename?info=Veterinarian' });
    if ( !response.ok )
        return null;
    return await response.json();
}

async function fetchSchedule(){
    let currentDate = new Date();
    let target = AddDate({date: currentDate, amount: 2});
    let response = await FetchAPI({ endpoint: '/Schedule/get30daysschedule?date=' + target });
    if ( !response.ok )
        return null;
    return await response.json();
}

async function fetchSlot(){
    let currentDate = new Date();
    let target = AddDate({date: currentDate, amount: 2});
    let response = await FetchAPI({ endpoint: '/Schedule/getslotin30days?date=' + target });
    if ( !response.ok )
        return null;
    return await response.json();
}

async function fetchSDM(){
    let response = await FetchAPI({ endpoint: '/ServiceDeliveryMethod' });
    if ( !response.ok )
        return null;
    return await response.json();
}

async function fetchCustomer({bookings}){
    let temp = [];
    bookings.map( booking => {
        FetchAPI({ endpoint: `/Customer/${booking.CustomerID}`}).then( response => response.json().then( json => {
            temp.push(json);
        } ) );
    });
    return temp;
}

async function fetchBookingDetails({bookings}){
    let temp = [];
    bookings.map( booking => {
        FetchAPI({ endpoint: `/bookingdetail/bybookingid?id=${booking.BookingID}`}).then( response => response.json().then( json => {
            temp.push(json);
        } ) );
    });
    return temp;
}

const TaskBar = () => {
  const [DoctorSchedule, SetDoctorSchedule] = useState([]);
  const [SlotSchedule, SetSlotSchedule] = useState([]);
  const [BookingDetails, SetBookingDetails] = useState([]);
  const [loading, SetLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [customers, setCustomer] = useState([]);
  const [sdm, SetSDM] = useState([]);
  const navigate = useNavigate();
    //This will change when the data from database is changed!
    const [update, setUpdate] = useState( false );

const STEPS = {
    ASSIGN_VET: 'assignVet',
    ADD_SCHEDULE: 'addSchedule',
    MANAGE_USER: 'manageUser'
  };

  const [currentStep, setCurrentStep] = useState(STEPS.ASSIGN_VET);
    useEffect(() => {
        // Set loading to true before fetching
        SetLoading(true);
        fetchBooking().then( result => { 
            setBookings(result);
            fetchCustomer( {bookings: result }).then( customer => {
                setCustomer( customer ); SetLoading( false );
            });
            fetchBookingDetails( {bookings: result} ).then( bd => {
                SetBookingDetails( bd );
            });
        } );
        fetchVet().then( result => setDoctors(result) );
        fetchSchedule().then( result => SetDoctorSchedule( result ) );
        fetchSDM().then( result => SetSDM( result ) );
        fetchSlot().then( result => SetSlotSchedule( result ) );
    }, [ update ]);

  if (loading) {
    return <div>Loading...</div>;
  }

    function Update(){
        setUpdate( !update );
    }
    console.log( doctors );

  const renderComponent = () => {
    switch (currentStep) {
      case STEPS.ASSIGN_VET:
        return <AssignVet DoctorSchedule={DoctorSchedule} SlotSchedule={SlotSchedule} BookingDetails={BookingDetails} bookings={bookings} doctors={doctors} customers={customers} sdm={sdm} SetBookingDetails={SetBookingDetails}/>;
      case STEPS.ADD_SCHEDULE:
        return <AddSchedule DoctorSchedule={DoctorSchedule} doctors={doctors} SlotSchedule={SlotSchedule} Update={Update} />;
      case STEPS.MANAGE_USER:
        return <ManageUser />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="fixed top-0 h-full w-1/6 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-6 text-center">Quản lí</h2>
        <div className="space-y-3">
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              currentStep === STEPS.ASSIGN_VET ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
            }`}
            onClick={() => setCurrentStep(STEPS.ASSIGN_VET)}
          >
            Phân công thú y 
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              currentStep === STEPS.ADD_SCHEDULE ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
            }`}
            onClick={() => setCurrentStep(STEPS.ADD_SCHEDULE)}
          >
            Thêm lịch làm việc
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              currentStep === STEPS.MANAGE_USER ? 'bg-blue-600' : 'bg-gray-700 hover:bg-blue-500'
            }`}
            onClick={() => setCurrentStep(STEPS.MANAGE_USER)}
          >
            Quản lí người đùng 
          </button>
          <button
            onClick={() => {
              navigate('/');
              window.sessionStorage.clear();
              console.log("Logged out");
            }}
            className="w-full text-left p-3 rounded-lg transition-colors font-medium mt-8 bg-red-600 hover:bg-red-700"
          >
            Đăng xuất 
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-[16.6667%] w-5/6 p-8">
        {renderComponent()}
      </div>
    </div>
  );
};

export default TaskBar;
