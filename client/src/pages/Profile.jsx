// //client/src/pages/Profile.jsx
// import Header from "../components/layout/Header";
// import Footer from "../components/home/Footer";
// import { useAuth } from "../context/AuthContext";

// function Profile() {
//   const { user } = useAuth();

//   return (
//     <div className="bg-[#f7fafc] min-h-screen">
//       <Header />

//       <main className="max-w-[760px] mx-auto px-4 py-8">
//         <div className="bg-white border border-gray-200 rounded-md p-6">
//           <h1 className="text-2xl font-semibold text-gray-900 mb-5">
//             My Profile
//           </h1>

//           <div className="space-y-3 text-sm">
//             <div className="flex justify-between border-b pb-2">
//               <span className="text-gray-500">Name</span>
//               <span className="font-medium">{user?.name}</span>
//             </div>

//             <div className="flex justify-between border-b pb-2">
//               <span className="text-gray-500">Email</span>
//               <span className="font-medium">{user?.email}</span>
//             </div>

//             <div className="flex justify-between border-b pb-2">
//               <span className="text-gray-500">Role</span>
//               <span className="font-medium capitalize">{user?.role}</span>
//             </div>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }

// export default Profile;

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
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 py-8">
        <form
          onSubmit={handleSave}
          className="bg-white border border-gray-200 rounded-md p-6"
        >
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            My Profile
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Save your default contact and delivery information for faster checkout.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Name</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                value={formData.email}
                disabled
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none bg-gray-100 text-gray-500"
              />
              <p className="text-xs text-gray-400 mt-1">
                Email is used for login and cannot be changed here.
              </p>
            </div>

            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">City</label>
              <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm text-gray-600">Address</label>
              <input
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Complete address"
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Postal code</label>
              <input
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                placeholder="Postal code"
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Role</label>
              <input
                value={formData.role}
                disabled
                className="w-full mt-1 border border-gray-200 rounded-md h-11 px-3 outline-none bg-gray-100 text-gray-500 capitalize"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="bg-blue-600 text-white rounded-md px-5 py-3 mt-6 disabled:bg-gray-300"
          >
            {loading ? "Saving..." : "Save profile"}
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;