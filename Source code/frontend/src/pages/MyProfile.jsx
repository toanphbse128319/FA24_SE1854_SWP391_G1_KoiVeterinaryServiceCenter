import React, { useState } from "react";
import BackButton from "../buttonComponents/BackButton";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
const MyProfile = () => {
  const [userData, setUserData] = useState({
    name: "NguyenKyVy",
    image: "/img/profile_pic.png",
    email: "kyn6036@gmail.com",
    phone: "+979083300",
    address: {
      line1: "250c Vo Van Hat",
      line2: "Thu Duc, TPHCM",
    },
    gender: "Male",
    dob: "2004-11-20",
  });

  const [isEdit, setIsEdit] = useState(true);
  const navigate = useNavigate();

  const handleGoHomePage = () => {
    navigate("/App");
  };

  return (
    <div className="bg-blue-200 bg-gradient-to-b from-blue-400 to-blue-200 min-h-screen flex justify-center items-center p-6">
      
       
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-md">
      <div className="mr-[25rem]">
      <Button variant="outlined "
      onClick={handleGoHomePage}>Back</Button>
      </div>
        <div className="flex flex-col items-center">
          <img
            src={userData.image}
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
            {isEdit ? (
              <input
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="p-2 border rounded w-full mb-2"
              />
            ) : (
              <p className="text-gray-700">{userData.phone}</p>
            )}

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
                <input
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={userData.address.line2}
                  type="text"
                  className="p-2 border rounded w-full"
                />
              </>
            ) : (
              <p className="text-gray-700">
                {userData.address.line1} <br /> {userData.address.line2}
              </p>
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
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-700">{userData.gender}</p>
            )}

            <p>Birthday:</p>
            {isEdit ? (
              <input
                type="date"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                value={userData.dob}
                className="p-2 border rounded w-full"
              />
            ) : (
              <p className="text-gray-700">{userData.dob}</p>
            )}
          </div>
        </div>
        <div>
          {isEdit ? (
            <button
              onClick={() => setIsEdit(false)}
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
