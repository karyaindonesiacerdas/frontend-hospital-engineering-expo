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
import { useQueryClient } from "react-query";
import { SubmitHandler, useForm } from "react-hook-form";

import { SubmitButton } from "../common";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedConsultation: {
    id: number;
    status: number;
  };
};

type Inputs = {};

export const DeleteConsultation = ({
  open,
  setOpen,
  selectedConsultation,
}: Props) => {
  const cancelButtonRef = useRef(null);
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Inputs>();
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/consultation/${selectedConsultation.id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${cookies.access_token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Error delete consultation");
      }

      await res.json();
      await queryClient.invalidateQueries(["consultations"]);
      setOpen(false);
      toast.success("Consultation Deleted");
    } catch (error) {
      toast.error("Error delete consultation");
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
                  Delete Consultation
                </h3>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <p className="mb-6 text-lg text-center text-gray-600">
                    Are you sure?
                  </p>
                  <SubmitButton isLoading={isSubmitting} danger>
                    Delete
                  </SubmitButton>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
