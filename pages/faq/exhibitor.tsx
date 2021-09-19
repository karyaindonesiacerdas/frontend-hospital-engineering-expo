/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const faqs = (t: any) => [
  {
    question: t("exhibitor.faq-1.question"),
    answer: <p>{t("exhibitor.faq-1.answer")}</p>,
  },
  {
    question: t("exhibitor.faq-2.question"),
    answer: (
      <>
        <p>{t("exhibitor.faq-2.answer")}</p>
        <Link href="/packages">
          <a>Packages</a>
        </Link>
      </>
    ),
  },
  {
    question: t("exhibitor.faq-3.question"),
    answer: (
      <>
        <p>{t("exhibitor.faq-3.answer")}</p>
        <a href="register/exhibitor">Register as Exhibitor</a>
      </>
    ),
  },
  {
    question: t("exhibitor.faq-4.question"),
    answer: <p>{t("exhibitor.faq-4.answer")}</p>,
  },
  {
    question: t("exhibitor.faq-5.question"),
    answer: <p>{t("exhibitor.faq-5.answer")}</p>,
  },
  {
    question: t("exhibitor.faq-6.question"),
    answer: (
      <>
        <p>{t("exhibitor.faq-6.question")}</p>
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
  const { t } = useTranslation("faq");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      <section className="max-w-4xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="text-[#00B4BF] uppercase text-xl font-bold text-center">
          {t("exhibitor.tag")}
        </div>
        <h3 className="mt-2 text-4xl font-bold text-gray-700 text-center mb-6 md:mb-10">
          {t("exhibitor.title")}
        </h3>

        <dl className="mt-6 space-y-6 divide-y divide-gray-200">
          {faqs(t).map((faq) => (
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

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "faq"])),
  },
});
