import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const CenterService = () => {
  const location = useLocation();
  const { services, sdm } = location.state || {};
  const navigate = useNavigate();

  // Filter services to only show those with ServiceDeliveryMethod "SDM1"
  const filteredServices = services.filter(
    (service) => service.ServiceDeliveryMethodID === 'SDM4'  
  );
  
  // Handle booking navigation
  const handleBooking = (service) => {
    navigate("/booking", { state: { service, sdm } });
  };

  return (
    <div className="container mx-auto py-12 px-4 lg:px-0">
      <h1 className="text-4xl font-semibold text-center mb-10 text-blue-600">
        Dịch vụ {sdm?.Name || "không xác định"}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.ServiceID}
              className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white"
            >
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-3">
                  {service.Name}
                </h2>
                <p className="text-gray-600 mb-4">
                  {service.Description}
                </p>
                <p className="text-lg font-semibold text-gray-800">
                  Giá: {service.Price.toLocaleString()} VND
                </p>
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => handleBooking(service)}
                  className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                >
                  Đặt Lịch
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500">
            Không có dịch vụ nào thuộc phương thức này.
          </p>
        )}
      </div>
    </div>
  );
};

export default CenterService;
