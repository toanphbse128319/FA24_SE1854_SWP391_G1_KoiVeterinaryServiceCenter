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

const services = [
  { id: "S1", name: "Đặt lịch tư vấn với bác sĩ", href: "#" },
  { id: "S2", name: "Đặt lịch khám tại cơ sở", href: "#" },
  { id: "S3", name: "Đặt lịch khám tại nhà", href: "#" },
  { id: "S4", name: "Đặt lịch tư vấn kiểm tra hồ cá", href: "#" },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let navigate = useNavigate();
  const handleGoLogin = () => {
    navigate("/Login");
  };
  const handleGoAboutUs = () => {
    navigate("/AboutUs");
  };

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);

  return (
    <header className="bg-white fixed top-0 w-full z-50 ">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img alt="" src="img/logo-c-s-2.png" className="h-14 w-auto" />
          </a>
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
              Services
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 flex-none text-gray-400"
              />
            </PopoverButton>
            <PopoverPanel className="absolute left-0 z-10 mt-3 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {services.map((service) => (
                  <a
                    key={service.name}
                    href={service.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {service.name}
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
            News
          </Link>
          <a href="/" className="text-sm font-semibold leading-6 text-gray-900">
            Contact
          </a>
          <button
            onClick={handleGoAboutUs}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            About Us
          </button>
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {token ? (
            <div className='flex items-center gap-2 cursor-pointer group relative'>
              <img className='w-8 rounded-full' src="img/profile_pic.png" alt="" />
              <img className='w-2.5' src="img/dropdown_icon.svg" alt="" />
              <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 round flex flex-col gap-4 p-4'>
                  <p onClick={()=>navigate('/MyProfile')} className='hover:text-black '>My Profile</p>
                  <p onClick={()=>navigate('/Booking')} className='hover:text-black '>My Appointment</p>
                  <p onClick={()=>setToken(false)} className='hover:text-black '>Logout</p>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={handleGoLogin}
              className="bg-blue-300 text-gray-800 px-8 py-3 rounded-full font-semibold hidden md:block"
              
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </button>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Services
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {services.map((service) => (
                      <DisclosureButton
                        key={service.name}
                        as="a"
                        href={service.href}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {service.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}