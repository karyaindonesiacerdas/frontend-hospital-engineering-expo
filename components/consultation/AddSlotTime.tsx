import {
  Dispatch,
  FormEventHandler,
  Fragment,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { SubmitButton } from "../common";
import { useQueryClient } from "react-query";
import { useConsultations } from "hooks/useConsultation";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const timeSlots = [
  "09:00:00",
  "09:30:00",
  "10:00:00",
  "10:30:00",
  "11:00:00",
  "11:30:00",
  "12:00:00",
  "12:30:00",
  "13:00:00",
  "13:30:00",
  "14:00:00",
  "14:30:00",
  "15:00:00",
  "15:30:00",
  "16:00:00",
  "16:30:00",
];

export const AddSlotTime = ({ open, setOpen }: Props) => {
  const cancelButtonRef = useRef(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  const { data } = useConsultations();
  // console.log({ data });

  const bookedSlot = (date: string) => {
    return data?.filter((item) => item.date === date).map((item) => item.time);
  };

  // const day1Time = data?.filter(item => item.date === '2021-10-02').map(item => item.time);
  // const day2Time = data?.filter(item => item.date === '2021-10-16').map(item => item.time)
  // const day3Time = data?.filter(item => item.date === '2021-11-06').map(item => item.time)

  const handleChangeStatus: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const data = {
        date,
        time,
        status: 1,
      };

      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/consultation`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      await res.json();
      await queryClient.invalidateQueries(["consultations"]);

      setIsLoading(false);
      setOpen(false);
      toast.success("Success add slot time");
    } catch (error) {
      setIsLoading(false);
      toast.success("Error add slot time");
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xs sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <h3 className="text-xl text-center mb-4 text-gray-700 font-bold">
                  Add Slot Time
                </h3>
                <form onSubmit={handleChangeStatus}>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date
                    </label>
                    <div className="mt-1 mb-4">
                      <select
                        id="date"
                        className="input-text"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      >
                        <option value="">Select Date</option>
                        <option value="2021-10-02">2021-10-02</option>
                        <option value="2021-10-16">2021-10-16</option>
                        <option value="2021-11-06">2021-11-06</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="time"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Time
                    </label>
                    <div className="mt-1 mb-4">
                      <select
                        id="time"
                        className="input-text"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                      >
                        <option value="">Select Time</option>
                        {/* {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))} */}
                        {timeSlots
                          .filter((slot) => !bookedSlot(date)?.includes(slot))
                          .map((slot) => (
                            <option value={slot} key={slot}>
                              {slot}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <SubmitButton isLoading={isLoading}>Add</SubmitButton>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
