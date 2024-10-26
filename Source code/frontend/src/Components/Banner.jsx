import React from "react";
import { useNavigate } from "react-router-dom";

function Banner() {
  let navigate = useNavigate();
  const handleGoBooking = () => {
    navigate("/Booking");
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('img/Slice 2.png')" }}
    >
      <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center text-blue-400 px-5">
      <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r  text-blue-400 bg-clip-text">
  Chung tay gìn giữ sức khỏe cá Koi
</h1>


        <p className="text-lg mb-6">
          Đặt khám nhanh - Tư vấn trực tuyến với thú y - Dịch vụ tận nhà
        </p>
        <div className="flex gap-16">
          {/* Button 1: Đặt lịch tư vấn trực tiếp với bác sĩ */}
          <button
            onClick={handleGoBooking}
            className="bg-white text-blue-900 w-36 h-36 p-4 rounded-2xl  shadow-md hover:bg-blue-100 transition duration-300 flex flex-col items-center"
          >
            <img
              src="img/LogoService1.png"
              alt="Doctor Icon"
              className="w-12 h-12 mb-2"
            />
            <span className="text-center text-base font-semibold">
              Đặt lịch tư vấn
              <br />
              trực tiếp với bác sĩ
            </span>
          </button>

          {/* Button 2: Đặt lịch khám tại cơ sở */}
          <button className="bg-white text-blue-900 w-36 h-36 p-4 rounded-2xl shadow-md hover:bg-blue-100 transition duration-300 flex flex-col items-center">
            <img
              src="img/LogoService2.png"
              alt="Clinic Icon"
              className="w-12 h-12 mb-2"
            />
            <span className="text-center text-base font-semibold">
              Đặt lịch khám
              <br />
              tại cơ sở
            </span>
          </button>

          {/* Button 3: Đặt lịch khám tại nhà */}
          <button className="bg-white text-blue-900 w-36 h-36 p-4 rounded-2xl shadow-md hover:bg-blue-100 transition duration-300 flex flex-col items-center">
            <img
              src="img/LogoService3.png"
              alt="Home Icon"
              className="w-12 h-12 mb-2"
            />
            <span className="text-center text-base font-semibold">
              Đặt lịch khám
              <br />
              tại nhà
            </span>
          </button>

          {/* Button 4: Đặt lịch tư vấn kiểm tra hồ cá */}
          <button className="bg-white text-blue-900 w-36 h-36 p-4 rounded-2xl shadow-md hover:bg-blue-100 transition duration-300 flex flex-col items-center">
            <img
              src="img/LogoService4.png"
              alt="Aquarium Icon"
              className="w-12 h-12 mb-2"
            />
            <span className="text-center text-base font-semibold">
              Đặt lịch tư vấn
              <br />
              kiểm tra hồ cá
            </span>
          </button>
        </div>
      </div>

      {/* Gradient transition at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 "></div>
    </div>
  );
}

export default Banner;
