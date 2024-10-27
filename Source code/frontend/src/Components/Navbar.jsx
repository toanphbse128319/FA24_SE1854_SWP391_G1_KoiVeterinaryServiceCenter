"use client";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import News from "./News";
import { Link } from "react-scroll";
import axios from "axios";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import getAPIURL from "../Helper/Utilities";

function GetService({ setServices }) {
  let url = "/service";
  url = getAPIURL(url);

  useEffect(() => {
    console.log("sending: " + url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setServices(json))
      .catch((error) => console.error(error));
  }, []);
}

function ServiceDropdown({ handleGoAboutUs }) {
  const [services, setServices] = useState([]);
  GetService({ setServices: setServices });
  console.log(services);

  return (
    <>
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
      <Popover className="relative">
        <PopoverButton className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
          Service
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
        </PopoverButton>

      </Popover>

      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Pet Care</a>
      <Link
        to="news"
        smooth={true}
        duration={500}
        className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer"
      >
        News
      </Link>
      <a href="#" className="text-sm font-semibold leading-6 text-gray-900">Contact</a>
      <button onClick={handleGoAboutUs} className="text-sm font-semibold leading-6 text-gray-900">
        About Us
      </button>
    </PopoverGroup>
    </>
  );
}

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  let navigate = useNavigate();

  const handleGoLogin = () => {
    navigate("/Login");
  };

  const handleGoAboutUs = () => {
    navigate("/AboutUs");
  };
 

  return (
    <header className="bg-white bg-gradient-to-b from-inherit to-teal-100 fixed top-0 left-0 w-full z-50 ">
      <nav
        aria-label="Global"
        className=" mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
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

        
        <ServiceDropdown handleGoAboutUs={handleGoAboutUs} />
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <button
            onClick={handleGoLogin}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Login <span aria-hidden="true">&rarr;</span>
          </button>
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
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Features
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Marketplace
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a>
              </div>
              <div className="py-6">
                <button
                  onClick={handleGoLogin}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
