import { Fragment, useRef, Dispatch, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { SubmitButton } from "./common";
import { useQuery } from "react-query";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  exhibitorId: number;
};

type Inputs = {
  date: string;
  time: string;
  exhibitorId: number;
};

const schema = yup.object().shape({
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
});

type TimeSlots = {
  [key: string]: string[];
};

const timeSlots: TimeSlots = {
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
type AvailableTime = {
  id: number;
  date: string;
  time: string;
};

const useAlreadyBooked = ({ id }: { id: number }) => {
  const cookies = parseCookies();

  return useQuery<AvailableTime[], Error>(
    ["consultations", cookies.access_token],
    () =>
      axios
        .get(
          `${process.env.NEXT_PUBLIC_API_URL}/consultation/available?exhibitor_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${cookies.access_token}`,
            },
          }
        )
        .then((res) => res.data.data),
    { enabled: Boolean(cookies.access_token) }
  );
};

export const BookingConsultationModal = ({
  open,
  setOpen,
  exhibitorId,
}: Props) => {
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({ resolver: yupResolver(schema) });
  const cookies = parseCookies();

  const dateWatch: any = watch("date");

  const { data: booked } = useAlreadyBooked({ id: exhibitorId });

  const onSubmit: SubmitHandler<Inputs> = async ({ date, time }) => {
    const data = {
      date,
      time,
      exhibitor_id: exhibitorId,
      status: 1,
    };

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/consultation`,
        data,
        {
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );
      console.log({ res });

      reset();
      toast.success("Booking success", { position: "top-right" });
      setOpen(false);
    } catch (error) {
      toast.error("Booking failed", { position: "top-right" });
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 modal-bg">
              <h3 className="mb-8 text-xl text-center font-bold py-4 text-gray-700 bg-gray-100 bg-opacity-60 rounded-md shadow-lg">
                Booking Consultation
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <div className="mt-1">
                    <select
                      {...register("date")}
                      id="date"
                      name="date"
                      className="input-text"
                    >
                      <option value="">Choose</option>
                      <option value="2021-10-02">2021-10-02</option>
                      <option value="2021-10-16">2021-10-16</option>
                      <option value="2021-11-06">2021-11-06</option>
                    </select>
                  </div>
                  {errors?.date && (
                    <span className="text-sm text-red-500">
                      {errors?.date?.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Time
                  </label>
                  <div className="mt-1">
                    <select
                      {...register("time")}
                      id="time"
                      name="time"
                      className="input-text"
                    >
                      <option value="">Choose</option>
                      {timeSlots[dateWatch] &&
                        timeSlots[dateWatch]
                          .filter((slot) => {
                            const found = booked?.find(
                              (b) => b.date === dateWatch && b.time === slot
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
                  {errors?.time && (
                    <span className="text-sm text-red-500">
                      {errors?.time?.message}
                    </span>
                  )}
                </div>

                <div className="mt-5 sm:mt-6">
                  <SubmitButton isLoading={isSubmitting}>
                    Make an Appointment
                  </SubmitButton>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
