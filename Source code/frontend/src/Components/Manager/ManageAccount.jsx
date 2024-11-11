import React, { useEffect, useState } from "react";
import { FetchAPI } from "../../Helper/Utilities";

const handleUpdateStatus = async (employee, status) => {
    const action = status === "0" ? "xóa" : "kích hoạt lại";
    const confirmed = window.confirm(`Bạn có chắc chắn muốn ${action} người dùng này?`);

    if (confirmed) {
        try {
            // Call the FetchAPI to send the PUT request to update the status
            employee.Status = status;
            const response = await FetchAPI({
                endpoint: "/employee",
                method: "PUT",
                body: { 
                    accountID: employee.AccountID,
                    address: employee.Address,
                    birthDay: employee.BirthDay,
                    employeeID: employee.EmployeeID,
                    firstName: employee.FirstName,
                    lastName: employee.LastName,
                    roleID: employee.RoleID,
                    sex: employee.Sex,
                    status: employee.Status,
                }, // Status is either "0" or "1"
            });
            if (response.ok) {
                alert(`Nhân viên với ID ${employee.EmployeeID} đã được cập nhật trạng thái thành công.`);
            } else {
                alert("Có lỗi xảy ra khi cập nhật trạng thái nhân viên.");
            }
        } catch (error) {
            console.error("Error updating customer status:", error);
            alert("Không thể kết nối tới server.");
        }
    }
};

async function FetchEmployee(){
    const response = await FetchAPI({ endpoint: "/employee" });
    if (!response.ok) throw new Error("Failed to fetch data");
    let json = await response.json();
    return json.filter( emp => emp.EmployeeID != "E0" );
}

const ManageEmployee = () => {
  const [employees, setEmployees] = useState([]);
    const [update, setUpdate] = useState([false])

    function Update(){
        setUpdate( !update );
    }

  useEffect(() => {
      FetchEmployee().then( result => {
          setEmployees( result );
      } );
  }, [update]);

    
  return (
    <div className="rounded-lg border border-gray-300 bg-white px-5 py-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto text-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 dark:bg-gray-700 dark:text-gray-200">
              <th className="w-16 py-4 px-2 font-semibold text-center">ID</th>
              <th className="min-w-[150px] py-4 px-4 font-semibold">Tên</th>
              <th className="min-w-[100px] py-4 px-4 font-semibold">Giới tính</th>
              <th className="py-4 px-4 font-semibold">Ngày sinh</th>
              <th className="py-4 px-4 font-semibold">Địa chỉ</th>
              <th className="py-4 px-4 font-semibold text-center">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.EmployeeID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border-b border-gray-200 py-5 px-2 text-center font-semibold dark:border-gray-600">
                  <h5 className="text-gray-800 dark:text-gray-200">{employee.EmployeeID}</h5>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">
                    {employee.FirstName} {employee.LastName}
                  </p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">
                    {employee.Sex ? "Nam" : "Nữ"}
                  </p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">{employee.BirthDay}</p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">{employee.Address}</p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 text-center dark:border-gray-600">
                  {employee.Status === "1" ? (
                    <button
                      onClick={() => {
                          handleUpdateStatus(employee, "0").then( Update() );
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md border border-red-600 transition duration-300"
                    >
                      Xóa
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(employee, "1").then( Update() )}
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md border border-green-600 transition duration-300"
                    >
                      Kích hoạt lại
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageEmployee;
