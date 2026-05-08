//client/src/components/admin/AdminLayout.jsx
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tags,
  Users,
  Store,
  LogOut,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const getPageInfo = () => {
    if (location.pathname === "/admin") {
      return {
        title: "Dashboard",
        subtitle: "Overview of orders, products, and store activity",
      };
    }

    if (location.pathname.startsWith("/admin/orders")) {
      return {
        title: "Orders",
        subtitle: "View and manage customer orders",
      };
    }

    if (location.pathname.startsWith("/admin/products/create")) {
      return {
        title: "Create Product",
        subtitle: "Add a new product to your store",
      };
    }

    if (
      location.pathname.includes("/admin/products/") &&
      location.pathname.endsWith("/edit")
    ) {
      return {
        title: "Edit Product",
        subtitle: "Update product details and placement",
      };
    }

    if (location.pathname.startsWith("/admin/products")) {
      return {
        title: "Products",
        subtitle: "Manage products, stock, pricing, and visibility",
      };
    }

    if (location.pathname.startsWith("/admin/categories")) {
      return {
        title: "Categories",
        subtitle: "Manage product categories",
      };
    }

    return {
      title: "Admin Panel",
      subtitle: "Manage your ecommerce store",
    };
  };

  const pageInfo = getPageInfo();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const navItems = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
      end: true,
    },
    {
      label: "Orders",
      path: "/admin/orders",
      icon: ShoppingBag,
    },
    {
      label: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      label: "Categories",
      path: "/admin/categories",
      icon: Tags,
    },
    {
      label: "Customers",
      path: "/admin/customers",
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7fafc] flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[250px] bg-white border-r border-gray-200 flex-col fixed left-0 top-0 bottom-0">
        <div className="h-[70px] px-5 border-b border-gray-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold">
            B
          </div>

          <div>
            <h1 className="font-semibold text-gray-900">Admin Panel</h1>
            <p className="text-xs text-gray-500">B2B Ecommerce</p>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-gray-200 p-3 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-gray-600 hover:bg-gray-100"
          >
            <Store size={18} />
            Back to store
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 lg:ml-[250px] min-w-0">
        {/* Topbar */}
        <header className="h-[70px] bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
          <div>
            <h2 className="font-semibold text-gray-900">{pageInfo.title}</h2>
            <p className="text-xs text-gray-500">{pageInfo.subtitle}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="hidden sm:block border border-gray-200 px-3 py-2 rounded-md text-sm text-gray-700"
            >
              Store
            </button>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.name || "Admin"}
              </p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>

            <button
              onClick={handleLogout}
              className="border border-red-200 text-red-500 px-3 py-2 rounded-md text-sm"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Mobile admin nav */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-3 py-3 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "bg-gray-100 text-gray-600"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
