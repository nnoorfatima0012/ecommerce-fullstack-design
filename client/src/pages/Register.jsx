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
      await register(formData);

      toast.success("Account created successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
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
        <h1 className="text-2xl font-semibold text-gray-900 mb-5">Register</h1>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Full name"
          className="w-full h-11 border border-gray-200 rounded-md px-3 mb-3 outline-none"
        />

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
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;