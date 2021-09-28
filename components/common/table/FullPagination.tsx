import React from "react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";

interface FullPaginationProps {
  disabledPrev: boolean;
  disabledNext: boolean;
  onPrev: () => Function;
  onNext: () => Function;
  currentPage: number;
  totalPage: number;
  onGoToFirst: () => Function;
  onGoToLast: () => Function;
  goToPage: Function;
  pageIndex: number;
  pageSize: number;
  setPageSize: Function;
}

export const FullPagination = ({
  disabledPrev,
  disabledNext,
  onPrev,
  onNext,
  currentPage,
  totalPage,
  onGoToFirst,
  onGoToLast,
  goToPage,
  pageIndex,
  pageSize,
  setPageSize,
}: FullPaginationProps) => {
  return (
    <nav
      className="py-3 flex items-center justify-between border-t border-gray-200"
      aria-label="Pagination"
    >
      <div className="block">
        <p className="text-sm text-gray-700">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPage}</span>
        </p>
      </div>
      <div className="flex-1 flex justify-end">
        <span className="hidden md:inline-flex items-center">
          Go to page:{" "}
          <input
            type="number"
            className="ml-1 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed max-w-[85px]"
            // defaultValue={pageIndex + 1}
            value={currentPage}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              goToPage(pageNumber);
            }}
          />
        </span>
        <span className="ml-1.5">
          Show:{" "}
          <select
            className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed max-w-[100px] pr-8"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {[5, 10, 25, 50].map((v) => (
              <option value={v} key={v}>
                {v}
              </option>
            ))}
          </select>
        </span>
        <button
          onClick={onGoToFirst}
          disabled={disabledPrev}
          className="hidden md:inline-flex ml-1.5 relative items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <ChevronDoubleLeftIcon className="h-4 w-4" />
        </button>
        <button
          onClick={onPrev}
          disabled={disabledPrev}
          className="ml-1.5 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={onNext}
          disabled={disabledNext}
          className="ml-1.5 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          Next
        </button>
        <button
          onClick={onGoToLast}
          disabled={disabledNext}
          className="hidden md:inline-flex ml-1.5 relative  items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:border-transparent disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          <ChevronDoubleRightIcon className="h-4 w-4" />
        </button>
      </div>
    </nav>
  );
};
