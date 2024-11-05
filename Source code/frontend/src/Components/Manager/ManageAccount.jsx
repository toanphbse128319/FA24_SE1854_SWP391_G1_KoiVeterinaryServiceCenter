import React, { useEffect, useState } from "react";
import { FetchAPI } from "../../Helper/Utilities";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const handleUpdateStatus = async (customerID, status) => {
    const action = status === "0" ? "xóa" : "kích hoạt lại";
    const confirmed = window.confirm(`Bạn có chắc chắn muốn ${action} người dùng này?`);
    
    if (confirmed) {
      try {
        // Call the FetchAPI to send the PUT request to update the status
        const response = await FetchAPI({
          endpoint: "/Customer/updatestatus",
          method: "PUT",
          body: { id: customerID, Message: status }, // Status is either "0" or "1"
        });

        if (response.ok) {
          alert(`Khách hàng với ID ${customerID} đã được cập nhật trạng thái thành công.`);
          // Optionally, update the local customer data to reflect the status change
          setCustomers((prevCustomers) =>
            prevCustomers.map((customer) =>
              customer.CustomerID === customerID
                ? { ...customer, Status: status }
                : customer
            )
          );
        } else {
          alert("Có lỗi xảy ra khi cập nhật trạng thái người dùng.");
        }
      } catch (error) {
        console.error("Error updating customer status:", error);
        alert("Không thể kết nối tới server.");
      }
    }
  };

  useEffect(() => {
    async function getCustomers() {
      try {
        const response = await FetchAPI({ endpoint: "/Customer" });
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        setCustomers(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getCustomers();
  }, []);

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
            {customers.map((customer) => (
              <tr key={customer.CustomerID} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border-b border-gray-200 py-5 px-2 text-center font-semibold dark:border-gray-600">
                  <h5 className="text-gray-800 dark:text-gray-200">{customer.CustomerID}</h5>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">
                    {customer.FirstName} {customer.LastName}
                  </p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">
                    {customer.Sex ? "Nam" : "Nữ"}
                  </p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">{customer.BirthDay}</p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                  <p className="text-gray-800 dark:text-gray-200">{customer.Address}</p>
                </td>
                <td className="border-b border-gray-200 py-5 px-4 text-center dark:border-gray-600">
                  {customer.Status === "1" ? (
                    <button
                      onClick={() => handleUpdateStatus(customer.CustomerID, "0")}
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md border border-red-600 transition duration-300"
                    >
                      Xóa
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUpdateStatus(customer.CustomerID, "1")}
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

export default ManageCustomer;
