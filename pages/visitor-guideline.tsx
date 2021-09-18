/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const VisitorGuideline: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-[#00B4BF] uppercase text-xl font-bold text-center">
          Guideline
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          Visitor Guideline
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-2 shadow-xl rounded-xl">
            <div className="mb-4">
              <img src="/visitor-guideline-1.png" alt="Guideline 1" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-2.png" alt="Guideline 2" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-3.png" alt="Guideline 3" />
            </div>
            <div className="mb-4">
              <img src="/visitor-guideline-4.png" alt="Guideline 4" />
            </div>
          </div>

          <ol className="max-w-5xl mx-auto leading-relaxed lg:text-lg lg:leading-relaxed text-gray-700 list-decimal space-y-4 pl-6">
            <li>
              Go to the visitor’s registration page at{" "}
              <a
                href="register-visitor.html"
                className="text-[#00B4BF] hover:text-[#116368]"
              >
                https://hospital-engineering-expo.com/register-visitor/
              </a>
            </li>
            <li>Enter your company’s representative information</li>
            <li>
              Enter an active email address. We will send information and
              notifications to your email.
            </li>
            <li>Enter a phone number that’s connected to WhatsApp</li>
            <li>Enter the representative full name and title.</li>
            <li>
              Select the representative job function. If you did not found a
              suitable one, you can select ‘Other’
            </li>
            <li>
              Enter a password and retype your password in “Confirm Password”
            </li>
            <li>Enter your institution/ company name</li>
            <li>
              Select the type of institution that best describes your
              company/institution. If you did not found a suitable one, select
              ‘Other’
            </li>
            <li>Select your country of origin</li>
            <li>If you choose Indonesia, please select your province</li>
            <li>Select the visitor type that best suits you</li>
            <li>
              Tick the products you are interested in (You can tick as much as
              possible)
            </li>
            <li>Tick your purpose of visiting HEF 2021</li>
            <li>
              {`Select if you have registered in SEHAT RI or not. If you forget or are unsure, you may select "I Forget"`}
            </li>
            <li>{`Once you have finished filling in the registration form, click "Register". You'll be registered in our
          system
          and may login to our website. Further guidelines will be informed later.`}</li>
          </ol>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default VisitorGuideline;
