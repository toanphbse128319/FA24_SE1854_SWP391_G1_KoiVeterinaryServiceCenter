import React from "react";
import { motion } from "framer-motion";
import { SlideUp } from "../animation/animate";
import { useNavigate } from "react-router-dom";
const DoctorList = () => {
  const navigate = useNavigate();

  const handleToDoctor = () => {
    navigate("/Booking");
  };
  return (
    <div className="bg-blue-50 py-10 flex justify-center">
      <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center p-6 md:p-10">
        <div>
          <div className="container py-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* text section */}
              <div className="space-y-5 flex justify-center flex-col xl:max-w-[500px]">
                <motion.h1
                  variants={SlideUp(0.2)}
                  initial="initial"
                  whileInView="animate"
                  className="text-4xl font-bold font-serif"
                >
                  BS: Cao Tiểu Vi
                </motion.h1>
                <motion.p
                  variants={SlideUp(0.4)}
                  initial="initial"
                  whileInView="animate"
                  className="text-gray-500 text-sm leading-7"
                >
                  * Chuyên sâu: Nội khoa – Ngoại khoa
                  <br />– Tham gia các khoá đào tạo thú y chuyên sâu do các
                  chuyên gia Thú Y đào tạo .<br />– Có kinh nghiệm 6 năm về khám
                  điều trị và phẫu thuật trên thú nhỏ.
                  <br />– Chuyên môn chính: Các loài cá.{" "}
                </motion.p>
                <motion.div
                  variants={SlideUp(0.6)}
                  initial="initial"
                  whileInView="animate"
                  className="flex gap-3"
                >
                  <div className="max-w-[80px] space-y-2">
                    <p className="text-3xl font-bold font-serif">15</p>
                    <p className="text-gray-500 text-sm">Năm kinh nghiệm</p>
                  </div>
                  <div className="max-w-[80px] space-y-2">
                    <p className="text-3xl font-bold font-serif">70</p>
                    <p className="text-gray-500 text-sm">Khách hàng hài Lòng</p>
                  </div>
                  <div className="max-w-[80px] space-y-2">
                    <p className="text-3xl font-bold font-serif">34</p>
                    <p className="text-gray-500 text-sm">
                      Giải thưởng và danh hiệu
                    </p>
                  </div>
                </motion.div>
                <div>
                  <motion.button onClick={handleToDoctor}
                    variants={SlideUp(0.6)}
                    initial="initial"
                    whileInView="animate"
                    className="primary-btn bg-blue-500 text-white shadow-[5px_5px_0px_0px_#6c6c6c] rounded-lg transition-transform transform hover:scale-105 hover:shadow-[7px_7px_0px_0px_#6c6c6c] hover:bg-blue-600 py-2 px-8 text-lg"
                  >
                    Các Bác Sĩ Khác
                  </motion.button>
                </div>
              </div>
              {/* image section */}
              <div className="flex flex-col justify-center  ">
                <motion.img
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  src={"img/BacSi.png"}
                  alt=""
                  className="w-[95%] md:w-full mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorList;
