import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FetchAPI } from "../Helper/Utilities";
const PaymentNotice = () => {
  const [booking, SetBooking] = useState(null);
  const [statusPayment, SetStatus] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Tạo booking và lấy ID của booking
    const createBooking = async () => {
      const response = await FetchAPI({ endpoint: '/Booking/add' });
      const bookingData = await response.json();
      SetBooking(bookingData.id);  // Giả sử ID booking được trả về dưới dạng bookingData.id
      // Sau khi có ID booking, lấy trạng thái thanh toán
      const paymentResponse = await FetchAPI({ endpoint: `/booking/${bookingData.id}` });
      const paymentData = await paymentResponse.json();
      SetStatus(paymentData.paymentStatus);  // Giả sử trạng thái thanh toán trả về là paymentData.paymentStatus
    };
    createBooking();
  }, []);
  // Kiểm tra trạng thái thanh toán
  const payStt = statusPayment || "pending";  // Mặc định là pending nếu chưa có trạng thái
  return (
    <div className="bg-blue-200 h-screen flex items-center justify-center">
      <div className="bg-white p-6 md:mx-auto rounded-lg shadow-lg">
        {/* Thay đổi nội dung dựa trên trạng thái thanh toán */}
        <svg
          viewBox="0 0 24 24"
          className={`w-16 h-16 mx-auto my-6 animate-bounce ${
            payStt === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          {/* Điều chỉnh tiêu đề dựa trên trạng thái thanh toán */}
          <h3 className={`md:text-2xl text-base font-semibold ${
            payStt === "success" ? "text-gray-900" : "text-red-600"
          }`}>
            {payStt === "success" ? "Payment Done!" : "Payment Failed!"}
          </h3>
          {/* Điều chỉnh nội dung dựa trên trạng thái thanh toán */}
          <p className="text-gray-600 my-2">
            {payStt === "success" 
              ? "Thank you for completing your secure online payment." 
              : "We tried to charge your card, but something went wrong. Please update your payment method."
            }
          </p>
          {payStt !== "success" && (
            <p className="text-gray-600 my-2">Please try again later or contact support.</p>
          )}
          {/* Nút quay lại */}
          <div className="py-10 text-center">
            <button
              onClick={() => navigate("/")}
              className="px-12 py-3 bg-indigo-600 text-white font-semibold rounded-full shadow-lg hover:bg-indigo-500 hover:shadow-xl active:scale-95 focus:outline-none transition transform duration-300 ease-in-out"
            >
              GO BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PaymentNotice;
