import React, { useState, useMemo, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FetchAPI } from "../../Helper/Utilities";
import zIndex from '@mui/material/styles/zIndex';

function isDoctorHasSchedule({doctor, schedules, date}){
    let target = date.toISOString().split('T')[0];
    if( schedules.filter( schedule => schedule.Date == target ).filter( schedule => schedule.EmployeeID == doctor.EmployeeID ).length > 0){
        console.debug( schedules.filter( schedule => schedule.Date == target ));
        return true;
    }
    return false;
}

const AddSchedule = ({DoctorSchedule, SlotSchedule, doctors, Update}) => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const statusOption = [
    "Tại nhà",
      "Tại trung tâm",
      "Trực tuyến",
  ]

async function updateVetSchedule(){
  let response = await  FetchAPI({ endpoint: `/Schedule`, method: 'POST', body: {
                        "Date": selectedDate.toISOString().split('T')[0],
                        "EmployeeID": selectedDoctor.EmployeeID,
                        "Note": selectedStatus,
                        "Status": "Active",
                    } });
  if ( !response.ok )
      return false;
  return true;
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

  // const handleShowModel = () => {

  // }

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

  const handleDateClick = (date) => {
    if (!date) return;
    setSelectedDate(date);
    setShowModal(true);
  };

  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    setCurrentDate(prevMonth);
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    setCurrentDate(nextMonth);
    setSelectedDate(null);
  };


   const handleAddScheduleClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleStatusClick = (doctor) => {
    setSelectedDoctor(doctor);
    setShowStatusModal(true);
  };

  const handleStatusOptionSelect = (option) => {
    setSelectedStatus(option);
    // Add logic to update the schedule with the selected status
  };

const handleShowModal = () => {
    setSelectedDoctor(null);
    setShowModal(false);
  };

  const handleShowStatusModal = () => {
    setSelectedStatus(null);
    setShowStatusModal(false);
  };

    function CheckMissingDoctorSchedule({ date }){
        let doctorCount = doctors.length;
        let scheduleCount = 0;
        DoctorSchedule.forEach( schedule => {
            if( schedule.Date == date )
                ++scheduleCount;
        })
        if( doctorCount * 8 > scheduleCount )
            return true;
        return false;
    }

  const isDateAvailable = (date) => {
    const dateString = date.toISOString().split('T')[0];
    let has = scheduleMap.has(dateString);
      return CheckMissingDoctorSchedule({ date: date }) && has;
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

      {showModal && selectedDate && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Doctors Working on {selectedDate.toDateString()}</h3>
            <div style={styles.doctorList}>
              {doctors.map((doctor, index) => (
                <div key={index} style={styles.doctorItem}>
                  <p>{doctor.FirstName + " " + doctor.LastName}</p>
                  { isDoctorHasSchedule({date: selectedDate, doctor: doctor, schedules: DoctorSchedule}) ? (
                      <button style={styles.assign} disabled="disabled">
                      Scheduled
                      </button>  
                  ) : (
                      <button style={styles.assign} onClick={() => {
                          setSelectedDoctor( doctor );
                      }}>

                      Add new schedule
                      </button>  
                  ) }
                </div>
              ))}
            </div>
            <button style={styles.assign} onClick={() => handleShowModal()}>Close</button>
          </div>
        </div>
      )}

      { /*      {showModal && selectedDate && selectedDoctor && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Doctor Information</h3>
            <p><strong>Name:</strong> {selectedDoctor.DoctorName}</p>
            <p><strong>Employee ID:</strong> {selectedDoctor.DoctorID}</p>
            <p><strong>Specialization:</strong> {selectedDoctor.Specialization}</p>
            <button style={styles.assign} onClick={() => handleShowModal()}>Close</button>
          </div>
        </div>
      )}
    </div>
              */}

{showModal && selectedDate && selectedDoctor && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Doctor Information</h3>
            <p><strong>Name:</strong> {selectedDoctor.FirstName + " " + selectedDoctor.LastName}</p>
            <p><strong>Employee ID:</strong> {selectedDoctor.EmployeeID}</p>
            <p><strong>Specialization:</strong> {selectedDoctor.Specialization}</p>
            <button style={styles.assign} onClick={() => handleStatusClick(selectedDoctor)}>
              Change Status
            </button>
            <button style={styles.assign} onClick={() => handleShowModal()}>
              Close
            </button>
          </div>
        </div>
      )}

      {showStatusModal && selectedDoctor && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Choose Status for {selectedDoctor.FirstName + " " + selectedDoctor.LastName}</h3>
            <div style={styles.statusOptions}>
              {statusOption.map((option, index) => (
                <button
                  key={index}
                  style={selectedStatus === option ? styles.selectedStatus : styles.statusOption}
                  onClick={() => handleStatusOptionSelect(option, selectedDoctor)}
                >
                  {option}
                </button>
              ))}
            </div>
            <button style={styles.assign} onClick={() => {
                handleShowStatusModal();
                handleShowModal();
                updateVetSchedule().then( result =>{
                    if( result == true )
                        Update();
                });
            }}>
              Apply
            </button>
            <button style={styles.assign} onClick={() => {
                handleShowStatusModal();
            }}>
              Cancel
            </button>
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
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    width: '400px',
    textAlign: 'center',
  },
  doctorList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  doctorItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assign: {
    textAlign: 'center',
    borderTop: '1px solid #e0e0e0',
    borderBottom: '1px solid #e0e0e0',
    borderRight: '1px solid #e0e0e0',
    cursor: 'pointer',
    color: 'black',
    backgroundColor: '#f0f0f0',
    padding: '5px 15px',
    borderRadius: '5px',
    outline: '0',
    border: '0',
    textTransform: 'uppercase',
    margin: '10px 0px',
    cursor: 'pointer',
    boxShadow: '0px 2px 2px lightgray',
    transition: 'ease background-color 250ms',
  },
statusOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '20px',
  },
  statusOption: {
    backgroundColor: '#f0f0f0',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  selectedStatus: {
    backgroundColor: '#64B0E0',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default AddSchedule;
