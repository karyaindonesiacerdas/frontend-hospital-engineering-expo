/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const faqs = [
  {
    question: "What is the Hospital Engineering Forum? ",
    answer: (
      <p>
        The Hospital Engineering Forum will be the first virtual national forum
        and international fair by the Indonesian Association of Hospital
        Engineering (IAHE). This forum focuses on 6 hospital engineering areas:
        Hospital Building, Hospital Mechanic, Hospital Electric, Hospital
        Environment, Hospital Informatics, and Hospital Devices. More than 40
        speakers from government, association, hospital and industries are
        invited. We also provide around 100 local and international exhibitors.
        This event will be co-organised with Karya Indonesia Cerdas
      </p>
    ),
  },
  {
    question: "Who is participating at Hospital Engineering Forum 2021?",
    answer: (
      <p>
        The event is open to the public. However, we will invite around 8000
        members of IAHE and 3000 hospitals which will consist of people from the
        healthcare settings such as hospital management staff, hospital clinical
        staff, hospital engineering staff, biomedical engineer, medical doctor,
        government staff and university lecturers.
      </p>
    ),
  },
  {
    question: "Who is the organizer of this event?",
    answer: (
      <>
        <p>
          The organizer of this event is the Indonesian Association of Hospital
          Engineering (IAHE) in partnership with PT. Karya Indonesia Cerdas
          (KIC).
        </p>
        <p>
          The Indonesian Hospital Engineering Association (IAHE) is a
          professional organization of technical experts and corporations
          engaged in the construction, operation, and maintenance of hospitals
          in Indonesia. The association was established on October 3, 2019 in
          Jakarta, and was ratified by the Ministry of Law and Human Rights with
          the number AHU-0011147.AH.01.07. The organization vision is to become
          the leading organization that encourages the realization of hospitals
          in Indonesia that are Safe, environMentally friendly, Affordable,
          secuRe, and worThwhile (SMART).
        </p>
        <p>
          PT. Karya Indonesia Cerdas is a partner company of IAHE since 2019 and
          has been collaborating with IAHE in organizing several seminars and
          workshops over the past year with a total of around 9000 participants
          ranging from medical, engineering and management staff of the
          hospitals.
        </p>
      </>
    ),
  },
  {
    question: "How do I login to my profile?",
    answer: (
      <>
        <p>
          Once you have registered on our website, you can immediately login
          with your email and password that you input during the registration
          process here:{" "}
          <Link href="/login">
            <a>https://hospital-engineering-expo.com/login</a>
          </Link>
        </p>
      </>
    ),
  },
  {
    question: "Who should I contact if I have any additional questions?",
    answer: (
      <p>
        If you have any further questions, we will be happy to assist you
        through our email at hospital.engineering.expo@gmail.com or you could
        visit the contact us page to get other means of contact details.
      </p>
    ),
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const FAQGeneral: NextPage = () => {
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
          General and Technical
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

export default FAQGeneral;
