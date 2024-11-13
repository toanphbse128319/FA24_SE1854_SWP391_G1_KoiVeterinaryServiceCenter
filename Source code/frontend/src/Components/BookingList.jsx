import React, { useState, useEffect } from 'react';
import FeedbackModal from './Feedback.jsx';
import Toast from './Toast';

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
import BookingActions from './ServiceSelected.jsx';
import { FetchAPI } from "../Helper/Utilities.jsx";


const ROLE_STATUS_CONFIG = {
  Customer: [
    { label: 'chờ xác nhận', value: 'Pending', isActive: false },
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false },
    { label: 'đã hủy', value: 'Cancelled', isActive: false }
  ],
  Veterinarian: [
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false }
  ],
  Staff: [
    { label: 'chờ xác nhận', value: 'Pending', isActive: false },
    { label: 'sắp khám', value: 'Confirmed', isActive: false },
    { label: 'đã khám', value: 'Completed', isActive: false },
    { label: 'đã hủy', value: 'Cancelled', isActive: false }
  ]
};

const InfoRow = ({ label, value }) => (
  <div style={styles.infoRow}>
    <Typography style={styles.infoLabel}>{label}</Typography>
    <Typography style={styles.infoValue}>{value}</Typography>
  </div>
);

async function FetchBookingList() {
  let id = window.sessionStorage.getItem("id");
  let response = await FetchAPI({ endpoint: "/booking/getbyprofile?id=" + id });
  if (!response.ok)
    return null;
  return await response.json();
}

async function FetchSDM() {
  let response = await FetchAPI({ endpoint: "/servicedeliverymethod" });
  if (!response.ok)
    return null;
  return await response.json();
}

async function FetchServices() {
  let response = await FetchAPI({ endpoint: "/service" });
  if (!response.ok)
    return null;
  return await response.json();
}

async function FetchBookingDetail() {
  let id = window.sessionStorage.getItem("id");
  console.log('day la id ' + id);
  let response = await FetchAPI({ endpoint: "/bookingdetail/getbyprofile?id=" + id });
  if (!response.ok)
    return null;
  return await response.json();
}

const BookingList = ({
  //userRole = 'Customer',
  userRole = 'Veterinarian',
  onFeedback = () => { },
  onEditBooking = () => { },
  onStartExamination = () => { }
}) => {
  const [activeStatus, setActiveStatus] = useState('Confirmed');
  const [bookings, setBookings] = useState([]);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showServiceSelection, setShowServiceSelection] = useState(false);
  const [selectedDeliveryMethodId, setSelectedDeliveryMethodId] = useState(null);
  const [cartItems, setCartItems] = useState([]); // Persist cart items
  const [showBookingActions, setShowBookingActions] = useState(false);
  const [isIncidental, setIsIncidental] = useState(false);
  const [sdm, setSDM] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(0);
  const [completed, setCompleted] = useState(false);

  const [bookingDetail, setBookingDetail] = useState([]);


  useEffect(() => {
    // if( window.sessionStorage.getItem("token") == null )
    //     navigate("/Login");
    FetchServices().then(results => { setServices(results); setLoading(loading + 1) });
    FetchSDM().then(results => { setSDM(results); setLoading(loading + 1) });

    FetchBookingList().then(results => {
      setBookings(results); setLoading(loading + 1);
    });
    FetchBookingDetail().then(results => {
      setBookingDetail(results); setLoading(loading + 1);
    });
  }, []);
  if (loading == 0) {
    return <div> Loading </div>;
  }

  const handleCloseBookingActions = () => {
    setShowBookingActions(false);
  };

  const handleFeedbackSubmitted = async () => {
    // Gọi lại API để lấy dữ liệu mới
    const updatedBookings = await FetchBookingList();
    if (updatedBookings) {
      setBookings(updatedBookings);
    }
  };


  const handleChangeStatus = async (bookingId) => {
    try {
      const response = await fetch('http://localhost:5145/api/Booking/updatestatus', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Id: bookingId,
          Message: 'Completed'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to change booking status');
      }
      window.showToast("Kết quả đã ghi nhận thành công");
      setCompleted(true)
      setTimeout(async () => {
        const updatedBookings = await FetchBookingList();
        if (updatedBookings) {
          setBookings(updatedBookings);
        }
      }, 2000); // 2 giâ

    } catch (error) {
      console.error('Error changing status:', error);
    }
  };


  // Handlers


  const handleCloseServiceSelection = () => {
    setShowServiceSelection(false);
    setSelectedBookingId(null);
    setSelectedDeliveryMethodId(null);
  };

  const handleCartUpdate = (updatedCart) => {
    setCartItems(updatedCart);
  };


  const handleFeedbackClick = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowFeedbackModal(true);
  };

  const handleConsoleLog = (temp) => {

    console.log('day la service ' + temp)
  }

  const handleCloseFeedback = () => {
    setShowFeedbackModal(false);
    setSelectedBookingId(null);
  };
  // Utility functions
  const formatDateDay = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',

    });
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };


  const renderBookingContent = (booking) => {
    const isCustomerOrVet = userRole === 'Customer' || userRole === 'Veterinarian';
    const sdm = [
      {
        ServiceDeliveryMethodID: 'SDM1',
        Name: 'Khám cá tại nhà',
        Status: 1
      },
      {
        ServiceDeliveryMethodID: 'SDM2',
        Name: 'Khám hồ tại nhà',
        Status: 1
      },
      {
        ServiceDeliveryMethodID: 'SDM3',
        Name: 'Trực tuyến',
        Status: 1
      },
      {
        ServiceDeliveryMethodID: 'SDM4',
        Name: 'Tại cơ sở',
        Status: 1
      }
    ];

    const getServiceDeliveryMethodName = (methodId) => {
      const method = sdm.find(item => item.ServiceDeliveryMethodID === methodId);
      return method ? method.Name : methodId;
    };
    return (
      <div>
       <Toast time={2000} />

        <InfoRow label="Mã đơn" value={booking.BookingID} />

        {isCustomerOrVet && (
          <>
            <InfoRow label="Ngày khám" value={formatDateDay(booking.BookingDate)} />
            <InfoRow label="Giờ khám" value={formatDateTime(booking.BookingDate)} />

            <InfoRow label="Bác sĩ" value="Nguyễn Văn A" />
          </>
        )}

        <InfoRow
          label="Hình thức"
          value={getServiceDeliveryMethodName(booking.ServiceDeliveryMethodID)} />
        <InfoRow label="Tổng tiền " value={formatCurrency(booking.TotalServiceCost)} />

        {!isCustomerOrVet && (
          <>
            <InfoRow label="Địa chỉ" value={booking.BookingAddress} />
            <InfoRow label="Ghi chú" value={booking.Note} />
          </>
        )}
      </div>
    );
  };

  const filteredBookings = activeStatus
    ? bookings.filter(booking => booking.Status === activeStatus)
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
            <Card key={booking.BookingID} style={styles.bookingCard}>
              <CardContent style={styles.cardContent}>
                {renderBookingContent(booking)}

                <div style={styles.actionButtonContainer}>
                  {userRole === 'Customer' && booking.Status === 'Completed' && booking.FeedbackID === 'FB0' && (
                    <button
                      style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                      onClick={() => handleFeedbackClick(booking.BookingID)}
                    >
                      Đánh giá
                    </button>
                  )}

                  {userRole === 'Staff' && booking.Status === 'Pending' && (
                    <>
                      <button
                        style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                        onClick={() => onEditBooking(booking.BookingID)}
                        disabled={completed}
                      >
                        Thay đổi thông tin
                      </button>
                      <button
                        style={{ ...styles.actionButton, ...styles.secondaryActionButton }}
                        onClick={() => handleConfirmBooking(booking.BookingID)}
                        disabled={completed}
                      >
                        Xác nhận đơn
                      </button>
                    </>
                  )}
                  {/* Preed */}
                  {userRole === 'Veterinarian' && booking.Status === 'Confirmed' && isIncidental == false && (


                    <>
                      <button onClick={() => {
                        setShowBookingActions(true)
                      }}
                        style={{ ...styles.actionButton, ...styles.primaryActionButton }}>
                        Khám
                      </button>

                      <BookingActions
                       booking={booking}
                        bookingId={booking.BookingID}
                        isOpen={showBookingActions}
                        onClose={handleCloseBookingActions}
                        bookingDetail={bookingDetail.find(detail => detail.BookingID === booking.BookingID)}

                        service={services.find(service => service.ServiceID === bookingDetail?.find(detail => detail.BookingID === booking.BookingID)?.ServiceID)}
                        initialFishCount={booking.NumberOfFish}
                        initialPoolCount={booking.NumberOfPool}
                        setIsIncidental={setIsIncidental}
                      />
                    </>

                  )}
                  {userRole === 'Veterinarian' && booking.Status === 'Confirmed' && isIncidental === true && (
                    <div>
                      <button
                        style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                        onClick={() => setShowServiceSelection(true)}
                      >
                        Dịch vụ phát sinh
                      </button>

                  
                      {showServiceSelection && (
                        <ServiceSelection
                        booking={booking}
                          bookingId={booking.BookingID}
                          services={services}
                          isOpen={showServiceSelection}
                          onClose={handleCloseServiceSelection}
                          deliveryMethod={booking.ServiceDeliveryMethodID}
                          servicesSelected={bookingDetail.filter(detail => 
                            detail.BookingID === booking.BookingID && 
                            detail.IsIncidental === false
                          )}
                          IncidentalFish = {booking.IncidentalFish}
                          IncidentalPool ={booking.IncidentalPool}
                          bookingDetail={bookingDetail.find(detail => detail.BookingID === booking.BookingID)}

                        />
                      )}

                      <button
                        style={{ ...styles.actionButton, ...styles.primaryActionButton }}
                        onClick={() => handleChangeStatus(booking.BookingID)}
                      >
                        Xác nhận đã khám xong
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Service Selection Dialog */}


        {/* Feedback Modal */}
        {showFeedbackModal && (
          <FeedbackModal
            bookingId={selectedBookingId}
            onClose={handleCloseFeedback}
            onFeedbackSubmitted={handleFeedbackSubmitted}
          />
        )}
      </div>
    </Box>
  );
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

export default BookingList;
