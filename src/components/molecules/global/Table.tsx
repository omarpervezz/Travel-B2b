import React, { useState, useEffect } from "react";
import ReusableButton from "@/components/molecules/global/ReusableButton";
import Image from "next/image";

type CellType = "button" | "text" | "checkbox" | "image" | "select";

export interface ColumnConfig {
  key: string;
  type: CellType;
  label: string;
  buttonProps?: {
    labelKey: string;
    onClick: (row: string) => void;
    className: string;
  };
  selectOptions?: string[]; // For dropdown options
  onSelectChange?: (row: string, value: string) => void; // Callback for when the value changes
}

interface ReusableTableProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  columns: ColumnConfig[];
}

const Table: React.FC<ReusableTableProps> = ({ data, columns }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<null | string>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    const target = event.target as HTMLElement;
    if (!target.closest(".dropdown-container")) {
      setIsDropdownOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "booked":
        return "text-[#20B038]";
      case "hold":
        return "text-yellow-400";
      case "cancelled":
        return "text-red-700";
      default:
        return "text-gray-700";
    }
  };

  return (
    <div>
      <table className="min-w-full table-auto border-collapse border">
        <thead>
          <tr className="bg-[#D8ECFD]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="p-4 text-start text-sm font-semibold text-[#1768D0]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row-${row.id || rowIndex}`} className="">
              {columns.map((column) => (
                <td
                  key={`row-${row.id || rowIndex}-col-${column.key}`}
                  className={`border-b px-4 py-2 font-normal text-sm ${
                    column.key === "status" && row[column.key]
                      ? getStatusColor(row[column.key])
                      : "text-[#243045]"
                  }`}
                >
                  {column.type === "text" && <span>{row[column.key]}</span>}
                  {column.type === "button" && column.buttonProps && (
                    <ReusableButton
                      label={row[column.buttonProps.labelKey]}
                      onClick={() => column.buttonProps?.onClick(row)}
                      className={column.buttonProps.className}
                    />
                  )}
                  {column.type === "checkbox" && (
                    <input type="checkbox" checked={row[column.key]} readOnly />
                  )}
                  {column.type === "image" && (
                    <Image
                      src={row[column.key]}
                      alt="Image"
                      width={16}
                      height={16}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                  {column.type === "select" && column.selectOptions && (
                    <div
                      className="relative inline-block dropdown-container"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div
                        className="bg-[#D8ECFD] text-[#1768D0] p-2 rounded cursor-pointer"
                        onClick={() =>
                          setIsDropdownOpen(
                            isDropdownOpen === `${rowIndex}-${column.key}`
                              ? null
                              : `${rowIndex}-${column.key}`
                          )
                        }
                      >
                        {row[column.key] || "Select Action"}
                      </div>
                      {isDropdownOpen === `${rowIndex}-${column.key}` && (
                        <ul className="absolute left-0 max-w-[250px] bg-white border border-gray-300 rounded mt-1 shadow-md z-10 animate-slide-down">
                          {column.selectOptions.map((option, index) => (
                            <li
                              key={`${row.id || rowIndex}-opt-${index}`}
                              className="px-4 w-full py-2 transition-all duration-200 hover:bg-[#D8ECFD] hover:text-[#1768D0] cursor-pointer"
                              onClick={() => {
                                column.onSelectChange?.(row, option); // Trigger callback
                                row[column.key] = option; // Update value
                                setIsDropdownOpen(null); // Close dropdown
                              }}
                            >
                              {option}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
