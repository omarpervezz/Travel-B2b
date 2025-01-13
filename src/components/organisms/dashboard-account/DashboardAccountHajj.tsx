

import React from 'react'

import RecentHistory from '@/components/molecules/dashboard-account/RecentHistory'
import { ColumnConfig } from '@/components/molecules/global/Table';
import HajjCard from '@/components/molecules/dashboard-account/HajjCard';
import HajjChart from '@/components/molecules/dashboard-account/HajjChart';
import { hajjRcentHistory } from '@/data/historyData';



const columns: ColumnConfig[] = [
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



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchRecentHistory = async (): Promise<any[]> => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any[]>((resolve) => {
    setTimeout(() => {
      resolve(hajjRcentHistory); 
    }, 1000); 
  });
};


const DashboardAccountHajj = () => {
  return (
    <div>
    <HajjCard/>
    <HajjChart/>
      <RecentHistory
      title="Recent Booking History"
      subtitle="Last week transaction history"
      columns={columns}
      fetchData={fetchRecentHistory}
      buttonLabel="View All"
      onButtonClick={() => console.log("View All Clicked")}
    />
    </div>
  )
}

export default DashboardAccountHajj