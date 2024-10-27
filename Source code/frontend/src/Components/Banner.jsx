import React from "react"; 
import { useNavigate } from "react-router-dom";

const services = [
  { id: "S1", name: "Đặt lịch tư vấn với bác sĩ", href: "#" },
  { id: "S2", name: "Đặt lịch khám tại cơ sở", href: "#" },
  { id: "S3", name: "Đặt lịch khám tại nhà", href: "#" },
  { id: "S4", name: "Đặt lịch tư vấn kiểm tra hồ cá", href: "#" },
];

function Banner() {
  let navigate = useNavigate();
  
  const handleGoBooking = (id, name) => {
    console.log("Selected Service ID:", id);
    console.log("Selected Service Name:", name);
    navigate("/Booking", { state: { id, name } });
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('img/Slice 2.png')" }}
    >
      <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-center items-center text-center text-blue-400 px-5">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r text-blue-400 bg-clip-text">
          Chung tay gìn giữ sức khỏe cá Koi
        </h1>

        <p className="text-lg mb-6">
          Đặt khám nhanh - Tư vấn trực tuyến với thú y - Dịch vụ tận nhà
        </p>
        
        {/* Dynamic Buttons */}
        <div className="flex gap-16">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleGoBooking(service.id, service.name)}
              className="bg-white text-blue-900 w-36 h-36 p-4 rounded-2xl shadow-md hover:bg-blue-100 transition duration-300 flex flex-col items-center"
            >
              <img
                src={`img/LogoService${index + 1}.png`}
                alt={`${service.name} Icon`}
                className="w-12 h-12 mb-2"
              />
              <span className="text-center text-base font-semibold">
                {service.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Gradient transition at the bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 "></div>
    </div>
  );
}

export default Banner;
