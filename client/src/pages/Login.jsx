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
      const res = await login(formData);

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
    <div className="min-h-screen bg-[#f7fafc] flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[420px] bg-white border border-gray-200 rounded-md p-6"
      >
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">Login</h1>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          required
          placeholder="Email address"
          className="w-full h-11 border border-gray-200 rounded-md px-3 mb-3 outline-none"
        />

        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          type="password"
          required
          placeholder="Password"
          className="w-full h-11 border border-gray-200 rounded-md px-3 mb-4 outline-none"
        />

        <button
          disabled={loading}
          className="w-full h-11 bg-blue-600 text-white rounded-md disabled:bg-gray-300"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-600">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;