"use client";
import { useRef, useState } from "react";
import Loader from "@/components/molecules/global/Loader";
import { usePaginatedFetchData } from "@/hooks/useFetchData";
import { RiFilter2Line } from "react-icons/ri";
import { LuDownload } from "react-icons/lu";
import { IoPrintOutline } from "react-icons/io5";
import TopupTableData from './TopupTableData'
import { IoIosAdd } from "react-icons/io";

import { columns as topupTableData} from './TopupTableData';
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";


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
  
  const TopupApiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/topup`;
  
  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    [TopupApiUrl],
    0,
    currentPage,
    limit
  );
  
  
    const handlePageChange = (page: number) => {
      setCurrentPage(page);
    };

    const handlePrint = () => {
      const activeData = data[TopupApiUrl] || [];
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
      disable:true,
    },
    {
      label: "Export",
      onClick:handleExport,
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
      icon: <IoIosAdd  size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  if (isLoading) return <Loader />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white p-5 rounded-md mt-5">
      
      <TopupTableData
        data={data[TopupApiUrl] || []}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        actionButton={buttons}
      />

    <Export
        ref={exportRef}
        columns={topupTableData}
        data={data[TopupApiUrl] || []} 
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