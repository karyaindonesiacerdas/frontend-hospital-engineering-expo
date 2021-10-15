/* eslint-disable react/display-name */
import { useState } from "react";
import { useViews } from "hooks/useViews";
import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
// import { useVisitorViews } from "hooks/useVisitorViews";
// import { PaginationTable } from "../common/table";

export const VisitorViewsDetail = () => {
  const [page, setPage] = useState(1);
  const {
    data: viewers,
    isLoading,
    isSuccess,
  } = useViews({ page: page, limit: 1000 });
  // const { data } = useVisitorViews({ page });

  console.log({ viewers });
  // console.log({ data });

  return (
    <div>
      {/* Table */}
      <ReactHTMLTableToExcel
        id="test-table-xls-button"
        className="download-table-xls-button bg-primary-600 px-3 py-1 text-white hover:bg-primary-700 mb-2 rounded-md shadow"
        table="table-to-xls"
        filename="tablexls"
        sheet="tablexls"
        buttonText="Download as XLS"
      />
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table
                id="table-to-xls"
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Institution Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Exhibitor ID
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {isLoading
                    ? [0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="h-4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="h-4 bg-gray-200 animate-pulse"></div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="h-4 bg-gray-200 animate-pulse"></div>
                          </td>
                        </tr>
                      ))
                    : viewers?.data?.map((viewer) => (
                        <tr key={viewer.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {viewer.visitor.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {viewer.visitor.institution_name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {viewer.exhibitor?.company_name}
                          </td>
                        </tr>
                      ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div
        className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{viewers?.from}</span> to{" "}
            <span className="font-medium">{viewers?.to}</span> of{" "}
            <span className="font-medium">{viewers?.total}</span> results
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={!viewers?.prev_page_url}
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </button>
          <button
            className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            disabled={!viewers?.next_page_url}
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
