import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";

const Login: NextPage = () => {
  return (
    <AuthPageLayout>
      <div className="bg-white py-8 px-6 shadow-lg rounded-lg sm:px-10 max-w-md">
        <div className="flex flex-col items-center space-y-0.5 mb-10">
          <Link href="/">
            <a className="mb-1 flex flex-col items-center space-y-1">
              <Image
                width={40}
                height={40}
                className="object-contain w-12 h-12"
                src="/ptpi.png"
                alt="logo ptpi"
              />
              <span className="text-2xl font-bold text-[#00B4BF]">
                HEF 2021
              </span>
            </a>
          </Link>
          <h2 className="text-3xl font-bold text-center">
            Login with Your Email
          </h2>
        </div>

        <form action="#" className="space-y-4" method="POST">
          {/* <!-- Email --> */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00B4BF] focus:border-[#00B4BF] sm:text-sm border-gray-300"
              />
              <span className="text-sm text-red-500">Input error</span>
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                className="appearance-none block w-full px-3 py-2 border  rounded-md placeholder-gray-400 focus:outline-none focus:ring-[#00B4BF] focus:border-[#00B4BF] sm:text-sm border-gray-300"
              />
              <span className="text-sm text-red-500">Input error</span>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all bg-[#00B4BF] hover:bg-[#116368] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B4BF]"
            >
              <a href="main-hall.html">Login</a>
            </button>
          </div>
        </form>

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
              <Link href="/register/exhibitor">
                <a className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span>Register as Exhibitor</span>
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AuthPageLayout>
  );
};

export default Login;
