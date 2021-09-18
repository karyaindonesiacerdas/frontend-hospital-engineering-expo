/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const faqs = [
  {
    question: "I’m interested in sponsoring this event, who should I contact?",
    answer: (
      <p>
        If you’re interested in sponsoring this event and would like to contact
        the person in charge, please contact our email at
        hospital.engineering.expo@gmail.com or whatsApp us in +62 858 9377 7283
        (Adrian). We will get back to you as soon as possible.
      </p>
    ),
  },
  {
    question: "What’s the benefit of becoming HEF 2021 sponsors?",
    answer: (
      <>
        <p>
          To see the list of benefits you can get as a sponsor of our event,
          please view the Packages page under the Exhibitor menu or click the
          link below
        </p>
        <Link href="/packages">
          <a>Packages</a>
        </Link>
      </>
    ),
  },
  {
    question: "How do I register my company as one of the exhibitors?",
    answer: (
      <>
        <p>
          If you want to register as an exhibitor, please go to the Register as
          Exhibitor page under the registration menu or click the link below
        </p>
        <a href="register/exhibitor">Register as Exhibitor</a>
      </>
    ),
  },
  {
    question: "Is there a pricing list for the exhibition stand?",
    answer: (
      <p>
        If you’re interested in opening an exhibition stand and would like to
        know the pricing list, you can contact our email at
        hospital.engineering.expo@gmail.com or whatsApp us in +62 858 9377 7283
        (Adrian) or visit the contact us page. We will get back to you as soon
        as possible.
      </p>
    ),
  },
  {
    question: "How long does my stand stay live?",
    answer: (
      <p>
        Exhibition stands remain live for 24-7 the entire year from their
        launch, however live chats and 1 on 1 meeting sessions are only held for
        three days on the 2nd, 16th and 30th October 2021.
      </p>
    ),
  },
  {
    question: "What’s the benefit of exhibiting at HEF 2021?",
    answer: (
      <>
        <p>
          To see the list of benefits you can get as an exhibitor, please visit
          Why Exhibit? page and Packages page under the Exhibitor menu or click
          the link below
        </p>
        <Link href="/why-exhibit">
          <a>Why Exhibit</a>
        </Link>
      </>
    ),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const FAQExhibitor: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-4xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          FAQ
        </div>
        <h3 className="mt-2 text-4xl font-bold text-gray-700 text-center mb-6 md:mb-10">
          Exhibitor
        </h3>

        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {faqs.map((faq) => (
            <Disclosure as="div" key={faq.question} className="pt-6">
              {({ open }) => (
                <>
                  <dt className="text-lg">
                    <Disclosure.Button className="text-left w-full flex justify-between items-start text-gray-400">
                      <span className="font-medium text-gray-900">
                        {faq.question}
                      </span>
                      <span className="ml-6 h-7 flex items-center">
                        <ChevronDownIcon
                          className={classNames(
                            open ? "-rotate-180" : "rotate-0",
                            "h-6 w-6 transform"
                          )}
                          aria-hidden="true"
                        />
                      </span>
                    </Disclosure.Button>
                  </dt>
                  <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    <div className="faq-answer space-y-2 text-gray-600">
                      {faq.answer}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </dl>
      </section>
    </LandingPageLayout>
  );
};

export default FAQExhibitor;
