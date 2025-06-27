import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CreditCard,
  QrCode,
  Check,
  AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TicketType {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionEn: string;
}

interface Station {
  id: string;
  name: string;
  nameEn: string;
}

interface PaymentMethod {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const ticketTypes: TicketType[] = [
  {
    id: "single-trip",
    name: "Vé một lượt",
    nameEn: "Single Trip",
    price: 15000,
    description: "Sử dụng cho một lượt đi từ ga xuất phát đến ga đích",
    descriptionEn:
      "Valid for a single journey from origin to destination station",
  },
  {
    id: "daily",
    name: "Vé ngày",
    nameEn: "Daily Pass",
    price: 40000,
    description: "Không giới hạn số lượt đi trong ngày",
    descriptionEn: "Unlimited rides for one day",
  },
  {
    id: "3-day",
    name: "Vé 3 ngày",
    nameEn: "3-Day Pass",
    price: 90000,
    description: "Không giới hạn số lượt đi trong 3 ngày liên tiếp",
    descriptionEn: "Unlimited rides for three consecutive days",
  },
  {
    id: "monthly",
    name: "Vé tháng",
    nameEn: "Monthly Pass",
    price: 300000,
    description: "Không giới hạn số lượt đi trong 30 ngày",
    descriptionEn: "Unlimited rides for 30 days",
  },
];

const stations: Station[] = [
  { id: "ben-thanh", name: "Bến Thành", nameEn: "Ben Thanh" },
  { id: "ba-son", name: "Ba Son", nameEn: "Ba Son" },
  { id: "van-thanh", name: "Văn Thánh", nameEn: "Van Thanh" },
  { id: "tan-cang", name: "Tân Cảng", nameEn: "Tan Cang" },
  { id: "thao-dien", name: "Thảo Điền", nameEn: "Thao Dien" },
  { id: "an-phu", name: "An Phú", nameEn: "An Phu" },
  { id: "rach-chiec", name: "Rạch Chiếc", nameEn: "Rach Chiec" },
  { id: "phuoc-long", name: "Phước Long", nameEn: "Phuoc Long" },
  { id: "binh-thai", name: "Bình Thái", nameEn: "Binh Thai" },
  { id: "thu-duc", name: "Thủ Đức", nameEn: "Thu Duc" },
  { id: "high-tech-park", name: "Khu Công Nghệ Cao", nameEn: "High Tech Park" },
  { id: "suoi-tien", name: "Suối Tiên", nameEn: "Suoi Tien" },
  {
    id: "suoi-tien-terminal",
    name: "Bến xe Suối Tiên",
    nameEn: "Suoi Tien Terminal",
  },
  { id: "depot", name: "Depot", nameEn: "Depot" },
];

const paymentMethods: PaymentMethod[] = [
  { id: "napas", name: "Napas", icon: <CreditCard className="h-5 w-5" /> },
  { id: "visa", name: "Visa", icon: <CreditCard className="h-5 w-5" /> },
  { id: "momo", name: "MoMo", icon: <QrCode className="h-5 w-5" /> },
];

interface TicketPurchaseFlowProps {
  isEnglish?: boolean;
  onComplete?: (purchaseData: any) => void;
}

const TicketPurchaseFlow: React.FC<TicketPurchaseFlowProps> = ({
  isEnglish = false,
  onComplete = () => {},
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [originStation, setOriginStation] = useState<string>("");
  const [destinationStation, setDestinationStation] = useState<string>("");
  const [cccdNumber, setCccdNumber] = useState<string>("");
  const [discountApplied, setDiscountApplied] = useState<boolean>(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [purchaseComplete, setPurchaseComplete] = useState<boolean>(false);

  const getSteps = () => {
    const baseSteps = [isEnglish ? "Select Ticket Type" : "Chọn Loại Vé"];

    // Only add station selection for single-trip tickets
    if (selectedTicketType === "single-trip") {
      baseSteps.push(isEnglish ? "Select Stations" : "Chọn Ga");
    }

    baseSteps.push(
      isEnglish ? "Payment" : "Thanh Toán",
      isEnglish ? "Confirmation" : "Xác Nhận",
    );

    return baseSteps;
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      // Skip station selection for non-single-trip tickets
      if (selectedTicketType !== "single-trip" && currentStep === 0) {
        setCurrentStep(currentStep + 2); // Skip to discount step
      } else {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // Skip station selection when going back for non-single-trip tickets
      if (selectedTicketType !== "single-trip" && currentStep === 2) {
        setCurrentStep(currentStep - 2); // Skip back to ticket type step
      } else {
        setCurrentStep(currentStep - 1);
      }
    }
  };

  const handleTicketTypeSelect = (ticketId: string) => {
    setSelectedTicketType(ticketId);
    // Reset station selection when changing ticket type
    if (ticketId !== "single-trip") {
      setOriginStation("");
      setDestinationStation("");
    }
  };

  const handleStationSelect = (
    type: "origin" | "destination",
    stationId: string,
  ) => {
    if (type === "origin") {
      setOriginStation(stationId);
    } else {
      setDestinationStation(stationId);
    }
  };

  const handleCccdSubmit = () => {
    // In a real app, this would validate the CCCD with a backend service
    if (cccdNumber.length === 12) {
      setDiscountApplied(true);
    }
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
  };

  const handlePaymentSubmit = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setPurchaseComplete(true);
      onComplete({
        ticketType: selectedTicketType,
        originStation,
        destinationStation,
        discountApplied,
        paymentMethod: selectedPaymentMethod,
        timestamp: new Date().toISOString(),
      });
    }, 2000);
  };

  const calculateFare = () => {
    const selectedTicket = ticketTypes.find(
      (ticket) => ticket.id === selectedTicketType,
    );
    if (!selectedTicket) return 0;

    return selectedTicket.price;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace("₫", "VND");
  };

  const renderStepContent = () => {
    const currentStepName = steps[currentStep];

    switch (currentStepName) {
      case isEnglish ? "Select Ticket Type" : "Chọn Loại Vé":
        // Ticket Type Selection
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ticketTypes.map((ticket) => (
                <Card
                  key={ticket.id}
                  className={`cursor-pointer transition-all ${selectedTicketType === ticket.id ? "border-primary ring-2 ring-primary" : "hover:border-primary/50"}`}
                  onClick={() => handleTicketTypeSelect(ticket.id)}
                >
                  <CardHeader>
                    <CardTitle>
                      {isEnglish ? ticket.nameEn : ticket.name}
                    </CardTitle>
                    <CardDescription>
                      {formatCurrency(ticket.price)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {isEnglish ? ticket.descriptionEn : ticket.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case isEnglish ? "Select Stations" : "Chọn Ga":
        // Station Selection (only for single-trip tickets)
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="origin">
                  {isEnglish ? "Origin Station" : "Ga Xuất Phát"}
                </Label>
                <select
                  id="origin"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={originStation}
                  onChange={(e) =>
                    handleStationSelect("origin", e.target.value)
                  }
                >
                  <option value="">
                    {isEnglish ? "Select origin station" : "Chọn ga xuất phát"}
                  </option>
                  {stations.map((station) => (
                    <option key={station.id} value={station.id}>
                      {isEnglish ? station.nameEn : station.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="destination">
                  {isEnglish ? "Destination Station" : "Ga Đích"}
                </Label>
                <select
                  id="destination"
                  className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={destinationStation}
                  onChange={(e) =>
                    handleStationSelect("destination", e.target.value)
                  }
                  disabled={originStation === ""}
                >
                  <option value="">
                    {isEnglish ? "Select destination station" : "Chọn ga đích"}
                  </option>
                  {stations
                    .filter((station) => station.id !== originStation)
                    .map((station) => (
                      <option key={station.id} value={station.id}>
                        {isEnglish ? station.nameEn : station.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {originStation && destinationStation && (
              <div className="rounded-lg bg-muted p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">
                      {isEnglish
                        ? stations.find((s) => s.id === originStation)?.nameEn
                        : stations.find((s) => s.id === originStation)?.name}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">
                      {isEnglish
                        ? stations.find((s) => s.id === destinationStation)
                            ?.nameEn
                        : stations.find((s) => s.id === destinationStation)
                            ?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case isEnglish ? "Payment" : "Thanh Toán":
        // Payment
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-4">
                {isEnglish
                  ? "Select Payment Method"
                  : "Chọn Phương Thức Thanh Toán"}
              </h3>

              <RadioGroup
                value={selectedPaymentMethod}
                onValueChange={handlePaymentMethodSelect}
                className="space-y-3"
              >
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={method.id} id={method.id} />
                    <Label
                      htmlFor={method.id}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      {method.icon}
                      <span>{method.name}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {selectedPaymentMethod && (
              <div className="rounded-lg border p-4">
                <h3 className="font-medium mb-2">
                  {isEnglish ? "Payment Summary" : "Tóm Tắt Thanh Toán"}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>{isEnglish ? "Ticket Type" : "Loại Vé"}</span>
                    <span>
                      {isEnglish
                        ? ticketTypes.find((t) => t.id === selectedTicketType)
                            ?.nameEn
                        : ticketTypes.find((t) => t.id === selectedTicketType)
                            ?.name}
                    </span>
                  </div>
                  {discountApplied && selectedTicketType === "monthly" && (
                    <div className="flex justify-between text-green-600">
                      <span>
                        {isEnglish ? "Student Discount" : "Giảm Giá Sinh Viên"}
                      </span>
                      <span>-50%</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>{isEnglish ? "Total" : "Tổng Cộng"}</span>
                    <span>{formatCurrency(calculateFare())}</span>
                  </div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="space-y-2">
                <Progress value={45} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">
                  {isEnglish
                    ? "Processing payment..."
                    : "Đang xử lý thanh toán..."}
                </p>
              </div>
            )}
          </div>
        );
      case isEnglish ? "Confirmation" : "Xác Nhận":
        // Confirmation
        return (
          <div className="space-y-6 text-center">
            <div className="mx-auto rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center">
              <Check className="h-8 w-8 text-green-600" />
            </div>

            <div>
              <h3 className="text-xl font-semibold">
                {isEnglish ? "Purchase Complete!" : "Mua Vé Thành Công!"}
              </h3>
              <p className="text-muted-foreground mt-1">
                {isEnglish
                  ? "Your ticket has been added to your account"
                  : "Vé của bạn đã được thêm vào tài khoản"}
              </p>
            </div>

            <div className="rounded-lg border p-6 max-w-md mx-auto">
              <div className="mb-4">
                <div className="bg-black p-2 rounded-lg mx-auto w-48 h-48 flex items-center justify-center mb-4">
                  <div className="bg-white p-2 rounded">
                    <QrCode className="h-32 w-32" />
                  </div>
                </div>
                <Badge className="mx-auto">
                  {isEnglish
                    ? ticketTypes.find((t) => t.id === selectedTicketType)
                        ?.nameEn
                    : ticketTypes.find((t) => t.id === selectedTicketType)
                        ?.name}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                {selectedTicketType === "single-trip" &&
                  originStation &&
                  destinationStation && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        {isEnglish ? "Route" : "Tuyến Đường"}
                      </span>
                      <span className="font-medium">
                        {isEnglish
                          ? `${stations.find((s) => s.id === originStation)?.nameEn} → ${stations.find((s) => s.id === destinationStation)?.nameEn}`
                          : `${stations.find((s) => s.id === originStation)?.name} → ${stations.find((s) => s.id === destinationStation)?.name}`}
                      </span>
                    </div>
                  )}
                {selectedTicketType !== "single-trip" && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">
                      {isEnglish ? "Coverage" : "Phạm Vi"}
                    </span>
                    <span className="font-medium">
                      {isEnglish ? "All stations" : "Tất cả các ga"}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isEnglish ? "Price" : "Giá Vé"}
                  </span>
                  <span className="font-medium">
                    {formatCurrency(calculateFare())}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                    {isEnglish ? "Transaction ID" : "Mã Giao Dịch"}
                  </span>
                  <span className="font-medium">
                    METRO-
                    {Math.random().toString(36).substring(2, 10).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  // Reset the flow
                  setCurrentStep(0);
                  setSelectedTicketType("");
                  setOriginStation("");
                  setDestinationStation("");
                  setCccdNumber("");
                  setDiscountApplied(false);
                  setSelectedPaymentMethod("");
                  setPurchaseComplete(false);
                }}
              >
                {isEnglish ? "Buy Another Ticket" : "Mua Vé Khác"}
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-sm border">
      {/* Progress bar and steps */}
      <div className="p-4 border-b">
        <div className="mb-2">
          <Progress
            value={(currentStep / (steps.length - 1)) * 100}
            className="h-2"
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`${index <= currentStep ? "text-primary font-medium" : ""}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderStepContent()}
        </motion.div>
      </div>

      {/* Footer with navigation buttons */}
      <div className="p-4 border-t flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          {isEnglish ? "Back" : "Quay Lại"}
        </Button>

        {currentStep < steps.length - 1 ? (
          <Button
            onClick={handleNext}
            disabled={
              (steps[currentStep] ===
                (isEnglish ? "Select Ticket Type" : "Chọn Loại Vé") &&
                !selectedTicketType) ||
              (steps[currentStep] ===
                (isEnglish ? "Select Stations" : "Chọn Ga") &&
                (!originStation || !destinationStation)) ||
              (steps[currentStep] === (isEnglish ? "Payment" : "Thanh Toán") &&
                (!selectedPaymentMethod || isProcessing))
            }
          >
            {isEnglish ? "Continue" : "Tiếp Tục"}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : steps[currentStep] === (isEnglish ? "Payment" : "Thanh Toán") ? (
          <Button
            onClick={handlePaymentSubmit}
            disabled={!selectedPaymentMethod || isProcessing}
          >
            {isEnglish ? "Complete Purchase" : "Hoàn Tất Mua Vé"}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default TicketPurchaseFlow;
