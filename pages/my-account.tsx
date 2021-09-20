import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

import { ChatButton } from "@/components/ChatButton";
import { Navbar } from "@/components/Navbar";
import { ChatModal } from "@/components/ChatModal";

const MyAccountPage: NextPage = () => {
  const [openChatModal, setOpenChatModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="bg-gray-100">
      {/* Chat Button */}
      <div
        className="fixed right-4 lg:right-6 bottom-4 lg:bottom-6 z-10"
        style={{ backdropFilter: "4px" }}
      >
        <ChatButton onClick={() => setOpenChatModal(true)} />
      </div>

      <Navbar variant="dark" currentHref="webinar-schedule" />

      {/* Main Content */}
      <main className="px-1.5 lg:px-2 pb-10 max-w-7xl mx-auto">
        {/* ### Modals ### */}
        <ChatModal open={openChatModal} setOpen={setOpenChatModal} />

        {/* Form */}
        {/* Personal Info */}
        <div className="px-2 sm:px-8 mt-6 flex justify-between items-center">
          <h2 className="text-3xl font-bold text-gray-800">My Account</h2>
        </div>
        <div className="px-2 sm:px-8 py-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Personal Information
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form action="#" method="POST">
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          type="text"
                          name="email-address"
                          id="email-address"
                          autoComplete="email"
                          className="input-text"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="mobile"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile (WhatsApp)
                        </label>
                        <input
                          type="text"
                          name="mobile"
                          id="mobile"
                          autoComplete="email"
                          className="input-text"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="full-name"
                          id="full-name"
                          autoComplete="given-name"
                          className="input-text"
                        />
                      </div>
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="full-name"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Job Function
                        </label>
                        <select id="job" name="job" className="input-text">
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
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>

        {/* Change Password */}
        <div className="px-2 sm:px-8 py-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Change Password
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
              </div>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="current-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Current Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="current-password"
                            name="current-password"
                            type={showPassword ? "text" : "password"}
                            className="input-password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeOffIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      <div className="col-span-2 sm:col-span-1">
                        <label
                          htmlFor="new-password"
                          className="block text-sm font-medium text-gray-700"
                        >
                          New Password
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                          <input
                            id="new-password"
                            name="new-password"
                            type={showPassword ? "text" : "password"}
                            className="input-password"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 px-3 flex items-center"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? (
                              <EyeIcon className="h-5 w-5 text-gray-400" />
                            ) : (
                              <EyeOffIcon className="h-5 w-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit" className="btn-primary">
                      Change
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccountPage;
