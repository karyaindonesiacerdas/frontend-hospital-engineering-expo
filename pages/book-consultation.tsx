import type { NextPage } from "next";
import { FormEvent, useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

import { Navbar } from "@/components/landing-page";
import { SubmitButton } from "@/components/common";
import toast from "react-hot-toast";

type TimeSlots = {
  [key: string]: string[];
};

const timeSlots: TimeSlots = {
  // "2021-09-28": [
  //   "09:00:00",
  //   "09:30:00",
  //   "10:00:00",
  //   "10:30:00",
  //   "11:00:00",
  //   "11:30:00",
  //   "13:00:00",
  //   "13:30:00",
  //   "14:00:00",
  //   "14:30:00",
  //   "15:00:00",
  //   "15:30:00",
  //   "16:00:00",
  //   "16:30:00",
  // ],
  "2021-10-02": [
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
  ],
  "2021-10-16": [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
    "16:30:00",
  ],
  "2021-11-06": [
    "08:00:00",
    "08:30:00",
    "09:00:00",
    "09:30:00",
    "10:00:00",
    "10:30:00",
    "11:00:00",
    "11:30:00",
    "13:00:00",
    "13:30:00",
    "14:00:00",
    "14:30:00",
    "15:00:00",
    "15:30:00",
    "16:00:00",
  ],
};

const dateSlots = ["2021-10-02", "2021-10-16", "2021-11-06"];

type AvailableTime = {
  id: number;
  date: string;
  time: string;
};

type BookedProps = {
  id?: number;
};

const useAlreadyBooked = (props?: BookedProps) => {
  return useQuery<AvailableTime[], Error>(
    // ["consultations", cookies.access_token],
    ["book-consultations", props?.id],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/consultation/available?exhibitor_id=${props?.id}`
        )
        .then((res) => res.data.data),
    { enabled: Boolean(props?.id) }
  );
};

const AboutHEF: NextPage = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  // const [isExists, setIsExists] = useState(false);
  const [step, setStep] = useState(1);
  const [exhibitors, setExhibitors] = useState<any[]>([]);
  const [selectedExhibitor, setSelectedExhibitor] = useState<number>();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { data: booked } = useAlreadyBooked({ id: selectedExhibitor });

  useEffect(() => {
    const fetchExhibitors = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/exhibitor?show_package=1`
        );
        if (!res.ok) {
          throw new Error("Error fetch exhibitors");
        }
        const json = await res.json();
        setExhibitors(json.data);
      } catch (error) {}
    };
    fetchExhibitors();
  }, []);

  const checkUserByEmail = async () => {
    console.log({ email });
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/detail?email=${email}`
      );

      const json = await res.json();

      if (json.code === 200) {
        // setIsExists(true);
        setName(json.data.name);
        setMobile(json.data.mobile);
      }
      setStep(2);
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedExhibitor || !date || !time || !name || !email || !mobile) {
      return;
    }

    try {
      const data = {
        date,
        time,
        exhibitor_id: selectedExhibitor,
        status: 1,
        email,
        name,
        mobile,
      };
      console.log(data);

      toast.success("Booking success", { position: "top-right" });
      setStep(3);
    } catch (error) {
      toast.error("Booking failed", { position: "top-right" });
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Navbar variant="dark" />
      <main className="py-16">
        <section className="max-w-7xl mx-auto py-10 px-4 mb-10">
          <h1 className="text-primary-600 font-bold text-2xl text-center">
            Booking Konsultasi
          </h1>
          <div className="max-w-md bg-white p-6 mx-auto mt-6 shadow rounded-md">
            {step === 1 && (
              <>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      className="input-text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={checkUserByEmail}
                  className="mt-4 bg-gray-100 text-primary-600 p-2 rounded-md w-full border border-gray-300 hover:bg-gray-200 font-semibold"
                >
                  Check Email
                </button>
              </>
            )}
            {step === 2 && (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      className="input-text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama
                  </label>
                  <div className="mt-1">
                    <input
                      id="name"
                      className="input-text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="mobile"
                    className="block text-sm font-medium text-gray-700"
                  >
                    No HP / WA
                  </label>
                  <div className="mt-1">
                    <input
                      id="mobile"
                      className="input-text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exhibitor"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Exhibitor
                  </label>
                  <div className="mt-1">
                    {/* <!-- Valid: border-gray-300, Invalid: border-red-500 --> */}
                    <select
                      id="exhibitor"
                      className="input-text"
                      placeholder="Select Exhibitor"
                      value={selectedExhibitor}
                      onChange={(e) =>
                        setSelectedExhibitor(Number(e.target.value))
                      }
                    >
                      <option>Pilih Exhibitor</option>
                      {exhibitors
                        .filter(
                          (exhibitor) =>
                            [3, 4, 5].includes(exhibitor.package_id) ||
                            exhibitor?.ala_carte?.includes("open_consultation")
                        )
                        .map((exhibitor) => (
                          <option key={exhibitor.id} value={exhibitor.id}>
                            {exhibitor.company_name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                {selectedExhibitor ? (
                  <>
                    <div className="mb-4">
                      <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pilih Tanggal
                      </label>
                      <div className="mt-1">
                        <select
                          id="date"
                          name="date"
                          className="input-text"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        >
                          <option value="">Pilih Tanggal</option>
                          {/* <option value="2021-09-28">2021-09-28</option> */}
                          {dateSlots
                            ?.filter((slot) => {
                              const today = new Date()
                                .toISOString()
                                .split("T")[0];

                              if (today > slot) {
                                return false;
                              }
                              return true;
                            })
                            ?.map((slot) => (
                              <option value={slot} key={slot}>
                                {slot}
                              </option>
                            ))}
                          {/* <option value="2021-10-02">2021-10-02</option>
                      <option value="2021-10-16">2021-10-16</option>
                      <option value="2021-11-06">2021-11-06</option> */}
                        </select>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="time"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Pilih Waktu
                      </label>
                      <div className="mt-1">
                        <select
                          id="time"
                          name="time"
                          className="input-text"
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                        >
                          <option value="">Pilih Waktu</option>
                          {timeSlots[date] &&
                            timeSlots[date]
                              .filter((slot) => {
                                const today = new Date();

                                if (
                                  today.toISOString().split("T")[0] !== date
                                ) {
                                  return true;
                                }

                                if (
                                  today
                                    .toLocaleTimeString("en-US", {
                                      hour12: false,
                                    })
                                    .split(" ")[0] > slot
                                ) {
                                  return false;
                                }

                                return true;
                              })
                              .filter((slot) => {
                                const found = booked?.find(
                                  (b) => b.date === date && b.time === slot
                                );
                                return !found;
                              })
                              .map((slot) => (
                                <option key={slot} value={slot}>
                                  {slot}
                                </option>
                              ))}
                        </select>
                      </div>
                    </div>
                  </>
                ) : null}
                {/* <button className="mt-2 bg-primary-600 text-white p-2 rounded-md w-full hover:bg-primary-700 font-semibold">
                  Booking
                </button> */}
                <button
                  type="submit"
                  className={`mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2  bg-primary-600 hover:bg-primary-700 focus:ring-primary-600 w-full disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed`}
                  disabled={
                    !selectedExhibitor ||
                    !date ||
                    !time ||
                    !name ||
                    !email ||
                    !mobile
                  }
                >
                  {isLoading ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="animate-spin w-5 h-5"
                    >
                      <path
                        d="M12 4.75V6.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.1266 6.87347L16.0659 7.93413"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.25 12L17.75 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.1266 17.1265L16.0659 16.0659"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 17.75V19.25"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.9342 16.0659L6.87354 17.1265"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.25 12L4.75 12"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M7.9342 7.93413L6.87354 6.87347"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            )}

            {step === 3 && (
              <div className="flex flex-col items-center py-4">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Booking Berhasil
                </h3>
                <CheckCircleIcon className="w-20 h-20 text-green-500" />
                <Link href="/">
                  <a className="mt-4 underline text-primary-600 hover:text-primary-800">
                    kembali ke home
                  </a>
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutHEF;
