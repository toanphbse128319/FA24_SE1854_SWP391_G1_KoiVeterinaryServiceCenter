import React, { useState, useEffect } from 'react';
import TrackingBookingDetail from '../Components/TrackingBookingDetail';
import DoctorList from "../Components/Doctor'sSummaryInformation";
import Lich from "../Components/ScheduleCustomer";
import GetAPIURL from '../Helper/Utilities'
import { FetchAPI } from '../Helper/Utilities';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AssignVet from '../Components/Staff/AssignVet';
import TaskBar from '../Components/Staff/TaskBar';

const StaffPage = () => {
return (
    <div className="staff-page">
        <div className="Avatar">
          <h1>Avatar</h1>
          
        </div>
        
        <div className="task-bar">
            <TaskBar />
          
        </div>
        
        <AssignVet />
      <style >{`
          .Avatar {
          width: 100%; 
          height: 100%; 
          padding-top: 20px; 
          padding-bottom: 20px; 
          padding-left: 14px; 
          padding-right: 51px; 
          background: rgba(0, 0, 0, 0); 
          justify-content: flex-start; 
          align-items: 
          center; 
          gap: 9px; 
          display: inline-flex"
          color: #505050;
          font-size: 19.10px;
          font-family: Inter;
          font-weight: 600;
          word-wrap: break-word;
        }


        `}
      </style>
    </div>
    
    
//     <div style="width: 100%; height: 100%; position: relative; background: rgba(0, 0, 0, 0)">
//     <div style="height: 44px; padding-top: 14px; padding-bottom: 13px; padding-left: 24px; padding-right: 69px; left: 5px; top: 200px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: flex-start; gap: 13px; display: inline-flex">
//         <img style="width: 17px; height: 17px" src="https://via.placeholder.com/17x17" />
//         <div style="width: 77px; color: #959595; font-size: 12.90px; font-family: Inter; font-weight: 600; word-wrap: break-word">Integrations</div>
//     </div>
//     <div style="padding-top: 14px; padding-bottom: 13px; padding-left: 24px; padding-right: 103px; left: 5px; top: 162px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: flex-start; gap: 12px; display: inline-flex">
//         <img style="width: 17px; height: 16px" src="https://via.placeholder.com/17x16" />
//         <div style="width: 43px; height: 13px; color: #888888; font-size: 12.20px; font-family: Inter; font-weight: 600; word-wrap: break-word">Teams</div>
//     </div>
//     <div style="height: 45px; padding-top: 14px; padding-bottom: 14px; padding-left: 26px; padding-right: 84px; left: 4px; top: 122px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: flex-start; gap: 14px; display: inline-flex">
//         <img style="width: 15px; height: 17px" src="https://via.placeholder.com/15x17" />
//         <div style="width: 61px; color: #919191; font-size: 12.90px; font-family: Inter; font-weight: 600; word-wrap: break-word">My Notes</div>
//     </div>
//     <div style="padding-right: 6px; left: 4px; top: 85px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: center; display: inline-flex">
//         <div style="width: 191px; height: 42px; position: relative; background: rgba(0, 0, 0, 0); flex-direction: column; justify-content: flex-start; align-items: flex-start; display: flex">
//             <div style="width: 185px; height: 36px; background: #FEFEFE; border-radius: 4px; border: 1px #F2F2F2 solid"></div>
//             <img style="width: 17px; height: 18px" src="https://via.placeholder.com/17x18" />
//             <div style="width: 82px; color: #757575; font-size: 12.90px; font-family: Inter; font-weight: 600; word-wrap: break-word">My Calendar</div>
//         </div>
//     </div>
//     <div style="height: 43px; padding-top: 13px; padding-bottom: 15px; padding-left: 27px; padding-right: 73px; left: 3px; top: 46px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: flex-start; gap: 14px; display: inline-flex">
//         <img style="width: 15px; height: 15px" src="https://via.placeholder.com/15x15" />
//         <div style="width: 70px; height: 13px; color: #969696; font-size: 12.20px; font-family: Inter; font-weight: 600; word-wrap: break-word">Dashboard</div>
//     </div>
//     <div style="width: 202px; height: 41px; padding-top: 14px; padding-bottom: 14px; padding-left: 20px; padding-right: 112px; left: 1px; top: 10px; position: absolute; background: rgba(0, 0, 0, 0); justify-content: flex-start; align-items: center; display: inline-flex">
//         <div style="width: 70px; color: #A2A2A2; font-size: 11px; font-family: Inter; font-weight: 600; word-wrap: break-word">MAIN MENU</div>
//     </div>
// </div>
)
}

export default StaffPage;
