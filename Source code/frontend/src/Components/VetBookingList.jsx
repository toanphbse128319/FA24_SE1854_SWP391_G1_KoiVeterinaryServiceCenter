import React from 'react';
import { useLocation } from 'react-router-dom';

const BOOKING_INFO = [
  { label: 'Hình thức:', value: 'tại nhà' },
  { label: 'Dịch vụ:', value: 'gói chăm sóc toàn diện' },
  { label: 'Bác sĩ:', value: 'Nguyễn Văn A' },
  { label: 'Ngày khám:', value: '08/10/2024' },
  { label: 'Giờ khám:', value: '09:00' }
];

const BOOKING_STATUSES = [
  { label: 'Đang khám', isActive: true },
  { label: 'Đã khám', isActive: false },
  { label: 'Sắp khám', isActive: false },
  { label: 'Đã hủy', isActive: false }
];

const BookingList = () => {
  return (
    <div className="bg-blue-50 p-6 font-sans">
      <h1 className="text-3xl font-bold mb-8" style={{ marginLeft: '15%' }}>
  Danh sách đơn đặt
</h1>
      
      <div className="flex justify-center space-x-8 mb-8">
        {BOOKING_STATUSES.map((status, index) => (
          <button 
            key={index}
            className={`px-6 py-2 rounded-full shadow-md ${
              status.isActive ? 'bg-blue-400 text-white' : 'bg-white text-gray-700'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md relative" style={{ marginLeft: '15%' }}>
        <div className="absolute top-2 right-2 bg-gray-200 text-gray-600 px-2 py-1 rounded-full text-xs">
          Đang khám
        </div>
        <div className="space-y-2">
          {BOOKING_INFO.map((info, index) => (
            <div key={index} className="flex">
              <span className="text-blue-600 font-medium w-24">{info.label}</span>
              <span>{info.value}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button className="bg-blue-400 text-white px-4 py-2 rounded-full text-sm shadow-md">ghi nhận kết quả</button>
        </div>
      </div>
    </div>
  );
};

export default BookingList;