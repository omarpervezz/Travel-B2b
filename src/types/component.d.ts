import { BookingDataType } from "@/hooks/api/v1/useFetchData";
interface ActionButtonType {
  label: React.ReactNode;
  onClick: () => void;
  icon: React.ReactNode;
  className: string;
}
export interface BookingPropsType {
  data: BookingDataType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  actionButton?: ActionButtonType[];
}
