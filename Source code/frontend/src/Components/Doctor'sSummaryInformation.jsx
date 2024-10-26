import React, { useState } from 'react';
import { Card, CardContent, Avatar, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const DoctorList = ({ onSelectDoctor, doctors }) => {
  let navigate = useNavigate();

  const handleGoBackToHome = () => {
    navigate("/");
  };
  return (
    <div style={{ width: '55vw', maxHeight: '400px', overflowY: 'auto', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: 10 }}>
      {doctors.map((doctor, index) => (
        <Card
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '5px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.25)',
            borderRadius: 10,
          }}
        >
          <Avatar
            style={{
              background: 'linear-gradient(136deg, rgba(100, 176, 223, 0.50) 25%, rgba(25, 200, 254, 0.38) 75%)',
              margin: '20px',
            }}
          />
          <CardContent style={{ flexGrow: 1, padding: '16px' }}>
            <h3 style={{ fontWeight: '600', fontSize: '24px' }}>{doctor.name}</h3>
            <p style={{ fontSize: '1.3vw' }}>Lịch khám: {doctor.schedule}</p>
          </CardContent>
          <Button
            onClick={() => onSelectDoctor(doctor)}
            style={{
              marginRight: '16px',
              backgroundColor: '#3b82f6',
              color: '#fff',
              fontWeight: 'bold',
              padding: '8px 16px',
              borderRadius: '5px',
            }}
          >
            Chọn
          </Button>
          
        </Card>
        
      ))}
      <button onClick={handleGoBackToHome} class="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
              <span class="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                Trở về trang chủ
              </span>
              <svg
                class="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
    </div>
  );
};

export default function DoctorSummaryInformation() {
  // Dữ liệu mẫu cho danh sách bác sĩ
  const [doctors, setDoctors] = useState([
    { name: 'Bác sĩ Nguyễn Văn A', schedule: 'Thứ Hai, Thứ Tư' },
    { name: 'Bác sĩ Trần Thị B', schedule: 'Thứ Ba, Thứ Năm' },
    { name: 'Bác sĩ Lê Văn C', schedule: 'Thứ Sáu, Thứ Bảy' },
  ]);

  const handleSelectDoctor = (doctor) => {
    alert(`Bạn đã chọn ${doctor.name}`);
  };

  return (
    <div>
      <h2>Danh sách bác sĩ</h2>
      <DoctorList onSelectDoctor={handleSelectDoctor} doctors={doctors} />
    </div>
  );
}
