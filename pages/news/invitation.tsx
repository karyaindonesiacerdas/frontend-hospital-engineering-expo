/* eslint-disable @next/next/no-img-element */
import type { GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { LandingPageLayout } from "@/layouts/LandingPageLayout";
import { Navbar } from "@/components/landing-page";

const News: NextPage = () => {
  return (
    <LandingPageLayout>
      <div className="relative md:mb-14">
        <Navbar variant="dark" />
      </div>
      {/* <BlogAndNews /> */}
      <section className="mx-auto prose prose-xl prose-primary py-10">
        <h3 className="text-center">
          Undangan Seminar Nasional Teknik Perumahsakitan Indonesia Bagian Kedua
        </h3>
        <div className="flex justify-center">
          <img src="/news/news2/1.jpeg" alt="Seminar" />
        </div>
        <p>
          Perkumpulan Teknik Perumahsakitan Indonesia (PTPI) mohon izin
          menginformasikan bahwa kegiatan pertama Forum Teknik Perumahsakitan
          2021 telah diselenggarakannya pada tanggal 2 Oktober 2021 yang
          dihadiri oleh beberapa pembicara diantaranya adalah para Dirjen dan
          Direktur di Kementerian Kesehatan, PUPR, Informatika, Lingkungan dan
          Energi. Seminar ini telah diikuti sekitar 1040 orang.
        </p>

        <p>
          Selanjutnya, penyelenggaraan Forum Teknik Perumahsakitan Indonesia
          hari kedua akan dilaksanakan pada tanggal 16 Oktober 2021, dengan tema
          “Perencanaan dan Pengelolaan Fasilitas Kesehatan untuk Mendukung
          Program Hidup Berdampingan dengan Covid-19”. Kami turut mengundang
          Perguruan Tinggi dan Industri untuk menjadi pembicara di hari kedua
          dan pimpinan rumah sakit di hari ketiga.
        </p>

        <p>
          Disamping itu, paralel dengan kegiatan seminar, pengunjung juga dapat
          mengunjungi virtual booth melalui website kegiatan ini yang didesain
          layaknya pameran yang lengkap dengan berbagai booth dimana pengunjung
          dapat mengeksplor secara lebih detail, poster, brosur, video, dan
          katalog dari beberapa perusahaan yang berkaitan dengan teknik
          perumahsakitan. Pengunjung juga diberikan fasilitas untuk melakukan
          konsultasi secara one-and-one dengan beberapa exhibitor.
        </p>
        <p>
          Selain seminar, kami juga mengundang Bapak/Ibu untuk mengunjungi ruang
          konsultasi dan pameran produk.
        </p>
        <p>
          Forum ini adalah gratis dan kami juga menyediakan sertifikat dan
          hadiah (@ 3 Juta untuk 5 orang dan hadiah lainnya dari sponsor).
        </p>
        <p>
          Lebih lanjut tentang acara ini silahkan kunjungi:{" "}
          <Link href="/">
            <a>www.hospital-engineering-expo.com</a>
          </Link>{" "}
          untuk pendaftaran.{" "}
        </p>
        <p>Demikian, terima kasih. </p>
        <div className="flex flex-col">
          <span>Salam hormat, </span>
          <span>Prof. Dr. Eko Supriyanto </span>
          <span>Presiden PTPI </span>
        </div>
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
