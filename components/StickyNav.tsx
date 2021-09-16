import { useState } from "react";
import Image from "next/image";

export const StickyNav = () => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <header className="block lg:hidden bg-transparent sticky z-10">
      <nav
        x-data="{openProfileDropdown: false, openMobileMenu: false}"
        className="bg-transparent"
      >
        <div
          className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 bg-white rounded-t-lg lg:rounded-b-lg bg-opacity-50 shadow"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="relative h-12 2xl:h-16 flex items-center justify-between">
            <div className="px-2 flex items-center lg:px-0">
              <a
                href="index.html"
                className="flex-shrink-0 flex items-center space-x-3"
              >
                <Image
                  className="block h-10 w-10 2xl:h-12 2xl:w-12"
                  src="/ptpi.png"
                  alt="PTPI"
                  width={40}
                  height={40}
                />
                <div className="block text-2xl font-bold text-primary-500">
                  HEF 2021
                </div>
              </a>
            </div>

            <div className="flex lg:hidden">
              {/* <!-- Mobile menu button --> */}

              <button
                onClick={() => setIsMobileNavOpen((prev) => !prev)}
                type="button"
                className="p-2 rounded-md inline-flex items-center justify-center text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Toggle Mobile Nav</span>
                {/* x-bind:class="! openMobileMenu ? 'block' : 'hidden'"  */}
                {isMobileNavOpen ? (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {isMobileNavOpen && (
          <div
            className="lg:hidden bg-white bg-opacity-50 shadow-md rounded-b-lg"
            style={{ backdropFilter: "blur(20px)" }}
            id="mobile-menu"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="main-hall.html"
                className="text-primary-500 block rounded-md py-2 px-3 text-base font-medium"
              >
                Main Hall
              </a>

              <a
                href="seminar-room.html"
                className="text-gray-900 hover:text-primary-500 block rounded-md py-2 px-3 text-base font-medium"
              >
                Seminar
              </a>

              <a
                href="exhibitor-list.html"
                className="text-gray-900 hover:text-primary-500 block rounded-md py-2 px-3 text-base font-medium"
              >
                Exhibitors
              </a>

              <a
                href="consultation.html"
                className="text-gray-900 hover:text-primary-500 block rounded-md py-2 px-3 text-base font-medium"
              >
                Consultation
              </a>

              <a
                href="live-schedule.html"
                className="text-gray-900 hover:text-primary-500 block rounded-md py-2 px-3 text-base font-medium"
              >
                Live Stage Schedule
              </a>
            </div>
            <div className="pt-4 pb-3 border-t border-white">
              <div className="px-5 flex items-center">
                <div className="flex-shrink-0">
                  <Image
                    className="rounded-full h-10 w-10"
                    src="/dayat.jpg"
                    alt=""
                    width={40}
                    height={40}
                  />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-900">
                    Muhammad Hidayatullah
                  </div>
                  <div className="text-sm font-medium text-primary-500">
                    dayat@gmail.com
                  </div>
                </div>
                <button className="ml-auto flex-shrink-0 rounded-full p-1 text-gray-900 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-500 focus:ring-white">
                  <span className="sr-only">View notifications</span>

                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                </button>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a
                  href="#"
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:text-primary-500"
                >
                  Your Profile
                </a>

                <a
                  href="#"
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:text-primary-500"
                >
                  Settings
                </a>

                <a
                  href="#"
                  className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:text-primary-500"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
