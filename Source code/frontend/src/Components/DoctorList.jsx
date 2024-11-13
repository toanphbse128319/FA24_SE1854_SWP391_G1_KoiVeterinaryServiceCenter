import React, { useState, useEffect } from 'react';
import { FetchAPI } from '../Helper/Utilities';
import { useNavigate } from 'react-router-dom';

const DoctorListHome = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  // Function to handle doctor selection
  const handleSelectDoctor = (doctor) => {
    // Here, you can do something with the selected doctor
    console.log("Selected Doctor:", doctor);
    // You can store the selected doctor in state or pass it to another component
  };

  useEffect(() => {
    async function fetchDoctors() {
      try {
        setLoading(true);
        const response = await FetchAPI({ endpoint: '/Employee/getbyrolename?info=Veterinarian' });
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDoctors();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  return (
    <div className="doctor-list bg-blue-50 min-h-screen py-8 relative"> {/* Light blue background */}
      
      {/* Back to Home Button at Top Left */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')} // Navigates to the homepage when clicked
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Back to Home
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8 text-blue-600">Meet Our Doctors</h2>
      
      {/* Doctor List in Vertical Layout */}
      <div className="space-y-6">
        {doctors.map(doctor => (
          <div key={doctor.EmployeeID} className="bg-white shadow-lg rounded-xl p-4 flex items-center max-w-md mx-auto">
            {/* Avatar and Name */}
            <div className="flex-shrink-0">
              <div className="rounded-full w-20 h-20 bg-blue-100 flex items-center justify-center mr-6">
                <span className="text-2xl font-semibold text-blue-500">
                  {doctor.FirstName[0]}{doctor.LastName[0]}
                </span>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="flex-grow">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{doctor.FirstName} {doctor.LastName}</h3>
              <p className="text-gray-500"><strong>Gender:</strong> {doctor.Sex ? 'Male' : 'Female'}</p>
              <p className="text-gray-500"><strong>Born:</strong> {new Date(doctor.BirthDay).toLocaleDateString()}</p>
              <p className="text-gray-500"><strong>Address:</strong> {doctor.Address}</p>
            </div>

            {/* Select Button */}
            <div>
              <button
                onClick={() => handleSelectDoctor(doctor)} // Pass the selected doctor
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorListHome;
