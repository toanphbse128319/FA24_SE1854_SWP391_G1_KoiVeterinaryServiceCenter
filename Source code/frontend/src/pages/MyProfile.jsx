import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FetchAPI } from "../Helper/Utilities";

const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: {
      line1: "",
      line2: "",
    },
    gender: "",
    dob: "",
  });

  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  // Fetch user data from sessionStorage on component mount
  useEffect(() => {
    const firstName = sessionStorage.getItem("firstname");
    const lastName = sessionStorage.getItem("lastname");
    const email = sessionStorage.getItem("email");
    const phone = sessionStorage.getItem("phonenumber");
    const address = sessionStorage.getItem("address");
    const gender = sessionStorage.getItem("gender");
    const dob = sessionStorage.getItem("dob");

    setUserData({
      name: `${firstName} ${lastName}`,
      email: email || "",
      phone: phone || "",
      address: {
        line1: address || "",
        line2: "",
      },
      gender: gender || "Male",
      dob: dob || "",
    });
  }, []);

  const handleSave = async () => {
    // Get and format dob
    const dob = sessionStorage.getItem("dob");
    const [month, day, year] = dob.split("/");
    const dobFormatted = `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    // Prepare the data to be sent
    const updatedInfo = {
        id: sessionStorage.getItem("id"),
        address: sessionStorage.getItem("address"),
        dob: dobFormatted, // Use the formatted date
        gender: userData.gender, // Assuming gender is already set in userData
    };

    // Make the API call
    const response = await FetchAPI({
        endpoint: `/Customer/updateCusInfo`,
        method: "PUT",
        body: updatedInfo,
    });

    if (response.ok) {
        alert("Profile updated successfully");
    } else {
        alert("Failed to update profile");
    }
};



  
  const handleGoHomePage = () => {
    navigate("/App");
  };

  return (
    <div className="bg-blue-200 bg-gradient-to-b from-blue-400 to-blue-200 min-h-screen flex justify-center items-center p-6">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
        <div className="mr-[25rem]">
          <Button variant="text" onClick={handleGoHomePage}>
            Back
          </Button>
        </div>
        <div className="flex flex-col items-center">
          <img
            src="/img/profile_pic.png" // Default profile picture
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4"
          />
          {isEdit ? (
            <input
              type="text"
              value={userData.name}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="text-center p-2 border rounded w-full mb-2"
            />
          ) : (
            <p className="text-lg font-semibold">{userData.name}</p>
          )}
        </div>

        <hr className="my-4" />

        <div>
          <h2 className="text-gray-600 font-semibold mb-2">
            Contact Information
          </h2>
          <div className="mb-4">
            <p>Email:</p>
            <p className="text-gray-700 mb-2">{userData.email}</p>

            <p>Phone:</p>
            <p className="text-gray-700">{userData.phone}</p>

            <p>Address:</p>
            {isEdit ? (
              <>
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={userData.address.line1}
                  type="text"
                  className="p-2 border rounded w-full mb-2"
                />
              </>
            ) : (
              <p className="text-gray-700">{userData.address.line1}</p>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-gray-600 font-semibold mb-2">
            Basic Information
          </h2>
          <div className="mb-4">
            <p>Gender:</p>
            {isEdit ? (
              <select
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                value={userData.gender}
                className="p-2 border rounded w-full mb-2"
              >
                <option value="true">Male</option>
                <option value="false">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}

            <p>Date of Birth:</p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="p-2 border rounded w-full mb-2"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>

        <div>
          {isEdit ? (
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
            >
              Save information
            </button>
          ) : (
            <button
              onClick={() => setIsEdit(true)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 hover:scale-105 transition-transform duration-300"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
