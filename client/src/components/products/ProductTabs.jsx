import { useState } from "react";

function ProductTabs({ product }) {
  const [activeTab, setActiveTab] = useState("description");

  const specifications = product?.specifications
    ? Object.entries(product.specifications)
    : [];

  const shipping = product?.shipping || {};

  return (
    <section className="hidden sm:block bg-white border border-gray-200 rounded-md mt-5">
      <div className="flex border-b border-gray-200">
        {["description", "reviews", "shipping"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-3 text-[15px] capitalize ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-5 text-[15px] text-gray-600">
        {activeTab === "description" && (
          <div className="space-y-4">
            <p>{product.description || "No description available."}</p>

            <div className="grid grid-cols-2 gap-3 max-w-[600px]">
              {specifications.length > 0 ? (
                specifications.map(([key, value]) => (
                  <div key={key} className="flex justify-between border-b py-2">
                    <span className="text-gray-500">{key}</span>
                    <span>{value}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Brand</span>
                    <span>{product.brand || "N/A"}</span>
                  </div>
                  <div className="flex justify-between border-b py-2">
                    <span className="text-gray-500">Stock</span>
                    <span>{product.stock || 0}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <p className="font-medium mb-3">Customer Reviews</p>
            <p>
              ⭐ {product.rating || 0} rating based on{" "}
              {product.reviewsCount || 0} reviews
            </p>
            <p className="mt-2 text-gray-500">
              Reviews system will be added after authentication.
            </p>
          </div>
        )}

        {activeTab === "shipping" && (
          <div className="space-y-2">
            <p>
              🚚{" "}
              {shipping.freeShipping
                ? "Free shipping available"
                : "Shipping available"}
            </p>
            <p>⏱ Delivery: {shipping.deliveryTime || "5-10 business days"}</p>
            <p>📦 Ships from: {shipping.shipsFrom || "Supplier warehouse"}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductTabs;