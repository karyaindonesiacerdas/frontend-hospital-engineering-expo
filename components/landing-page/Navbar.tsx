import { Fragment, useEffect } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

const overview = [
  {
    name: "About HEF",
    href: "/about-hef",
  },
  {
    name: "About IHEA",
    href: "/about-ihea",
  },
  {
    name: "Programs",
    href: "/programs",
  },
  {
    name: "Webinar Rundown",
    href: "/webinar-rundown",
  },
  {
    name: "News",
    href: "/news",
  },
  {
    name: "Important Dates",
    href: "/important-dates",
  },
];

const visitor = [
  {
    name: "Visitor Guideline",
    href: "/visitor-guideline",
  },
  {
    name: "Who Attends",
    href: "/who-attends",
  },
  {
    name: "Why Attend",
    href: "/why-attend",
  },
];

const exhibitor = [
  {
    name: "Exhibitor Guideline",
    href: "/exhibitor-guideline",
  },
  {
    name: "Who Exhibit",
    href: "/who-exhibit",
  },
  {
    name: "Why Exhibit",
    href: "/why-exhibit",
  },
  {
    name: "Packages",
    href: "/packages",
  },
];

const faq = [
  {
    name: "FAQ General & Technical",
    href: "/faq/general",
  },
  {
    name: "FAQ Visitor",
    href: "/faq/visitor",
  },
  {
    name: "FAQ Exhibitor",
    href: "/faq/exhibitor",
  },
];

const register = [
  {
    name: "Register as Visitor",
    href: "/register/visitor",
  },
  {
    name: "Register as Exhibitor",
    href: "/register/exhibitor",
  },
];

type Props = {
  variant?: "dark" | "light";
  currentHref?: string;
};

export const Navbar = ({ variant }: Props) => {
  const { t } = useTranslation("common");

  useEffect(() => {
    const navigation = document.getElementById("navigation");

    const handleScroll = (e: Event) => {
      if (window.scrollY > 150) {
        navigation?.classList.remove("absolute");
        navigation?.classList.add("fixed");
        navigation?.classList.add("overlay-nav");
      } else {
        navigation?.classList.remove("fixed");
        navigation?.classList.remove("overlay-nav");
        navigation?.classList.add("absolute");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      id="navigation"
      className={`hidden absolute md:flex w-full top-0 left-0 right-0 justify-between items-center py-4 px-4 md:px-2 z-50 ${
        variant === "dark" ? "bg-[#25243A]" : ""
      }`}
    >
      <div
        id="navigation-wrapper"
        className="max-w-7xl mx-auto w-full flex justify-between items-center z-50"
      >
        <ul className="flex space-x-4 lg:space-x-12 font-medium items-center">
          {/* <!-- Home --> */}
          <li>
            <Link href="/">
              <a
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                {t("home")}
              </a>
            </Link>
          </li>

          {/* <!-- Overview --> */}
          <Popover as="li" className="relative" x-data="{open: false}">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>{t("overview")}</span>
                <ChevronDownIcon className="ml-1.5 w-5 h-5 text-white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {overview.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>

          {/* <!-- Visitor --> */}
          <Popover as="li" className="relative" x-data="{open: false}">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>{t("visitor")}</span>
                <ChevronDownIcon className="ml-1.5 w-5 h-5 text-white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {visitor.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>

          {/* <!-- Exhibitor --> */}
          <Popover as="li" className="relative" x-data="{open: false}">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>{t("exhibitor")}</span>
                <ChevronDownIcon className="ml-1.5 w-5 h-5 text-white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {exhibitor.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>

          {/* // <!-- FAQ --> */}
          <Popover as="li" className="relative" x-data="{open: false}">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>{t("faq")}</span>
                <ChevronDownIcon className="ml-1.5 w-5 h-5 text-white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {faq.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
        </ul>
        <ul className="flex items-center space-x-4 lg:space-x-8 font-medium">
          <Popover as="li" className="relative" x-data="{open: false}">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>Register</span>
                <ChevronDownIcon className="ml-1.5 w-5 h-5 text-white" />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 left-1/2 transform -translate-x-1/2 mt-3 px-2 w-screen max-w-xs sm:px-0">
                  <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                    <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                      {register.map((item) => (
                        <Link key={item.name} href={item.href}>
                          <a className="-m-3 p-3 block rounded-md hover:bg-gray-50 transition ease-in-out duration-150">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          </Popover>
          <li>
            <Link href="/login">
              <a
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold border border-gray-200 hover:border-white rounded-md uppercase"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                Login
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
