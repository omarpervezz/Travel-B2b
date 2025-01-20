"use client";
import React from "react";
import Table from "@/components/molecules/global/Table";
import TableSearch from "@/components/molecules/global/TableSearch";
import SelectFilter from "@/components/molecules/global/SelectTableFilter";
import Pagination from "@/components/molecules/global/Pagination";
import { useFlightBookingFilter } from "@/hooks/filter/useFilter";
import { ColumnConfig } from "@/components/molecules/global/Table";
import DatePicker from "@/components/molecules/global/DatePicker";
import { BookingPropsType } from "@/types/component";
import { BookingDataType } from "@/hooks/api/v1/useFetchData";
import { Button } from "@/components/atoms/Button";

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

const ReportHajjData: React.FC<BookingPropsType> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  actionButton,
}) => {
  const {
    filteredTableData,
    searchQuery,
    setSearchQuery,
    setSelectFilter,
    setDateRangeFilter,
    getFilterOptions,
  } = useFlightBookingFilter(data);

  return (
    <div>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <div className="flex  flex-col sm:flex-row sm:justify-start sm:items-center gap-2">
          <TableSearch
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <DatePicker field="issueDate" setFilter={setDateRangeFilter} />
          {["status"].map((field) => (
            <SelectFilter
              key={field}
              searchField={field as keyof BookingDataType}
              getOptions={getFilterOptions}
              setFilter={setSelectFilter}
            />
          ))}
        </div>
        <div className="flex items-start lg:items-center justify-start overflow-x-auto no-scrollbar lg:justify-end gap-4">
          {actionButton?.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              className={`flex gap-1 px-4 py-1.5 rounded-md text-white text-sm font-bold transition-all duration-150 ${button.className}`}
            >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className=" mt-5 ">
          <Table data={filteredTableData} columns={columns} />
          <div className="flex justify-end">
            {filteredTableData.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportHajjData;
