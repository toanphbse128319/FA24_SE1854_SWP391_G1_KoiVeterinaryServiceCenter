import React, { useState, useEffect } from "react";
import { FetchAPI } from "../../Helper/Utilities"; // Giả sử bạn đã có hàm FetchAPI để gọi API

function ManageLanding() {
  const [services, SetServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    async function GetData() {
      try {
        SetLoading(true);
        let response = await FetchAPI({ endpoint: "/service" });
        if (!response.ok) return false;

        let json = await response.json();
        SetServices(json);
        return true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    GetData().then((result) => SetLoading(!result));
  }, []);

  const toggleServiceSelection = (serviceID) => {
    if (selectedServices.includes(serviceID)) {
      setSelectedServices(selectedServices.filter((id) => id !== serviceID));
    } else {
      if (selectedServices.length < 4) {
        setSelectedServices([...selectedServices, serviceID]);
      } else {
        alert("You can only select 4 services.");
      }
    }
  };

  const handleSave = () => {
    // Save logic here (e.g., save to local storage or API)
    console.log("Selected Services for Banner:", selectedServices);
    alert("Services saved!");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white">
        <div className="p-6 text-xl font-bold">Admin Panel</div>
        <ul className="space-y-4">
          <li className="p-4 cursor-pointer bg-gray-700">Manage Services</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">Manage User</li>
          <li className="p-4 cursor-pointer hover:bg-gray-700">
            Manage Booking
          </li>
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Manage Services</h1>

        {/* Hiển thị danh sách dịch vụ */}
        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <div
              key={service.ServiceID}
              className="p-4 bg-white shadow rounded flex items-center"
            >
              <input
                type="checkbox"
                checked={selectedServices.includes(service.ServiceID)}
                onChange={() => toggleServiceSelection(service.ServiceID)}
                className="mr-2"
              />
              <h2 className="text-xl font-bold">{service.Name}</h2>
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        >
          Save Selection
        </button>
      </div>
    </div>
  );
}

export default ManageLanding;
