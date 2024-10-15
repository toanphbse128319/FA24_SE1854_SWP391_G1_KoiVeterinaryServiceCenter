import React from 'react';
import { useNavigate } from 'react-router-dom';

function Banner() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div
        className="relative w-full h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('img/TrangChu/nh-banner.png')" }}
      >
        <div className="absolute inset-0 bg-blue-900 bg-opacity-40 flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-4xl font-bold mb-4">
            Chung tay gìn giữ sức khỏe cá koi
          </h1>
          <p className="text-lg mb-6">
            Đặt khám nhanh - Tư vấn trực tuyến với thú y - Dịch vụ tận nhà
          </p>
          <div className="flex gap-8">
            <button className="bg-white text-blue-900 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              Đặt lịch tư vấn trực tiếp với bác sĩ
            </button>
            <button className="bg-white text-blue-900 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              Đặt lịch khám tại cơ sở
            </button>
            <button className="bg-white text-blue-900 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              Đặt lịch khám tại nhà
            </button>
            <button className="bg-white text-blue-900 p-4 rounded-lg shadow-md hover:bg-blue-100 transition duration-300">
              Đặt lịch tư vấn kiểm tra hồ cá
            </button>
          </div>
        </div>
      </div>
  );
}

export default Banner;