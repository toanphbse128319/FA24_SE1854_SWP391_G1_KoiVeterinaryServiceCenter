import React, { useEffect, useState } from "react";
import { FetchAPI } from "../../Helper/Utilities";

const handleUpdateStatus = async (account, isActive) => {
    // Determine action description based on intended status
    const action = isActive ? "kích hoạt lại" : "xóa";
    const confirmed = window.confirm(`Bạn có chắc chắn muốn ${action} người dùng này?`);

    if (confirmed) {
        try {
            // Update account's isActive property
            const response = await FetchAPI({
                endpoint: "/Account",
                method: "PUT",
                body: {
                    accountID: account.AccountID,
                    email: account.Email,
                    phoneNum: account.PhoneNumber,
                    roleID: account.RoleID,
                    avatar: account.Avatar,
                    password: account.Password,
                    status: account.Status,
                    isActive: isActive, // Update isActive based on parameter
                },
            });
            if (response.ok) {
                alert(`Nhân viên với account ID ${account.AccountID} đã được cập nhật trạng thái thành công.`);
            } else {
                alert("Có lỗi xảy ra khi cập nhật trạng thái nhân viên.");
            }
        } catch (error) {
            console.error("Error updating customer status:", error);
            alert("Không thể kết nối tới server.");
        }
    }
};

async function FetchEmployee() {
    try {
        const employeeResponse = await FetchAPI({ endpoint: "/employee" });
        const accountResponse = await FetchAPI({ endpoint: "/Account" });

        if (!employeeResponse.ok || !accountResponse.ok) throw new Error("Failed to fetch data");

        let employees = await employeeResponse.json();
        const accounts = await accountResponse.json();

        // Filter and merge data
        employees = employees
            .filter(emp => emp.EmployeeID !== "E0")
            .map(emp => {
                const account = accounts.find(acc => acc.AccountID === emp.AccountID && acc.RoleID !== "R1");
                return account ? { ...emp, ...account } : null; // Merging account data with employee
            })
            .filter(emp => emp !== null);

        return employees;
    } catch (error) {
        console.error("Error fetching employees:", error);
        return [];
    }
}
async function FetchAccount(){
    try{
        const accountResponse = await FetchAPI({ endpoint: "/Account" });
        if ( !accountResponse.ok) throw new Error("Failed to fetch data");

        const accounts = await accountResponse.json();
        return accounts;
    }catch(error){
        console.error("Error fetching employees:", error);
        return [];
    }
}

const ManageEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [update, setUpdate] = useState(false);

    function Update() {
        setUpdate(!update);
    }

    useEffect(() => {
        FetchEmployee().then(result => {
            setEmployees(result);
        });
    }, [update]);

    return (
        <div className="rounded-lg border border-gray-300 bg-white px-5 py-6 shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <h1 className="">Employees List</h1>
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto text-lg">
                    <thead>
                        <tr className="bg-gray-100 text-left text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                            <th className="w-16 py-4 px-2 font-semibold text-center">ID</th>
                            <th className="min-w-[150px] py-4 px-4 font-semibold">Tên</th>
                            <th className="min-w-[100px] py-4 px-4 font-semibold">Giới tính</th>
                            <th className="py-4 px-4 font-semibold">Ngày sinh</th>
                            <th className="py-4 px-4 font-semibold">Địa chỉ</th>
                            <th className="py-4 px-4 font-semibold">Vai trò</th>
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
                                <td className="border-b border-gray-200 py-5 px-4 font-semibold dark:border-gray-600">
                                    <p className="text-gray-800 dark:text-gray-200">{employee.RoleID === "R2" ? "Nhân Viên" : employee.RoleID === "R3" ? "Bác Sĩ" : ""}</p>
                                </td>
                                <td className="border-b border-gray-200 py-5 px-4 text-center dark:border-gray-600">
                                    {employee.IsActive ? (
                                        <button
                                            onClick={() => {
                                                handleUpdateStatus(ac, false).then(Update());
                                            }}
                                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md border border-red-600 transition duration-300"
                                        >
                                            Xóa
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleUpdateStatus(employee, true).then(Update())}
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
