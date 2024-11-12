import React, { useState, useEffect } from "react";
import { FetchAPI } from "../../Helper/Utilities"; // Giả sử bạn đã có hàm FetchAPI để gọi API

function filterSelectedService({ services }) {
  let prioritzizedFlag = import.meta.env.VITE_PRIORITIZED_FLAG;
  return services.filter((service) =>
    service.Status.includes(" " + prioritzizedFlag)
  );
}

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
        setSelectedServices(filterSelectedService({ services: json }));
        return true;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    GetData().then((result) => SetLoading(!result));
  }, []);

  const toggleServiceSelection = (service) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter((temp) => temp !== service));
    } else {
      if (selectedServices.length < 4) {
        setSelectedServices([...selectedServices, service]);
      } else {
        alert("You can only select 4 services.");
      }
    }
  };

  const handleSave = async () => {
    try {
      const updatePromises = services.map((service) => {
          let flag = import.meta.env.VITE_PRIORITIZED_FLAG;
        service.Status = selectedServices.includes(service) ? flag : "1";

        return FetchAPI({
          endpoint: `/service`,
          method: "PUT",
          body: service,
          headers: { "Content-Type": "application/json" },
        });
      });

      const results = await Promise.all(updatePromises);
      const allSuccessful = results.every((res) => res.ok);

      if (allSuccessful) {
        localStorage.setItem(
          "selectedServices",
          JSON.stringify(selectedServices)
        );

        alert("All selected services updated successfully!");
        console.log("Selected Services for Banner:", selectedServices);
      } else {
        alert("Some updates failed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating service status:", error);
      alert("An error occurred while saving. Please try again.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Manage Services Show In Home Page</h1>

      {/* Hiển thị danh sách dịch vụ */}
      <div className="grid grid-cols-1 gap-4">
        {services.map((service) => (
          <div
            key={service.ServiceID}
            className="p-4 bg-white shadow rounded flex items-center"
          >
            <input
              type="checkbox"
              checked={selectedServices.includes(service)}
              onChange={() => toggleServiceSelection(service)}
              className="mr-2"
            />
            <h2 className="text-xl font-bold">{service.Name} {service.Sdm}</h2>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        disabled={selectedServices.length < 4}
        className={`mt-4 py-2 px-4 rounded text-white ${
          selectedServices.length < 4
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        Save Selection
      </button>
    </div>
  );
}

export default ManageLanding;
