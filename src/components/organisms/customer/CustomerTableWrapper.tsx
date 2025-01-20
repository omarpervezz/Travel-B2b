"use client";
import { useState, useRef } from "react";
import Loader from "@/components/molecules/global/Loader";
import { usePaginatedFetchData } from "@/hooks/api/v1/useFetchData";
import { RiFilter2Line } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { IoPrintOutline } from "react-icons/io5";
import CustomerData from "./CustomerData";
import { columns as customerColumn } from "./CustomerData";
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";
import { FaPlus } from "react-icons/fa6";
import { customerEndPointUrls } from "@/hooks/api/v1/endPointUrl";

// Define the type for the exportRef
type ExportRef = {
  handleExport: () => void;
};

const CustomerTableWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printData, setPrintData] = useState<Record<string, unknown>[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const exportRef = useRef<ExportRef | null>(null);
  const limit = 12;

  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    [customerEndPointUrls],
    0,
    currentPage,
    limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    const activeData = data[customerEndPointUrls] || [];
    setPrintData(activeData as Record<string, unknown>[]);
    setShowPrint(true);
  };

  const handleExport = () => {
    if (exportRef.current) {
      exportRef.current.handleExport(); // Trigger export logic in the Export component
    }
  };

  const buttons = [
    {
      label: "Filter",
      onClick: () => console.log("Filter clicked"),
      icon: <RiFilter2Line size={20} />,
      className: "bg-[#FCAA22] hover:bg-[#ffb53d]",
    },
    {
      label: "Export",
      onClick: handleExport,
      icon: <LuDownload size={20} />,
      className: "bg-[#20B038] hover:bg-[#257a33]",
    },
    {
      label: "Print",
      onClick: handlePrint,
      icon: <IoPrintOutline size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
    {
      label: "Add",
      onClick: handlePrint,
      icon: <FaPlus size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-5 rounded-md bg-white dark:bg-darkPrimaryBg">
      <CustomerData
        data={data[customerEndPointUrls] || []}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={buttons}
      />
      <Export
        ref={exportRef}
        columns={customerColumn}
        data={data[customerEndPointUrls] || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {/* Hidden Printable Component */}
      {showPrint && (
        <Print
          title={"Customer Table Data"}
          data={printData}
          columns={customerColumn}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default CustomerTableWrapper;
