"use client";
import React from "react";
import Table from "@/components/molecules/global/Table";
import Pagination from "@/components/molecules/global/Pagination";
import { ColumnConfig } from "@/components/molecules/global/Table";
import { Button } from "@/components/atoms/Button";
import { BookingPropsType } from "@/types/component";
import CardTitle from "@/components/atoms/CardTitle";

import { MdArrowForwardIos } from "react-icons/md";

export const columns: ColumnConfig[] = [
  { key: "issueDate", type: "text", label: "Issue Date" },
  { key: "bookingDate", type: "text", label: "Booking Date" },
  { key: "bookingID", type: "text", label: "Booking ID" },
  { key: "passengerName", type: "text", label: "Passenger Name" },
  { key: "flightDate", type: "text", label: "Flight Date" },
  { key: "route", type: "text", label: "Route" },
  { key: "ticketNumber", type: "text", label: "Ticket Number" },
  {
    key: "pnr",
    type: "button",
    label: "PNR",
    buttonProps: {
      labelKey: "pnr",
      onClick: () => alert(`Primary Action clicked for`),
      className: "bg-[#1768D0] p-1 text-white",
    },
  },
  { key: "totalPrice", type: "text", label: "Total Price" },
  { key: "status", type: "text", label: "Status" },
  {
    key: "action",
    type: "select",
    label: "Action",
    selectOptions: ["Confirm", "Pending", "Delete", "Draft"],
    onSelectChange: () => {},
  },
];

const PackageRecentHistoryTableData: React.FC<BookingPropsType> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle className="font-semibold text-xl text-[#243045] dark:text-white">
            Recent Package Booking History
          </CardTitle>
        </div>
        <Button className="text-sm font-normal text-[#243045] p-2.5 rounded-md bg-[#EFEFEF] flex items-center gap-2 hover:bg-[#257CEB] hover:text-[#EDF2FD] duration-300">
          View All <MdArrowForwardIos />
        </Button>
      </div>
      <div className=" mt-2">
        <Table data={data} columns={columns} />
        <div className="flex justify-end">
          {data.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageRecentHistoryTableData;
