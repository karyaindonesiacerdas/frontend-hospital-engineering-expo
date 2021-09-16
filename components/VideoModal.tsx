import { Fragment, useState, useRef, Dispatch, SetStateAction } from "react";
import type { NextPage } from "next";
import { Transition, Dialog } from "@headlessui/react";
import { ExclamationIcon } from "@heroicons/react/outline";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";

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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 modal-bg">
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
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
