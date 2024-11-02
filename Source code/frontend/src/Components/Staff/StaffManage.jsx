// StaffManage.jsx
import React, { useState } from "react";
import ManageLanding from "./ManageLanding";
import ManageUser from "./ManageUser";
import AssignVet from "./AssignVet";
import App from "../../App";
import { Navigate, useNavigate } from "react-router-dom";
import { LogOut } from "../../Helper/Utilities";

const StaffManage = () => {
  const [activePage, setActivePage] = useState("ManageLanding");
  const navigate = useNavigate();
  const [token, setToken] = useState(
    window.sessionStorage.getItem("token") || null
  );

  const renderPage = () => {
    switch (activePage) {
      case "ManageLanding":
        return <ManageLanding />;
      case "ManageUser":
        return <ManageUser />;
      case "AssignVet":
        return <AssignVet />;
      case "Logout":
        return <App />;
      default:
        return <ManageLanding />;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/6 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-6 text-center">Staff Management</h2>
        <div className="space-y-3">
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              activePage === "ManageLanding"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-blue-500"
            }`}
            onClick={() => setActivePage("ManageLanding")}
          >
            Manage Landing
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              activePage === "ManageUser"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-blue-500"
            }`}
            onClick={() => setActivePage("ManageUser")}
          >
            Manage User
          </button>
          <button
            className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
              activePage === "AssignVet"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-blue-500"
            }`}
            onClick={() => setActivePage("AssignVet")}
          >
            Assign Vet
          </button>
          <button
            onClick={() => {
              navigate('/');
              window.sessionStorage.clear();
              setToken(null);
              console.log("clicked");
            }}
            className="w-full text-left p-3 rounded-lg transition-colors font-medium mt-8 bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{renderPage()}</div>
    </div>
  );
};

export default StaffManage;
