import {
  Fragment,
  useState,
  useRef,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import Image from "next/image";
import {
  CloudDownloadIcon,
  ExternalLinkIcon,
  CloudUploadIcon,
} from "@heroicons/react/outline";
import { useDropzone } from "react-dropzone";

import { useAuth } from "@/contexts/auth.context";

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
  const [selectedImage, setSelectedImage] = useState<any[]>([]);
  const { user } = useAuth();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const previewURL = selectedImage[0] && URL.createObjectURL(selectedImage[0]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={(v) => {
          setSelectedImage([]);
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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:p-6 modal-bg">
              <div className="flex space-x-6">
                <div>
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
                      className="btn-secondary"
                    >
                      <ExternalLinkIcon className="w-4 2xl:w-5 h-4 2xl:h-5 mr-1.5" />
                      <span className="font-semibold text-sm">
                        Open in new tab
                      </span>
                    </a>
                    <a
                      href={selectedPoster?.src}
                      download
                      className="btn-secondary"
                    >
                      <CloudDownloadIcon className="w-4 2xl:w-5 h-4 2xl:h-5 mr-1.5" />
                      <span className="font-semibold text-sm">Download</span>
                    </a>
                  </div>
                </div>

                {user.role === "exhibitor" && (
                  <form className="col-span-2 sm:col-span-1 w-96">
                    <label className="block text-sm font-medium text-gray-800">
                      Update Poster
                    </label>
                    <div
                      className={`mt-1 flex justify-center ${
                        previewURL ? "p-3" : "px-6 pt-5 pb-6"
                      } border-2 border-dashed rounded-md cursor-pointer hover:border-primary-600 group ${
                        isDragActive
                          ? "border-primary-600 bg-white"
                          : "border-gray-300"
                      }`}
                      {...getRootProps()}
                    >
                      <input className="sr-only" {...getInputProps()} />
                      {previewURL ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={previewURL} alt="preview" />
                      ) : (
                        <>
                          <div className="space-y-1 text-center">
                            <svg
                              className={`mx-auto h-12 w-12 group-hover:text-primary-600 ${
                                isDragActive
                                  ? "text-primary-600"
                                  : "text-gray-100"
                              }`}
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 48 48"
                              aria-hidden="true"
                            >
                              <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <div className="flex text-sm text-gray-900">
                              <p className="pl-1">
                                {isDragActive
                                  ? "Drop here..."
                                  : "Click or drag and drop"}
                              </p>
                            </div>
                            <p className="text-xs text-gray-700">
                              PNG, JPG up to 1MB
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                    {previewURL && (
                      <button
                        onClick={() => setSelectedImage([])}
                        className="mt-1.5 bg-white text-red-600 px-2 py-1.5 w-full rounded-md hover:bg-red-50 font-semibold text-sm"
                      >
                        Clear
                      </button>
                    )}
                    <div className="mt-2">
                      <label
                        htmlFor="display-name"
                        className="block text-sm font-medium text-gray-800 mb-1"
                      >
                        Display Name
                      </label>
                      <input
                        type="text"
                        name="display-name"
                        className="input-text bg-transparent focus:bg-white"
                        placeholder="Display Name"
                        defaultValue="Poster 1"
                      />
                    </div>

                    <div className="flex justify-end mt-1">
                      <button type="submit" className="mt-2 btn-secondary">
                        <CloudUploadIcon className="w-4 2xl:w-5 h-4 2xl:h-5 mr-1.5" />
                        Upload
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
