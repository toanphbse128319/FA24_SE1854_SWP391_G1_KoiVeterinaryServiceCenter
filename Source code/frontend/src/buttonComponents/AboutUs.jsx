import { useNavigate } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <section class="py-24 relative xl:mr-0 lg:mr-5 mr-0">
      <div class="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
        <div class="w-full justify-start items-center xl:gap-12 gap-10 grid lg:grid-cols-2 grid-cols-1">
          <div class="w-full flex-col justify-center lg:items-start items-center gap-10 inline-flex">
            <div class="w-full flex-col justify-center items-start gap-8 flex">
              <div class="flex-col justify-start lg:items-start items-center gap-4 flex">
                <h6 class="text-gray-400 text-base font-normal leading-relaxed">
                  <h1>Về chúng tôi</h1>
                </h6>
                <div class="w-full flex-col justify-start lg:items-start items-center gap-3 flex">
                  <h2 class="text-indigo-700 text-4xl font-bold font-manrope leading-normal lg:text-start text-center">
                    The Tale of Our Achievement Story
                  </h2>
                  <p class="text-gray-500 text-base font-normal leading-relaxed lg:text-start text-center">
                    Koi Veterinary Center tận tâm đối xử với cá Koi của bạn như
                    gia đình. Cá xứng đáng được chăm sóc và quan tâm như những
                    con vật cưng khác của bạn và dịch vụ của chúng tôi là cửa
                    hàng một cửa của bạn. Chúng tôi ở đây để giúp cuộc sống nuôi
                    cá của bạn dễ dàng nhất có thể với lời khuyên và sự hỗ trợ
                    của chuyên gia mà không cần phải loay hoay trên các diễn đàn
                    internet hoặc cửa hàng thú cưng này đến cửa hàng thú cưng
                    khác.
                  </p>
                </div>
              </div>
              <div class="w-full flex-col justify-center items-start gap-6 flex">
                <div class="w-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      Hơn 10 Năm
                    </h4>
                    <p class="text-gray-500 text-base font-normal leading-relaxed">
                      Với hơn 10 năm hoạt động trong ngành, chúng tôi tự tin về sức khỏe cho cặc của bạn
                    </p>
                  </div>
                  <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      125+ Dự án
                    </h4>
                    <p class="text-gray-500 text-base font-normal leading-relaxed">
                      Trong thời gian qua, chung tôi đã gặp, tư vấn cũng như xử lý rất nhiều dự án về cá lớn nhỏ
                    </p>
                  </div>
                </div>
                <div class="w-full h-full justify-start items-center gap-8 grid md:grid-cols-2 grid-cols-1">
                  <div class="w-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      26+ Danh hiệu
                    </h4>
                    <p class="text-gray-500 text-base font-normal leading-relaxed">
                      Chúng tôi vinh dự nhận được rất nhiều bằng khen cũng như các giải thưởng do bộ y
                      tế và các đoàn thể có chuyên môn trao tặng
                    </p>
                  </div>
                  <div class="w-full h-full p-3.5 rounded-xl border border-gray-200 hover:border-gray-400 transition-all duration-700 ease-in-out flex-col justify-start items-start gap-2.5 inline-flex">
                    <h4 class="text-gray-900 text-2xl font-bold font-manrope leading-9">
                      99% Phản hồi tích cực
                    </h4>
                    <p class="text-gray-500 text-base font-normal leading-relaxed">
                      Mặc dù còn non trẻ trong ngành, nhưng chúng tôi vui mừng 
                      khi 99% khách hàng đã và đang sử dụng dịch vụ có phản hồi hài lòng!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <button class="sm:w-fit w-full group px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] transition-all duration-700 ease-in-out justify-center items-center flex">
              <span class="px-1.5 text-indigo-600 text-sm font-medium leading-6 group-hover:-translate-x-0.5 transition-all duration-700 ease-in-out">
                Trở về trang chủ
              </span>
              <svg
                class="group-hover:translate-x-0.5 transition-all duration-700 ease-in-out"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M6.75265 4.49658L11.2528 8.99677L6.75 13.4996"
                  stroke="#4F46E5"
                  stroke-width="1.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
          <div class="w-full lg:justify-start justify-center items-start flex">
            <div class="sm:w-[564px] w-full sm:h-[646px] h-full sm:bg-gray-100 rounded-3xl sm:border border-gray-200 relative">
              <img
                class="sm:mt-5 sm:ml-5 w-full h-full rounded-3xl object-cover"
                src="img\tin-1-2.png"
                alt="about Us image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
