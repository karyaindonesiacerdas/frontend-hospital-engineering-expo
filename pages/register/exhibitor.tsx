import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";

const RegisterExhibitor: NextPage = () => {
  const [selectedTab, setSelectedTab] = useState<"account-info" | "packages">(
    "account-info"
  );

  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
        <div className="flex flex-col items-center space-y-0.5 mb-8">
          <Image
            width={40}
            height={40}
            className="object-contain w-12 h-12"
            src="/ptpi.png"
            alt="logo ptpi"
          />
          <a href="index.html" className="text-2xl font-bold text-primary">
            HEF 2021
          </a>
          <h2 className="text-3xl font-bold">Register as Exhibitor</h2>
        </div>
        <form>
          <div className="hidden">
            <nav
              className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
              aria-label="Tabs"
            >
              <button
                type="button"
                className="text-gray-900 rounded-l-lg  group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                onClick={() => setSelectedTab("account-info")}
              >
                <span>Account & Company Info</span>
                <span
                  aria-hidden="true"
                  className="bg-primary absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </button>

              <button
                type="button"
                className="text-gray-500 hover:text-gray-700   group relative min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10"
                onClick={() => setSelectedTab("packages")}
              >
                <span>Packages</span>
                <span
                  aria-hidden="true"
                  className="bg-transparent absolute inset-x-0 bottom-0 h-0.5"
                ></span>
              </button>
            </nav>
          </div>

          {/* <!-- Account & Company Info --> */}
          <div
            className={`mb-6 ${
              selectedTab === "account-info" ? "block" : "hidden"
            }`}
          >
            {/* <!-- Account Information --> */}
            <div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Account Information
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {/* <!-- Email --> */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Mobile (Whatsapp) --> */}
                <div>
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Mobile (WhatsApp)
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="mobile"
                      name="mobile"
                      type="number"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Full Name (with title) --> */}
                <div>
                  <label
                    htmlFor="fullname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name (with title)
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="fullname"
                      name="fullname"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Job Function --> */}
                <div>
                  <label
                    htmlFor="job"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Function
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="job"
                      name="job"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    >
                      <option value="">Choose</option>
                      <option value="Administration/ Office Management">
                        Administration/ Office Management
                      </option>
                      <option value="Architect">Architect</option>
                      <option value="Consultant">Consultant</option>
                      <option value="Director">Director</option>
                      <option value="Engineer">Engineer</option>
                      <option value="Finance and Accounting">
                        Finance and Accounting
                      </option>
                      <option value="Human Resource">Human Resource</option>
                      <option value="Legal">Legal</option>
                      <option value="Logistic, Purchasing, & Procurement">
                        Logistic, Purchasing, & Procurement
                      </option>
                      <option value="Manager">Manager</option>
                      <option value="Manufacturing & Production">
                        Manufacturing & Production
                      </option>
                      <option value="Marketing">Marketing</option>
                      <option value="Operatin Management">
                        Operatin Management
                      </option>
                      <option value="Programmer/ Information and Communication Technology">
                        Programmer/ Information and Communication Technology
                      </option>
                      <option value="Research and Development">
                        Research and Development
                      </option>
                      <option value="Sales">Sales</option>
                      <option value="Supply Management">
                        Supply Management
                      </option>
                      <option value="Technician">Technician</option>
                      <option value="Other">Other</option>
                    </select>
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Password --> */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Confirm Password --> */}
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Company Information --> */}
            <div>
              <div className="relative mb-4 mt-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Company Information
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
                {/* <!-- Company Name --> */}
                <div>
                  <label
                    htmlFor="company-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Name
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="company-name"
                      name="company-name"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Company Website --> */}
                <div>
                  <label
                    htmlFor="company-website"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Company Website
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <input
                      id="company-website"
                      name="company-website"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    />
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Country --> */}
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="country"
                      name="country"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    >
                      <option value="">Choose</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Singapore">Singapore</option>
                    </select>
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Province --> */}
                <div>
                  <label
                    htmlFor="province"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Province
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="province"
                      name="province"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    >
                      <option value="">Choose</option>
                      <option value="Aceh">Aceh</option>
                      <option value="Sumatera Utara">Sumatera Utara</option>
                      <option value="Sumatera Barat">Sumatera Barat</option>
                    </select>
                    {/* <!-- Error Text --> */}
                    <span className="text-sm text-red-500">Input error</span>
                  </div>
                </div>

                {/* <!-- Nature of Business --> */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="nature-of-business"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nature of Business
                  </label>
                  <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Building"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Building
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Mechanic"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Mechanic
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Electric"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Electric
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Environment"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Environment
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Informatics"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Informatics
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Hospital Devices"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Hospital Devices
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="COVID-19 Related Products"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        COVID-19 Related Products
                      </span>
                    </div>
                    <div className="flex items-center text-sm space-x-2">
                      <input
                        type="checkbox"
                        name="nature-of-business"
                        value="Other"
                        className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                      />
                      <span
                        id="pricing-plans-0-label"
                        className="text-gray-700 text-sm"
                      >
                        Other
                      </span>
                    </div>
                  </div>
                  {/* <!-- Error Text --> */}
                  <span className="text-sm text-red-500">Input error</span>
                </div>
              </div>
            </div>

            {/* <!-- Next button --> */}
            <div className="mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setSelectedTab("packages")}
              >
                Continue
              </button>
            </div>
          </div>

          {/* // <!-- Packages --> */}
          <div className={`${selectedTab === "packages" ? "block" : "hidden"}`}>
            {/* <!-- Packages --> */}
            <div>
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Packages</span>
                </div>
              </div>
              <div className="min-h-[200px]">
                {/* <!-- Select Package --> */}
                <div>
                  <label
                    htmlFor="package"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Package
                  </label>
                  <div className="mt-1 mb-4">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      x-model="package"
                      id="job"
                      name="job"
                      className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                    >
                      <option value="">Choose</option>
                      <option value="Mercury">Mercury</option>
                      <option value="Mars">Mars</option>
                      <option value="Venus">Venus</option>
                      <option value="Uranus">Uranus</option>
                      <option value="Jupiter">Jupiter</option>
                      <option value="Custom">Custom</option>
                    </select>
                    {/* <!-- Helper Text --> */}
                    <span className="text-sm text-gray-500">
                      You can see the available packages{" "}
                      <a
                        className="text-primary hover:text-primary-600 transition underline"
                        href="packages.html"
                      >
                        here
                      </a>
                      .
                    </span>
                    <br />
                    <span className="text-sm text-gray-500">
                      For more information: +62 858 9377 7283 (Adrian), +62 877
                      7889 9087 (Jordy)
                    </span>
                  </div>

                  <div x-show="package === 'Custom'">
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Opening
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Poster
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Zoom Background
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          Ad libs by MC
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="opening"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          1 Minute Video Ads
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Webinar Series
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Poster
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Zoom Background
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          Ad libs by MC
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          1 Minute Video Ads
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="webinar-series"
                          value="15 Minutes presentation"
                        />
                        <span className="text-gray-700 text-sm">
                          15 Minutes presentation
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Product Exhibition
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Basic (Website) for 3 days (5 Poster + 1 Minute Video)"
                        />
                        <span className="text-gray-700 text-sm">
                          Basic (Website) for 3 days (5 Poster + 1 Minute Video)
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Additional 1 Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          Additional 1 Poster
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Additional 1 minute video"
                        />
                        <span className="text-gray-700 text-sm">
                          Additional 1 minute video
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Product Catalogue (2 MB)"
                        />
                        <span className="text-gray-700 text-sm">
                          Product Catalogue (2 MB)
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Live Chat"
                        />
                        <span className="text-gray-700 text-sm">Live Chat</span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Name Card"
                        />
                        <span className="text-gray-700 text-sm">Name Card</span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Doorprize for visitors"
                        />
                        <span className="text-gray-700 text-sm">
                          Doorprize for visitors
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="product-exhibition"
                          value="Product exhibition for software house and health apps provider"
                        />
                        <span className="text-gray-700 text-sm">
                          Product exhibition for software house and health apps
                          provider
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Consultation
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Basic"
                        />
                        <span className="text-gray-700 text-sm">Basic</span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Addional 1 day"
                        />
                        <span className="text-gray-700 text-sm">
                          Addional 1 day
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="consultation"
                          value="Doorprize for visitors"
                        />
                        <span className="text-gray-700 text-sm">
                          Doorprize for visitors
                        </span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Closing
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on Poster"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Poster
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on Zoom Background"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on Zoom Background
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Ad libs by MC"
                        />
                        <span className="text-gray-700 text-sm">
                          Ad libs by MC
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          1 Minute Video Ads
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Gifts"
                        />
                        <span className="text-gray-700 text-sm">Gifts</span>
                      </div>
                    </fieldset>
                    <fieldset className="mb-4">
                      <legend className="block text-sm font-medium text-gray-700 mb-1">
                        Website
                      </legend>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on home page"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on home page
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Running Text on main page"
                        />
                        <span className="text-gray-700 text-sm">
                          Running Text on main page
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 News page or display"
                        />
                        <span className="text-gray-700 text-sm">
                          1 News page or display
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 Minute Video Ads"
                        />
                        <span className="text-gray-700 text-sm">
                          1 Minute Video Ads
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Logo on home page"
                        />
                        <span className="text-gray-700 text-sm">
                          Logo on home page
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="Running Text on main page"
                        />
                        <span className="text-gray-700 text-sm">
                          Running Text on main page
                        </span>
                      </div>
                      <div className="flex space-x-3 items-center mb-1">
                        <input
                          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                          type="checkbox"
                          name="closing"
                          value="1 News page or display"
                        />
                        <span className="text-gray-700 text-sm">
                          1 News page or display
                        </span>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Next button --> */}
            <div className="flex space-x-6 mt-6">
              <button
                type="button"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-gray-500 transition-all bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                onClick={() => setSelectedTab("account-info")}
              >
                &larr; Back
              </button>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Register
              </button>
            </div>
          </div>
        </form>

        {/* <!-- Or --> */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div>
              <Link href="/register/visitor">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Register as Visitor</span>
                </a>
              </Link>
            </div>

            <div>
              <Link href="/login">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Login</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default RegisterExhibitor;
