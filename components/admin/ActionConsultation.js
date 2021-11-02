/* eslint-disable react/display-name */
import { useMemo } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { PaginationTable } from "../common/table";

export const ActionConsultation = ({
  dataConsultations,
  setSelectedConsultation,
  setOpenChangeStatusModal,
  setOpenDeleteModal,
  settings,
}) => {
  const data = useMemo(
    () =>
      dataConsultations?.map((consultation) => ({
        id: consultation.id,
        date: consultation.date,
        time: consultation.time,
        exhibitor: consultation.exhibitor?.company_name,
        visitor: consultation.visitor,
        visitorName: consultation.visitor.name,
        visitorInstitution: consultation.visitor.institution_name,
        mobile: consultation.visitor?.mobile,
        status: consultation.status,
      })),
    [dataConsultations]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        Footer: "Date",
        accessor: "date",
      },
      {
        Header: "Time",
        Footer: "Time",
        accessor: "time",
      },
      {
        Header: "Exhibitor",
        Footer: "Exhibitor",
        accessor: "exhibitor",
      },
      // {
      //   Header: "Visitor",
      //   Footer: "Visitor",
      //   accessor: "visitor",
      //   Cell: ({ value }) => (
      //     <div>
      //       <div className="text-gray-900">{value?.name}</div>
      //       <div className="text-sm text-gray-500">
      //         {value?.institution_name}
      //       </div>
      //       {/* <div className="text-sm text-gray-500">{value?.mobile}</div> */}
      //     </div>
      //   ),
      // },
      {
        Header: "Visitor Name",
        Footer: "Visitor Name",
        accessor: "visitorName",
      },
      {
        Header: "Visitor Institution",
        Footer: "Visitor Institution",
        accessor: "visitorInstitution",
      },
      {
        Header: "Contact",
        Footer: "Contact",
        accessor: "mobile",
      },
      {
        Header: "Status",
        Footer: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div>
            {value === 3 ? (
              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-green-100 text-green-800">
                Done
              </span>
            ) : value === 4 ? (
              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-red-100 text-red-800">
                Timeout
              </span>
            ) : value === 2 ? (
              <a
                href={settings?.zoom_business_link}
                target="_blank"
                rel="noreferrer"
                className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-blue-500 hover:bg-blue-600 hover:animate-none transition text-white animate-pulse"
              >
                Join Zoom
              </a>
            ) : value === 1 ? (
              <span className="px-2 py-1 sm:px-4 sm:py-1.5 inline-flex text-xs leading-5 font-semibold rounded-md uppercase bg-gray-100 text-gray-800">
                Upcoming
              </span>
            ) : null}
          </div>
        ),
      },
      {
        Header: "Action",
        Footer: "Action",
        Cell: ({ row }) => {
          return (
            <div className="flex space-x-3">
              <button
                className="text-primary-600 hover:bg-gray-100 px-2 py-1.5 rounded-md text-sm font-semibold transition"
                onClick={() => {
                  setSelectedConsultation({
                    id: row.original.id,
                    status: row.original.status,
                  });
                  setOpenChangeStatusModal(true);
                }}
              >
                Update Status
              </button>
              <button
                onClick={() => {
                  setSelectedConsultation({
                    id: row.original.id,
                    status: row.original.status,
                  });
                  setOpenDeleteModal(true);
                }}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    [
      setOpenChangeStatusModal,
      setOpenDeleteModal,
      setSelectedConsultation,
      settings?.zoom_business_link,
    ]
  );

  return (
    <div>
      <PaginationTable
        showFooter={false}
        data={data || []}
        columns={columns}
        // isLoading={isLoadingConsultations}
        skeletonCols={4}
        action={
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="download-table-xls-button bg-white px-3 py-1 text-primary-600 hover:bg-primary-600 hover:text-white mb-2 rounded-md shadow"
            table="table-to-xls"
            filename="tablexls"
            sheet="tablexls"
            buttonText="Download as XLS"
          />
        }
      />
    </div>
  );
};
