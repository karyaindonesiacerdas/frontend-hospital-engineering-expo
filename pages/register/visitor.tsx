import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";

const RegisterVisitor: NextPage = () => {
  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10">
        <div className="flex flex-col items-center space-y-0.5 mb-10">
          <a
            href="index.html"
            className="mb-1 flex flex-col items-center space-y-1"
          >
            <Image
              width={40}
              height={40}
              className="object-contain w-12 h-12"
              src="/ptpi.png"
              alt="logo ptpi"
            />
            <span className="text-2xl font-bold text-primary">HEF 2021</span>
          </a>
          <h2 className="text-3xl text-gray-800 font-bold">
            Register as Visitor
          </h2>
        </div>
        <form action="#" method="POST">
          {/* <!-- 2 column grid for from input --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 mb-6">
            {/* <!-- Email --> */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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
                  <option value="Architect">Architect</option>
                  <option value="Director">Director</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Engineer">Engineer</option>
                  <option value="Lecturer">Lecturer</option>
                  <option value="Manager">Manager</option>
                  <option value="Nurse">Nurse</option>
                  <option value="Pharmacist">Pharmacist</option>
                  <option value="Programmer">Programmer</option>
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
                className="block text-sm font-medium text-gray-700"
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
                className="block text-sm font-medium text-gray-700"
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

            {/* <!-- Institution Name --> */}
            <div>
              <label
                htmlFor="institution-name"
                className="block text-sm font-medium text-gray-700"
              >
                Institution Name
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <input
                  id="institution-name"
                  name="institution-name"
                  className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                />
                {/* <!-- Error Text --> */}
                <span className="text-sm text-red-500">Input error</span>
              </div>
            </div>

            {/* <!-- Type of Institution --> */}
            <div>
              <label
                htmlFor="type-of-institution"
                className="block text-sm font-medium text-gray-700"
              >
                Type of Institution
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <select
                  id="type-of-institution"
                  name="type-of-institution"
                  className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                >
                  <option value="">Choose</option>
                  <option value="Comunity Health Services">
                    Comunity Health Services
                  </option>
                  <option value="Consultancy Services">
                    Consultancy Services
                  </option>
                  <option value="Contractor (Hospital)">
                    Contractor (Hospital)
                  </option>
                  <option value="Dealers & Distributors">
                    Dealers & Distributors
                  </option>
                  <option value="Educational Institute (Medical)">
                    Educational Institute (Medical)
                  </option>
                  <option value="Educational Institute (Non-Medical)">
                    Educational Institute (Non-Medical)
                  </option>
                  <option value="Government (Ministry of Health)">
                    Government (Ministry of Health)
                  </option>
                  <option value="Hospital (Private)">Hospital (Private)</option>
                  <option value="Hospital (Public)">Hospital (Public)</option>
                  <option value="Import & Export (Healthcare)">
                    Import & Export (Healthcare)
                  </option>
                  <option value="Information Technology/ Software (Healthcare)">
                    Information Technology/ Software (Healthcare)
                  </option>
                  <option value="Investor (Healthcare)">
                    Investor (Healthcare)
                  </option>
                  <option value="Laboratories (Medical)">
                    Laboratories (Medical)
                  </option>
                  <option value="Laboratory">Laboratory</option>
                  <option value="Manufacturer (Medical)">
                    Manufacturer (Medical)
                  </option>
                  <option value="Medical Practice">Medical Practice</option>
                  <option value="Medical Travel">Medical Travel</option>
                  <option value="Technology (Medical)">
                    Technology (Medical)
                  </option>
                  <option value="Other">Other</option>
                </select>
                {/* <!-- Error Text --> */}
                <span className="text-sm text-red-500">Input error</span>
              </div>
            </div>

            {/* <!-- Country --> */}
            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium text-gray-700"
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

            {/* <!-- Country --> */}
            <div>
              <label
                htmlFor="province"
                className="block text-sm font-medium text-gray-700"
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

            {/* <!-- Visitor Type --> */}
            <div>
              <label
                htmlFor="visitor-type"
                className="block text-sm font-medium text-gray-700"
              >
                Visitor Type
              </label>
              <div className="mt-1">
                {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                <select
                  id="visitor-type"
                  name="visitor-type"
                  className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm border-gray-300"
                >
                  <option value="">Choose</option>
                  <option value="Hospital Management Staff">
                    Hospital Management Staff
                  </option>
                  <option value="Hospital Clinical Staff">
                    Hospital Clinical Staff
                  </option>
                  <option value="Hospital Engineering Staff">
                    Hospital Engineering Staff
                  </option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Medical Doctor">Medical Doctor</option>
                  <option value="Government Staff">Government Staff</option>
                  <option value="University Lecturer">
                    University Lecturer
                  </option>
                </select>
                {/* <!-- Error Text --> */}
                <span className="text-sm text-red-500">Input error</span>
              </div>
            </div>

            {/* <!-- Which product are you interested in? --> */}
            <div className="md:col-span-2">
              <label
                htmlFor="product-interest"
                className="block text-sm font-medium text-gray-700"
              >
                Which product are you interested in?
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Building"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Building
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Mechanic"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Mechanic
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Electric"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Electric
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Environment"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Environment
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Informatics"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Informatics
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Hospital Devices"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Hospital Devices
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="COVID-19 Related Products"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    COVID-19 Related Products
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="product-interest"
                    value="Other"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Other
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              <span className="text-sm text-red-500">Input error</span>
            </div>

            {/* <!-- Purpose of Visiting --> */}
            <div className="md:col-span-2">
              <label
                htmlFor="purpose-of-visiting"
                className="block text-sm font-medium text-gray-700"
              >
                Purpose of Visiting
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Buying"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Buying
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Networking"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Networking
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Information Gathering"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Information Gathering
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Join Webinar"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Join Webinar
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Consultaion"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Consultaion
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    name="purpose-of-visiting"
                    value="Other"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Other
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              <span className="text-sm text-red-500">Input error</span>
            </div>

            {/* <!-- Have registered in SEHAT-RI --> */}
            <div>
              <label
                htmlFor="have-registered-sehat-ri"
                className="block text-sm font-medium text-gray-700"
              >
                Have you registered in SEHAT-RI?
              </label>
              <div className="mt-1 grid grid-cols-3 gap-2 py-2">
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="have-registered-sehat-ri"
                    value="Yes"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    Yes
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="have-registered-sehat-ri"
                    value="No"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    No
                  </span>
                </div>
                <div className="flex items-center text-sm">
                  <input
                    type="radio"
                    name="have-registered-sehat-ri"
                    value="I Forget"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />
                  <span
                    id="pricing-plans-0-label"
                    className="text-gray-900 ml-3"
                  >
                    I Forget
                  </span>
                </div>
              </div>
              {/* <!-- Error Text --> */}
              <span className="text-sm text-red-500">Input error</span>
            </div>

            <div className="md:col-span-2">
              <div className="mb-1 text-sm text-gray-700">
                By registering for HEF 2021, you will automatically become a
                sehat-RI member and we will send you a referal code to your
                email later. This referal code is used to utilize the sehat-RI
                application.
              </div>
              <div className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                />{" "}
                <span className="text-sm text-gray-700">
                  I understand and accept the condition
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <div className="mb-1 text-sm text-gray-700">
                In order to qualify for HEF 2021 door prize, Do you agree to
                share these information to our exhibitors for marketing purpose?
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <input
                    id="yes"
                    name="allow-share-info"
                    type="radio"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                    checked
                  />{" "}
                  <label htmlFor="yes" className="text-sm text-gray-700">
                    Yes
                  </label>
                </div>
                <div>
                  <input
                    id="no"
                    name="allow-share-info"
                    type="radio"
                    className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
                  />{" "}
                  <label htmlFor="no" className="text-sm text-gray-700">
                    No
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-primary hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Register
            </button>
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
              <Link href="/register/exhibitor">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Register as Exhibitor</span>
                </a>
              </Link>
            </div>

            <div>
              <Link href="/login">
                <a
                  href="login.html"
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
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

export default RegisterVisitor;
