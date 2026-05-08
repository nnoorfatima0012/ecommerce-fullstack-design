import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../../api/api";

const initialForm = {
  name: "",
  slug: "",
  icon: "",
  image: "",
};

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      .replace(/\s+/g, "-");
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

  const handleEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name || "",
      slug: category.slug || "",
      icon: category.icon || "",
      image: category.image || "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.slug) {
      toast.error("Name and slug are required");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        const res = await API.patch(`/categories/${editingId}`, formData);

        setCategories((prev) =>
          prev.map((cat) => (cat._id === editingId ? res.data.data : cat))
        );

        toast.success("Category updated successfully");
      } else {
        const res = await API.post("/categories", formData);

        setCategories((prev) => [...prev, res.data.data]);

        toast.success("Category created successfully");
      }

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

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Admin Categories
        </h1>
        <p className="text-sm text-gray-500">
          Create, edit, hide, and restore product categories
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-md p-5 h-fit"
        >
          <h2 className="font-semibold text-gray-900 mb-4">
            {editingId ? "Edit Category" : "Create Category"}
          </h2>

          <div className="space-y-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Category name"
              className="w-full border border-gray-200 rounded-md h-11 px-3 outline-none"
            />

            <input
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="category-slug"
              className="w-full border border-gray-200 rounded-md h-11 px-3 outline-none"
            />

            <input
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              placeholder="Icon URL or icon name optional"
              className="w-full border border-gray-200 rounded-md h-11 px-3 outline-none"
            />

            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image URL optional"
              className="w-full border border-gray-200 rounded-md h-11 px-3 outline-none"
            />
          </div>

          <button
            disabled={saving}
            className="w-full bg-blue-600 text-white rounded-md py-3 mt-4 font-medium disabled:bg-gray-300"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update Category"
                : "Create Category"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="w-full border border-gray-200 rounded-md py-3 mt-3 text-gray-700"
            >
              Cancel edit
            </button>
          )}
        </form>

        <section className="bg-white border border-gray-200 rounded-md overflow-hidden">
          {loading ? (
            <div className="p-6 text-center text-gray-500">
              Loading categories...
            </div>
          ) : categories.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No categories found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="text-left px-4 py-3">Name</th>
                    <th className="text-left px-4 py-3">Slug</th>
                    <th className="text-left px-4 py-3">Status</th>
                    <th className="text-right px-4 py-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category._id}
                      className="border-b last:border-b-0"
                    >
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {category.name}
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {category.slug}
                      </td>

                      <td className="px-4 py-3">
                        {category.isActive !== false ? (
                          <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                            Active
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                            Hidden
                          </span>
                        )}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="border border-gray-200 px-3 py-1 rounded-md text-blue-600"
                          >
                            Edit
                          </button>

                          {category.isActive !== false ? (
                            <button
                              onClick={() => handleHide(category._id)}
                              className="border border-gray-200 px-3 py-1 rounded-md text-red-500"
                            >
                              Hide
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRestore(category._id)}
                              className="border border-gray-200 px-3 py-1 rounded-md text-green-600"
                            >
                              Restore
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default AdminCategories;