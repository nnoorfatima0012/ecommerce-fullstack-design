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
  images: "",
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
    const fetchProduct = async () => {
      if (!isEditMode) return;

      try {
        setPageLoading(true);

        const res = await API.get(`/products/${id}`);
        const product = res.data.data;

        setFormData({
          title: product.title || "",
          slug: product.slug || "",
          description: product.description || "",
          category: product.category?._id || product.category || "",
          brand: product.brand || "",
          price: product.price || "",
          oldPrice: product.oldPrice || "",
          discount: product.discount || "",
          stock: product.stock || "",
          images: product.images?.join(", ") || "",
          isFeatured: Boolean(product.isFeatured),
          isRecommended: Boolean(product.isRecommended),
          isDeal: Boolean(product.isDeal),
          isHotOffer: Boolean(product.isHotOffer),
          isGiftBox: Boolean(product.isGiftBox),
          isNewArrival: Boolean(product.isNewArrival),
          isTopSelling: Boolean(product.isTopSelling),
          isActive: product.isActive !== false,
          supplierName: product.supplier?.name || "",
          supplierCountry: product.supplier?.country || "",
          supplierVerified: product.supplier?.verified !== false,
          freeShipping: product.shipping?.freeShipping !== false,
          deliveryTime: product.shipping?.deliveryTime || "5-10 days",
          shipsFrom: product.shipping?.shipsFrom || "",
        });
      } catch (err) {
        toast.error("Failed to load product");
      } finally {
        setPageLoading(false);
      }
    };

    fetchProduct();
  }, [id, isEditMode]);

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };

      if (name === "title" && !isEditMode) {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const buildPayload = () => {
    return {
      title: formData.title,
      slug: formData.slug,
      description: formData.description,
      category: formData.category,
      brand: formData.brand,
      price: Number(formData.price),
      oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
      discount: formData.discount ? Number(formData.discount) : 0,
      stock: formData.stock ? Number(formData.stock) : 0,
      images: formData.images
        .split(",")
        .map((img) => img.trim())
        .filter(Boolean),
      isFeatured: formData.isFeatured,
      isRecommended: formData.isRecommended,
      isDeal: formData.isDeal,
      isHotOffer: formData.isHotOffer,
      isGiftBox: formData.isGiftBox,
      isNewArrival: formData.isNewArrival,
      isTopSelling: formData.isTopSelling,
      isActive: formData.isActive,
      supplier: {
        name: formData.supplierName,
        country: formData.supplierCountry,
        verified: formData.supplierVerified,
      },
      shipping: {
        freeShipping: formData.freeShipping,
        deliveryTime: formData.deliveryTime,
        shipsFrom: formData.shipsFrom,
      },
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.category) {
      toast.error("Please select category");
      return;
    }

    try {
      setLoading(true);

      const payload = buildPayload();

      if (isEditMode) {
        await API.patch(`/products/${id}`, payload);
        toast.success("Product updated successfully");
      } else {
        await API.post("/products", payload);
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <div className="bg-white border-b">
        <div className="max-w-[1180px] mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-gray-900">
              {isEditMode ? "Edit Product" : "Create Product"}
            </h1>
            <p className="text-sm text-gray-500">
              Manage product details, pricing, supplier, and website placement
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products")}
            className="border border-gray-200 px-4 py-2 rounded-md text-gray-700"
          >
            Back to products
          </button>
        </div>
      </div>

      <main className="max-w-[1180px] mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5">
          <section className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Basic information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Product title"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  required
                  placeholder="product-slug"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none bg-white"
                >
                  <option value="">Select category</option>
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
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Description"
                  className="md:col-span-2 border border-gray-200 rounded-md min-h-[110px] px-3 py-2 outline-none"
                />

                <input
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  placeholder="Image URLs separated by comma"
                  className="md:col-span-2 border border-gray-200 rounded-md h-11 px-3 outline-none"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Pricing & stock</h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  type="number"
                  placeholder="Price"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="oldPrice"
                  value={formData.oldPrice}
                  onChange={handleChange}
                  type="number"
                  placeholder="Old price"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  type="number"
                  placeholder="Discount %"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  type="number"
                  placeholder="Stock"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Supplier & shipping</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  name="supplierName"
                  value={formData.supplierName}
                  onChange={handleChange}
                  placeholder="Supplier name"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="supplierCountry"
                  value={formData.supplierCountry}
                  onChange={handleChange}
                  placeholder="Supplier country"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleChange}
                  placeholder="Delivery time e.g. 5-10 days"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <input
                  name="shipsFrom"
                  value={formData.shipsFrom}
                  onChange={handleChange}
                  placeholder="Ships from"
                  className="border border-gray-200 rounded-md h-11 px-3 outline-none"
                />

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="supplierVerified"
                    checked={formData.supplierVerified}
                    onChange={handleChange}
                  />
                  Verified supplier
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="freeShipping"
                    checked={formData.freeShipping}
                    onChange={handleChange}
                  />
                  Free shipping
                </label>
              </div>
            </div>
          </section>

          <aside className="space-y-5">
            <div className="bg-white border border-gray-200 rounded-md p-5">
              <h2 className="font-semibold text-gray-900 mb-4">Website placement</h2>

              <div className="space-y-3">
                {[
                  ["isFeatured", "Featured products"],
                  ["isRecommended", "Recommended items"],
                  ["isDeal", "Deals and offers"],
                  ["isHotOffer", "Hot offers"],
                  ["isGiftBox", "Gift boxes"],
                  ["isNewArrival", "New arrivals"],
                  ["isTopSelling", "Top selling"],
                  ["isActive", "Active / visible"],
                ].map(([name, label]) => (
                  <label key={name} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      name={name}
                      checked={formData[name]}
                      onChange={handleChange}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-md p-5">
              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white rounded-md py-3 font-medium disabled:bg-gray-300"
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
                className="w-full mt-3 border border-gray-200 rounded-md py-3 text-gray-700"
              >
                Cancel
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}

export default AdminProductForm;