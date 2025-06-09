import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Info, MapPin } from "lucide-react";

interface Station {
  id: number;
  name: string;
  nameEn: string;
  code: string;
  distance: number; // distance from start in km
  isTransfer: boolean;
  info?: string;
}

interface StationSelectorProps {
  onOriginSelect?: (station: Station) => void;
  onDestinationSelect?: (station: Station) => void;
  selectedOrigin?: Station | null;
  selectedDestination?: Station | null;
  language?: "vi" | "en";
  disabled?: boolean;
}

const StationSelector: React.FC<StationSelectorProps> = ({
  onOriginSelect = () => {},
  onDestinationSelect = () => {},
  selectedOrigin = null,
  selectedDestination = null,
  language = "vi",
  disabled = false,
}) => {
  // Metro Line 1 stations data
  const stations: Station[] = [
    {
      id: 1,
      name: "Bến Thành",
      nameEn: "Ben Thanh",
      code: "BT",
      distance: 0,
      isTransfer: true,
      info: "Trạm trung tâm kết nối Quận 1",
    },
    {
      id: 2,
      name: "Nhà hát TP",
      nameEn: "Opera House",
      code: "OH",
      distance: 0.9,
      isTransfer: false,
    },
    {
      id: 3,
      name: "Ba Son",
      nameEn: "Ba Son",
      code: "BS",
      distance: 1.8,
      isTransfer: false,
    },
    {
      id: 4,
      name: "Văn Thánh",
      nameEn: "Van Thanh",
      code: "VT",
      distance: 3.5,
      isTransfer: false,
    },
    {
      id: 5,
      name: "Tân Cảng",
      nameEn: "Tan Cang",
      code: "TC",
      distance: 5.3,
      isTransfer: false,
    },
    {
      id: 6,
      name: "Thảo Điền",
      nameEn: "Thao Dien",
      code: "TD",
      distance: 6.7,
      isTransfer: false,
    },
    {
      id: 7,
      name: "An Phú",
      nameEn: "An Phu",
      code: "AP",
      distance: 8.4,
      isTransfer: false,
    },
    {
      id: 8,
      name: "Rạch Chiếc",
      nameEn: "Rach Chiec",
      code: "RC",
      distance: 10.5,
      isTransfer: false,
    },
    {
      id: 9,
      name: "Phước Long",
      nameEn: "Phuoc Long",
      code: "PL",
      distance: 12.1,
      isTransfer: false,
    },
    {
      id: 10,
      name: "Bình Thái",
      nameEn: "Binh Thai",
      code: "BT2",
      distance: 14.1,
      isTransfer: false,
    },
    {
      id: 11,
      name: "Thủ Đức",
      nameEn: "Thu Duc",
      code: "TD2",
      distance: 16.2,
      isTransfer: false,
    },
    {
      id: 12,
      name: "Khu Công nghệ cao",
      nameEn: "High-Tech Park",
      code: "HTP",
      distance: 17.5,
      isTransfer: false,
    },
    {
      id: 13,
      name: "Suối Tiên",
      nameEn: "Suoi Tien",
      code: "ST",
      distance: 18.9,
      isTransfer: true,
      info: "Gần công viên Suối Tiên",
    },
    {
      id: 14,
      name: "Bến xe Suối Tiên",
      nameEn: "Suoi Tien Terminal",
      code: "STT",
      distance: 19.7,
      isTransfer: false,
    },
  ];

  const [selectionMode, setSelectionMode] = useState<"origin" | "destination">(
    "origin",
  );

  // Calculate fare based on distance between stations
  const calculateFare = (
    origin: Station | null,
    destination: Station | null,
  ): number => {
    if (!origin || !destination) return 0;

    const distance = Math.abs(destination.distance - origin.distance);

    // Basic fare calculation logic
    if (distance <= 4) return 6000;
    if (distance <= 8) return 10000;
    if (distance <= 12) return 15000;
    return 20000;
  };

  const fare = calculateFare(selectedOrigin, selectedDestination);

  const handleStationClick = (station: Station) => {
    if (disabled) return;

    if (selectionMode === "origin") {
      onOriginSelect(station);
      setSelectionMode("destination");
    } else {
      onDestinationSelect(station);
      setSelectionMode("origin");
    }
  };

  const getStationName = (station: Station) => {
    return language === "vi" ? station.name : station.nameEn;
  };

  return (
    <Card className="w-full bg-white shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">
                {language === "vi" ? "Chọn trạm" : "Select Stations"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {language === "vi"
                  ? `Đang chọn: ${selectionMode === "origin" ? "Trạm đi" : "Trạm đến"}`
                  : `Selecting: ${selectionMode === "origin" ? "Origin" : "Destination"}`}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={selectionMode === "origin" ? "default" : "outline"}
                onClick={() => setSelectionMode("origin")}
                className="text-sm"
              >
                {language === "vi" ? "Trạm đi" : "Origin"}
              </Button>
              <Button
                variant={
                  selectionMode === "destination" ? "default" : "outline"
                }
                onClick={() => setSelectionMode("destination")}
                className="text-sm"
              >
                {language === "vi" ? "Trạm đến" : "Destination"}
              </Button>
            </div>
          </div>

          {/* Selected stations display */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/20 rounded-md">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">
                {language === "vi" ? "Trạm đi" : "Origin"}
              </span>
              <span className="font-medium">
                {selectedOrigin
                  ? getStationName(selectedOrigin)
                  : language === "vi"
                    ? "Chưa chọn"
                    : "Not selected"}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground mb-1">
                {language === "vi" ? "Trạm đến" : "Destination"}
              </span>
              <span className="font-medium">
                {selectedDestination
                  ? getStationName(selectedDestination)
                  : language === "vi"
                    ? "Chưa chọn"
                    : "Not selected"}
              </span>
            </div>
          </div>

          {/* Metro line visualization */}
          <div className="relative mt-6">
            {/* Line */}
            <div className="absolute left-4 top-6 bottom-6 w-1 bg-blue-500 z-0"></div>

            {/* Stations */}
            <div className="flex flex-col space-y-8">
              {stations.map((station) => (
                <div
                  key={station.id}
                  className="flex items-center relative z-10"
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={() => handleStationClick(station)}
                          className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${station.isTransfer ? "border-blue-600 bg-blue-100" : "border-blue-500 bg-white"} ${selectedOrigin?.id === station.id || selectedDestination?.id === station.id ? "ring-2 ring-blue-600 ring-offset-2" : ""}`}
                          disabled={disabled}
                        >
                          <MapPin size={16} className="text-blue-600" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <div className="text-xs">
                          <p className="font-bold">
                            {getStationName(station)} ({station.code})
                          </p>
                          {station.info && <p>{station.info}</p>}
                          <p>
                            {language === "vi" ? "Khoảng cách" : "Distance"}:{" "}
                            {station.distance} km
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <div className="ml-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {getStationName(station)}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        ({station.code})
                      </span>
                      {station.isTransfer && (
                        <Badge variant="outline" className="text-xs">
                          {language === "vi" ? "Trạm chuyển tuyến" : "Transfer"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fare display */}
          {selectedOrigin && selectedDestination && (
            <div className="mt-4 p-4 bg-blue-50 rounded-md border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info size={16} className="text-blue-600" />
                  <span className="font-medium">
                    {language === "vi" ? "Giá vé" : "Fare"}
                  </span>
                </div>
                <span className="font-bold text-lg">
                  {fare.toLocaleString("vi-VN")} VND
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "vi"
                  ? `Khoảng cách: ${Math.abs(selectedDestination.distance - selectedOrigin.distance).toFixed(1)} km`
                  : `Distance: ${Math.abs(selectedDestination.distance - selectedOrigin.distance).toFixed(1)} km`}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StationSelector;
