import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import OrderConfirmation from '../Components/BookingComfirm';
import Customer from '../Components/CustomerSummary';
import GetAPIURL from '../Helper/Utilities';
import { useNavigate } from 'react-router-dom';
import { GetGeoLocation, CalculateDistance } from '../Components/MapPicker';
import { FetchAPI } from '../Helper/Utilities';
import { jwtDecode } from 'jwt-decode';

const CLINIC_ADDRESS = "1491 Lê Văn Lương, Nhà Bè, TP HCM";
const PRICE_PER_KM = 5000; // 5000 VND per km

function IsAtHome( {sdm} ){
    if( sdm == null )
        return null;
     console.log(' sdm.Name.toLowerCase().includes("tại nhà")' + sdm.Name.toLowerCase().includes("tại nhà"))
    if ( sdm.Name.toLowerCase().includes("tại nhà")) 
        return true;
    return false;
}

//This function will take an address and get distance from address to coordinate located in .env
async function GetDistanceFromAddress( { address } ){
    if( address == null ){
        return 0;
    } 
    const coordinate = await GetGeoLocation( { address } );
    console.log( coordinate );

    if( coordinate == [0.0, 0.0] || coordinate[0] == 0 || coordinate[1] == 0 )
        return 0;
    return await CalculateDistance( {lng: coordinate[0], lat: coordinate[1] } )
}

function SetCustomer( { setCustomer } ){
    useEffect(() => {
        setCustomer({
            name: window.sessionStorage.getItem('firstname') + " " + window.sessionStorage.getItem('lastname'),
            phone: window.sessionStorage.getItem('phonenumber'),
            address: window.sessionStorage.getItem('address')
        });
    }, [] );
}

const Confirm = () => {
    const navigate = useNavigate();
  const location = useLocation();
    if( window.sessionStorage.getItem("token") == null ){
        navigate("/Login");
    }
    useEffect(() => {
        // Check if location.state is null or undefined
        if (!location.state) {
            navigate("/"); // Navigate only when the component mounts
        }
    }, [location.state, navigate]); // Dependencies

  const { service, doctor, time, scheduleId, fishCount, sdm } = location.state || {};
  
  const [customerInfo, SetCustomerInfo] = useState({
    name: null,
    phone: null,
    address: null
  });
    SetCustomer( { setCustomer: SetCustomerInfo } );
  
  const [movingCost, SetMovingCost] = useState(0);
  const [isRead, SetIsRead] = useState(false); // State để theo dõi trạng thái đã đọc thông tin

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

    let currentDistance = 0;
  useEffect(() => {
    const updateMovingCost = async () => {
      if (!service?.deliveryMethodId) {
        // const distance = await calculateDistance(CLINIC_ADDRESS, customerInfo.address);
        if( IsAtHome( {sdm: sdm} ) ){
            GetDistanceFromAddress({address: customerInfo.address }).then( distance => {
                currentDistance = distance;
                SetMovingCost(distance/1000 * PRICE_PER_KM)
            });
        } else {
            currentDistance = 0;
            SetMovingCost(0);
        }
      }
    };

    updateMovingCost();
  }, [service?.deliveryMethodId, customerInfo.address]);

  const handleUpdateCustomerInfo = async (newInfo) => {
    SetCustomerInfo({
      ...customerInfo,
      ...newInfo
    });
    
    //// Recalculate moving cost if delivery method is 2
    //if (service?.deliveryMethodId === 2) {
    //  const distance = await calculateDistance(CLINIC_ADDRESS, newInfo.address);
    //  SetMovingCost(distance * PRICE_PER_KM);
    //}
  };

  // Hàm để chuyển đổi trạng thái đã đọc
  const handleReadToggle = (event) => {
    SetIsRead(event.target.checked);
  };

    function SaveBookingInfo(){
        function SlotToTime( { slotNo } ){
            let time = "T";
            switch( slotNo ){
                case 1:
                    time += "07:00:00";
                    break;
                case 2:
                    time += "08:00:00";
                    break;
                case 3:
                    time += "09:00:00";
                    break;
                case 4:
                    time += "10:00:00";
                    break;
                case 5:
                    time += "11:00:00";
                    break;
                case 6:
                    time += "14:00:00";
                    break;
                case 7:
                    time += "15:00:00";
                    break;
                case 8:
                    time += "16:00:00";
                    break;
                default:
                    time += "00:00:00";
            }
            return time;
        }
    }
    // Hàm điều hướng đến trang thanh toán
    const handlePayment = () => {
        const calculateTotal = () => {
            const servicePrice = (service?.Price * fishCount) || 0;
            const moving = movingCost || 0;
            return servicePrice + moving;
        };
        // Chuyển đến trang thanh toán
        let token = window.sessionStorage.getItem("token");
        if( token == null )
            navigate("/Login");
        let json = jwtDecode(token);
        let customerID = json.ID;
        if( customerID == null )
            navigate("/Login");

        let bookingDateTime = time.split(" ")[1] + "T";
        let slotTime = time.split(" ")[0].split("-")[0]+":00";
        if( slotTime.length == 7 )
            slotTime = "0" + slotTime;
        bookingDateTime = bookingDateTime + slotTime;
        console.log(bookingDateTime);
        async function GetPaymentURL(){
            let response = await FetchAPI( { endpoint: "/booking/add", method: "Post", body: {
                customerID: customerID,
                employeeID: doctor?.EmployeeID,
                serviceID: service.ServiceID,
                BookingDate: bookingDateTime,
                numberOfFish: fishCount,
                distance: currentDistance,
                distanceCost: movingCost,
                totalServiceCost: calculateTotal(),
                bookingAddress: window.sessionStorage.getItem("address")
            } } );
            let text = await response.text();
            if( !response.ok ){
                return text;
            }
            response = await FetchAPI( {endpoint: "/VnPay/all/" + text } );
            text = await response.text();
            if( !response.ok )
                return await text;
            window.location.replace( text ); 
        }
        console.log( `cid: ${customerID}, eid: ${doctor?.EmployeeID}, 
            sid: ${service.ServiceID}, bkaddr: ${window.sessionStorage.getItem("address")}, 
            date: ${ bookingDateTime }, numberOfFish: ${fishCount}, distance: ${currentDistance},
            distanceCost: ${movingCost}, totalServiceCost: ${calculateTotal()}`)
        GetPaymentURL().then( result => console.log(result) );
  };

  return (
    <div className="mt-8 mx-auto max-w-7xl px-4">
      <div className="space-y-8">
        <OrderConfirmation
            sdm={sdm}
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
