/* eslint-disable react/jsx-key */
import React from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { ImFileEmpty } from "react-icons/im";

import { FullPagination } from "./FullPagination";
import { GlobalFilter } from "./GlobalFilter";

export const PaginationTable = ({
  showFooter,
  data,
  columns,
  searchable = true,
  pagination = true,
  dense = false,
  action = <div />,
  isLoading = false,
  skeletonCols = 5,
  skeletonRows = 5,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    footerGroups,
    state,
    preGlobalFilteredRows,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  if (!isLoading && !data.length) {
    return (
      <div className="flex flex-col">
        <div className="mb-2 grid grid-cols-2 gap-x-2 sm:flex items-center justify-between">
          {searchable ? (
            <GlobalFilter
              preGlobalFilteredRows={preGlobalFilteredRows}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          ) : (
            <div />
          )}
          <div>{action}</div>
        </div>
        <div className="flex flex-col space-y-2 items-center justify-center h-60">
          <ImFileEmpty className="w-12 h-auto text-primary-600" />
          <div className="text-primary-600 font-semibold">No Data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="mb-2 grid grid-cols-2 gap-x-2 sm:flex items-center justify-between">
        {searchable ? (
          <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        ) : (
          <div />
        )}
        <div>{action}</div>
      </div>

      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-md">
            <table
              id="table-to-xls"
              className="min-w-full divide-y divide-gray-200"
              {...getTableProps()}
            >
              <thead className="bg-gray-50">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        scope="col"
                        className={`px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-primary-600 ${
                          dense ? "py-2" : "py-3"
                        }`}
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {column.isSorted ? (
                          column.isSortedDesc ? (
                            <ChevronDownIcon className="ml-1 h-4 w-4 inline-block" />
                          ) : (
                            <ChevronUpIcon className="ml-1 h-4 w-4 inline-block" />
                          )
                        ) : (
                          <span className="ml-1 h-4 w-4 inline-block" />
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="bg-white divide-y divide-gray-200"
                {...getTableBodyProps()}
              >
                {isLoading && (
                  <TableSkeleton cols={skeletonCols} rows={skeletonRows} />
                )}
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td
                            className={`px-6 py-4 whitespace-nowrap ${
                              dense ? "py-2 text-sm" : "py-4"
                            }`}
                            {...cell.getCellProps()}
                          >
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
              {showFooter && (
                <tfoot>
                  {footerGroups.map((footerGroup) => (
                    <tr {...footerGroup.getFooterGroupProps()}>
                      {footerGroup.headers.map((column) => (
                        <td
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          {...column.getFooterProps()}
                        >
                          {column.render("Footer")}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              )}
            </table>
          </div>
        </div>
      </div>
      {pagination && !isLoading && (
        <div className="px-2">
          <FullPagination
            disabledPrev={!canPreviousPage}
            disabledNext={!canNextPage}
            onPrev={() => previousPage()}
            onNext={() => nextPage()}
            currentPage={pageIndex + 1}
            totalPage={pageOptions.length}
            onGoToFirst={() => gotoPage(0)}
            onGoToLast={() => gotoPage(pageCount - 1)}
            goToPage={gotoPage}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            totalData={data?.length}
          />
        </div>
      )}
    </div>
  );
};

const TableSkeleton = ({ cols, rows }) => {
  return Array.from(Array(rows).keys()).map((_, indexRow) => (
    <tr key={indexRow}>
      {Array.from(Array(cols).keys()).map((_, indexCol) => (
        <td className="px-6 py-4" key={indexCol}>
          <div className="h-5 animate-pulse bg-gray-200 rounded"></div>
        </td>
      ))}
    </tr>
  ));
};
