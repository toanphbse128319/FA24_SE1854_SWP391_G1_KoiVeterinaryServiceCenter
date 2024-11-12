import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OnlineService = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Check if services exist in the location state
    if (location.state && location.state.sdm && location.state.sdm.ServiceDeliveryMethodID === "SDM3") {
      setServices(location.state.services || []);
    } else {
      // Redirect back if the ServiceDeliveryMethodID is not SDM3 or no services are found
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div className='relative w-full h-screen bg-cover bg-center' > 
      <h1 className='text-4xl font-bold text-center mt-10'>Online Services</h1>
      <div className='mt-6 max-w-4xl mx-auto'>
        {services.length > 0 ? (
          <ul>
            {services.map((service) => (
              <li key={service.ServiceID} className='mb-4 p-4 bg-white rounded shadow'>
                <h2 className='text-2xl font-semibold'>{service.Name}</h2>
                <p>{service.Description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-lg'>No services available.</p>
        )}
      </div>
    </div>
  );
};

export default OnlineService;
