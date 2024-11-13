import { FetchAPI } from "../../Helper/Utilities";
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [bookingData, setBookingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [currentReport, setCurrentReport] = useState(null);

  // Fetch booking data
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await FetchAPI({ endpoint: "/Booking/getall", method: "GET" });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        setBookingData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching booking data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchBookingData();
  }, []);

  // Count bookings by status
  const completedBookings = bookingData.filter((booking) => booking.Status === "Completed");
  const cancelledBookings = bookingData.filter((booking) => booking.Status === "Cancelled");
  const confirmedBookings = bookingData.filter((booking) => booking.Status === "Confirmed");
  const inProgressBookings = bookingData.filter((booking) => booking.Status === "In Progress");

  // Prepare data for chart (Bookings per Month)
  const processBookingData = (bookings) => {
    const bookingsPerMonth = Array(12).fill(0); // Create an array with 12 elements initialized to 0
    bookings.forEach((booking) => {
      const bookingDate = new Date(booking.BookingDate);
      const month = bookingDate.getMonth(); // Get the month (0 = January, 11 = December)
      bookingsPerMonth[month] += 1; // Increment the count for the respective month
    });
    return bookingsPerMonth;
  };

  const chartData = {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Number of Bookings",
        data: processBookingData(bookingData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Bookings per Month in 2024",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1, // Bước nhảy giữa các giá trị trên trục Y
          max: 20, // Giá trị tối đa là 20
          callback: function (value) {
            return Number.isInteger(value) ? value : ""; // Chỉ hiển thị số nguyên
          },
        },
      },
    },
  };

  // Handle click on report boxes
  const handleReportClick = (reportType, bookings) => {
    setSelectedBookings(bookings);
    setCurrentReport(reportType);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="w-full p-4 bg-blue-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-center">Booking Dashboard</h2>

      {/* Chart Section */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <Bar data={chartData} options={chartOptions} />
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        <div
          onClick={() => handleReportClick("Completed Bookings", completedBookings)}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center cursor-pointer transition duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">Completed Bookings</h3>
          <p className="text-2xl font-bold text-purple-600">{completedBookings.length}</p>
        </div>
        <div
          onClick={() => handleReportClick("Cancelled Bookings", cancelledBookings)}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center cursor-pointer transition duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">Cancelled Bookings</h3>
          <p className="text-2xl font-bold text-red-600">{cancelledBookings.length}</p>
        </div>
        <div
          onClick={() => handleReportClick("Confirmed Bookings", confirmedBookings)}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center cursor-pointer transition duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">Confirmed Bookings</h3>
          <p className="text-2xl font-bold text-yellow-600">{confirmedBookings.length}</p>
        </div>
        <div
          onClick={() => handleReportClick("In Progress Bookings", inProgressBookings)}
          className="bg-white p-6 rounded-lg shadow hover:shadow-md text-center cursor-pointer transition duration-300"
        >
          <h3 className="text-lg font-semibold mb-2">In Progress Bookings</h3>
          <p className="text-2xl font-bold text-orange-600">{inProgressBookings.length}</p>
        </div>
      </div>

      {/* Booking Details Section */}
      {selectedBookings.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-xl font-semibold mb-4">{currentReport} Details</h3>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Booking ID</th>
                <th className="px-4 py-2 border">Customer ID</th>
                <th className="px-4 py-2 border">Employee ID</th>
                <th className="px-4 py-2 border">Booking Date</th>
                <th className="px-4 py-2 border">Deposit</th>
              </tr>
            </thead>
            <tbody>
              {selectedBookings.map((booking) => (
                <tr key={booking.BookingID}>
                  <td className="px-4 py-2 border text-center">{booking.BookingID}</td>
                  <td className="px-4 py-2 border text-center">{booking.CustomerID}</td>
                  <td className="px-4 py-2 border text-center">{booking.EmployeeID}</td>
                  <td className="px-4 py-2 border text-center">{formatDate(booking.BookingDate)}</td>
                  <td className="px-4 py-2 border text-center">{booking.Deposit} VND</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
