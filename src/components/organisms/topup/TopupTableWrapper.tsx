"use client";
import { useRef, useState } from "react";
import Loader from "@/components/molecules/global/Loader";
import { usePaginatedFetchData } from "@/hooks/api/v1/useFetchData";
import { RiFilter2Line } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { IoPrintOutline } from "react-icons/io5";
import TopupTableData from "./TopupTableData";
import { IoIosAdd } from "react-icons/io";
import { columns as topupTableData } from "./TopupTableData";
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";
import { topupEndPointUrls } from "@/hooks/api/v1/endPointUrl";

// Define the type for the exportRef
type ExportRef = {
  handleExport: () => void;
};

const TopupTableWrapper = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [printData, setPrintData] = useState<Record<string, unknown>[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const exportRef = useRef<ExportRef | null>(null);
  const limit = 12;

  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    [topupEndPointUrls],
    0,
    currentPage,
    limit
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrint = () => {
    const activeData = data[topupEndPointUrls] || [];
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
      className: "bg-[#FCAA22] hover:bg-[#ffb53d] cursor-not-allowed",
      disable: true,
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
      onClick: () => console.log("Print clicked"),
      icon: <IoIosAdd size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-5 rounded-md bg-white dark:bg-darkPrimaryBg">
      <TopupTableData
        data={data[topupEndPointUrls] || []}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={buttons}
      />

      <Export
        ref={exportRef}
        columns={topupTableData}
        data={data[topupEndPointUrls] || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {/* Hidden Printable Component */}
      {showPrint && (
        <Print
          title={"Topup Table Data"}
          data={printData}
          columns={topupTableData}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default TopupTableWrapper;
