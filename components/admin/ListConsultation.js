import { useMemo } from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

import { PaginationTable } from "../common/table";

export const ListConsultation = ({ dataConsultations }) => {
  const data = useMemo(
    () =>
      dataConsultations?.map((consultation) => ({
        id: consultation.id,
        date: consultation.date,
        time: consultation.time,
        exhibitor: consultation.exhibitor?.company_name,
        visitorName: consultation.visitor?.name,
        visitorHP: consultation.visitor?.mobile,
        status: consultation.status,
      })),
    [dataConsultations]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Nomor HP",
        Footer: "Nomor HP",
        accessor: "visitorHP",
      },
      {
        Header: "Nama",
        Footer: "Nama",
        accessor: "visitorName",
      },
      {
        Header: "Nama Perusahaan",
        Footer: "Nama Perusahaan",
        accessor: "exhibitor",
        Cell: ({ value }) => value.substring(5),
      },
      {
        Header: "Kode Perusahaan",
        Footer: "Kode Perusahaan",
        Cell: ({ row }) => row.original.exhibitor.substring(1, 3),
      },
      {
        Header: "Tanggal",
        Footer: "Tanggal",
        accessor: "date",
      },
      {
        Header: "Jam",
        Footer: "Jam",
        accessor: "time",
      },
      {
        Header: "Nama Zoom",
        Footer: "Nama Zoom",
        Cell: ({ row }) =>
          `${row.original.exhibitor.substring(1, 3)}_${
            row.original.visitorName
          }`,
      },
    ],
    []
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
