/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const ExhibitorGuideline: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-primary uppercase text-xl font-bold text-center lg:text-left">
          Guideline
        </div>
        <h3 className="mt-2 mb-10 text-4xl font-bold text-gray-700 text-center lg:text-left">
          Exhibitor Guideline
        </h3>
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          <div className="space-y-2 shadow-xl p-4 rounded-xl">
            <div className="mb-4">
              <img src="/exhibitor-guideline-1.png" alt="Guideline 1" />
            </div>
            <div className="mb-4">
              <img src="/exhibitor-guideline-2.png" alt="Guideline 2" />
            </div>
            <div className="mb-4">
              <img src="/exhibitor-guideline-3.png" alt="Guideline 3" />
            </div>
          </div>

          <ol className="max-w-5xl mx-auto leading-relaxed lg:text-lg lg:leading-relaxed text-gray-700 list-decimal space-y-4 pl-6">
            <li>
              Go to the exhibitor’s registration page at{" "}
              <a
                href="register-exhibitor.html"
                className="text-primary hover:text-[#116368]"
              >
                https://hospital-engineering-expo.com/register-exhibitor/
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
            <li>Enter your company information</li>
            <li>Enter your company/ institution Name</li>
            <li>
              Enter your company’s website. If your company didn’t have a
              website, you can enter dash (-)
            </li>
            <li>Choose your company’s country of origin</li>
            <li>
              If you choose Indonesia, please select the province of your
              company
            </li>
            <li>Tick the field(s) that best describes your company</li>
            <li>
              {`Once you have finished filling in the registration form, click "Register". You'll be registered in our system.
          Next, you
          can choose your desired package. Further guidelines will be informed later.`}
            </li>
          </ol>
        </div>
      </section>
    </LandingPageLayout>
  );
};

export default ExhibitorGuideline;
