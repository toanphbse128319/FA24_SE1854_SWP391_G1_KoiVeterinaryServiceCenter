import React from "react";

function Footer() {
  return (
    <div id="footer" className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-10 relative bg-white w-full px-4 py-6 lg:py-10"
    style={{ height: '20vh' }}>
      {/* Logo and hotline section */}
      <div className="flex flex-col items-center w-full max-w-md lg:max-w-lg">
      <img
  className="h-[30vh] w-auto object-contain  mt-[180px]" // Set height to 18vh, width auto to maintain aspect ratio
  alt="Company Logo"
  src={'img/logo-c-s.png'}
/>
        <div className="flex items-center justify-center px-4 py-2 bg-teal-300 rounded-full">
          <p className="text-center font-bold text-white text-sm lg:text-base">
            Hotline: 09341659874
          </p>
        </div>
      </div>

      {/* Map and address section */}
      <div className="flex flex-col items-center w-full max-w-lg overflow-y-auto mr-[120px]">
        <div className="w-full  lg:h-20 overflow-hidden rounded-lg shadow-md mt-[150px]  "> {/* Added margin-top for the map */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.610010537023!2d106.80730807388858!3d10.841127589311572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752731176b07b1%3A0xb752b24b379bae5e!2sFPT%20University%20HCMC!5e0!3m2!1sen!2s!4v1731469072597!5m2!1sen!2s"
            width="100%"
            height="100%"
        
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          />
        </div>

        {/* Contact information */}
        <div className="mt-3 text-black text-sm lg:text-base leading-relaxed text-center lg:text-left">
          <p className="font-bold">Địa chỉ</p>
          <p>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí Minh 700000, Vietnam</p>
          <p className="font-bold mt-2">Điện thoại</p>
          <p>09341659874</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
