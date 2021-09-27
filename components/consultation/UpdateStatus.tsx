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

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedConsultation: {
    id: number;
    status: number;
  };
};

export const UpdateStatus = ({
  open,
  setOpen,
  selectedConsultation,
}: Props) => {
  const cancelButtonRef = useRef(null);
  const [status, setStatus] = useState(selectedConsultation.status);
  const [isLoading, setIsLoading] = useState(false);
  const cookies = parseCookies();
  const queryClient = useQueryClient();
  // console.log({ selectedConsultation });

  const handleChangeStatus: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const data = {
        _method: "PUT",
        status,
      };
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/consultation/${selectedConsultation.id}`,
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
      toast.success("Status updated");
    } catch (error) {
      setIsLoading(false);
      toast.success("Error update status");
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
                  Change Status
                </h3>
                <form onSubmit={handleChangeStatus}>
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
                      value={status}
                      onChange={(e) => setStatus(Number(e.target.value))}
                    >
                      <option value={1}>Upcoming</option>
                      <option value={2}>Join Zoom</option>
                      <option value={3}>Done</option>
                      <option value={4}>Timeout</option>
                    </select>
                  </div>
                  <SubmitButton isLoading={isLoading}>
                    Change Status
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
