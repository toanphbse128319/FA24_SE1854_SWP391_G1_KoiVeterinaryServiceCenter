import React from "react";
// Make sure to import your images here
// import logoCS from 'path-to-your-logo-image';
// import vector from 'path-to-your-vector-image';

function Footer() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-12 relative bg-white w-full px-4 py-8 lg:py-16">
      <div className="flex flex-col items-center w-full max-w-md lg:max-w-lg">
        <img
          className="w-2/3 lg:w-full object-contain mb-4"
          alt="Company Logo"
          src={'img/logo-c-s.png'}
        />
        <div className="flex items-center justify-center px-4 py-2 bg-teal-300 rounded-full">
          <p className="text-center font-bold text-white text-base lg:text-lg">
            Hotline: 09341659874
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center w-full max-w-lg">
        <div className="w-full h-48 lg:h-56 overflow-hidden rounded-lg shadow-md">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3592.5733582042144!2d106.70488407462743!3d10.79821668935185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529527e3968b3%3A0x6474cca92e5cc978!2zMjM2LzI5IMSQaeG7h24gQmnDqm4gUGjhu6csIFBoxrDhu51uZyAxNywgQsOsbmggVGjhuqFuaCwgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e1!3m2!1svi!2s!4v1729289457637!5m2!1svi!2s"
            width="100%"
            height="100%"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          />
        </div>

        <div className="mt-4 text-black text-sm lg:text-base leading-relaxed text-center lg:text-left">
          <p className="font-bold">Địa chỉ</p>
          <p>236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM.</p>

          <p className="font-bold mt-2">Website</p>
          <p>https://****.vn</p>

          <p className="font-bold mt-2">Email</p>
          <p>cskh@****.vn</p>

          <p className="font-bold mt-2">Điện thoại</p>
          <p>09341659874</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
