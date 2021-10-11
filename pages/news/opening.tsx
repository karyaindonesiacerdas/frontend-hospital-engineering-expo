/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const News: NextPage = () => {
  const { t } = useTranslation("overview");

  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>

      {/* <BlogAndNews /> */}
      <section className="mx-auto prose prose-xl py-10">
        <h3 className="text-center">
          Pembukaan Forum Teknik Perumahsakitan 2021
        </h3>
        <div className="flex justify-center">
          <img src="/news/news1/1.png" alt="Seminar" />
        </div>
        <p>
          Jakarta, 2 Oktober 2021 – Bersamaan dengan hari ulang tahun
          Perkumpulan Teknik Perumahsakitan Indonesia, PTPI menyelenggarakan
          kegiatan Forum Teknik Perumahsakitan atau Hospital Engineering Forum
          (HEF) 2021 bertema “Menuju Perencanaan dan Pengelolaan Fasilitas
          Pelayanan Kesehatan di Era Endemi Covid-19 dan Revolusi Industri 4.0”
          yang berlangsung pada tanggal 2 Oktober, 16 Oktober, dan 6 November
          2021. Kegiatan ini terdiri dari seminar, pameran, dan konsultasi
          online.
        </p>

        <p>
          Kegiatan Hari Pertama HEF 2021 yang berlangsung pada tanggal 2 Oktober
          2021 dibuka oleh Direktur Jenderal Pelayanan Kesehatan Kementerian
          Kesehatan, Prof. dr. Abdul Kadir, Ph.D. Sp.THT-KL(K) M.A.R.S. dan
          menghadirkan Executive Committee of International Federation of
          Hospital Engineering (yang merupakan induk PTPI di lingkup
          internasional) Miss Briseyda Reséndiz Márquez sebagai pembicara
          internasional. Kegiatan kemudian dilanjutkan dengan materi tentang
          beberapa regulasi dan pedoman terkait bidang-bidang dalam teknik
          perumahsakitan yang terdiri dari bangunan rumah sakit, mekanika rumah
          sakit, kelistrikan rumah sakit, limbah rumah sakit, informatika rumah
          sakit, dan alat kesehatan yang disampaikan oleh para dirjen dan
          direktur dari Kementerian Kesehatan, Kementerian Pekerjaan Umum,
          Kementerian Lingkungan Hidup, Kementerian ESDM, dan Kementerian
          Komunikasi dan Informatika yang diselingi oleh presentasi dari
          industri yang berhubungan dengan bidang terkait. Peserta yang
          terdaftar pada kegiatan ini sebanyak 1300an yang tersebar di seluruh
          Indonesia dan mayoritas berasal dari rumah sakit pemerintah. Peserta
          memberikan respons yang sangat positif terhadap kegiatan ini.
        </p>
        <figure className="flex items-center flex-col mb-4">
          <img src="/news/news1/2.png" alt="Seminar" />
          <figcaption>Grafik Ketertarikan Pengunjung</figcaption>
        </figure>
        <figure className="flex items-center flex-col mb-4">
          <img src="/news/news1/3.png" alt="Seminar" />
          <figcaption>Diagram Sebaran Institusi Peserta HEF 2021</figcaption>
        </figure>
        <figure className="flex items-center flex-col mb-4">
          <img src="/news/news1/4.png" alt="Seminar" />
          <figcaption>Grafik Sebaran Provinsi Peserta HEF 2021</figcaption>
        </figure>
        <p>
          Disamping itu, paralel dengan kegiatan seminar, pengunjung juga dapat
          mengunjungi virtual booth melalui website kegiatan ini yang didesain
          layaknya pameran yang lengkap dengan berbagai booth dimana pengunjung
          dapat mengeksplor secara lebih detail, poster, brosur, video, dan
          katalog dari beberapa perusahaan yang berkaitan dengan teknik
          perumahsakitan. Pengunjung juga diberikan fasilitas untuk melakukan
          konsultasi secara one-and-one dengan beberapa exhibitor.
        </p>
      </section>
    </LandingPageLayout>
  );
};

export default News;

export const getStaticProps = async ({
  locale = "en",
}: GetStaticPropsContext) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "home", "overview"])),
  },
});
