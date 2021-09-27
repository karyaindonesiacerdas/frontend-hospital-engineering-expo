import React from "react";
import { useTranslation } from "next-i18next";

type SubmitButtonProps = {
  isLoading: boolean;
  i18nText?: string;
  className?: string;
  fullWidth?: boolean;
  danger?: boolean;
};

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  isLoading,
  i18nText,
  className,
  children,
  fullWidth = true,
  danger = false,
}) => {
  const { t } = useTranslation("auth");

  return (
    <button
      type="submit"
      className={`${className} flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm font-medium text-white transition-all focus:outline-none focus:ring-2 focus:ring-offset-2  ${
        fullWidth ? "w-full" : ""
      } ${
        danger
          ? "bg-red-600 hover:bg-red-700 focus:ring-red-600"
          : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-600"
      }`}
    >
      {isLoading ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="animate-spin w-5 h-5"
        >
          <path
            d="M12 4.75V6.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.1266 6.87347L16.0659 7.93413"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.25 12L17.75 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.1266 17.1265L16.0659 16.0659"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17.75V19.25"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.9342 16.0659L6.87354 17.1265"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.25 12L4.75 12"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.9342 7.93413L6.87354 6.87347"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : i18nText ? (
        t(i18nText)
      ) : (
        children
      )}
    </button>
  );
};
