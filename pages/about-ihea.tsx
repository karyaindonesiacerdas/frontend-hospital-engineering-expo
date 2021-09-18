import type { NextPage } from "next";
import Image from "next/image";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const AboutIHEA: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      {/* Content */}
      <section className="max-w-7xl mx-auto py-10 px-4 bg-white mb-10">
        <div className="mt-4 text-[#00B4BF] uppercase text-xl font-bold text-center">
          About
        </div>
        <h3 className="mt-2 mb-6 md:mb-10 text-4xl font-bold text-gray-700 text-center">
          Indonesian Hospital Engineering Association
        </h3>
        <p className="max-w-4xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600">
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
        <div className="mx-auto max-w-5xl text-center text-[#00B4BF] text-xl font-bold mt-10 mb-6">
          Why IAHE?
        </div>
        <ol className="max-w-4xl mx-auto text-lg leading-relaxed lg:text-xl lg:leading-loose text-gray-600 list-decimal space-y-4 pl-6">
          <li>
            IAHE is an association of hospital engineering experts who are
            capable of designing, analyzing and maintaining hospital master plan
            and infrastructure so we can give expert opinions on suitable
            products for your hospitals in accordance with its needs and
            conditions.
          </li>
          <li>
            IAHE has 6 main fields: Hospital Building with experts in
            architecture and civil engineering, Hospital Mechanic with experts
            in mechanical engineering, Hospital Electric with experts in
            electrical engineering, Hospital Environment with experts in
            environmental engineering, Hospital Informatics with experts in
            informatics, and Hospital Devices with experts in biomedical
            instrumentation.
          </li>
          <li>
            IAHE partners up with relevant ministries to discuss and disseminate
            regulations related to the field of hospital engineering. Ministry
            of Public Works and Public Housing for building and mechanical,
            Ministry of Energy and Mineral Resources for electrical, Ministry of
            Environment and Forestry for environmental, Ministry of
            Communication and Information for informatics, and Ministry of
            Health for medical equipment.
          </li>
          <li>
            IAHE partners with the National Hospital Accreditation Committee and
            the National Standardization Agency to ensure the quality of
            products, services and management systems meet national standards
            and regulations.
          </li>
          <li>
            IAHE builds relationships with other non-technical organizations of
            hospital and healthcare such as Indonesian Hospital Association,
            Indonesia Health Consultant Association, Indonesian Public Health
            Association, Association of Indonesian Teaching Hospitals,
            Association of Public University Hospitals, Indonesian Private
            Hospitals Association, Indonesian Medical Association.
          </li>
          <li>
            IAHE has hospitals registered in a platform digital SEHAT-RI as
            corporate members of IAHE. To date, there are more than 170
            hospitals registered on the platform.
          </li>
          <li>
            IAHE has individual members ranging from hospital directors,
            managers, medical staff and engineers summing up to more than 7900
            people that are registered on the SEHAT-RI digital platform.
          </li>
          <li>
            IAHE regularly organizes monthly seminars and workshops which have
            been attended by more than 9000 people over the last year.
          </li>
          <li>
            IAHE is part of the International Federation of Healthcare
            Engineering that plans and evaluates the technology and facilities
            needed for health services.
          </li>
          <li>
            IAHE was established 2 years ago on 3rd October 2019 and was
            initiated by the Ministry of Health and hospital engineering experts
            in Indonesia.
          </li>
          <li>
            Although the association has only been established for 2 years, IAHE
            has the highest member growth (in terms of viewers, followers, and
            number of training) compared to other similar organizations in
            Indonesia.
          </li>
          <li>
            IAHE&apos;s mission is to realize as much as possible hospitals in
            Indonesia that are safer, more environmentally friendly, affordable,
            secure and beneficial in accordance with the 2009 Hospital Law. For
            this reason, IAHE continues to disseminate best practices that
            adhere to the standard of planning and managing hospitals. The
            association also continues to encourage the industries and various
            stakeholders to make this happen.
          </li>
          <li>
            IAHE continues to work together with relevant ministries to provide
            suggestions and feedback relating to the existing and future
            regulations in order to push for safer, environmentally friendly and
            affordable hospitals.
          </li>
        </ol>
      </section>
    </LandingPageLayout>
  );
};

export default AboutIHEA;
