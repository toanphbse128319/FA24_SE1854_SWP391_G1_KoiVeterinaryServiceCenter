import React, { useState } from 'react';
import FeedbackModal from './Feedback.jsx';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Dialog,
  IconButton,
  styled
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ServiceSelection from './BookingDetail.jsx';

const DELIVERY_METHODS = {
  'SDM1': 'Home Visit',
  'SDM2': 'Online Consultation',
  'SDM3': 'Clinic Appointment',
  'SDM4': 'Emergency Visit',
  'SDM5': 'Follow-up Consultation'
};


const SAMPLE_BOOKINGS = [
  {
    id: 'B1',
    status: 'Completed',
    customerID: 'C1',
    employeeID: 'E1',
    bookingDate: '2024-09-01 09:00:00',
    expiredDate: '2024-09-01 04:00:00',
    deposit: 50.00,
    numberOfFish: 1,
    incidentalFish: 0,
    serviceDeliveryMethodID: 'SDM1',
    vat: 10.00,
    address: '250 vo van hat',
    distance: 5.5,
    distanceCost: 11.00,
    totalServiceCost: 661000,
    feedbackID: 'FB0',
    scheduleID: 'SCH1',
    note: 'Home visit for koi health check',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Pending'
  },
  {
    id: 'B2',
    status: 'Confirmed',
    customerID: 'C2',
    employeeID: 'E2',
    bookingDate: '2024-09-02 14:00:00',
    expiredDate: '2024-09-02 04:00:00',
    deposit: 37.50,
    numberOfFish: 1,
    incidentalFish: 0,
    serviceDeliveryMethodID: 'SDM2',
    vat: 7.50,
    address: '456 Maple Ave',
    distance: 0,
    distanceCost: 0.00,
    totalServiceCost: 397500,
    feedbackID: 'FB2',
    scheduleID: 'SCH2',
    note: 'Online consultation for koi',
    paymentMethod: 'PayPal',
    paymentStatus: 'Pending'
  },
  {
    id: 'B3',
    status: 'Cancelled',
    customerID: 'C3',
    employeeID: 'E3',
    bookingDate: '2024-09-03 18:00:00',
    expiredDate: '2024-09-03 04:00:00',
    deposit: 75.00,
    numberOfFish: 1,
    incidentalFish: 0,
    serviceDeliveryMethodID: 'SDM3',
    vat: 15.00,
    address: '789 Oak St',
    distance: 3.2,
    distanceCost: 6.40,
    totalServiceCost: 996000,
    feedbackID: 'FB3',
    scheduleID: 'SCH3',
    note: 'Clinic visit for koi disease treatment',
    paymentMethod: 'Cash',
    paymentStatus: 'Pending'
  },
  {
    id: 'B4',
    status: 'Pending',
    customerID: 'C4',
    employeeID: 'E4',
    bookingDate: '2024-09-04 22:00:00',
    expiredDate: '2024-09-05 04:00:00',
    deposit: 150.00,
    numberOfFish: 1,
    incidentalFish: 0,
    serviceDeliveryMethodID: 'SDM4',
    vat: 30.00,
    address: '321 Birch Ave',
    distance: 8.7,
    distanceCost: 17.40,
    totalServiceCost: 2000000,
    feedbackID: 'FB4',
    scheduleID: 'SCH4',
    note: 'Emergency koi surgery',
    paymentMethod: 'Credit Card',
    paymentStatus: 'Pending'
  },
  {
    id: 'B5',
    status: 'Completed',
    customerID: 'C5',
    employeeID: 'E5',
    bookingDate: '2024-09-05 07:00:00',
    expiredDate: '2024-09-05 04:00:00',
    deposit: 25.00,
    numberOfFish: 1,
    incidentalFish: 1,
    serviceDeliveryMethodID: 'SDM5',
    vat: 5.00,
    address: '654 Pine St',
    distance: 2.1,
    distanceCost: 4.20,
    totalServiceCost: 867000,
    feedbackID: 'FB5',
    scheduleID: 'SCH5',
    note: 'Follow-up checkup after treatment',
    paymentMethod: 'Debit Card',
    paymentStatus: 'Pending'
  }
];

// Move these inside the component since we're not using props
export const SERVICES_DATA = [
  {
    ServiceID: 'S001',
    ServiceDeliveryMethodID: 'SDM001',
    Name: 'Khám sức khỏe Koi cơ bản',
    Price: 100.00,
    Description: 'Kiểm tra sức khỏe cơ bản cho cá Koi, bao gồm kiểm tra các dấu hiệu bệnh lý và tình trạng dinh dưỡng',
    Status: 1
  },
  {
    ServiceID: 'S002',
    ServiceDeliveryMethodID: 'SDM002',
    Name: 'Tư vấn Koi trực tuyến',
    Price: 75.00,
    Description: 'Tư vấn trực tuyến với chuyên gia về cá Koi để giải đáp các thắc mắc về chăm sóc và nuôi dưỡng',
    Status: 1
  },
  {
    ServiceID: 'S003',
    ServiceDeliveryMethodID: 'SDM001',
    Name: 'Điều trị bệnh Koi',
    Price: 150.00,
    Description: 'Điều trị các bệnh phổ biến ở cá Koi như bệnh nấm, ký sinh trùng, vi khuẩn',
    Status: 1
  },
  {
    ServiceID: 'S004',
    ServiceDeliveryMethodID: 'SDM003',
    Name: 'Bảo trì hồ Koi',
    Price: 200.00,
    Description: 'Dịch vụ bảo trì định kỳ hồ cá Koi, bao gồm kiểm tra và điều chỉnh các thông số nước',
    Status: 1
  },
  {
    ServiceID: 'S005',
    ServiceDeliveryMethodID: 'SDM003',
    Name: 'Lắp đặt hệ thống lọc',
    Price: 500.00,
    Description: 'Tư vấn và lắp đặt hệ thống lọc phù hợp cho hồ cá Koi',
    Status: 1
  },
  {
    ServiceID: 'S006',
    ServiceDeliveryMethodID: 'SDM001',
    Name: 'Tiêm vaccine Koi',
    Price: 120.00,
    Description: 'Tiêm phòng các bệnh phổ biến cho cá Koi',
    Status: 1
  },
  {
    ServiceID: 'S007',
    ServiceDeliveryMethodID: 'SDM002',
    Name: 'Đánh giá chất lượng Koi',
    Price: 80.00,
    Description: 'Đánh giá chất lượng và giá trị của cá Koi dựa trên các tiêu chuẩn chuyên môn',
    Status: 1
  },
  {
    ServiceID: 'S008',
    ServiceDeliveryMethodID: 'SDM003',
    Name: 'Thiết kế hồ Koi',
    Price: 300.00,
    Description: 'Tư vấn và thiết kế hồ cá Koi theo yêu cầu của khách hàng',
    Status: 1
  }
];
const ROLE_STATUS_CONFIG = {
  customer: [
    { label: 'chờ xác nhận', value: 'Pending', isActive: false },
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false },
    { label: 'đã hủy', value: 'Cancelled', isActive: false }
  ],
  veterinarian: [
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false }
  ],
  staff: [
    { label: 'chờ xác nhận', value: 'Pending', isActive: false },
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false },
    { label: 'đã hủy', value: 'Cancelled', isActive: false }
  ]
};

const styles = {
  statusButton: {
    width: '10vw',
    height: '6.5vh',
    borderRadius: '15px',
    padding: '8px 32px',
    fontSize: '0.9vw',
    textTransform: 'none',
    border: 'none',
    cursor: 'pointer',
    margin: '0 4px',
    transition: 'all 0.3s ease',
    boxShadow: '0 0px 12px rgba(0, 0, 0, 0.2)',
  },
  statusButtonActive: {
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
    color: '#fff',
  },
  statusButtonInactive: {
    backgroundColor: '#fff',
    color: '#64B0E0',
  },
  actionButton: {
    textTransform: 'none',
    padding: '8px 16px',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: '600',
    marginLeft: '8px',
  },
  primaryActionButton: {
    background: 'linear-gradient(90deg, #64B0E0 25%, rgba(35, 200, 254, 0.75) 75%)',
  },
  secondaryActionButton: {
    background: 'linear-gradient(90deg, #4CAF50 25%, #81C784 75%)',
  },
  container: {
    backgroundColor: '#f0f7ff',
    minHeight: '0vh',
    padding: '32px',
    width: '100vw'
  },
  title: {
    marginBottom: '32px',
    fontWeight: 'bold',
    color: '#333',
    fontSize: '24px',
  },
  statusButtonContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '24px',

  },

  bookingCard: {
    width: "35%",
    height: '100%',
    position: 'relative',
    border: '1px solid #e0e0e0',
    borderRadius: '16px',
    marginBottom: '16px',
    boxShadow: '0 0px 12px rgba(0, 0, 0, 0.2)',
  },
  cardContent: {
    padding: '24px',
    paddingBottom: '64px',
    width: "30vw",
  },
  actionButtonContainer: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    gap: "5px"
  },
  infoRow: {
    display: 'flex',
    marginBottom: '8px',
  },
  infoLabel: {
    width: '30%',
    color: '#666',
  },
  infoValue: {
    width: '70%',
    fontWeight: 500,
  },
};

const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <Typography style={styles.infoLabel}>{label}</Typography>
    <Typography style={styles.infoValue}>{value}</Typography>
  </div>
);

const BookingList = ({
  //userRole = 'customer',
  userRole = 'veterinarian',
  onFeedback = () => { },
  onEditBooking = () => { },
  onStartExamination = () => { }
}) => {
  const [activeStatus, setActiveStatus] = useState(null);
  const [bookings, setBookings] = useState(SAMPLE_BOOKINGS);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Persist cart items

  // Handlers
  const handleStartExamination = (bookingId, deliveryMethod) => {
    setSelectedBookingId(bookingId);
    setSelectedDeliveryMethod(deliveryMethod);
    setShowServiceSelection(true);
  };

  const handleCloseServiceSelection = () => {
    setShowServiceSelection(false);
    setSelectedBookingId(null);
    setSelectedDeliveryMethod(null);
  };

  const handleCartUpdate = (updatedCart) => {
    setCartItems(updatedCart);
  };

  const handleConfirmBooking = (bookingId) => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === bookingId
          ? { ...booking, status: 'Confirmed' }
          : booking
      )
    );
  };

  const handleFeedbackClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowFeedbackModal(true);
  };

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedBookingId(null);
  };

  // Utility functions
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const renderBookingContent = (booking) => {
    const isCustomerOrVet = userRole === 'customer' || userRole === 'veterinarian';

    return (
      <div>
        <InfoRow label="Mã đơn" value={booking.id} />

        {isCustomerOrVet && (
          <>
            <InfoRow label="Ngày khám" value={formatDate(booking.bookingDate)} />
            <InfoRow label="Bác sĩ" value="Nguyễn Văn A" />
          </>
        )}

        <InfoRow
          label="Hình thức"
          value={DELIVERY_METHODS[booking.serviceDeliveryMethodId] || 'Home Visit'}
        />
        <InfoRow label="Tổng tiền" value={formatCurrency(booking.totalServiceCost)} />

        {!isCustomerOrVet && (
          <>
            <InfoRow label="Địa chỉ" value={booking.address} />
            <InfoRow label="Ghi chú" value={booking.note} />
          </>
        )}
      </div>
    );
  };

  const filteredBookings = activeStatus
    ? bookings.filter(booking => booking.status === activeStatus)
    : bookings;

  return (
    <Box sx={{ position: 'relative' }}>
      <div style={styles.container}>
        <Typography variant="h4" style={styles.title}>
          Danh sách đơn đặt
        </Typography>

        <div style={styles.statusButtonContainer}>
          {ROLE_STATUS_CONFIG[userRole]?.map((status, index) => (
            <button
              key={index}
              style={{
                ...styles.statusButton,
                ...(activeStatus === status.value ? styles.statusButtonActive : styles.statusButtonInactive)
              }}
              onClick={() => setActiveStatus(status.value)}
            >
              {status.label}
            </button>
          ))}
        </div>

        <div>
          {filteredBookings.map(booking => (
            <Card key={booking.id} style={styles.bookingCard}>
              <CardContent style={styles.cardContent}>
                {renderBookingContent(booking)}

                <div style={styles.actionButtonContainer}>
                  {userRole === 'customer' && booking.status === 'Completed' && booking.feedbackID === 'FB0' && (
                    <button
                      style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                      onClick={() => handleFeedbackClick(booking.id)}
                    >
                      Đánh giá
                    </button>
                  )}

                  {userRole === 'staff' && booking.status === 'Pending' && (
                    <>
                      <button
                        style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                        onClick={() => onEditBooking(booking.id)}
                      >
                        Thay đổi thông tin
                      </button>
                      <button
                        style={{ ...styles.actionButton, ...styles.secondaryActionButton }}
                        onClick={() => handleConfirmBooking(booking.id)}
                      >
                        Xác nhận đơn
                      </button>
                    </>
                  )}

{userRole === 'veterinarian' && booking.status === 'Confirmed' && (
  <button
    style={{ ...styles.actionButton, ...styles.primaryActionButton }}
    onClick={() => handleStartExamination(booking.id, booking.serviceDeliveryMethodID)}
  >
    Bắt đầu khám
  </button>
)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Selection Dialog */}
        {showServiceSelection && (
          <ServiceSelection
            services={SERVICES_DATA}
            isOpen={showServiceSelection}
            onClose={handleCloseServiceSelection}
            deliveryMethod={selectedDeliveryMethod}
          />
        )}


        {/* Feedback Modal */}
        {showFeedbackModal && (
          <FeedbackModal
            bookingId={selectedBookingId}
            onClose={handleCloseFeedback}
          />
        )}
      </div>
    </Box>
  );
};

export default BookingList;