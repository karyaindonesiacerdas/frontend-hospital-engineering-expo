import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useAuth } from "@/contexts/auth.context";
import { useUser } from "hooks/useUser";

const userNavigation = [
  { name: "My Account", href: "/my-account" },
  {
    name: "Setting Exhibitor",
    href: "/settings/exhibitor",
    access: "exhibitor",
  },
  // { name: "Sign out", href: "/login" },
];

const navigation = [
  { name: "Main Hall", href: "/main-hall" },
  { name: "Seminar", href: "/seminar-room" },
  { name: "Exhibitors", href: "/exhibitors" },
  { name: "Consultation", href: "/consultation" },
  { name: "Webinar Schedule", href: "/webinar-schedule" },
];

// const user = {
//   name: "Muhammad Hidayatullah",
//   email: "dayat@gmail.com",
//   imageUrl: "/dayat.jpg",
// };

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type Props = {
  variant?: "dark" | "light";
  currentHref?: string;
};

export const Navbar = ({ variant = "light", currentHref }: Props) => {
  const { logout, user } = useAuth();
  // console.log({ navbar: user });

  const { data: dataUser, isLoading: isLoadingUser } = useUser();
  // console.log({ navbarData: data });

  const avatarURL = dataUser?.img_profile
    ? `${process.env.NEXT_PUBLIC_STORAGE_URL}/profiles/${dataUser?.img_profile}`
    : `https://ui-avatars.com/api/?name=${user?.name}&background=random`;

  // const avatarURL = `https://ui-avatars.com/api/?name=${user?.name}&background=random`;
  // console.log({ exh: data });
  // console.log({ dataUser });

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
                      {navigation
                        .filter((item) => {
                          if (
                            item.name === "Consultation" &&
                            dataUser?.role === "exhibitor" &&
                            ![3, 4, 5].includes(dataUser?.package_id) &&
                            !dataUser?.ala_carte?.includes("open_consultation")
                          ) {
                            return false;
                          }
                          return true;
                        })
                        .map((item) => (
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
                    {!isLoadingUser && user?.role === "exhibitor" && (
                      <div
                        className={`${
                          dataUser?.package_id === 1
                            ? "bg-[#9A9A9A] text-gray-800"
                            : dataUser?.package_id === 2
                            ? "bg-[#ff3c03] text-white"
                            : dataUser?.package_id === 3
                            ? "bg-[#FFD966] text-gray-800"
                            : dataUser?.package_id === 4
                            ? "bg-[#9DC3E6] text-gray-800"
                            : dataUser?.package_id === 5
                            ? "bg-[#FCE5D6] text-gray-800"
                            : "bg-gray-100 text-gray-800"
                        } text-xs font-semibold py-1 px-3 rounded-full uppercase inline-block mr-3`}
                      >
                        {dataUser?.package_id === 1
                          ? "Mercury"
                          : dataUser?.package_id === 2
                          ? "Mars"
                          : dataUser?.package_id === 3
                          ? "Venus"
                          : dataUser?.package_id === 4
                          ? "Uranus"
                          : dataUser?.package_id === 5
                          ? "Jupiter"
                          : "No Package"}
                      </div>
                    )}

                    {user?.role === "exhibitor" && dataUser?.package_id && (
                      <Link href={`/exhibitors/${user?.id}`}>
                        <a className="pl-2.5 pr-4 py-2 flex items-center font-semibold text-sm text-white bg-primary-600 hover:bg-primary-700 rounded shadow">
                          <svg
                            className="w-5 h-5 mr-2"
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V8.18322C19.2502 7.89772 19.1891 7.61553 19.071 7.35561L18.5332 6.17239C18.2086 5.45841 17.4967 5 16.7124 5H7.28807C6.50378 5 5.79188 5.45841 5.46734 6.1724L4.92951 7.35561C4.81137 7.61553 4.75024 7.89772 4.75024 8.18322V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9.5 7.75C9.5 8.99264 8.5 10.25 7 10.25C5.5 10.25 4.75 8.99264 4.75 7.75"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M19.25 7.75C19.25 8.99264 18.5 10.25 17 10.25C15.5 10.25 14.5 8.99264 14.5 7.75"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.5 7.75C14.5 8.99264 13.5 10.25 12 10.25C10.5 10.25 9.5 8.99264 9.5 7.75"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
                            ></path>
                          </svg>
                          My Booth
                        </a>
                      </Link>
                    )}
                    {user?.role === "admin" && (
                      <Link href={`/admin`}>
                        <a className="pl-2.5 pr-4 py-2 flex items-center font-semibold text-sm text-white bg-primary-600 hover:bg-primary-700 rounded shadow">
                          <svg
                            width="24"
                            height="24"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="w-5 h-5 mr-2"
                          >
                            <circle
                              cx="12"
                              cy="8"
                              r="3.25"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                            ></circle>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M12.25 19.25H6.94953C5.77004 19.25 4.88989 18.2103 5.49085 17.1954C6.36247 15.7234 8.23935 14 12.25 14"
                            ></path>
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              d="M14.75 17.75L16 19.25L19.25 14.75"
                            ></path>
                          </svg>
                          Admin
                        </a>
                      </Link>
                    )}
                    {/* <button
                      type="button"
                      className="ml-3 p-1 rounded-full text-gray-400 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button> */}

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent focus:ring-primary border-primary">
                          <span className="sr-only">Open user menu</span>
                          <Image
                            width={35}
                            height={35}
                            objectFit="cover"
                            className="rounded-full"
                            src={avatarURL}
                            alt={user?.name}
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white bg-opacity-95 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => {
                            if (!item.access || item.access === user?.role) {
                              return (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <Link href={item.href}>
                                      <a
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              );
                            }
                          })}
                          <Menu.Item>
                            <button
                              onClick={logout}
                              className="block px-4 py-2 text-sm text-gray-700 w-full text-left hover:bg-gray-100"
                            >
                              Logout
                            </button>
                          </Menu.Item>
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
                {navigation
                  .filter((item) => {
                    if (
                      item.name === "Consultation" &&
                      dataUser?.role === "exhibitor" &&
                      ![3, 4, 5].includes(dataUser?.package_id) &&
                      !dataUser?.ala_carte?.includes("open_consultation")
                    ) {
                      return false;
                    }
                    return true;
                  })
                  .map((item) => (
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
                <div className="flex justify-between items-center">
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <Image
                        width={40}
                        height={40}
                        objectFit="cover"
                        className="h-10 w-10 rounded-full"
                        src={avatarURL}
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-primary-500 mb-0.5">
                        {user?.name}
                      </div>
                      <div className="text-sm font-medium leading-none text-gray-600">
                        {user?.email}
                      </div>
                    </div>
                    {/* <button
                    type="button"
                    className="ml-auto flex-shrink-0 p-1 rounded-full text-gray-700 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-500 focus:ring-white"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}
                  </div>

                  {user?.role === "exhibitor" && dataUser?.package_id && (
                    <Link href={`/exhibitors/${user?.id}`}>
                      <a className="pl-2.5 pr-4 py-2 flex items-center font-semibold text-sm text-white bg-primary-600 hover:bg-primary-700 rounded shadow mr-2">
                        <svg
                          className="w-5 h-5 mr-2"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M6.75024 19.2502H17.2502C18.3548 19.2502 19.2502 18.3548 19.2502 17.2502V8.18322C19.2502 7.89772 19.1891 7.61553 19.071 7.35561L18.5332 6.17239C18.2086 5.45841 17.4967 5 16.7124 5H7.28807C6.50378 5 5.79188 5.45841 5.46734 6.1724L4.92951 7.35561C4.81137 7.61553 4.75024 7.89772 4.75024 8.18322V17.2502C4.75024 18.3548 5.64568 19.2502 6.75024 19.2502Z"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.5 7.75C9.5 8.99264 8.5 10.25 7 10.25C5.5 10.25 4.75 8.99264 4.75 7.75"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M19.25 7.75C19.25 8.99264 18.5 10.25 17 10.25C15.5 10.25 14.5 8.99264 14.5 7.75"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M14.5 7.75C14.5 8.99264 13.5 10.25 12 10.25C10.5 10.25 9.5 8.99264 9.5 7.75"
                          ></path>
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M9.74963 15.7493C9.74963 14.6447 10.6451 13.7493 11.7496 13.7493H12.2496C13.3542 13.7493 14.2496 14.6447 14.2496 15.7493V19.2493H9.74963V15.7493Z"
                          ></path>
                        </svg>
                        My Booth
                      </a>
                    </Link>
                  )}
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Link key={item.name} href={item.href}>
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500">
                        {item.name}
                      </a>
                    </Link>
                  ))}
                  <button
                    onClick={logout}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
};
