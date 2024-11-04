import React, { useEffect, useState } from "react";
import { FetchAPI } from "../../Helper/Utilities";

const ManageCustomer = () => {
  const [customers, setCustomers] = useState([]);

  const handleDelete = (customerID) => {
    // Logic để xóa customer
    console.log("Delete customer with ID:", customerID);
  };

  useEffect(() => {
    async function getCustomers() {
      try {
        let response = await FetchAPI({ endpoint: "/Customer" });
        if (!response.ok) throw new Error("Failed to fetch data");

        let json = await response.json();
        setCustomers(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getCustomers(); // Gọi hàm để lấy dữ liệu khách hàng
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Tên
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Giới tính
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Ngày sinh
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Địa chỉ
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.CustomerID}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {customer.CustomerID}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {customer.FirstName} {customer.LastName}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {customer.Sex ? "Nam" : "Nữ"}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {customer.BirthDay}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {customer.Address}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <button
                    onClick={() => handleDelete(customer.CustomerID)}
                    className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-md border border-red-600 transition duration-300 ease-in-out"
                  >
                    Xóa
                  </button>
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
