import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        email: formData.email.trim(),
        password: formData.password,
      };

      const res = await login(payload);

      toast.success("Login successful");

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50">
      <div className="absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-200 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-80 w-80 rounded-full bg-sky-200 blur-3xl" />

      <div className="relative mx-auto flex min-h-screen max-w-[1180px] items-center justify-center px-4 py-6">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.14)] lg:grid-cols-[1.05fr_460px]">
          <div
            className="relative hidden overflow-hidden p-10 text-white lg:flex lg:flex-col lg:justify-between"
            style={{
              background:
                "radial-gradient(circle at 18% 18%, rgba(147,197,253,0.55) 0%, transparent 32%), radial-gradient(circle at 85% 25%, rgba(219,234,254,0.24) 0%, transparent 28%), radial-gradient(circle at 50% 100%, rgba(96,165,250,0.30) 0%, transparent 36%), linear-gradient(135deg, #2563eb 0%, #1d4ed8 48%, #1e40af 100%)",
            }}
          >
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-28 -left-20 h-80 w-80 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute right-10 top-24 h-24 w-24 rounded-full border border-white/20" />
            <div className="absolute right-28 top-44 h-10 w-10 rounded-full bg-white/10" />

            <div className="relative">
              <Link to="/" className="inline-flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-blue-600 shadow-xl">
                  B
                </div>
                <span className="text-3xl font-bold">Brand</span>
              </Link>

              <div className="mt-12">
                <span className="inline-flex rounded-full border border-white/20 bg-white/15 px-4 py-2 text-sm font-semibold shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  Welcome back
                </span>

                <h1 className="mt-6 max-w-md text-5xl font-bold leading-tight">
                  Your shopping dashboard is ready.
                </h1>

                <p className="mt-5 max-w-md text-base leading-8 text-blue-50">
                  Login to track orders, manage your cart, review your profile,
                  and continue your shopping journey.
                </p>
              </div>
            </div>

            <div className="relative mt-10 grid gap-4">
              <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-50">Latest order</p>
                    <h3 className="mt-1 text-xl font-bold">ORD-260510</h3>
                  </div>

                  <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-semibold text-white">
                    Active
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-4 gap-2">
                  <div className="h-2 rounded-full bg-white" />
                  <div className="h-2 rounded-full bg-white" />
                  <div className="h-2 rounded-full bg-white/45" />
                  <div className="h-2 rounded-full bg-white/25" />
                </div>

                <div className="mt-5 flex items-center gap-4 rounded-2xl border border-white/15 bg-white/15 p-3 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-md">
                    📦
                  </div>
                  <div>
                    <p className="font-semibold">Package in progress</p>
                    <p className="text-sm text-blue-50">
                      Track your delivery in real time.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  <p className="text-3xl font-bold">24/7</p>
                  <p className="mt-1 text-sm text-blue-50">Order tracking</p>
                </div>

                <div className="rounded-3xl border border-white/20 bg-white/15 p-5 shadow-lg shadow-blue-950/10 backdrop-blur-xl">
                  <p className="text-3xl font-bold">Fast</p>
                  <p className="mt-1 text-sm text-blue-50">Checkout access</p>
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
                  Account Login
                </p>
                <h2 className="mt-2 text-4xl font-bold text-gray-900">
                  Login
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Enter your email and password to access your account.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
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
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-12 w-full rounded-2xl border border-gray-200 bg-white px-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                  />
                </div>

                <label className="flex items-center gap-2 text-sm text-gray-500">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Remember me
                </label>

                <button
                  disabled={loading}
                  className="h-12 w-full rounded-2xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:shadow-none"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  Register
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

export default Login;