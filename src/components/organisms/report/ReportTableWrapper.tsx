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

import ReportFlightData from "./ReportFlightData";
import ReportHotelData from "./ReportHotelData";
import ReportPackageData from "./ReportPackageData";
import ReportCarData from "./ReportCarData";
import ReportHajjData from "./ReportHajjData";
import { columns as reportHotelColumns } from "./ReportHotelData";
import { columns as reportCarColumns } from "./ReportCarData";
import { columns as reportHajjColumns } from "./ReportHajjData";
import { columns as reportFlightColumns } from "./ReportFlightData";
import { columns as reportPackageColumns } from "./ReportPackageData";
import { reportEndPointUrls } from "@/hooks/api/v1/endPointUrl";

type Column = { key: string; label: string };
type DataRecord = Record<string, unknown>;

const columnMap: Record<number, Column[]> = {
  0: reportFlightColumns,
  1: reportHotelColumns,
  2: reportPackageColumns,
  3: reportCarColumns,
  4: reportHajjColumns,
};

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const ReportTableWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPages, setCurrentPages] = useState<number[]>(
    Array(tabs.length).fill(1)
  );

  const [printData, setPrintData] = useState<DataRecord[]>([]);
  const [showPrint, setShowPrint] = useState(false);
  const exportRef = useRef<{ handleExport: () => void } | null>(null);

  const limit = 12;

  const { data, isLoading, error, totalPages } = usePaginatedFetchData(
    reportEndPointUrls,
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
    const activeData = data[reportEndPointUrls[activeTab]] || [];
    setPrintData(activeData);
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
          <ReportFlightData
            data={data[reportEndPointUrls[0]] || []}
            currentPage={currentPages[0]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(0, page)}
            actionButton={buttons}
          />
        );
      case 1:
        return (
          <ReportHotelData
            data={data[reportEndPointUrls[1]] || []}
            currentPage={currentPages[1]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(1, page)}
            actionButton={buttons}
          />
        );
      case 2:
        return (
          <ReportPackageData
            data={data[reportEndPointUrls[2]] || []}
            currentPage={currentPages[2]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(2, page)}
            actionButton={buttons}
          />
        );
      case 3:
        return (
          <ReportCarData
            data={data[reportEndPointUrls[3]] || []}
            currentPage={currentPages[3]}
            totalPages={totalPages}
            onPageChange={(page) => handlePageChange(3, page)}
            actionButton={buttons}
          />
        );

      case 4:
        return (
          <ReportHajjData
            data={data[reportEndPointUrls[4]] || []}
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
    <div className="p-5 bg-white rounded-md dark:bg-darkPrimaryBg">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div>{renderTabContent()}</div>
      <Export
        ref={exportRef}
        columns={columnMap[activeTab]}
        data={data[reportEndPointUrls[activeTab]] || []}
        onExportComplete={() => console.log("Export completed!")}
      />
      {/* Hidden Printable Component */}
      {showPrint && (
        <Print
          title={"Report Table Data"}
          data={printData}
          columns={columnMap[activeTab]}
          onClose={() => setShowPrint(false)}
        />
      )}
    </div>
  );
};

export default ReportTableWrapper;
