import React from 'react'
import { useNavigate } from 'react-router-dom'
const AboutUsFake = () => {
    let navigate = useNavigate();
    const handleGoAboutUs = () =>{
        navigate('/AboutUs')
    }
  return (
    <div className="bg-blue-50 py-10"  >
    <div className="container mx-auto flex flex-col md:flex-row items-center">
      {/* Left side - Images */}
      <div className="flex flex-col md:flex-row gap-4 md:w-1/2">
        <img 
          src="img/khunganh3.png" 
          alt="4pet logo" 
          className="rounded-lg object-cover h-52 w-full md:h-auto md:w-1/3"
        />
        <div className="flex flex-col gap-4 w-full">
          <img 
            src="img/khunganh1.png" 
            alt="Koi center interior" 
            className="rounded-lg object-cover h-52 w-full"
          />
          <img 
            src="img/khunganh2.png" 
            alt="Koi health equipment" 
            className="rounded-lg object-cover h-52 w-full"
          />
        </div>
      </div>

      {/* Right side - Text */}
      <div className="md:w-1/2 mt-8 md:mt-0 md:pl-12">
        <h3 className="text-lg font-semibold text-gray-700">Trung tâm</h3>
        <h1 className="text-3xl font-bold text-gray-800 mt-2 mb-4">
          Ngôi Nhà Thứ Hai Của Cá KOI
        </h1>
        <p className="text-gray-600 mb-6">
          Trung tâm Sức khỏe Koi Việt Nam là cơ sở chuyên khoa hàng đầu trong chăm sóc và điều trị cá Koi. Nhằm nâng cao chất lượng cuộc sống cho những chú cá quý giá của bạn.
        </p>
        <p className="text-gray-600 mb-8">
          Với sứ mệnh bảo tồn và phát triển giống loài cá Koi tại Việt Nam, chúng tôi tự hào là đối tác đáng tin cậy cho những người yêu thích loài cá nghệ thuật này.
        </p>
        <button onClick={handleGoAboutUs} className="bg-blue-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors">
          Tìm hiểu về chúng tôi
        </button>
      </div>
    </div>
  </div>
  )
}

export default AboutUsFake
