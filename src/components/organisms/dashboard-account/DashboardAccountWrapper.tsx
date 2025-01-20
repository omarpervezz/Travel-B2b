"use client";
import { useState } from "react";
import TabNavigation from "@/components/molecules/global/TabNavigation";
import { LuPlaneTakeoff, LuHotel } from "react-icons/lu";
import { GiPalmTree } from "react-icons/gi";
import { TiWorldOutline } from "react-icons/ti";
import { FaCar } from "react-icons/fa";
import { PiMosqueThin } from "react-icons/pi";
import DashboardAccountFlight from "./DashboardAccountFlight";
import DashboardAccountHotel from "./DashboardAccountHotel";
import DashboardAccountPackage from "./DashboardAccountPackage";
import DashboardAcclountVisa from "./DashboardAcclountVisa";
import DashboardAccountCar from "./DashboardAccountCar";
import DashboardAccountHajj from "./DashboardAccountHajj";
import { bookingEndPointUrls } from "@/hooks/api/v1/endPointUrl";
import { usePaginatedFetchData } from "@/hooks/api/v1/useFetchData";
import FlightRecentHistoryTableData from "./FlightRecentHistoryTableData";
import HotelRecentHistoryTableData from "./HotelRecentHistoryTableData";
import PackageRecentHistoryTableData from "./PackageRecentHistoryTableData";
import VisaRecentHistoryTableData from "./VisaRecentHistoryTableData";
import CarRecentHistoryTableData from "./CarRecentHistoryTableData";
import HajjUmrahRecentHistoryTableData from "./HajjUmrahRecentHistoryTableData";

const tabs = [
  { label: "Flight", icon: <LuPlaneTakeoff size={20} /> },
  { label: "Hotel", icon: <LuHotel size={20} /> },
  { label: "Package", icon: <GiPalmTree size={20} /> },
  { label: "Visa", icon: <TiWorldOutline size={20} /> },
  { label: "Car", icon: <FaCar size={20} /> },
  { label: "Hajj & Umrah", icon: <PiMosqueThin size={20} /> },
];

const DashboardAccountWrapper: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [currentPages, setCurrentPages] = useState<number[]>(
    Array(tabs.length).fill(1)
  );
  const limit = 12;

  const { data, totalPages } = usePaginatedFetchData(
    bookingEndPointUrls,
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="space-y-8">
            <DashboardAccountFlight />
            <FlightRecentHistoryTableData
              data={data[bookingEndPointUrls[0]] || []}
              currentPage={currentPages[0]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(0, page)}
            />
          </div>
        );

      case 1:
        return (
          <div className="space-y-8">
            <DashboardAccountHotel />
            <HotelRecentHistoryTableData
              data={data[bookingEndPointUrls[1]] || []}
              currentPage={currentPages[1]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(1, page)}
            />
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <DashboardAccountPackage />
            <PackageRecentHistoryTableData
              data={data[bookingEndPointUrls[2]] || []}
              currentPage={currentPages[2]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(2, page)}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <DashboardAcclountVisa />
            <VisaRecentHistoryTableData
              data={data[bookingEndPointUrls[3]] || []}
              currentPage={currentPages[3]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(3, page)}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-8">
            <DashboardAccountCar />
            <CarRecentHistoryTableData
              data={data[bookingEndPointUrls[4]] || []}
              currentPage={currentPages[4]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(4, page)}
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-8">
            <DashboardAccountHajj />
            <HajjUmrahRecentHistoryTableData
              data={data[bookingEndPointUrls[5]] || []}
              currentPage={currentPages[5]}
              totalPages={totalPages}
              onPageChange={(page: number) => handlePageChange(5, page)}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-5 rounded-md  bg-white dark:bg-darkPrimaryBg">
      <TabNavigation tabs={tabs} onTabChange={setActiveTab} />
      <div>{renderTabContent()}</div>
    </div>
  );
};

export default DashboardAccountWrapper;
