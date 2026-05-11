// client/src/pages/admin/AdminProductForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../../api/api";

const initialForm = {
  title: "",
  slug: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  oldPrice: "",
  discount: "",
  stock: "",
  imagesFiles: [],
  existingImages: [],
  isFeatured: false,
  isRecommended: false,
  isDeal: false,
  isHotOffer: false,
  isGiftBox: false,
  isNewArrival: false,
  isTopSelling: false,
  isActive: true,
  supplierName: "",
  supplierCountry: "",
  supplierVerified: true,
  freeShipping: true,
  deliveryTime: "5-10 days",
  shipsFrom: "",
};

function AdminProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(isEditMode);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get("/categories");
        setCategories(res.data.data || []);
      } catch (err) {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchProduct = async () => {
      try {
        setPageLoading(true);
        const res = await API.get(`/products/${id}`);
        const product = res.data.data;
        setFormData((prev) => ({
          ...prev,
          title: product.title || "",
          slug: product.slug || "",
          description: product.description || "",
          category: product.category?._id || product.category || "",
          brand: product.brand || "",
          price: product.price || "",
          oldPrice: product.oldPrice || "",
          discount: product.discount || "",
          stock: product.stock || "",
          existingImages: product.images || [],
          isFeatured: product.isFeatured || false,
          isRecommended: product.isRecommended || false,
          isDeal: product.isDeal || false,
          isHotOffer: product.isHotOffer || false,
          isGiftBox: product.isGiftBox || false,
          isNewArrival: product.isNewArrival || false,
          isTopSelling: product.isTopSelling || false,
          isActive: product.isActive !== false,
          supplierName: product.supplier?.name || "",
          supplierCountry: product.supplier?.country || "",
          supplierVerified: product.supplier?.verified !== false,
          freeShipping: product.shipping?.freeShipping !== false,
          deliveryTime: product.shipping?.deliveryTime || "5-10 days",
          shipsFrom: product.shipping?.shipsFrom || "",
        }));
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setPageLoading(false);
      }
    };
    fetchProduct();
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const removeSelectedFile = (index) => {
    setFormData((prev) => {
      const files = [...prev.imagesFiles];
      files.splice(index, 1);
      return { ...prev, imagesFiles: files };
    });
  };

  const removeExistingImage = (index) => {
    setFormData((prev) => {
      const imgs = [...prev.existingImages];
      imgs.splice(index, 1);
      return { ...prev, existingImages: imgs };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error("Please select category");
    try {
      setLoading(true);
      const payload = new FormData();
      [
        "title",
        "slug",
        "description",
        "category",
        "brand",
        "price",
        "oldPrice",
        "discount",
        "stock",
      ].forEach((f) => payload.append(f, formData[f] || ""));
      payload.append("supplierName", formData.supplierName || "");
      payload.append("supplierCountry", formData.supplierCountry || "");
      payload.append(
        "supplierVerified",
        formData.supplierVerified ? "true" : "false",
      );
      payload.append("freeShipping", formData.freeShipping ? "true" : "false");
      payload.append("deliveryTime", formData.deliveryTime || "5-10 days");
      payload.append("shipsFrom", formData.shipsFrom || "");
      [
        "isFeatured",
        "isRecommended",
        "isDeal",
        "isHotOffer",
        "isGiftBox",
        "isNewArrival",
        "isTopSelling",
        "isActive",
      ].forEach((f) => payload.append(f, formData[f] ? "true" : "false"));
      formData.imagesFiles.forEach((f) => payload.append("images", f));
      if (isEditMode && formData.existingImages.length)
        payload.append(
          "existingImages",
          JSON.stringify(formData.existingImages),
        );

      if (isEditMode) {
        await API.patch(`/products/${id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await API.post("/products", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product created successfully");
      }
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading)
    return (
      <div className="bg-white p-6 text-center text-gray-500 rounded shadow">
        Loading product...
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEditMode ? "Edit Product" : "Create Product"}
          </h1>
          <p className="text-gray-600 mt-1">
            Manage product details, pricing, supplier, and website placement
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/products")}
          className="text-gray-700 border border-gray-200 px-5 py-2 rounded-xl hover:bg-gray-100 transition"
        >
          Back to products
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6"
      >
        {/* Left Column: Text Inputs */}
        <section className="space-y-6 bg-white p-6 rounded-2xl shadow">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Product Title"
            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="Product Slug"
            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition"
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
          <input
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="w-full h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full min-h-[120px] px-4 py-3 rounded-2xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["price", "oldPrice", "discount", "stock"].map((f) => (
              <input
                key={f}
                name={f}
                value={formData[f]}
                onChange={handleChange}
                type="number"
                placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
                className="h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="supplierName"
              value={formData.supplierName}
              onChange={handleChange}
              placeholder="Supplier Name"
              className="h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <input
              name="supplierCountry"
              value={formData.supplierCountry}
              onChange={handleChange}
              placeholder="Supplier Country"
              className="h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <input
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
              placeholder="Delivery Time"
              className="h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <input
              name="shipsFrom"
              value={formData.shipsFrom}
              onChange={handleChange}
              placeholder="Ships From"
              className="h-14 px-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="supplierVerified"
                checked={formData.supplierVerified}
                onChange={handleChange}
                className="accent-blue-500"
              />{" "}
              Verified Supplier
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="freeShipping"
                checked={formData.freeShipping}
                onChange={handleChange}
                className="accent-blue-500"
              />{" "}
              Free Shipping
            </label>
          </div>
        </section>

        {/* Right Column: Modernized Toggles + File Upload + Thumbnails + Buttons */}
        <aside className="flex flex-col h-full space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-xl transition flex flex-col h-full">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
              Website Placement
            </h2>
            <div className="space-y-3">
              {[
                ["isFeatured", "Featured Products"],
                ["isRecommended", "Recommended Items"],
                ["isDeal", "Deals & Offers"],
                ["isHotOffer", "Hot Offers"],
                ["isGiftBox", "Gift Boxes"],
                ["isNewArrival", "New Arrivals"],
                ["isTopSelling", "Top Selling"],
                ["isActive", "Active / Visible"],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="flex items-center justify-between cursor-pointer transition hover:bg-gray-50 rounded-lg px-3 py-1"
                >
                  <span className="text-gray-700 font-medium">{label}</span>
                  <input
                    type="checkbox"
                    name={name}
                    checked={formData[name]}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 relative transition-all">
                    <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></span>
                  </div>
                </label>
              ))}
            </div>

            {/* File Upload */}
            <div className="mt-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Choose Images
              </label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => {
                  const files = Array.from(e.target.files);
                  if (files.length + formData.existingImages.length > 4)
                    return toast.error("Max 4 images allowed");
                  setFormData((prev) => ({ ...prev, imagesFiles: files }));
                }}
                className="w-full rounded-lg border border-gray-300 p-1 hover:border-blue-400 transition"
              />

              <div className="flex gap-2 flex-wrap mt-3">
                {formData.existingImages.map((url, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden border hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={url}
                      alt="existing"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {formData.imagesFiles.map((file, idx) => (
                  <div
                    key={idx}
                    className="relative w-24 h-24 rounded-2xl overflow-hidden border hover:shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-auto space-y-3">
              <button
                disabled={loading}
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:scale-105 transform transition shadow-lg hover:shadow-xl"
              >
                {loading
                  ? "Saving..."
                  : isEditMode
                    ? "Update Product"
                    : "Create Product"}
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="w-full py-3 rounded-2xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </aside>
      </form>
    </div>
  );
}

export default AdminProductForm;
