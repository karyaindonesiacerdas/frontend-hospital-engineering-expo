import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";
import { SubmitHandler, useForm } from "react-hook-form";
import { SubmitButton } from "../common";
import { parseCookies } from "nookies";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuth } from "@/contexts/auth.context";

type Inputs = {
  current_password: string;
  new_password: string;
};

const schema = yup.object().shape({
  current_password: yup.string().required("Current password is required"),
  new_password: yup
    .string()
    .min(8, "New Password must be at least 8 characters")
    .required("New password is required"),
});

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });
  const cookies = parseCookies();
  const { logout } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = async (values) => {
    if (!values.current_password || !values.new_password) return;
    const data = {
      _method: "PUT",
      password: values.new_password,
    };

    // console.log("hit");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies.access_token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        throw new Error("Failed change password");
      }

      await res.json();
      // console.log({ json });
      await logout();
      toast.success("Password changed");
    } catch (error: any) {
      // console.log(error);
      toast.success(error.message || "Failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="current-password"
                className="block text-sm font-medium text-gray-700"
              >
                Current Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="current-password"
                  type={showPassword ? "text" : "password"}
                  className="input-password"
                  autoComplete="new-password"
                  {...register("current_password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors?.current_password && (
                <span className="text-sm text-red-500">
                  {errors?.current_password?.message}
                </span>
              )}
            </div>

            <div className="col-span-2 sm:col-span-1">
              <label
                htmlFor="new-password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  id="new-password"
                  type={showPassword ? "text" : "password"}
                  className="input-password"
                  autoComplete="new-password"
                  {...register("new_password")}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 px-3 flex items-center"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeOffIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
              {errors?.new_password && (
                <span className="text-sm text-red-500">
                  {errors?.new_password?.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <div className="flex justify-end">
            <SubmitButton isLoading={isSubmitting} fullWidth={false}>
              Change
            </SubmitButton>
          </div>
        </div>
      </div>
    </form>
  );
};
