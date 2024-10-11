import React from "react";

 const GuestView = ({ className, overlapGroupClassName }) => {
  return (
    <div className={`relative w-[1211px] h-[634px] ${className}`}>
      <div className="absolute w-[552px] h-[638px] -top-px left-0">
        <img className="absolute w-[262px] h-[580px] top-0 left-0 object-cover" alt="Khung nh" />
        <img className="absolute w-[270px] h-[270px] top-[368px] left-[282px] object-cover" alt="Khung nh" />
        <img className="absolute w-[270px] h-[270px] top-[78px] left-[282px] object-cover" alt="Khung nh" />
      </div>
      <div className="absolute w-[347px] h-[55px] top-[502px] left-[603px]">
        <div className={`relative w-[345px] h-[55px] bg-[100%_100%] ${overlapGroupClassName}`}>
          <p className="absolute w-[250px] h-7 top-3.5 left-[47px] [font-family:'Inter-Bold',Helvetica] font-bold text-white text-[23.5px] text-center tracking-[0] leading-[normal]">
            Tìm hiểu về chúng tôi
          </p>
        </div>
      </div>
      <p className="absolute w-[460px] h-[95px] top-[76px] left-[603px] [font-family:'Inter-Bold',Helvetica] font-bold text-black text-[40px] tracking-[0] leading-[normal]">
        Ngôi Nhà Thứ Hai Của Cá KOI
      </p>
      <p className="absolute w-[487px] h-[287px] top-[202px] left-[603px] [font-family:'Inter-Medium',Helvetica] font-medium text-black text-[22px] tracking-[0] leading-[normal]">
        Trung tâm Sức khỏe Koi Việt Nam là cơ sở chuyên khoa hàng đầu trong chăm sóc và điều trị cá Koi. Nhằm nâng cao
        chất lượng cuộc sống cho những chú cá quý giá của bạn.
        <br />
        <br />
        <br />
        Với sứ mệnh bảo tồn và phát triển giống loài cá Koi tại Việt Nam, chúng tôi tự hào là đối tác đáng tin cậy cho
        những người yêu thích loài cá nghệ thuật này.
      </p>
      <div className="inline-flex items-center gap-[15px] absolute top-[43px] left-[605px]">
        <img className="relative w-[31.18px] h-[15px]" alt="Polygon" />
        <div className="relative w-[182px] h-[22px] mt-[-1.00px] [font-family:'Inter-Medium',Helvetica] font-medium text-[#846b6b] text-[15px] tracking-[0] leading-[35px] whitespace-nowrap">
          Trung tâm
        </div>
      </div>
    </div>
  );
};
export default GuestView;