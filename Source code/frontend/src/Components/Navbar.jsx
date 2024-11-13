"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import News from "./News";
import { Link } from "react-scroll";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import LogOut from "../Helper/Utilities";

function filterServices({ allServices, sdm }) {
  let services = [];
  let atHome = sdm.filter((method) => method.Name == "Tại nhà");
  let atHomeID = null;
  if (atHome != null && atHome.length > 0)
    atHomeID = atHome[0].ServiceDeliveryMethodID;
  allServices.forEach((temp) => {
    // ... ở đây được coi là shallow copy, là kiểu chỉ đưa giá trị nhưng không tham chiếu
    let service = { ...temp };
    if (atHomeID != null && service.ServiceDeliveryMethodID == atHomeID)
      service.Name = service.Name + " tại nhà";
    else if (atHomeID != null) service.Name = service.Name + " tại trung tâm";
    services.push(service);
    //service.Name = service.Name + " trực tuyến";
  });

  return services;
}

export default function Example({ allServices, sdm }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  let navigate = useNavigate();
  const handleGoLogin = () => {
    navigate("/Login");
  };
  const handleGoAboutUs = () => {
    navigate("/AboutUs");
  };

  const services = filterServices({ allServices: allServices, sdm: sdm });
  
  

  const handleGoBooking = (services, sdm) => {
    
    
    
    navigate("/OnlineService", { state: { services, sdm } });
    
    
      
     
  };

  const [token, setToken] = useState(
    window.sessionStorage.getItem("token") || null
  );
  return (
    <header id="navbar" className="bg-white fixed top-0 w-full z-50 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link
            to="banner"
            smooth={true}
            duration={500}
            className="-m-1.5 p-1.5"
          >
            <img alt="" src="img/logo-c-s-2.png" className="h-14 w-auto" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-20">
          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
              Dịch vụ
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel
              anchor="bottom"
              className="absolute left-0 z-50 mt-3 w-60 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div className="py-1">
                {sdm.map((method) => (
                  <a
                    key={method.ServiceDeliveryMethodID}
                    onClick={() =>
                      handleGoBooking(services, method)
                    }
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {method.Name}
                  </a>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link
            to="news"
            smooth={true}
            duration={500}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Tin tức
          </Link>
          <Link
            to="footer"
            smooth={true}
            duration={500}
            className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
          >
            Thông tin liên lạc 
          </Link>
          <button
            onClick={handleGoAboutUs}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Về chúng tôi 
          </button>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img
                className="w-8 rounded-full"
                src="img/profile_pic.png"
                alt=""
              />
              <img className="w-2.5" src="img/dropdown_icon.svg" alt="" />
              <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
                <div className="min-w-48 bg-stone-100 round flex flex-col gap-4 p-4">
                  <p
                    onClick={() => navigate("/MyProfile")}
                    className="hover:text-black "
                  >
                    Hồ sơ
                  </p>
                  <p
                    onClick={() => navigate("/bookinglist")}
                    className="hover:text-black "
                  >
                    Các cuộc hẹn
                  </p>
                  <p
                    onClick={() => {
                      window.sessionStorage.clear();
                      setToken(null);
                      console.log("clicked");
                    }}
                    className="hover:text-black "
                  >
                    Đăng xuất 
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGoLogin}
              className="bg-blue-300 text-gray-800 px-8 py-3 rounded-full font-semibold hidden md:block"
            >
              Đăng nhập <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      
    </header>
  );
}
