import { Fragment, useRef, Dispatch, SetStateAction } from "react";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import { CloudDownloadIcon, ExternalLinkIcon } from "@heroicons/react/outline";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  selectedPoster?: {
    title: string;
    src: string;
  };
};

const imagePlaceholder = "https://via.placeholder.com/297x420.png";

export const PosterModal = ({ open, setOpen, selectedPoster }: Props) => {
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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:p-6 modal-bg">
              <h2 className="bg-white text-xl 2xl:text-2xl text-center font-bold py-1 2xl:py-2 bg-opacity-50 rounded-md mb-2">
                {selectedPoster?.title || "Poster Title"}
              </h2>
              <div className="hidden 2xl:block">
                <Image
                  height={420 * 1.7}
                  width={297 * 1.7}
                  objectFit="contain"
                  src={selectedPoster?.src || imagePlaceholder}
                  alt={selectedPoster?.title}
                />
              </div>
              <div className="block 2xl:hidden">
                <Image
                  height={420}
                  width={297}
                  objectFit="contain"
                  src={selectedPoster?.src || imagePlaceholder}
                  alt={selectedPoster?.title}
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <a
                  href={selectedPoster?.src}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center space-x-2 px-3 py-1.5 2xl:px-4 2xl:py-2 bg-primary-50 hover:bg-primary-200 text-primary-800 rounded-md"
                >
                  <ExternalLinkIcon className="w-4 2xl:w-5 h-4 2xl:h-5" />
                  <span className="font-semibold text-sm">Open in new tab</span>
                </a>
                <a
                  href={selectedPoster?.src}
                  download
                  className="inline-flex items-center space-x-2 px-3 py-1.5 2xl:px-4 2xl:py-2 bg-primary-50 hover:bg-primary-200 text-primary-800 rounded-md"
                >
                  <CloudDownloadIcon className="w-4 2xl:w-5 h-4 2xl:h-5" />
                  <span className="font-semibold text-sm">Download</span>
                </a>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
