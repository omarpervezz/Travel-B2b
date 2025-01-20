/* eslint-disable @typescript-eslint/no-explicit-any */
import useSWR from "swr";
export interface BookingDataType {
  id: number;
  issueDate: string;
  bookingDate: string;
  bookingID: string;
  passengerName: string;
  flightDate: string;
  route: string;
  ticketNumber: string;
  totalPrice: string;
  status: string;
  actionPrimaryLabel: string;
}

export const usePaginatedFetchData = (
  apiUrls: string[],
  activeTab: number,
  currentPage: number,
  limit: number
) => {
  const fetcher = (url: string) =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    });

  const url = `${apiUrls[activeTab]}?page=${currentPage}&limit=${limit}`;

  const { data, error } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  // Return the data indexed by the API URL
  const indexedData = {
    [apiUrls[activeTab]]: data?.data || [],
  };

  return {
    data: indexedData,
    totalPages: data?.totalPages || 1,
    isLoading: !error && !data,
    error: error?.message || null,
  };
};
