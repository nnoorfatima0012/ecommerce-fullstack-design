import {
  CheckCircle,
  Circle,
  Clock,
  PackageCheck,
  Truck,
  XCircle,
} from "lucide-react";

const normalSteps = [
  {
    key: "pending",
    label: "Order placed",
    description: "Your order has been received",
    icon: Clock,
  },
  {
    key: "confirmed",
    label: "Confirmed",
    description: "Your order has been confirmed",
    icon: CheckCircle,
  },
  {
    key: "processing",
    label: "Processing",
    description: "Your items are being prepared",
    icon: PackageCheck,
  },
  {
    key: "shipped",
    label: "Shipped",
    description: "Your order is on the way",
    icon: Truck,
  },
  {
    key: "delivered",
    label: "Delivered",
    description: "Order delivered successfully",
    icon: CheckCircle,
  },
];

const statusIndexMap = {
  pending: 0,
  confirmed: 1,
  processing: 2,
  shipped: 3,
  delivered: 4,
};

function OrderStatusTimeline({ status = "pending" }) {
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="bg-red-50 border border-red-100 rounded-md p-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
            <XCircle size={20} />
          </div>

          <div>
            <h3 className="font-semibold text-red-700">Order cancelled</h3>
            <p className="text-sm text-red-600 mt-1">
              This order has been cancelled. Please contact support if you need
              more information.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentIndex = statusIndexMap[status] ?? 0;

  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <h3 className="font-semibold text-gray-900 mb-4">Order progress</h3>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
        {normalSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div key={step.key} className="relative">
              {index !== normalSteps.length - 1 && (
                <div
                  className={`hidden sm:block absolute top-[18px] left-[36px] right-[-18px] h-[2px] ${
                    index < currentIndex ? "bg-green-500" : "bg-gray-200"
                  }`}
                />
              )}

              <div className="relative flex sm:flex-col items-start sm:items-center gap-3 sm:gap-2">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center z-10 ${
                    isCompleted
                      ? "bg-green-100 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {isCompleted ? <Icon size={20} /> : <Circle size={18} />}
                </div>

                <div className="sm:text-center">
                  <p
                    className={`text-sm font-medium ${
                      isCurrent
                        ? "text-blue-600"
                        : isCompleted
                          ? "text-gray-900"
                          : "text-gray-400"
                    }`}
                  >
                    {step.label}
                  </p>

                  <p
                    className={`text-xs mt-1 ${
                      isCompleted ? "text-gray-500" : "text-gray-400"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default OrderStatusTimeline;