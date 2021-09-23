import { Fragment, useRef, Dispatch, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useAuth } from "@/contexts/auth.context";
import { GlobeAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  provider?: "youtube";
  videoId: string;
};

export const VideoModal = ({
  open,
  setOpen,
  videoId,
  provider = "youtube",
}: Props) => {
  const cancelButtonRef = useRef(null);
  const { user } = useAuth();

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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 sm:pb-8 modal-bg">
              <div className="mb-5">
                <div className="text-primary-700 mb-2 text-2xl text-center font-bold">
                  PT Karya Indonesia Cerdas
                </div>
                <div className="grid grid-cols-3 items-center justify-center text-gray-800">
                  <div className="flex items-center justify-center space-x-1">
                    <GlobeAltIcon className="w-5 h-5" />
                    <a
                      href="https://karya-indonesia-cerdas.com/"
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-white"
                    >
                      https://karya-indonesia-cerdas.com
                    </a>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <PhoneIcon className="w-5 h-5" />
                    <span>+62895385290704</span>
                  </div>
                  <div className="flex items-center justify-center space-x-1">
                    <MailIcon className="w-5 h-5" />
                    <span>info@karya-indonesia-cerdas.com</span>
                  </div>
                </div>
              </div>
              <div className="plyr__video-embed" id="player">
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: videoId,
                        provider,
                      },
                    ],
                  }}
                  options={{ autoplay: true }}
                />
              </div>
              {user.role === "exhibitor" && (
                <form className="mt-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="company-video"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Video URL
                      </label>
                      <input
                        type="text"
                        id="company-video"
                        className="input-text"
                        placeholder="Company Video URL"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="company-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="company-name"
                        className="input-text"
                        placeholder="Company Name"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="company-email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="company-email"
                        className="input-text"
                        placeholder="Company Email"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="company-website"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Website
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span>
                        <input
                          type="text"
                          id="company-website"
                          className="focus:ring-primary-500 focus:border-primary-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                          placeholder="www.example.com"
                        />
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label
                        htmlFor="company-phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone
                      </label>
                      <input
                        type="email"
                        id="company-phone"
                        className="input-text"
                        placeholder="Company Phone"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button className="btn-primary mt-4">Update</button>
                  </div>
                </form>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
