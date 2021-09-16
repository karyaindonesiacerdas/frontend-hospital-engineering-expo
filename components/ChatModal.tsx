import { Fragment, useRef, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { Transition, Dialog } from "@headlessui/react";
import { useForm } from "react-hook-form";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const ChatModal = ({ open, setOpen }: Props) => {
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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full sm:p-6 modal-bg ">
              {/* ### Chat ### */}
              <div className="flex w-full bg-white rounded-md overflow-hidden">
                {/* Left Panel */}
                <div className="flex-shrink-0 w-1/4 border-r border-gray-200">
                  {/* <!-- Chat list header --> */}
                  <div className="py-2 px-4 bg-primary-500 border-b border-gray-200 h-12 flex items-center">
                    <h3 className="text-xl font-medium text-white uppercase">
                      HEF 2021 Chat
                    </h3>
                  </div>

                  {/* <!-- Search --> */}
                  <Search />

                  {/* <!-- Chat list --> */}
                  <ul className="divide-y divide-gray-200 max-h-[400px] overflow-y-auto">
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                    <ChatListItem />
                  </ul>
                </div>

                {/* Right Panel */}
                <div className="w-3/4 relative chat-bg">
                  {/* <!-- Chat Header --> */}
                  <ChatMessageHeader />

                  <div className="flex flex-col max-h-[456px] h-full">
                    {/* <!-- Chat Body --> */}
                    <div className="overflow-auto ">
                      <ul className="pl-1.5 pr-1 sm:px-4 py-2 w-full flex flex-col space-y-2 items-start">
                        <ChatItemBuddy />
                        <ChatItemYou />
                        <ChatItemBuddy />
                        <ChatItemYou />
                        <ChatItemBuddy />
                        <ChatItemYou />
                      </ul>
                    </div>

                    {/* <!-- Chat input --> */}
                    <ChatInput />
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

const Search = () => {
  return (
    <div className="w-full px-1 sm:px-4 py-2 border-b border-gray-200 h-14 bg-gray-100">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <div className="hidden sm:flex absolute inset-y-0 left-0 pl-3  items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          id="search"
          name="search"
          className="block w-full px-2 sm:pl-10 sm:pr-3 py-2 border border-gray-300 rounded-md sm:rounded-full leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Search"
          type="search"
        />
      </div>
    </div>
  );
};

const ChatListItem = () => {
  return (
    <li className="group cursor-pointer">
      <div className="flex items-start space-x-3 px-0 pr-1 sm:px-4 group-hover:bg-gray-100 py-4">
        <Image
          width={35}
          height={35}
          className="hidden sm:block rounded-full"
          src="/dayat.jpg"
          alt="John Doe"
        />
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium">John Doe</h3>
            <p className="text-sm text-gray-500">1h</p>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
            exercitationem libero aspernatur non. Quis, vitae iure quae
            reprehenderit
          </p>
        </div>
      </div>
    </li>
  );
};

const ChatMessageHeader = () => {
  return (
    <div className="py-2 px-4 border-b border-gray-200 h-12 flex justify-between items-center bg-white">
      <div className="flex items-center space-x-3">
        <Image
          width={35}
          height={35}
          className="h-8 w-8 rounded-full"
          src="/dayat.jpg"
          alt=""
        />
        <h3 className="text-xl font-medium text-gray-600 mr-20">John Doe</h3>
      </div>
      <button className="p-1 hover:bg-gray-100 rounded-md">
        <svg
          className="w-8 h-8"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M17.25 6.75L6.75 17.25"
          />
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M6.75 6.75L17.25 17.25"
          />
        </svg>
        <span className="sr-only">Close Modal</span>
      </button>
    </div>
  );
};

const ChatItemBuddy = () => {
  return (
    <li className="group cursor-pointer max-w-[95%] sm:max-w-[60%]">
      <div className="flex-1 space-y-0.5 bg-white rounded-md shadow px-3 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">John Doe</h3>
          <p className="text-sm text-gray-500">1h</p>
        </div>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          exercitationem libero aspernatur non.
        </p>
      </div>
    </li>
  );
};

const ChatItemYou = () => {
  return (
    <li className="group cursor-pointer max-w-[95%] sm:max-w-[60%] self-end">
      <div className="flex-1 space-y-0.5 bg-primary-200 rounded-md shadow px-3 py-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">You</h3>
          <p className="text-sm text-gray-500">1h</p>
        </div>
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloribus
          exercitationem libero aspernatur non.
        </p>
      </div>
    </li>
  );
};

const ChatInput = () => {
  const [previewImg, setPreviewImg] = useState("");
  const fileRef = useRef(null);

  return (
    <form
      id="chat-form"
      className="w-full px-1.5 sm:px-4 py-2 border-t border-gray-200 bg-gray-200"
    >
      {/* <!-- image preview --> */}
      {/*  onclick="document.getElementById('imageFile').value = ''; document.getElementById('previewImage').src='';" */}
      <div
        className="mb-1 overflow-hidden flex justify-center w-52 rounded-md shadow relative group cursor-pointer"
        onClick={() => {
          console.log("hit");
        }}
      >
        {previewImg && (
          <Image
            width={300}
            height={300}
            objectFit="cover"
            id="previewImage"
            src={previewImg}
            alt="Preview Image"
          />
        )}
        <div className="hidden absolute inset-0  items-center justify-center group-hover:flex bg-black bg-opacity-30 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span className="sr-only">Delete</span>
        </div>
      </div>
      <div className="flex space-x-2">
        <div className="flex-1">
          <label htmlFor="message" className="sr-only">
            Message
          </label>
          <div>
            <div
              id="message"
              className="px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm max-h-32 overflow-y-auto"
              role="textbox"
              contentEditable
              style={{ resize: "none" }}
            ></div>
          </div>
        </div>

        <div className="flex space-x-1 items-end pb-0.5">
          {/* <!-- Upload File --> */}
          <div>
            <label
              htmlFor="imageFile"
              className="text-gray-500 p-1.5 rounded-full bg-white border border-gray-300 shadow flex items-center justify-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </label>
            <input
              ref={fileRef}
              className="hidden"
              type="file"
              id="imageFile"
              onChange={(e) =>
                e.target.files?.length &&
                setPreviewImg(URL.createObjectURL(e.target.files[0]))
              }
            />
          </div>
          {/* <!-- Send Message --> */}
          <button
            className="text-white p-1.5 rounded-full bg-primary-500 border border-gray-300 shadow flex items-center
                            justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 rotate-45"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            <span className="sr-only">Send</span>
          </button>
        </div>
      </div>
    </form>
  );
};
