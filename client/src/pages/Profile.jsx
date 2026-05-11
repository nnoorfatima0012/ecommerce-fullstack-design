// // //client/src/pages/Profile.jsx
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, updateProfile } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        postalCode: user.postalCode || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile({
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const initials =
    formData.name
      ?.split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const completedFields = [
    formData.name,
    formData.email,
    formData.phone,
    formData.address,
    formData.city,
    formData.postalCode,
  ].filter(Boolean).length;

  const profilePercentage = Math.round((completedFields / 6) * 100);

  const inputClass =
    "h-12 w-full rounded-xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50";

  const disabledInputClass =
    "h-12 w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 outline-none";

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <Header />

      <main className="mx-auto max-w-[1180px] px-4 py-7">
        <div className="mb-6">
          <p className="text-sm font-semibold text-blue-600">
            Account Settings
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            My Profile
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
            Manage your contact and delivery details for a faster checkout
            experience.
          </p>
        </div>

        <section className="mb-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
          <div className="h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

          <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-600 to-sky-500 text-2xl font-bold text-white shadow-lg shadow-blue-600/20">
                {initials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {formData.name || "Your Name"}
                  </h2>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold capitalize text-blue-600">
                    {formData.role || "User"}
                  </span>
                </div>

                <p className="mt-1 break-all text-sm text-gray-500">
                  {formData.email || "email@example.com"}
                </p>

                <p className="mt-2 text-sm text-gray-500">
                  Keep your profile complete to make checkout easier.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:min-w-[260px]">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">
                  Profile completion
                </p>
                <span className="text-sm font-bold text-blue-600">
                  {profilePercentage}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{ width: `${profilePercentage}%` }}
                />
              </div>

              <p className="mt-3 text-xs leading-5 text-gray-500">
                Add phone, city, address, and postal code for smoother orders.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="h-fit space-y-4">
            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">
                Checkout Readiness
              </h3>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl bg-blue-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    ✓
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Login email saved
                    </p>
                    <p className="text-xs text-gray-500">
                      Used for account access.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
                    {formData.phone ? "✓" : "!"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Phone number
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.phone ? "Added" : "Not added yet"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-600 shadow-sm">
                    {formData.address ? "✓" : "!"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      Delivery address
                    </p>
                    <p className="text-xs text-gray-500">
                      {formData.address ? "Added" : "Not added yet"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900">Account Info</h3>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between gap-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">Role</span>
                  <span className="font-semibold capitalize text-gray-900">
                    {formData.role || "User"}
                  </span>
                </div>

                <div className="flex justify-between gap-3 border-b border-gray-100 pb-3">
                  <span className="text-gray-500">City</span>
                  <span className="font-semibold text-gray-900">
                    {formData.city || "Not added"}
                  </span>
                </div>

                <div className="flex justify-between gap-3">
                  <span className="text-gray-500">Postal code</span>
                  <span className="font-semibold text-gray-900">
                    {formData.postalCode || "Not added"}
                  </span>
                </div>
              </div>
            </div>
          </aside>

          <form
            onSubmit={handleSave}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:p-7"
          >
            <div className="mb-6 flex flex-col justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Personal Details
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Update the information used for your orders and deliveries.
                </p>
              </div>

              <span className="w-fit rounded-full bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-600">
                Editable Profile
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Full name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Email address
                </label>
                <input
                  value={formData.email}
                  disabled
                  className={disabledInputClass}
                />
                <p className="mt-2 text-xs text-gray-400">
                  Email is used for login and cannot be changed here.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Phone number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  City
                </label>
                <input
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className={inputClass}
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Complete address
                </label>
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street, area"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Postal code
                </label>
                <input
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Account role
                </label>
                <input
                  value={formData.role}
                  disabled
                  className={`${disabledInputClass} capitalize`}
                />
              </div>
            </div>

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-5 text-gray-400">
                These details will be used as your default checkout information.
              </p>

              <button
                disabled={loading}
                className="h-12 rounded-2xl bg-blue-600 px-7 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
              >
                {loading ? "Saving..." : "Save changes"}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;