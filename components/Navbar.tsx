import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];

const navigation = [
  { name: "Main Hall", href: "main-hall" },
  { name: "Seminar", href: "seminar-room" },
  { name: "Exhibitors", href: "exhibitors" },
  { name: "Consultation", href: "consultation" },
  { name: "Webinar Schedule", href: "webinar-schedule" },
];

const user = {
  name: "Muhammad Hidayatullah",
  email: "dayat@gmail.com",
  imageUrl: "/dayat.jpg",
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  variant?: "dark" | "light";
  currentHref?: string;
};

export const Navbar = ({ variant = "light", currentHref }: Props) => {
  return (
    <header className="bg-transparent z-10 sticky">
      <Disclosure
        as="nav"
        className="bg-transparent px-1.5 lg:px-2 py-1.5 xl:py-2"
      >
        {({ open }) => (
          <>
            <div
              className={`max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 bg-white   lg:bg-opacity-10 shadow rounded-t-lg ${
                open
                  ? "bg-opacity-70 backdrop-filter backdrop-blur-lg"
                  : "lg:backdrop-blur-lg bg-opacity-0 rounded-b-lg"
              }`}
            >
              {/* Navbar */}
              <div className="flex items-center justify-between h-12 2xl:h-16">
                {/* Left Nav */}
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center space-x-3">
                    <div
                      className={`p-0.5 lg:bg-transparent flex items-center justify-center rounded-full ${
                        open
                          ? "backdrop-filter backdrop-blur-lg bg-transparent"
                          : "bg-white bg-opacity-90"
                      }`}
                    >
                      <Image
                        width={38}
                        height={38}
                        src="/ptpi.png"
                        alt="PTPI"
                      />
                    </div>
                    <div className="hidden lg:block text-2xl font-bold text-primary-500">
                      HEF 2021
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a
                            className={classNames(
                              item.href === currentHref
                                ? "text-primary-500"
                                : `${
                                    variant === "light"
                                      ? "text-gray-300 hover:text-white"
                                      : "text-gray-700 hover:text-primary-500"
                                  }`,
                              "px-3 py-2 rounded-md font-medium"
                            )}
                            aria-current={
                              item.href === currentHref ? "page" : undefined
                            }
                          >
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Nav */}
                <div className="hidden lg:block">
                  <div className="ml-4 flex items-center lg:ml-6">
                    <button
                      type="button"
                      className="p-1 rounded-full text-gray-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={30}
                            height={30}
                            className="rounded-full"
                            src={user.imageUrl}
                            alt={user.name}
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white bg-opacity-90 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  href={item.href}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>

                {open ? (
                  <div className="-ml-3 block lg:hidden text-2xl font-bold text-primary-500">
                    HEF 2021
                  </div>
                ) : null}
                {/* Toggle Mobile Nav Button */}
                <div className="-mr-2 flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className={`bg-white inline-flex items-center justify-center p-1.5 rounded-md text-gray-700 bg-opacity-90 hover:bg-opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-500 focus:ring-white ${
                      open ? "backdrop-filter backdrop-blur-lg" : ""
                    }`}
                  >
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile Nav Panel */}
            <Disclosure.Panel className="lg:hidden bg-white bg-opacity-70 backdrop-filter backdrop-blur-lg">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      className={classNames(
                        item.href === currentHref
                          ? "text-primary-500"
                          : "text-gray-700 hover:text-primary-500",
                        " block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={
                        item.href === currentHref ? "page" : undefined
                      }
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-300">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                      src={user.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-primary-500 mb-0.5">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-600">
                      {user.email}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-500 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
