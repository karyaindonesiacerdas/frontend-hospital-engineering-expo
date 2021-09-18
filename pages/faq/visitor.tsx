/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const faqs = [
  {
    question: "I want to attend HEF 2021. How can I register?",
    answer: (
      <p>
        If you are interested in attending HEF 2021, please fill your details in
        the registration form here:{" "}
        <Link href="/register/visitor">
          <a>Register as Visitor</a>
        </Link>
        . For further information, you can contact us in +62 858 9377 7283
        (Adrian).
      </p>
    ),
  },
  {
    question: "Is there a participation fee for HEF 2021?",
    answer: (
      <p>
        No, it’s completely free of charge to participate as visitors in our
        event! You can share this good news to your colleagues that might be
        interested in joining this event as well!
      </p>
    ),
  },
  {
    question: "What can I expect from this event?",
    answer: (
      <>
        <p>In HEF 2021, you’ll be able to:</p>
        <ol className="list-decimal">
          <li>
            Watch seminars and participate in live Q&A sessions with the
            speakers
          </li>
          <li>
            View a wide range of products from 6 hospital engineering areas
            exhibitors and engage with company representatives
          </li>
          <li>Consult with consultants or companies for free</li>
        </ol>
      </>
    ),
  },
  {
    question: "What’s the benefit of attending HEF 2021?",
    answer: (
      <p>
        To see the benefits of attending HEF 2021, please visit the Why Attend?
        page under Visitor Menu or click{" "}
        <Link href="/register/visitor">
          <a>here</a>
        </Link>
      </p>
    ),
  },
  {
    question: "Can I talk to people on the stand?",
    answer: (
      <p>
        You can communicate with exhibitors in several ways. One way of
        communicating with the exhibitors is to message them via live chat and
        leave a question about their products or services and the stand
        representative will reply back as soon as possible. Alternatively, you
        can book a 1 on 1 meeting session with the exhibitors.
      </p>
    ),
  },
  {
    question: "How do I make an enquiry about a product I’ve seen?",
    answer: (
      <p>
        If you’re interested in the products of a company, you can book a 1 on 1
        meeting session to enquire about the products and negotiate with the
        company representative.
      </p>
    ),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const FAQVisitor: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-4xl mx-auto py-10 px-2 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          FAQ
        </div>
        <h3 className="mt-2 text-4xl font-bold text-gray-700 text-center mb-6">
          Visitor
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

export default FAQVisitor;
