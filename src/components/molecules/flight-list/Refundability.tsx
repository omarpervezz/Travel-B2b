import React, { useState } from "react";
import CardTitle from "@/components/atoms/CardTitle";
import { RefundabilityIcon } from "@/components/atoms";
import { Button } from "@/components/atoms/Button";
import { ChevronDown } from "lucide-react";

interface RefundabilityProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const Refundability: React.FC<RefundabilityProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const [isHideElement, isSetHideElement] = useState<boolean>(true);

  const hideFilterInfo = () => {
    isSetHideElement((prev) => !prev);
  };

  return (
    <div className="space-y-2 bg-[#FFFFFF] shadow-light-shadow rounded-md">
      <div
        className={`flex items-center justify-between px-3 py-3 ${
          isHideElement && "border-b"
        }`}
      >
        <div className="flex items-center gap-2">
          <RefundabilityIcon />
          <CardTitle className="text-sm text-black font-semibold">
            Refundability
          </CardTitle>
        </div>
        <div className=" flex items-center">
          <Button onClick={hideFilterInfo}>
            <ChevronDown
              className={`${isHideElement ? "rotate-180" : "rotate-0"}`}
            />
          </Button>
        </div>
      </div>
      {isHideElement && (
        <div className="px-4 py-3 space-y-3">
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="refundable"
                value="Refundable"
                checked={selectedType === "Refundable"}
                onChange={() => onTypeChange("Refundable")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-800 text-sm">Refundable</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="non-refundable"
                value="Non-Refundable"
                checked={selectedType === "Non-Refundable"}
                onChange={() => onTypeChange("Non-Refundable")}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-800 text-sm">Non-Refundable</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Refundability;
