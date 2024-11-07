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

    // Function to fetch booking data
    useEffect(() => {
        const fetchBookingData = async () => {
            try {
                const response = await FetchAPI({ endpoint: '/Booking/getall', method: 'GET' });

                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setBookingData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching booking data:', error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBookingData();
    }, []);

    // Function to process booking data and count bookings per month
    const processBookingData = (bookings) => {
        const bookingsPerMonth = Array(12).fill(0); // Create an array with 12 elements initialized to 0

        bookings.forEach(booking => {
            const bookingDate = new Date(booking.BookingDate);
            const month = bookingDate.getMonth(); // Get the month (0 = January, 11 = December)
            bookingsPerMonth[month] += 1; // Increment the count for the respective month
        });

        return bookingsPerMonth;
    };

    // Prepare chart data
    const chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Number of Bookings',
                data: processBookingData(bookingData),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
      responsive: true,
      plugins: {
          legend: {
              position: 'top',
          },
          title: {
              display: true,
              text: 'Bookings per Month in 2024',
          },
      },
      scales: {
          y: {
              beginAtZero: true, // Bắt đầu từ 0
              ticks: {
                  stepSize: 1,    // Bước nhảy giữa các giá trị trên trục Y
                  max: 20,        // Giá trị tối đa là 20
                  callback: function(value) {
                      return Number.isInteger(value) ? value : ''; // Chỉ hiển thị số nguyên
                  }
              }
          }
      }
  };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Booking Per Month</h2>
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <Bar data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default Dashboard;
