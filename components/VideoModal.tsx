/* eslint-disable @next/next/no-img-element */
import {
  Fragment,
  useRef,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { GlobeAltIcon, MailIcon, PhoneIcon } from "@heroicons/react/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { useAuth } from "@/contexts/auth.context";
import { parseCookies } from "nookies";
import { SubmitButton } from "./common";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  videoModalDetails: {
    id: number;
    name: string;
    email: string;
    website: string;
    phone: string;
    videoUrl: string;
  };
  videoType: "main-hall" | "booth";
};

function youtubeParser(url: string) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length == 11 ? match[7] : "";
}

function matchYoutubeUrl(url: string) {
  const p =
    /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  const matches = url.match(p);
  if (matches) {
    return matches[1];
  }
  return false;
}

type Inputs = {
  company_video_url: string;
  company_name: string;
  email: string;
  company_website: string;
  mobile: string;
};

export const VideoModal = ({
  open,
  setOpen,
  videoModalDetails,
  videoType,
}: Props) => {
  const cancelButtonRef = useRef(null);
  const { user } = useAuth();
  const provider = "youtube";
  const defaultVideo =
    "https://www.youtube.com/watch?v=CXg2xeULoa0&ab_channel=HospitalEngineeringExpo";
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
    clearErrors,
    reset,
    watch,
  } = useForm<Inputs>({
    defaultValues: {
      company_name: videoModalDetails.name,
      company_video_url: videoModalDetails.videoUrl || defaultVideo,
      company_website: videoModalDetails.website,
      email: videoModalDetails.email,
      mobile: videoModalDetails.phone,
    },
  });
  const cookies = parseCookies();
  const queryClient = useQueryClient();
  const [validId, setValidId] = useState(false);
  const videoURL = watch("company_video_url");

  const imageOnLoadHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    // console.log({ width: e.currentTarget.width });
    setValidId(e.currentTarget.width !== 120);
  };

  useEffect(() => {
    reset({
      company_name: videoModalDetails.name,
      company_video_url: videoModalDetails.videoUrl || defaultVideo,
      company_website: videoModalDetails.website,
      email: videoModalDetails.email,
      mobile: videoModalDetails.phone,
    });
  }, [reset, videoModalDetails]);

  useEffect(() => {
    if (!validId) {
      setError("company_video_url", { message: "Invalid Youtube Video" });
    } else {
      clearErrors("company_video_url");
    }
  }, [setError, validId, clearErrors]);

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    const { company_name, company_video_url, company_website, email, mobile } =
      values;

    if (!validId) {
      setError("company_video_url", { message: "Invalid Youtube Video" });
      return;
    }

    const data = {
      _method: "PUT",
      company_name,
      company_video_url,
      company_website,
      email,
      mobile,
    };

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
      data,
      {
        headers: {
          Authorization: `Bearer ${cookies.access_token}`,
        },
      }
    );

    if (res?.data?.code === 200) {
      await queryClient.invalidateQueries(["exhibitors"]);
      await queryClient.invalidateQueries([
        "exhibitor",
        videoModalDetails?.id?.toString(),
      ]);
      toast.success("Company Info updated successfully!", {
        position: "top-right",
      });
      setOpen(false);
    } else {
      toast.error("Company Info failed to update", { position: "top-right" });
      setOpen(false);
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
            <div className="inline-block align-bottom rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6 sm:pb-8 modal-bg">
              {videoType === "booth" && (
                <div className="mb-5">
                  <div className="text-primary-700 mb-2 text-2xl text-center font-bold">
                    {videoModalDetails.name}
                  </div>
                  <div className="grid grid-cols-3 items-center justify-center text-gray-800">
                    <div className="flex items-center justify-center space-x-1">
                      <GlobeAltIcon className="w-5 h-5" />
                      <a
                        href={videoModalDetails.website}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white"
                      >
                        {videoModalDetails.website}
                      </a>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <PhoneIcon className="w-5 h-5" />
                      <span>{videoModalDetails.phone}</span>
                    </div>
                    <div className="flex items-center justify-center space-x-1">
                      <MailIcon className="w-5 h-5" />
                      <span>{videoModalDetails.email}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="plyr__video-embed" id="player">
                <Plyr
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: youtubeParser(
                          videoModalDetails.videoUrl || defaultVideo
                        ),
                        provider,
                      },
                    ],
                  }}
                  options={{ autoplay: user.id !== videoModalDetails.id }}
                />
              </div>
              {videoType === "booth" &&
                user.role === "exhibitor" &&
                user.id === videoModalDetails.id && (
                  <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-2">
                      <label
                        htmlFor="company-video"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Thumbnail
                      </label>
                      <img
                        src={`http://img.youtube.com/vi/${matchYoutubeUrl(
                          videoURL
                        )}/mqdefault.jpg`}
                        alt="thumbnail"
                        onLoad={imageOnLoadHandler}
                      />
                    </div>
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
                          className={`input-text ${
                            errors.company_video_url ? "border-red-600" : ""
                          }`}
                          placeholder="Company Video URL"
                          {...register("company_video_url")}
                        />
                        {errors?.company_video_url && (
                          <span className="text-sm text-red-600 p-1">
                            {errors?.company_video_url?.message}
                          </span>
                        )}
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
                          {...register("company_name")}
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
                          {...register("email")}
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
                          {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                          http://
                        </span> */}
                          <input
                            type="text"
                            id="company-website"
                            className="input-text"
                            placeholder="www.example.com"
                            {...register("company_website")}
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
                          id="company-phone"
                          className="input-text"
                          placeholder="Company Phone"
                          {...register("mobile")}
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <SubmitButton isLoading={isSubmitting}>
                        Upload
                      </SubmitButton>
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
