/* eslint-disable react/display-name */
import { useViews } from "hooks/useViews";
import React, { useMemo } from "react";
import { PaginationTable } from "../common/table";

export const ListViewers = () => {
  // const { data: viewers, isLoading, isSuccess } = useViews({ page: 1 });
  // const data = useMemo(
  //   () =>
  //     isSuccess &&
  //     viewers?.map((viewer) => ({
  //       id: viewer.id,
  //       name: viewer.visitor.name,
  //       institution_name: viewer.visitor.institution_name,
  //       email: viewer.visitor.email,
  //       mobile: viewer.visitor.mobile,
  //     })),
  //   [isSuccess, viewers]
  // );
  // const columns = useMemo(
  //   () => [
  //     {
  //       Header: "Name",
  //       Footer: "Name",
  //       accessor: "name",
  //     },
  //     {
  //       Header: "Institution",
  //       Footer: "Institution",
  //       accessor: "institution_name",
  //     },
  //     {
  //       Header: "Email",
  //       Footer: "Email",
  //       accessor: "email",
  //     },
  //     {
  //       Header: "Mobile",
  //       Footer: "Mobile",
  //       accessor: "mobile",
  //     },
  //   ],
  //   []
  // );
  // return (
  //   <div>
  //     <PaginationTable
  //       showFooter={false}
  //       data={data || []}
  //       columns={columns}
  //       isLoading={isLoading}
  //       skeletonCols={4}
  //     />
  //   </div>
  // );
};
