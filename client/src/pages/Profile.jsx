import Header from "../components/layout/Header";
import Footer from "../components/home/Footer";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      <Header />

      <main className="max-w-[760px] mx-auto px-4 py-8">
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h1 className="text-2xl font-semibold text-gray-900 mb-5">
            My Profile
          </h1>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Name</span>
              <span className="font-medium">{user?.name}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Email</span>
              <span className="font-medium">{user?.email}</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Role</span>
              <span className="font-medium capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;