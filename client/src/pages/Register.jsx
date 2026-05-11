import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
      };

      await register(payload);

      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-sky-200 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1180px] items-center justify-center px-4 py-6">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] lg:grid-cols-[1.05fr_460px]">
          <div
            className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between"
            style={{
              background:
                "radial-gradient(circle at 18% 18%, rgba(147,197,253,0.55) 0%, transparent 32%), radial-gradient(circle at 85% 25%, rgba(219,234,254,0.24) 0%, transparent 28%), radial-gradient(circle at 50% 100%, rgba(96,165,250,0.30) 0%, transparent 36%), linear-gradient(135deg, #2563eb 0%, #1d4ed8 48%, #1e40af 100%)",
            }}
          >
            <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 right-0 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute right-14 top-16 h-28 w-28 rounded-full border border-white/20" />
            <div className="absolute right-36 top-44 h-12 w-12 rounded-full bg-white/10" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-blue-600 shadow-xl">
                  B
                </div>
                <span className="text-3xl font-bold">Brand</span>
              </Link>

              <div className="mt-12">
                <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  Create your account
                </span>

                <h1 className="mt-6 max-w-md text-5xl font-bold leading-tight">
                  Start shopping with a smarter account.
                </h1>

                <p className="mt-5 max-w-md text-base leading-8 text-blue-50">
                  Save your profile, track orders, manage your cart, and enjoy a
                  faster checkout experience.
                </p>
              </div>
            </div>

            <div className="relative mt-10 grid gap-4">
              <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl shadow-md">
                    🛒
                  </div>

                  <div>
                    <p className="text-xl font-bold">
                      Premium shopping access
                    </p>
                    <p className="mt-1 text-sm text-blue-50">
                      Save orders, checkout faster, and track everything easily.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-3xl border border-white/20 bg-white/15 p-4 text-center shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  <p className="text-2xl font-bold">01</p>
                  <p className="mt-1 text-xs text-blue-50">Create profile</p>
                </div>

                <div className="rounded-3xl border border-white/20 bg-white/15 p-4 text-center shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  <p className="text-2xl font-bold">02</p>
                  <p className="mt-1 text-xs text-blue-50">Place orders</p>
                </div>

                <div className="rounded-3xl border border-white/20 bg-white/15 p-4 text-center shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  <p className="text-2xl font-bold">03</p>
                  <p className="mt-1 text-xs text-blue-50">Track delivery</p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <p className="text-sm text-blue-50">Account benefits</p>

                <div className="mt-4 grid gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      ✓
                    </span>
                    <p className="text-sm font-medium">
                      Secure customer profile
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      ✓
                    </span>
                    <p className="text-sm font-medium">
                      Order history and tracking
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                      ✓
                    </span>
                    <p className="text-sm font-medium">
                      Faster checkout experience
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="mb-8 flex items-center justify-between lg:hidden">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-bold text-white">
                  B
                </div>
                <span className="text-2xl font-bold text-gray-900">Brand</span>
              </Link>
            </div>

            <div className="mx-auto max-w-[390px]">
              <div className="mb-8">
                <p className="text-sm font-semibold text-blue-600">
                  New Account
                </p>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  Register
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Fill in your details to create your customer account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Full name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Email address
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="Enter your email"
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    placeholder="Create a password"
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />

                  <p className="mt-2 text-xs text-gray-400">
                    Password should be at least 6 characters.
                  </p>
                </div>

                <button
                  disabled={loading}
                  className="h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                >
                  {loading ? "Creating account..." : "Create account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Login
                </Link>
              </p>

              <Link
                to="/"
                className="mt-6 flex h-11 items-center justify-center rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
              >
                Back to store
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;