import React from 'react';
import OrderConfirmation from '../Components/BookingComfirm'; 
import Customer from '../Components/CustomerSummary'; 
import { useLocation } from 'react-router-dom';

const Confirm = () => {
    const location = useLocation();
    const { service, doctor, time, scheduleId, fishCount, movingCost } = location.state ;
    const customerInfo = {
        name: "Nguyễn Thị A",
        phone: "0923213123",
        address: "hẻm 48 Bùi Thị Xuân"
    };
    return (
        <div style={{
          
              marginTop:'30px',
              left:'40vw'
          }}>
            <div>
                  <OrderConfirmation
                service={service}
                doctor={doctor}
                time={time}
                scheduleId={scheduleId}
                fishCount={fishCount}
                movingCost={movingCost}
            />
            </div>
          <div  style={{
            
              marginTop:'30px'
          }}>
          <Customer
           name = {customerInfo.name}
           phone ={customerInfo.phone}
           address={ customerInfo.address}
          />
          </div>
        </div>
    );
};

export default Confirm;