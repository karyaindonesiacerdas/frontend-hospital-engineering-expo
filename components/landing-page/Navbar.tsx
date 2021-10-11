import { Fragment, useEffect } from "react";
import Link from "next/link";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { useTranslation } from "next-i18next";

const overview = (t: any) => [
  {
    name: t("about-hef"),
    href: "/about-hef",
  },
  {
    name: t("about-ihea"),
    href: "/about-iahe",
  },
  {
    name: t("programs"),
    href: "/programs",
  },
  {
    name: t("webinar-rundown"),
    href: "/webinar-rundown",
  },
  {
    name: t("news"),
    href: "/news",
  },
  {
    name: t("important-dates"),
    href: "/important-dates",
  },
];

const visitor = (t: any) => [
  {
    name: t("visitor-guideline"),
    href: "/visitor-guideline",
  },
  {
    name: t("who-attends"),
    href: "/who-attends",
  },
  {
    name: t("why-attend"),
    href: "/why-attend",
  },
];

const exhibitor = (t: any) => [
  {
    name: t("exhibitor-guideline"),
    href: "/exhibitor-guideline",
  },
  {
    name: t("who-exhibits"),
    href: "/who-exhibit",
  },
  {
    name: t("why-exhibit"),
    href: "/why-exhibit",
  },
  {
    name: t("packages"),
    href: "/packages",
  },
];

const faq = (t: any) => [
  {
    name: t("faq-general"),
    href: "/faq/general",
  },
  {
    name: t("faq-visitor"),
    href: "/faq/visitor",
  },
  {
    name: t("faq-exhibitor"),
    href: "/faq/exhibitor",
  },
];

const register = (t: any) => [
  {
    name: t("register-as-visitor"),
    href: "/register/visitor",
  },
  {
    name: t("register-as-exhibitor"),
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
          <Popover as="li" className="relative">
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
                      {overview(t).map((item) => (
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
          <Popover as="li" className="relative">
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
                      {visitor(t).map((item) => (
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
          <Popover as="li" className="relative">
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
                      {exhibitor(t).map((item) => (
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
          <Popover as="li" className="relative">
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
                      {faq(t).map((item) => (
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
          <Popover as="li" className="relative">
            <>
              <Popover.Button
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold uppercase pt-[9px] flex items-center group"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                <span>{t("register")}</span>
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
                      {register(t).map((item) => (
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
          {/* <li>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeawVl6UT0m2DwsYryRt1Yf-NSFhSnIR-gE6Baq58qJYSxc_Q/viewform"
              target="_blank"
              rel="noreferrer"
            >
              <a
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold border border-gray-200 hover:border-white rounded-md uppercase"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                {t("register")}
              </a>
            </a>
          </li> */}
          <li>
            <Link href="/login">
              <a
                className="text-gray-200 hover:text-white cursor-pointer tracking-widest px-3 py-1.5 text-sm md:text-md font-bold border border-gray-200 hover:border-white rounded-md uppercase"
                style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.2)" }}
              >
                {t("login")}
              </a>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
