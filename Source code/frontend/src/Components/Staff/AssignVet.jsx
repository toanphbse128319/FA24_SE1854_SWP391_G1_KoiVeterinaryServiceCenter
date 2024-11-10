import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FetchAPI } from "../../Helper/Utilities";

function CustomerNameOfTHeBooking({booking, customers}){
    let result = "Nguyen Van A"
    customers.map( customer => {
        if( customer.CustomerID == booking.CustomerID ){
            result = customer.FirstName + " " + customer.LastName;
        }
    });
    return result;
}

function TimeToSlot({booking}){
    let Time = booking.BookingDate.split("T")[1];
    let time = Time[0] + Time[1];
    let result = parseInt(time);

    switch( result ){
        case 7: return 1;
        case 8: return 2;
        case 9: return 3;
        case 10: return 4;
        case 13: return 5;
        case 14: return 6;
        case 15: return 7;
        case 16: return 8;
        default: return 0;
    }
}

function getSDMName({Booking, bds, sdms}){
    let result;
    result = bds.filter( bd => bd.BookingID == Booking.BookingID);
    result = sdms.filter( sdm => sdm.ServiceDeliveryMethodID == result[0].ServiceDeliveryMethodID );
    return result.Name;
}

function filterBooking(bookings){
    let filtered = [];
    bookings.forEach( booking => {
        if( bookings.EmployeeID == "E0" )
            filtered.push( bookings );
    })
    return filtered;
}

async function SetVet({bookingID, employeeID }){
     let response = await FetchAPI({ endpoint: `/Booking/updateempid?id=${bookingID}&empID=${employeeID}`, method: 'PUT', body: {} });
    if( !response.ok ){
        alert("Unable to set this veterinarian");
        return false;
    }
    return true;
}
const AssignVet = ({DoctorSchedule, SlotSchedule, BookingDetails, bookings, doctors, customers, sdm, SetBookingDetails}) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
//  const bookings = [
//    { BookingID: 'B1', CustomerName: 'Nguyen Van A', Date: '2024-10-31 08:00:00.000', SlotNo: 1, ServiceDeliveryMethod: 'Tại nhà', DoctorName: 'Dr. John Doe' },
//    { BookingID: 'B2', CustomerName: 'Tran Thi B', Date: '2024-10-31 09:00:00.000', SlotNo: 2, ServiceDeliveryMethod: 'Tại trung tâm', DoctorName: '' },
//    { BookingID: 'B3', CustomerName: 'Le Van C', Date: '2024-11-1 10:00:00.000', SlotNo: 3, ServiceDeliveryMethod: 'Tại trung tâm', DoctorName: 'Dr. Jane Smith' },
//    { BookingID: 'B4', CustomerName: 'Pham Thi D', Date: '2024-11-1 14:00:00.000', SlotNo: 4, ServiceDeliveryMethod: 'Trực tuyến', DoctorName: 'Dr. John Doe' },
//  ];
//
//  const doctors = [
//    { DoctorID: 'E1', DoctorName: 'Dr. John Doe' },
//    { DoctorID: 'E2', DoctorName: 'Dr. Jane Smith' },
//    { DoctorID: 'E3', DoctorName: 'Dr. Emily Johnson' },
//    { DoctorID: 'E4', DoctorName: 'Dr. Michael Brown' },
//  ];
//
        console.log( bookings );
    console.log( doctors );

    function getDoctorNameFromBookingID({booking}){
        let result = "N/A";
        doctors.forEach( doctor => {
            if( doctor.EmployeeID == booking.EmployeeID ){
                result = doctor.FirstName + " " + doctor.LastName;
                console.log( doctor.FirstName + " " + doctor.LastName );
            }
        })
        return result;
    }

  const transformScheduleData = (doctorSchedules = [], slotSchedules = []) => {
    const transformedData = [];

    doctorSchedules.forEach(schedule => {
      const matchingSlots = slotSchedules.filter(slot =>
        slot.ScheduleID === schedule.ScheduleID
      );

      matchingSlots.forEach(slot => {
        transformedData.push({
          ScheduleID: slot.SlotTableID,
          date: schedule.Date,
          slot: slot.Slot,
          SlotCapacity: slot.SlotCapacity,
          ordered: slot.SlotOrdered,
          SlotStatus: slot.SlotStatus == 1
        });
      });
    });

    return transformedData;
  };

    function checkbookingDate(bookings, date){
        bookings.forEach( booking => {
            let bookingDate = booking.BookingDate.split("T")[0];
            if( bookingDate == date )
                return true;
        })
        return false;
    }
  const createScheduleMap = (doctorSchedules = [], slotSchedules = []) => {
    const map = new Map();
    const transformedData = transformScheduleData(doctorSchedules, slotSchedules);

    transformedData.forEach(schedule => {
      const dateKey = new Date(schedule.date).toISOString().split('T')[0];
      if (!map.has(dateKey)) {
        map.set(dateKey, []);
      }
      map.get(dateKey).push(schedule);
    });

    return map;
  };

  const scheduleMap = useMemo(() =>
    createScheduleMap(DoctorSchedule, SlotSchedule),
    [DoctorSchedule, SlotSchedule]
  );

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = [];

    const prevMonthLastDay = new Date(Date.UTC(year, month, 0));
    const daysFromPrevMonth = firstDay.getUTCDay();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      daysInMonth.push(new Date(Date.UTC(year, month - 1, prevMonthLastDay.getUTCDate() - i)));
    }

    for (let i = 1; i <= lastDay.getUTCDate(); i++) {
      daysInMonth.push(new Date(Date.UTC(year, month, i)));
    }

    const daysNeeded = 35 - daysInMonth.length;
    for (let i = 1; i <= daysNeeded; i++) {
      daysInMonth.push(new Date(Date.UTC(year, month + 1, i)));
    }

    return daysInMonth;
  };

  const daysToShow = getDaysInMonth(currentDate);

  const handleDateClick = async (date) => {
    if (!date)
      return;
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setSelectedSlots(scheduleMap.get(dateString) || []);
    const bookingDetailsForDate = bookings.filter(booking => booking.BookingDate.startsWith(dateString));
    SetBookingDetails(bookingDetailsForDate);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
    setSelectedDate(null);
    setSelectedSlots([]);
    SetBookingDetails([]);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
    setSelectedDate(null);
    setSelectedSlots([]);
    SetBookingDetails([]);
  };

  const isDateAvailable = (date) => {
    if (!date) return false;
      let result = false;
    const dateString = date.toISOString().split('T')[0];
    let has = scheduleMap.has(dateString);
    bookings.forEach( booking => {
        if( booking.BookingDate.split('T')[0] === dateString && has ){
            result = true;
        }
    });
      return result;
  };

  const getDayStyles = (date, index) => {
    const isFirstColumn = index % 7 === 0;
    const isLastColumn = index % 7 === 6;
    const isLastRow = index >= daysToShow.length - 7;
    const isLastRowFirstColumn = isLastRow && isFirstColumn;
    const isLastRowLastColumn = isLastRow && isLastColumn;
    const lastRowStyles = {
      ...(isLastRow ? styles.lastRowDay : {}),
      ...(isLastRowFirstColumn ? styles.bottomLeftCorner : {}),
      ...(isLastRowLastColumn ? styles.bottomRightCorner : {})
    };

    return {
      ...styles.dayButton,
      ...(isDateAvailable(date) ? styles.available : styles.unavailable),
      ...(selectedDate && date && selectedDate.toDateString() === date.toDateString() ? styles.selected : {}),
      ...(isFirstColumn ? styles.firstColumnDay : {}),
      ...(isLastColumn ? styles.lastColumnDay : {}),
      ...lastRowStyles,
    };
  };

  const handleAssignDoctor = (booking, doctorName) => {
    const updatedBookings = BookingDetails.map(b => 
      b.BookingID === booking.BookingID ? { ...b, DoctorName: doctorName } : b
    );
    SetBookingDetails(updatedBookings);
    setShowModal(false);
  };

  return (
    <div style={styles.calendarContainer}>
      <div style={styles.header}>
        <h2 style={styles.headerText}>Lịch làm việc trong tháng</h2>
      </div>

      <div style={styles.navigation}>
        <button onClick={handlePrevMonth} style={styles.navButton}>
          <ChevronLeft />
        </button>
        <div style={styles.monthYear}>
          {currentDate.toLocaleString('vi-VN', { month: 'long', year: 'numeric' }).toUpperCase()}
        </div>
        <button onClick={handleNextMonth} style={styles.navButton}>
          <ChevronRight />
        </button>
      </div>

      <div style={styles.calendar}>
        <div style={styles.daysHeader}>
          {['Chủ Nhật', 'Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy'].map((day, index) => (
            <div
              key={day}
              style={{
                ...styles.headerCell,
                ...(index === 0 ? styles.firstHeaderCell : {}),
                ...(index === 6 ? styles.lastHeaderCell : {})
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div style={styles.daysGrid}>
          {daysToShow.map((date, index) => (
            <button
              key={index}
              style={getDayStyles(date, index)}
              onClick={() => handleDateClick(date)}
              disabled={!isDateAvailable(date)}
            >
              <div style={styles.dayContent}>
                <span style={date && selectedDate && selectedDate.toDateString() === date.toDateString() ? styles.selectedDayText : {}}>
                  {date ? date.getDate() : ''}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedDate && BookingDetails.length > 0 && (
        <div style={styles.bookingDetails}>
          <h3>Booking Details for {selectedDate.toDateString()}</h3>
          <div style={styles.bookingList}>
            {BookingDetails.map( (booking, index) => (
              <div key={index} style={styles.bookingItem}>
                <p><strong>Customer Name:</strong> {CustomerNameOfTHeBooking({customers: customers, booking: booking})}</p>
                <p><strong>Slot No:</strong> {TimeToSlot({booking: booking})}</p>
                <p><strong>Service Delivery Method:</strong> {getSDMName({Booking: booking, bds: BookingDetails, sdms: sdm })}</p>
                <p>
                  <strong>Doctor Name:</strong> {getDoctorNameFromBookingID({booking: booking})}
                  <button style={styles.assign} onClick={() => { setSelectedBooking(booking); setShowModal(true); }}>Assign</button>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showModal && selectedBooking && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Assign Doctor for Booking {selectedBooking.BookingID}</h3>
            <div style={styles.doctorList}>
              {doctors.map((doctor, index) => (
                <div key={index} style={styles.doctorItem}>
                  <p>{doctor.FirstName + " " + doctor.LastName}</p>
                  <button style={styles.assign} onClick={() =>{ 
                    let temp = selectedBooking;
                    temp.EmployeeID = doctor.EmployeeID;
                    setSelectedBooking( temp );
                    SetVet({bookingID: selectedBooking.BookingID, employeeID: temp.EmployeeID}).then(result => {
                        if( result == true ){
                            let oldBook = selectedBooking;
                            oldBook = temp.EmployeeID;
                        }
                    });
                    handleAssignDoctor(selectedBooking, doctor.FirstName + " " + doctor.LastName);
                    }}>Assign</button>
                </div>
              ))}
            </div>
            <button style={styles.assign} onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  calendarContainer: {
    width: '55vw',
    margin: '0 auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    borderRadius: '10px 10px 0px 0px',
    padding: '10px',
    textAlign: 'center',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
  },
  headerText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    margin: 0,
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(55, 230, 254, 0.75) 75%)',
    WebkitBackgroundClip: 'text',
    color: 'transparent',
  },
  navButton: {
    padding: '4px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    color: "#64B0E0",
  },
  monthYear: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
  },
  calendar: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  daysHeader: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    fontWeight: "600",
    background: '#F7F7F7',
  },
  headerCell: {
    padding: '10px',
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    borderRight: '1px solid #e0e0e0',
  },
  firstHeaderCell: {
    borderLeft: 'none'
  },
  lastHeaderCell: {
    borderRight: 'none'
  },
  daysGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    flex: 1,
  },
  dayButton: {
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    borderRight: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    background: 'white',
    width: '100%',
    height: '100%',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  firstColumnDay: {
    borderLeft: 'none'
  },
  lastColumnDay: {
    borderRight: 'none'
  },
  lastRowDay: {
    borderBottom: 'none'
  },
  bottomLeftCorner: {
    borderBottomLeftRadius: '15px'
  },
  bottomRightCorner: {
    borderBottomRightRadius: '15px'
  },
  dayContent: {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
  },
  selectedIndicator: {
    position: 'absolute',
    top: '0.1vh',
    left: '1vw',
    right: '1vw',
    bottom: '0.1vh',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    borderRadius: '5px',
    pointerEvents: 'none',
  },
  selectedDayText: {
    color: 'white',
    position: 'relative',
    fontWeight: "600",
    zIndex: 1,
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    paddingLeft: '10px',
    paddingRight: '10px',
    borderRadius: '4px',
  },
  available: {
    color: 'black',
    fontWeight: '625'
  },
  unavailable: {
    color: '#ccc',
    cursor: 'not-allowed'
  },
  selected: {
    color: 'black',
    zIndex: 3
  },
  timeSlots: {
    padding: '16px'
  },
  slotButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  slotButton: {
    padding: '8px 16px',
    border: '1px solid #64B0E0',
    borderRadius: '4px',
    background: 'white',
    color: 'black',
    cursor: 'pointer',
    width: '13vw',
    maxWidth: '125px'
  },
  bookingDetails: {
    padding: '16px'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  bookingList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  bookingItem: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    background: '#f9f9f9'
  },
  assign: {
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    borderRight: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    color: 'black',
    backgroundColor: '${(props) => theme[props.theme].default}',
    padding: '5px 15px',
    borderRadius: '5px',
    outline: '0',
    border: '0',
    textTransform: 'uppercase',
    margin: '10px 0px',
    cursor: 'pointer',
    boxShadow: '0px 2px 2px lightgray',
    transition: 'ease background-color 250ms',
    // &:hover {
    //   background-color: ${(props) => theme[props.theme].hover};
    // }
    // &:disabled {
    //   cursor: default;
    //   opacity: 0.7;
    // }
  }
}
export default AssignVet;
