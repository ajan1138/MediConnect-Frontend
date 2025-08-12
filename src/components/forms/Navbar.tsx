import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/appointments", label: "Appointments" },
    { to: "/chat", label: "Chat", badge: 5 },
    { to: "/profile", label: "Profile" },
    { to: "/settings", label: "Settings" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <aside className="w-64 bg-gray-800 p-6 flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-white select-none">DocApp</h1>
      <nav className="flex flex-col gap-4">
        {links.map(({ to, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `p-3 rounded hover:bg-gray-700 flex justify-between items-center text-white ${
                isActive ? "bg-gray-700 font-semibold" : ""
              }`
            }
            end
          >
            <span>{label}</span>
            {badge && (
              <span className="bg-yellow-400 text-gray-900 rounded-full px-2 text-xs font-semibold select-none">
                {badge}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
