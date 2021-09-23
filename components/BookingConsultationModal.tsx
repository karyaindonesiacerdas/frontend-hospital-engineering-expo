import { Fragment, useRef, Dispatch, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const BookingConsultationModal = ({ open, setOpen }: Props) => {
  const cancelButtonRef = useRef(null);

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
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Date
                  </label>
                  <div className="mt-1">
                    <select id="date" name="date" className="input-text">
                      <option value="">Choose</option>
                      <option value="02-10-2021">02-10-2021</option>
                      <option value="16-10-2021">16-10-2021</option>
                      <option value="30-10-2021">30-10-2021</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Select Time
                  </label>
                  <div className="mt-1">
                    <select id="time" name="time" className="input-text">
                      <option value="">Choose</option>
                      <option value="12.00">12.00</option>
                      <option value="13.00">13.00</option>
                      <option value="14.00">14.00</option>
                      <option value="15.00">15.00</option>
                      <option value="16.00">16.00</option>
                    </select>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button type="button" className="btn-primary w-full">
                    Make an Appointment
                  </button>
                </div>
              </form>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
