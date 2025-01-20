"use client";
import { useState, useRef } from "react";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import Loader from "@/components/molecules/global/Loader";
import { usePaginatedFetchData } from "@/hooks/api/v1/useFetchData";
import { LuPlaneTakeoff } from "react-icons/lu";
import { LuDownload } from "react-icons/lu";
import { IoPrintOutline } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";
import { IoAddSharp } from "react-icons/io5";
import { LuHotel } from "react-icons/lu";
import { GiPalmTree } from "react-icons/gi";
import Print from "@/components/molecules/global/Print";
import Export from "@/components/molecules/global/Export";
import { FaCar } from "react-icons/fa";
import { PiMosqueThin } from "react-icons/pi";
import RefundFlightData from "./RefundFlightData";
import RefundHotelData from "./RefundHotelData";
import RefundPackageData from "./RefundPackageData";
import RefundCarData from "./RefundCarData";
import RefundHajjData from "./RefundHajjData";
import { refundEndPointUrls } from "@/hooks/api/v1/endPointUrl";
import { columns as refundHotelColumns } from "./RefundHotelData";
import { columns as refundCarColumns } from "./RefundCarData";
import { columns as refundHajjColumns } from "./RefundHajjData";
import { columns as refundFlightColumns } from "./RefundFlightData";
import { columns as refundPackageColumns } from "./RefundPackageData";

type Column = { key: string; label: string };
type DataRecord = Record<string, unknown>;

const columnMap: Record<number, Column[]> = {
  0: refundFlightColumns,
  1: refundHotelColumns,
  2: refundPackageColumns,
  3: refundCarColumns,
  4: refundHajjColumns,
};

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const RefundTableWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPages, setCurrentPages] = useState<number[]>(
    Array(tabs.length).fill(1)
  );
  const [printData, setPrintData] = useState<DataRecord[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const exportRef = useRef<{ handleExport: () => void } | null>(null);
  const limit = 12;

  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    refundEndPointUrls,
    activeTab,
    currentPages[activeTab],
    limit
  );

  const handlePageChange = (tabIndex: number, page: number) => {
    setCurrentPages((prev) => {
      const updatedPages = [...prev];
      updatedPages[tabIndex] = page;
      return updatedPages;
    });
  };

  const handlePrint = () => {
    const activeData = data[refundEndPointUrls[activeTab]] || [];
    setPrintData(activeData as DataRecord[]);
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
      onClick: () => console.log("Add clicked"),
      icon: <IoAddSharp size={20} />,
      className: "bg-[#1768D0] hover:bg-[#2e77d7]",
    },
  ];

  const renderTabContent = () => {
    if (isLoading) return <Loader />;
    if (error) return <div className="text-red-500">{error}</div>;

    switch (activeTab) {
      case 0:
        return (
          <RefundFlightData
            data={data[refundEndPointUrls[0]] || []}
            currentPage={currentPages[0]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(0, page)}
            actionButton={buttons}
          />
        );
      case 1:
        return (
          <RefundHotelData
            data={data[refundEndPointUrls[1]] || []}
            currentPage={currentPages[1]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(1, page)}
            actionButton={buttons}
          />
        );
      case 2:
        return (
          <RefundPackageData
            data={data[refundEndPointUrls[2]] || []}
            currentPage={currentPages[2]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(2, page)}
            actionButton={buttons}
          />
        );
      case 3:
        return (
          <RefundCarData
            data={data[refundEndPointUrls[3]] || []}
            currentPage={currentPages[3]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(3, page)}
            actionButton={buttons}
          />
        );

      case 4:
        return (
          <RefundHajjData
            data={data[refundEndPointUrls[4]] || []}
            currentPage={currentPages[4]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(4, page)}
            actionButton={buttons}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-5 rounded-md bg-white dark:bg-darkPrimaryBg">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div>{renderTabContent()}</div>
      <Export
        ref={exportRef}
        columns={columnMap[activeTab]}
        data={data[refundEndPointUrls[activeTab]] || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {/* Hidden Printable Component */}
      {showPrint && (
        <Print
          title={"Refund Table Data"}
          data={printData}
          columns={columnMap[activeTab]}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default RefundTableWrapper;
