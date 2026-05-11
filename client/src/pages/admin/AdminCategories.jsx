// client/src/pages/admin/AdminCategories.jsx
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  CheckCircle2,
  EyeOff,
  Hash,
  ImageIcon,
  Layers,
  Pencil,
  Plus,
  RotateCcw,
  Search,
  Tag,
  X,
} from "lucide-react";
import API from "../../api/api";

const initialForm = {
  name: "",
  slug: "",
  icon: "",
  image: "",
};

const statusOptions = ["all", "active", "hidden"];

const PLACEHOLDER_IMAGE =
  "https://placehold.co/120x120/e5e7eb/64748b?text=Category";

function CategoryFormDrawer({
  isOpen,
  editingId,
  formData,
  saving,
  currentEditingCategory,
  onClose,
  onChange,
  onSubmit,
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-[460px] overflow-y-auto bg-white shadow-2xl"
      >
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white/95 px-6 py-5 backdrop-blur">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {editingId ? <Pencil size={14} /> : <Plus size={14} />}
                {editingId ? "Edit Mode" : "New Category"}
              </div>

              <h2 className="mt-3 text-2xl font-bold text-gray-950">
                {editingId ? "Edit Category" : "Create Category"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId
                  ? `Updating ${currentEditingCategory?.name || "category"}`
                  : "Add a new product category to your store."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-50"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="space-y-5 px-6 py-6">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Category Name
            </label>

            <input
              name="name"
              value={formData.name}
              onChange={onChange}
              placeholder="Example: Consumer electronics"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Slug
            </label>

            <div className="relative">
              <Hash
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="slug"
                value={formData.slug}
                onChange={onChange}
                placeholder="consumer-electronics"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Icon
            </label>

            <input
              name="icon"
              value={formData.icon}
              onChange={onChange}
              placeholder="Icon URL, emoji, or icon name optional"
              className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500">
              Image URL
            </label>

            <div className="relative">
              <ImageIcon
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="image"
                value={formData.image}
                onChange={onChange}
                placeholder="https://example.com/category.png"
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Preview
            </p>

            <div className="flex items-center gap-4 rounded-2xl bg-white p-4">
              {formData.image ? (
                <img
                  src={formData.image}
                  alt="Category preview"
                  className="h-14 w-14 rounded-2xl object-cover"
                  onError={(e) => {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2D68FF] text-sm font-bold text-white shadow-sm">
{formData.name?.charAt(0)?.toUpperCase() || "C"}
 </div>
              )}

              <div className="min-w-0">
                <p className="truncate font-semibold text-gray-950">
                  {formData.name || "Category name"}
                </p>
                <p className="mt-1 truncate text-sm text-gray-500">
                  {formData.slug || "category-slug"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 border-t border-gray-200 bg-white px-6 py-4">
          <button
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {saving ? (
              "Saving..."
            ) : editingId ? (
              <>
                <Pencil size={17} />
                Update Category
              </>
            ) : (
              <>
                <Plus size={17} />
                Create Category
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await API.get("/categories?includeInactive=true");

      setCategories(res.data.data || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = {
        ...prev,
        [name]: value,
      };

      if (name === "name" && !editingId) {
        updated.slug = generateSlug(value);
      }

      return updated;
    });
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const openCreateDrawer = () => {
    resetForm();
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    if (saving) return;

    setIsDrawerOpen(false);
    resetForm();
  };

  const handleEdit = (category) => {
    setEditingId(category._id);

    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      icon: category.icon || "",
      image: category.image || "",
    });

    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.slug.trim()) {
      toast.error("Name and slug are required");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        name: formData.name.trim(),
        slug: formData.slug.trim(),
        icon: formData.icon.trim(),
        image: formData.image.trim(),
      };

      if (editingId) {
        const res = await API.patch(`/categories/${editingId}`, payload);

        setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? res.data.data : cat))
        );

        toast.success("Category updated successfully");
      } else {
        const res = await API.post("/categories", payload);

        setCategories((prev) => [res.data.data, ...prev]);

        toast.success("Category created successfully");
      }

      setIsDrawerOpen(false);
      resetForm();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save category");
    } finally {
      setSaving(false);
    }
  };

  const handleHide = async (categoryId) => {
    const confirmHide = window.confirm(
      "Are you sure you want to hide this category?"
    );

    if (!confirmHide) return;

    try {
      const res = await API.delete(`/categories/${categoryId}`);

      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? res.data.data : cat))
      );

      toast.success("Category hidden successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to hide category");
    }
  };

  const handleRestore = async (categoryId) => {
    try {
      const res = await API.patch(`/categories/${categoryId}/restore`);

      setCategories((prev) =>
        prev.map((cat) => (cat._id === categoryId ? res.data.data : cat))
      );

      toast.success("Category restored successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to restore category");
    }
  };

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        category.name?.toLowerCase().includes(search) ||
        category.slug?.toLowerCase().includes(search);

      const isActive = category.isActive !== false;

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && isActive) ||
        (statusFilter === "hidden" && !isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, searchTerm, statusFilter]);

  const stats = useMemo(() => {
    return {
      total: categories.length,
      active: categories.filter((category) => category.isActive !== false)
        .length,
      hidden: categories.filter((category) => category.isActive === false)
        .length,
    };
  }, [categories]);

  const currentEditingCategory = categories.find(
    (category) => category._id === editingId
  );

  const getCategoryInitial = (name) => {
    return name?.charAt(0)?.toUpperCase() || "C";
  };

  const renderCategoryVisual = (category) => {
    if (category.image) {
      return (
        <img
          src={category.image}
          alt={category.name}
          className="h-14 w-14 rounded-2xl object-cover"
          onError={(e) => {
            e.currentTarget.src = PLACEHOLDER_IMAGE;
          }}
        />
      );
    }

    if (category.icon) {
      return (
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-sm font-bold text-blue-700">
          {category.icon.slice(0, 2).toUpperCase()}
        </div>
      );
    }

    return (

 <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#2D68FF] text-sm font-bold text-white shadow-sm">
   {getCategoryInitial(category.name)}
 </div>

    );
  };

  return (
    <div className="w-full max-w-full space-y-6 overflow-hidden">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold text-gray-950">
                {stats.total}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <Layers size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-emerald-700">
                Active Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold text-emerald-950">
                {stats.active}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
              <CheckCircle2 size={24} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-red-100 bg-red-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-red-700">
                Hidden Categories
              </p>
              <h2 className="mt-2 text-3xl font-bold text-red-950">
                {stats.hidden}
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-red-600 shadow-sm">
              <EyeOff size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Premium Category Panel */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Tag size={14} />
                Category Manager
              </div>

              <h2 className="mt-3 text-xl font-bold text-gray-950">
                Category List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Search, create, edit, hide, and restore product categories.
              </p>
            </div>

            <button
              onClick={openCreateDrawer}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <Plus size={18} />
              Add Category
            </button>
          </div>

          <div className="mt-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search categories by name or slug..."
                className="h-12 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition ${
                    statusFilter === status
                      ? "bg-blue-600 text-white shadow-sm"
                      : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="space-y-3 p-5">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="h-24 animate-pulse rounded-2xl bg-gray-100"
              />
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-3xl">
              🗂️
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              No categories found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing the search keyword or status filter.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredCategories.map((category) => {
              const isActive = category.isActive !== false;

              return (
                <div
                  key={category._id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-gray-50 xl:flex-row xl:items-center xl:justify-between"
                >
                  <div className="flex min-w-0 flex-1 items-center gap-4">
                    <div className="flex-shrink-0">
                      {renderCategoryVisual(category)}
                    </div>

                    <div className="min-w-0">
                      <p className="line-clamp-2 text-lg font-bold leading-snug text-gray-950">
                        {category.name}
                      </p>

                      <p className="mt-1 text-xs text-gray-500">
                        ID: {category._id?.slice(-8)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 xl:flex-nowrap xl:justify-end">
                    <span className="inline-flex max-w-[220px] items-center rounded-xl bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600">
                      <span className="truncate">{category.slug}</span>
                    </span>

                    {isActive ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                        <CheckCircle2 size={14} />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
                        <EyeOff size={14} />
                        Hidden
                      </span>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        <Pencil size={14} />
                        Edit
                      </button>

                      {isActive ? (
                        <button
                          onClick={() => handleHide(category._id)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                        >
                          <EyeOff size={14} />
                          Hide
                        </button>
                      ) : (
                        <button
                          onClick={() => handleRestore(category._id)}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <RotateCcw size={14} />
                          Restore
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <CategoryFormDrawer
        isOpen={isDrawerOpen}
        editingId={editingId}
        formData={formData}
        saving={saving}
        currentEditingCategory={currentEditingCategory}
        onClose={closeDrawer}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default AdminCategories;
