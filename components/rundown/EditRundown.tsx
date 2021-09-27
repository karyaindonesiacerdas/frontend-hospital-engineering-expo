import {
  Dispatch,
  FormEventHandler,
  Fragment,
  SetStateAction,
  useRef,
  useState,
  useEffect,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { parseCookies } from "nookies";
import { useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { SubmitButton } from "../common";
import { RundownDetail } from "hooks/useRundowns";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedRundown: RundownDetail;
  setSelectedRundown: Dispatch<SetStateAction<RundownDetail | undefined>>;
};

type Inputs = {
  title: string;
  speakers: string;
  date: string;
  time: string;
  embedd_link: string;
  status: number;
};

export const EditRundown = ({
  open,
  setOpen,
  selectedRundown,
  setSelectedRundown,
}: Props) => {
  const cancelButtonRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      date: selectedRundown.date,
      embedd_link: selectedRundown.embedd_link,
      speakers: selectedRundown.speakers,
      status: selectedRundown.status,
      time: selectedRundown.time,
      title: selectedRundown.title,
    },
  });
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  useEffect(() => {
    reset({
      date: selectedRundown.date,
      embedd_link: selectedRundown.embedd_link,
      speakers: selectedRundown.speakers,
      status: selectedRundown.status,
      time: selectedRundown.time,
      title: selectedRundown.title,
    });
  }, [reset, selectedRundown]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { date, embedd_link, speakers, time, title, status } = values;

    const data = {
      title,
      speakers,
      embedd_link,
      date,
      time,
      status,
      _method: "PUT",
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/rundown/${selectedRundown.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
          body: JSON.stringify(data),
        }
      );
      if (!res.ok) {
        throw new Error("Error add rundown");
      }

      const json = await res.json();
      console.log({ json });
      await queryClient.invalidateQueries(["rundowns"]);

      setOpen(false);
      setSelectedRundown(undefined);
      toast.success("New rundown added");
    } catch (error) {
      toast.error("Error add new rundown");
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={(v) => {
          setOpen(v);
        }}
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
                  Edit Rundown
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div>
                    <label
                      htmlFor="title"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Title
                    </label>
                    <div className="mt-1 mb-4">
                      <input
                        type="text"
                        id="title"
                        className="input-text"
                        {...register("title")}
                      />
                      {/*  */}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="speakers"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Speakers
                    </label>
                    <div className="mt-1 mb-4">
                      <input
                        type="text"
                        id="speakers"
                        className="input-text"
                        {...register("speakers")}
                      />
                      {/*  */}
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="embedd_link"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Link
                    </label>
                    <div className="mt-1 mb-4">
                      <input
                        type="text"
                        id="embedd_link"
                        className="input-text"
                        {...register("embedd_link")}
                      />
                    </div>
                  </div>
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
                        {...register("date")}
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
                      <input
                        type="text"
                        className="input-text"
                        id="time"
                        {...register("time")}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="status"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Status
                    </label>
                    <div className="mt-1 mb-4">
                      <select
                        id="status"
                        className="input-text"
                        {...register("status")}
                      >
                        <option value="">Select Status</option>
                        <option value={1}>Upcoming</option>
                        <option value={2}>Now Showing</option>
                        <option value={3}>Done</option>
                      </select>
                    </div>
                  </div>
                  <SubmitButton isLoading={isSubmitting}>Save</SubmitButton>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
