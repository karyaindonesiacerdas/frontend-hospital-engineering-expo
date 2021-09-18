import React, { Children } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/outline";

export const AuthPageLayout: React.FC = ({ children }) => {
  return (
    <div className="min-h-screen h-full flex items-center min-w-screen bg-gradient-to-br from-primary  to-white">
      <div className="grid grid-cols-2 gap-6 max-w-7xl mx-auto py-4 md:py-10 2xl:py-20 ">
        <div className="hidden lg:block px-4 py-6">
          <div className="pl-16 flex items-center space-x-3">
            <Image height={50} width={50} src="/ptpi.png" alt="PTPI" />
            <div className="text-2xl font-bold text-primary-800 uppercase">
              Hospital Engineering Forum 2021
            </div>
          </div>
          <div className="p-20">
            <h2 className="ml-2 mb-6 text-2xl font-bold text-primary-800">
              Highlight
            </h2>
            <ul className="space-y-6">
              <li className="flex items-start space-x-3 text-primary-800">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />

                <span className="flex-1 max-w-sm text-primary-800 text-lg">
                  More than 40 speakers from goverment, association, hospital,
                  and industries
                </span>
              </li>
              <li className="flex items-start space-x-3 text-primary-800">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />

                <span className="flex-1 max-w-sm text-primary-800 text-lg">
                  More than 100 local and international exhibitors
                </span>
              </li>
              <li className="flex items-start space-x-3 text-primary-800">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />

                <span className="flex-1 max-w-sm text-primary-800 text-lg">
                  More than 8000 PTPI registered members (healthcare
                  professionals)
                </span>
              </li>
              <li className="flex items-start space-x-3 text-primary-800">
                <CheckCircleIcon className="w-8 h-8 text-primary-600" />

                <span className="flex-1 max-w-sm text-primary-800 text-lg">
                  Hospital engineering in covid-19 and industry 4.0 era
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-2 lg:col-span-1 px-4">{children}</div>
      </div>
    </div>
  );
};
