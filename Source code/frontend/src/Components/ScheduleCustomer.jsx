
import React, { useState, useMemo } from 'react'; // Import các thư viện cần thiết
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Import biểu tượng điều hướng
import { useNavigate } from 'react-router-dom';



// Hàm để lấy dữ liệu lịch từ API (hiện đang được comment)
/*
const fetchScheduleData = async () => {
  try {
    const response = await fetch('https://api.example.com/schedules');
    if (!response.ok) {
      throw new Error('Phản hồi mạng không thành công');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu:', error);
    return [];
  }
};
*/

// Effect để tải dữ liệu khi component được mount (hiện đang được comment)
/*
useEffect(() => {
  const loadData = async () => {
    const data = await fetchScheduleData();
    setFetchedScheduleData(data);
  };
  loadData();
}, []);
*/

const ScheduleCalendar = ({ doctor, service, SlotSchedule , DocterSchedule, sdm }) => {
  const navigate = useNavigate();

  //khi truyền docter thì phải gọi toàn bộ  ScheduleID của doctor đó trong 30 ngày tiếp,
  //và gửi lun các slot SlotTableID liên quan tới những ScheduleID
//  const DocterSchedule = [
//    { ScheduleID: 'SCH1', EmployeeID: 'E3', Date: '2024-11-01', Status: 'Active' },
//    { ScheduleID: 'SCH2', EmployeeID: 'E3', Date: '2024-11-02', Status: 'Active' },
//    { ScheduleID: 'SCH3', EmployeeID: 'E3', Date: '2024-11-03', Status: 'Active' },
//    { ScheduleID: 'SCH4', EmployeeID: 'E3', Date: '2024-11-04', Status: 'Active' },
//  ];
//  const SlotSchedule = [
//    { SlotTableID: 'ST1', ScheduleID: 'SCH1', Slot: 1, SlotCapacity: 10, SlotOrdered: 5, SlotStatus: 1 },
//    { SlotTableID: 'ST2', ScheduleID: 'SCH1', Slot: 2, SlotCapacity: 10, SlotOrdered: 6, SlotStatus: 1 },
//    { SlotTableID: 'ST3', ScheduleID: 'SCH1', Slot: 3, SlotCapacity: 10, SlotOrdered: 7, SlotStatus: 1 },
//    { SlotTableID: 'ST4', ScheduleID: 'SCH1', Slot: 4, SlotCapacity: 10, SlotOrdered: 8, SlotStatus: 1 },
//
//  ];



  // Khai báo các state
  const [fetchedScheduleData, setFetchedScheduleData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date('2024-10-01'));
  const [isWeekView, setIsWeekView] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [fishCount, setFishCount] = useState('1');
  const [selectedSlot, setSelectedSlot] = useState(null);

  const transformScheduleData = (doctorSchedules, slotSchedules) => {
    const transformedData = [];

    doctorSchedules.forEach(schedule => {
      // Find all slots for this schedule
      const matchingSlots = slotSchedules.filter(slot =>
        slot.ScheduleID === schedule.ScheduleID
      );

      // Transform each slot into the old data format
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

  // Modified schedule map creation to handle the new data structure
  const createScheduleMap = (doctorSchedules, slotSchedules) => {
    const map = new Map();
    const transformedData = transformScheduleData(doctorSchedules, slotSchedules);
    const today = new Date();
    const todayKey = today.toISOString().split('T')[0];

    transformedData.forEach(schedule => {
      const dateKey = new Date(schedule.date).toISOString().split('T')[0];
      if (dateKey >= todayKey) {
        if (!map.has(dateKey)) {
          map.set(dateKey, new Map());
        }

        const dayMap = map.get(dateKey);
        if (!dayMap.has(schedule.slot)) {
          dayMap.set(schedule.slot, []);
        }

        dayMap.get(schedule.slot).push(schedule);
      }
    });

    return map;
  };

  const getAvailableMonths = (doctorSchedules) => {
    const months = new Set();
    doctorSchedules.forEach(schedule => {
      const date = new Date(schedule.Date);
      months.add(`${date.getFullYear()}-${date.getMonth() + 1}`);
    });
    return Array.from(months).map(month => new Date(month));
  };

  // Modified slot availability check
  const checkSlotAvailability = (date, slot, scheduleMap) => {
    if (!date) return { available: false, scheduleId: null };

    const dateString = date.toISOString().split('T')[0];
    const daySchedules = scheduleMap.get(dateString);

    if (!daySchedules) return { available: false, scheduleId: null };

    const slotSchedules = daySchedules.get(slot) || [];

    const availableSchedule = slotSchedules.find(schedule =>
      schedule.SlotStatus && schedule.ordered < schedule.SlotCapacity
    );

    return {
      available: !!availableSchedule,
      scheduleId: availableSchedule ? availableSchedule.ScheduleID : null
    };
  };

  const scheduleMap = useMemo(() =>
    createScheduleMap(DocterSchedule, SlotSchedule),
    [DocterSchedule, SlotSchedule]
  );

  const availableMonths = useMemo(() =>
    getAvailableMonths(DocterSchedule),
    [DocterSchedule]
  );

  // Hàm để lấy tất cả các ngày trong tháng, bao gồm cả ngày đệm
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(Date.UTC(year, month, 1));
    const lastDay = new Date(Date.UTC(year, month + 1, 0));
    const daysInMonth = [];

    // Thêm ngày từ tháng trước
    const prevMonthLastDay = new Date(Date.UTC(year, month, 0));
    const daysFromPrevMonth = firstDay.getUTCDay();
    for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
      daysInMonth.push(new Date(Date.UTC(year, month - 1, prevMonthLastDay.getUTCDate() - i)));
    }

    // Thêm ngày của tháng hiện tại
    for (let i = 1; i <= lastDay.getUTCDate(); i++) {
      daysInMonth.push(new Date(Date.UTC(year, month, i)));
    }

    // Thêm ngày từ tháng sau
    const daysNeeded = 35 - daysInMonth.length;
    for (let i = 1; i <= daysNeeded; i++) {
      daysInMonth.push(new Date(Date.UTC(year, month + 1, i)));
    }

    return daysInMonth;
  };

  // Hàm để lấy các ngày trong tuần
  const getWeekDays = (date) => {
    const week = [];
    const current = new Date(date);
    current.setDate(current.getDate() - current.getDay());
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return week;
  };

  // Xác định những ngày cần hiển thị dựa trên chế độ xem
  const daysToShow = isWeekView && selectedDate
    ? getWeekDays(selectedDate)
    : getDaysInMonth(currentDate);


  // Xử lý khi click vào ngày
  const handleDateClick = (date) => {
    if (!date) return;
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(date);
    setIsWeekView(true);
    setSelectedDay(date.getDate());
    setSelectedSlot(null);
  };

  // Xử lý khi chuyển sang tháng trước
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1);
    if (availableMonths.some(month => month.getFullYear() === prevMonth.getFullYear() && month.getMonth() === prevMonth.getMonth())) {
      setCurrentDate(prevMonth);
      setIsWeekView(false);
      setSelectedDay(null);
    }
  };

  // Xử lý khi chuyển sang tháng sau
  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);
    if (availableMonths.some(month => month.getFullYear() === nextMonth.getFullYear() && month.getMonth() === nextMonth.getMonth())) {
      setCurrentDate(nextMonth);
      setIsWeekView(false);
      setSelectedDay(null);
    }
  };

  // Kiểm tra xem ngày có sẵn trong lịch không
  const isDateAvailable = (date) => {
    if (!date) return false;
    const dateString = date.toISOString().split('T')[0];
    return scheduleMap.has(dateString);
  };

  // Định nghĩa các khung giờ
  const timeSlots = {
    morning: [
      { id: 1, time: '7:00-8:00' },
      { id: 2, time: '8:00-9:00' },
      { id: 3, time: '9:00-10:00' },
      { id: 4, time: '10:00-11:00' },
    ],
    afternoon: [
      { id: 5, time: '13:00-14:00' },
      { id: 6, time: '14:00-15:00' },
      { id: 7, time: '15:00-16:00' },
      { id: 8, time: '16:00-17:00' },
    ],
  };

  const isSlotAvailable = (date, slot) =>
    checkSlotAvailability(date, slot, scheduleMap);

  const handleSlotSelection = (slot, scheduleInfo) => {
    setSelectedSlot({
      ...slot,
      scheduleId: scheduleInfo.scheduleId
    });
  };

  // Xử lý khi đóng chế độ xem tuần
  const handleCloseWeekView = () => {
    setIsWeekView(false);
    setSelectedDay(null);
  };

  const handleFishCountChange = (event) => {
    setFishCount(event.target.value);
  };

  const handleNavigate = () => {
    if (selectedSlot && selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      const time = selectedSlot.time + ' ' + dateString;
      navigate('/Confirm', {
        state: {
          fishCount,
          service,
          doctor,
          time,
            sdm,
          scheduleId: selectedSlot.scheduleId
        }
      });
    }
  };
  // Hàm để lấy style cho mỗi ngày trong lịch
  const getDayStyles = (date, index) => {
    const isFirstColumn = index % 7 === 0;
    const isLastColumn = index % 7 === 6;
    const isLastRow = index >= daysToShow.length - 7;
    const isLastRowFirstColumn = isLastRow && isFirstColumn;
    const isLastRowLastColumn = isLastRow && isLastColumn;
    const lastRowStyles = isWeekView ? {} : {
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

  // Render giao diện lịch
  return (
    <div style={{
      ...styles.calendarContainer,
      height: isWeekView ? '70.5vh' : '70vh', // Đặt chiều cao cố định cho container
      minHeight: isWeekView ? '600px' : '500px',

    }}>
      {/* Tiêu đề */}
      <div style={styles.header}>
        <h2 style={styles.headerText}>Lịch hẹn khám bệnh</h2>
      </div>

      {/* Điều hướng */}
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

      {/* Lưới lịch */}
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

        {/* Lưới các ngày */}
        <div style={styles.daysGrid}>
          {daysToShow.map((date, index) => (
            <button
              key={index}
              style={{
                ...getDayStyles(date, index),
                height: isWeekView ? '10.5vh' : 'auto',

              }}
              onClick={() => handleDateClick(date)}
              disabled={!isDateAvailable(date)}
            >
              <div style={styles.dayContent}>
                <span style={date && selectedDay === date.getDate() ? styles.selectedDayText : {}}>
                  {date ? date.getDate() : ''}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Khung giờ */}
      {selectedDate && isWeekView && (
        <div style={styles.timeSlots}>
          {/* Đường phân cách với nút Đóng */}
          <div style={styles.dividerContainer}>
            <div style={styles.divider}></div>
            <button
              onClick={handleCloseWeekView}
              style={styles.closeButton}
            >
              Đóng
            </button>
          </div>
          {/* Khung giờ buổi sáng */}
          <div style={styles.timeSlotSection}>
            <h3>Buổi sáng</h3>
            <div style={styles.slotButtons}>
              {timeSlots.morning.map(slot => {
                const slotAvailability = isSlotAvailable(selectedDate, slot.id);
                return (
                  <button
                    key={slot.id}
                    style={{
                      ...styles.slotButton,
                      ...(slotAvailability.available ? styles.availableSlot : styles.unavailableSlot),
                      ...(selectedSlot && selectedSlot.id === slot.id ? styles.selectedSlot : {}),
                    }}
                    disabled={!slotAvailability.available}
                    onClick={() => handleSlotSelection(slot, slotAvailability)}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Khung giờ buổi chiều */}
          <div style={styles.timeSlotSection}>
            <h3>Buổi chiều</h3>
            <div style={styles.slotButtons}>
              {timeSlots.afternoon.map(slot => {
                const slotAvailability = isSlotAvailable(selectedDate, slot.id);
                return (
                  <button
                    key={slot.id}
                    style={{
                      ...styles.slotButton,
                      ...(slotAvailability.available ? styles.availableSlot : styles.unavailableSlot),
                      ...(selectedSlot && selectedSlot.id === slot.id ? styles.selectedSlot : {}),
                    }}
                    disabled={!slotAvailability.available}
                    onClick={() => handleSlotSelection(slot, slotAvailability)}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={styles.fishCountContainer}>
            <label htmlFor="fishCount" style={styles.fishCountLabel}>
              Hãy nhập số cá:
            </label>
            <input
              type="number"
              id="fishCount"
              value={fishCount}
              onChange={handleFishCountChange}
              style={styles.fishCountInput}

            />
          </div>

          <button
            style={styles.navigationButton}
            onClick={handleNavigate}

          >
            Đặt lịch
          </button>
        </div>

      )}
    </div>
  );

};

const styles = {
  navigationButton: {
    marginTop: '10px',
    width: '100%',
    justifyContent: 'center',
    padding: '10px ',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    color: 'white',
    fontWeight: '700',
    fontSize: '20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },

  // Container styles
  calendarContainer: {
    width: '55vw',
    margin: '0 auto',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  // Header styles
  header: {
    borderRadius: '10px 10px 0px 0px',
    padding: '10px', // Reduced padding
    textAlign: 'center',
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px', // Fixed height
  },
  headerText: {
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'white',
    margin: 0,
  },

  // Month navigation styles
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px 16px', // Reduced padding
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(55, 230, 254, 0.75) 75%)', // Gradient background
    WebkitBackgroundClip: 'text', // Clip background to text
    color: 'transparent', // Make text color transparent
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
  dividerContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px'
  },
  divider: {
    flex: 1,
    height: '1px',
    background: 'black',
    margin: '0 6vw',
  },
  closeButton: {
    position: 'absolute',
    right: '0.1vw',
    top: '50%',
    fontSize: '1.3vw',
    fontWeight: '600',
    transform: 'translateY(-50%)',
    padding: '8px 16px',
    cursor: 'pointer',
  },

  // Calendar grid styles
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

  // Day button styles
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
    padding: '10px ',
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
    paddingLeft: '10px ',
    paddingRight: '10px ',
    borderRadius: '4px',
  },

  // State styles
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

  // Time slots styles
  timeSlots: {
    padding: '16px'
  },
  timeSlotSection: {
    marginBottom: '16px',
    fontWeight: '600',
  },
  slotButtons: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px'
  },
  slotButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '13vw',
    maxWidth: '125px'
  },
  availableSlot: {
    background: 'white',
    border: '1px solid #64B0E0',
    color: 'black'
  },
  unavailableSlot: {
    background: '#e0e0e0',
    color: '#666',
  },
  selectedSlot: {
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    color: 'white',
  },

  fishCountInput: {
    margin: '12px',
    padding: '8px',
    fontSize: '1rem',
    width: '10vw',
    border: '2px solid #64B0E0', // Added black border
    borderRadius: '4px',
    outline: 'none',
  },
  fishCountLabel: {

    fontWeight: '600',
  }

}
// Xuất component
export default ScheduleCalendar;
