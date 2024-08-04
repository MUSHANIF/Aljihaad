import React, { useState, useEffect } from "react";
export default function Header({
  auth,
  mustVerifyEmail,
  status,
  waktu,
  fajr,
  Sunrise,
  Dhuhr,
  Asr,
  Maghrib,
  Isha,
}) {
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const toggleMenuSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
        setIsOpen(false);
        setIsOpenSidebar(false);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="relative z-20">
      <div className="absolute top-0 left-0 right-0 ">
        <div className="bg-transparent p-4">
          <div className="flex max-[768px]:flex-wrap justify-between items-center">
            <div className="flex items-center">
              <span>{waktu}</span>
            </div>
            <div className="hidden max-[768px]:flex items-center space-x-4">
              <button className="text-black text-center" onClick={toggleMenu}>
                ☰
              </button>
            </div>
            <div className="flex items-center space-x-4 max-[768px]:hidden">
              <span className="px-2">Subuh: {fajr}</span>
              <span className="px-2">Dhuha: {Sunrise}</span>
              <span className="px-2">Dzuhur: {Dhuhr}</span>
              <span className="px-2">Ashar: {Asr}</span>
              <span className="px-2">Magrib: {Maghrib}</span>
              <span className="px-2">Isya: {Isha}</span>
            </div>
          </div>
          <div
            className={`flex  flex-col items-start mt-2 relative p-3 z-50 space-y-2 max-[768px]:flex transition-all duration-300 ease-in-out ${
              isOpen
                ? "opacity-100 min-[768px]:hidden max-h-full   bg-white rounded-lg"
                : "opacity-0 max-h-0"
            }`}
            style={{ overflow: "hidden", zIndex: isOpen ? 50 : 0 }}
          >
            <div className="text-center flex justify-center mx-auto">
              <span class="font-semibold">Jadwal Sholat</span>
            </div>
            <span className="px-2">Subuh: {fajr}</span>
            <span className="px-2">Dhuha: {Sunrise}</span>
            <span className="px-2">Dzuhur: {Dhuhr}</span>
            <span className="px-2">Ashar: {Asr}</span>
            <span className="px-2">Magrib: {Maghrib}</span>
            <span className="px-2">Isya: {Isha}</span>
          </div>
        </div>
      </div>

      <div
        className={`container mx-auto fixed top-0 left-0 right-0 transition-all duration-500     ${
          scrolling ? "backdrop-blur-sm" : "bg-transparent mt-16"
        }`}
      >
        <div className=" mx-auto ">
          <nav
            className={`py-3 transition-all duration-500 ${
              scrolling ? "backdrop-blur-sm" : "bg-transparent"
            }`}
          >
            <div className="flex justify-between items-center">
              <a href="index.html" className="text-2xl font-bold">
                Al<span className="text-primary">Jihaad</span>
              </a>
              <button
                className="block lg:hidden text-primary"
                onClick={toggleMenuSidebar}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </button>
              <div className="hidden lg:flex gap-5 lg:items-center lg:space-x-4">
                <a
                  href="index.html"
                  className="text-black text-center hover:scale-105 transition-all animate-fade-in  "
                >
                  Home
                </a>
                <a
                  href="about.html"
                  className="text-black  hover:scale-105 transition-all animate-fade-in "
                >
                  About
                </a>
                <a
                  href="activity.html"
                  className="text-black  hover:scale-105 transition-all animate-fade-in "
                >
                  Activities
                </a>
                <a
                  href="event.html"
                  className="text-black  hover:scale-105 transition-all animate-fade-in "
                >
                  Events
                </a>
                <a
                  href="sermon.html"
                  className="text-black  hover:scale-105 transition-all animate-fade-in "
                >
                  Sermons
                </a>

                <a
                  href="contact.html"
                  className="text-black  hover:scale-105 transition-all animate-fade-in "
                >
                  Contact
                </a>
              </div>

              <a
                href="#"
                className="bg-primary rounded-lg text-white py-2 px-4 "
              >
                Donate
              </a>
            </div>
            <div
              className={`flex  flex-col items-start mt-2 relative p-3 z-50 space-y-2 max-[768px]:flex transition-all duration-300 ease-in-out ${
                isOpenSidebar
                  ? "opacity-100 min-[768px]:hidden max-h-full   bg-white rounded-lg"
                  : "opacity-0 max-h-0"
              }`}
              style={{ overflow: "hidden", zIndex: isOpenSidebar ? 50 : 0 }}
            >
              <a
                href=""
                className="text-black text-center bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                Home
              </a>
              <a
                href=""
                className="text-black text-center bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                About
              </a>
              <a
                href=""
                className="text-black text-center bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                Activities
              </a>
              <a
                href=""
                className="text-black text-center  bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                Events
              </a>
              <a
                href=""
                className="text-black text-center bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                Blog
              </a>

              <a
                href=""
                className="text-black text-center bg-primary px-3 py-2 hover:bg-primary-dark hover:scale-105 transition-all animate-fade-in hover:text-black rounded-lg w-full"
              >
                Organizer
              </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
