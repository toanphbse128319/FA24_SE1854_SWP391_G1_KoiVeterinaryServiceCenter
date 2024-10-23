import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrderConfirmation from '../Components/BookingComfirm';
import Customer from '../Components/CustomerSummary';

const CLINIC_ADDRESS = "1491 Lê Văn Lương, Nhà Bè, TP HCM";
const PRICE_PER_KM = 5000; // 5000 VND per km

const Confirm = () => {
  const location = useLocation();
  const { service, doctor, time, scheduleId, fishCount } = location.state;
  // console.log(location.state);
  
  const [customerInfo, setCustomerInfo] = useState({
    name: "Nguyễn Thị A",
    phone: "0923213123",
    address: "100 Cô Giang, Quận 1, TP HCM"
  });
  
  const [movingCost, setMovingCost] = useState(0);
  const [isRead, setIsRead] = useState(false); // State để theo dõi trạng thái đã đọc thông tin

  // const calculateDistance = async (origin, destination) => {
  //   try {
  //     // Using the Distance Matrix API
  //     const response = await fetch(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=AIzaSyCvdc3vaSPNpOONsh2hgRabCG-GK5c-HD0`
  //     );
  //     const data = await response.json();
      
  //     if (data.rows[0]?.elements[0]?.distance?.value) {
  //       const distanceInKm = data.rows[0].elements[0].distance.value / 1000;
  //       return Math.ceil(distanceInKm); // Round up to nearest km
  //     }
  //     return 0;
  //   } catch (error) {
  //     console.error('Error calculating distance:', error);
  //     return 0;
  //   }
  // };

  useEffect(() => {
    const updateMovingCost = async () => {
      if (!service?.deliveryMethodId) {
        // const distance = await calculateDistance(CLINIC_ADDRESS, customerInfo.address);
        const distance = 5;
        console.log(1);
        setMovingCost(distance * PRICE_PER_KM);
      }
    };

    updateMovingCost();
  }, [service?.deliveryMethodId, customerInfo.address]);

  const handleUpdateCustomerInfo = async (newInfo) => {
    setCustomerInfo({
      ...customerInfo,
      ...newInfo
    });
    
    // Recalculate moving cost if delivery method is 2
    if (service?.deliveryMethodId === 2) {
      const distance = await calculateDistance(CLINIC_ADDRESS, newInfo.address);
      setMovingCost(distance * PRICE_PER_KM);
    }
  };

  // Hàm để chuyển đổi trạng thái đã đọc
  const handleReadToggle = (event) => {
    setIsRead(event.target.checked);
  };

  // Hàm điều hướng đến trang thanh toán
  const handlePayment = () => {
    // Chuyển đến trang thanh toán
    // navigate('/payment'); // Uncomment this line when using in a real app
  };

  return (
    <div className="mt-8 mx-auto max-w-7xl px-4">
      <div className="space-y-8">
        <OrderConfirmation
          service={service}
          doctor={doctor}
          time={time}
          scheduleId={scheduleId}
          fishCount={fishCount}
          movingCost={movingCost}
        />
        
        <Customer
          name={customerInfo.name}
          phone={customerInfo.phone}
          address={customerInfo.address}
          onUpdateInfo={handleUpdateCustomerInfo}
        />

        {/* Checkbox và nút Thanh toán */}
        <div className="flex flex-col items-end mt-8">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={isRead}
              onChange={handleReadToggle}
              className="mr-2"
            />
            <span>Tôi đã đọc kỹ các thông tin của đơn hàng</span>
          </label>
          <button
            onClick={handlePayment}
            className={`px-4 py-2 cursor-pointer`}
            style={{
              background: isRead ? 'linear-gradient(90deg, #64B0E0 25%, rgba(25, 200, 254, 0.75) 75%)':'gray',
              fontWeight:'600',
              fontSize:'24px',
              borderRadius  :'10px',
              color:'white',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
            }}
            disabled={!isRead}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;