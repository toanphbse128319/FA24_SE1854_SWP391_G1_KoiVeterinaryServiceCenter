import React from 'react';

const DoctorList = () => {
  return (
    <div className="bg-blue-50 py-10 flex justify-center">
      <div className="bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center p-6 md:p-10">
        
        {/* Left side - Information */}
        <div className="md:w-1/2">
          <h2 className="text-blue-500 text-sm font-semibold">Bác sĩ chính</h2>
          <h1 className="text-2xl font-bold text-gray-800 mt-2">Dr. Cao Tiểu Vi</h1>
          <ul className="mt-4 text-gray-600 space-y-2">
            <li>* Chuyên sâu: Nội khoa – Ngoại khoa</li>
            <li>– Tham gia các khóa đào tạo thú y chuyên sâu do các chuyên gia Thú Y đào tạo.</li>
            <li>– Có kinh nghiệm 6 năm về khám điều trị và phẫu thuật trên thú nhỏ.</li>
            <li>– Các loài thú cưng chính: Các loài cá.</li>
          </ul>
          <button className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
            Các bác sĩ khác
          </button>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2 mt-6 md:mt-0 md:ml-10">
          <img 
            src="img/screenshot-2024-09-29-203904-2.png" 
            alt="Dr. Cao Tiểu Vi" 
            className="w-64 h-64 rounded-lg object-cover shadow-md"
          />
        </div>
      </div>
    </div>
  );
}

export default DoctorList;
