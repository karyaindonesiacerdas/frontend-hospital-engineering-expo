import React, { useCallback, useState } from "react";
import { CloudUploadIcon } from "@heroicons/react/solid";
import { parseCookies } from "nookies";
import { useDropzone } from "react-dropzone";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

import { useAuth } from "@/contexts/auth.context";
import { SubmitButton } from "../common";

export const UploadLogo = () => {
  const [selectedImage, setSelectedImage] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const cookies = parseCookies();
  const queryClient = useQueryClient();

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedImage(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: false,
  });

  const previewURL = selectedImage[0] && URL.createObjectURL(selectedImage[0]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> | undefined =
    async (e) => {
      e.preventDefault();

      if (!selectedImage.length) return;
      setIsLoading(true);
      try {
        const data = new FormData();
        data.append("_method", "PUT");
        data.append("company_logo", selectedImage[0]);

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${cookies?.access_token}`,
            },
            body: data,
          }
        );

        if (!res.ok) {
          throw new Error("Error upload company logo");
        }

        await res.json();
        await queryClient.invalidateQueries(["exhibitor", user?.id]);
        setIsLoading(false);
        setSelectedImage([]);
        toast.success("Company logo uploaded successfully!", {
          position: "top-right",
        });
      } catch (error) {
        setIsLoading(false);
        toast.error("Company logo failed to upload!", {
          position: "top-right",
        });
      }
    };

  return (
    <form onSubmit={handleSubmit} className="col-span-2 sm:col-span-1">
      <label className="block text-sm font-medium text-gray-800">
        Company Logo
      </label>
      <div
        className={`mt-1 flex justify-center ${
          previewURL ? "p-3" : "px-6 pt-5 pb-6"
        } border-2 border-dashed rounded-md cursor-pointer hover:border-primary-600 group ${
          isDragActive ? "border-primary-600 bg-white" : "border-gray-300"
        }`}
        {...getRootProps()}
      >
        <input className="sr-only" {...getInputProps()} />
        {previewURL ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewURL} alt="preview" className="max-w-[100px]" />
        ) : (
          <>
            <div className="space-y-1 text-center">
              <svg
                className={`mx-auto h-12 w-12 group-hover:text-primary-600 ${
                  isDragActive ? "text-primary-600" : "text-gray-500"
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
                  {isDragActive ? "Drop here..." : "Click or drag and drop"}
                </p>
              </div>
              <p className="text-xs text-gray-700">PNG, JPG up to 1MB</p>
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
        <SubmitButton
          isLoading={isLoading}
          className="bg-primary-600 hover:bg-primary-700"
        >
          <CloudUploadIcon className="w-4 2xl:w-5 h-4 2xl:h-5 mr-1.5" />
          Upload
        </SubmitButton>
      </div>
    </form>
  );
};
