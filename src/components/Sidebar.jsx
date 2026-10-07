
import React from "react";
import {
  LayoutDashboard,
  MapPinned,
  Plane,
  Users,
  CalendarCheck,
  CalendarDays,
  BarChart3,
  Settings,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Overview",
    path: "/",
    icon: LayoutDashboard,
  },
  
  {
    label: "Trips",
    path: "/trips",
    icon: Plane,
  },
  {
    label: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    label: "Bookings",
    path: "/bookings",
    icon: CalendarCheck,
  },
  {
    label: "Calendar",
    path: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar({
  active,
  navigate,
  mobileOpen = false,
  close,
}) {
  const handleNavigation = (path) => {
    navigate(path);

    if (close) {
      close();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="sidebar-overlay"
          onClick={close}
        />
      )}

      <aside
        className={`sidebar ${
          mobileOpen ? "sidebar-mobile-open" : ""
        }`}
      >

        {/* Brand */}
        <div className="sidebar-brand">

          <button
            className="sidebar-mobile-close"
            onClick={close}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          <div
            className="brand-mark"
            onClick={() => handleNavigation("/")}
          >
            <Plane size={20} />
          </div>

          <div
            className="brand-text"
            onClick={() => handleNavigation("/")}
          >
            <strong>NP</strong>
            <span>TRAVEL MANAGEMENT</span>
          </div>

        </div>


        {/* Navigation */}
        <div className="sidebar-content">

          <div className="sidebar-section-title">
            WORKSPACE
          </div>

          <nav className="sidebar-nav">

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;

              const isActive =
                item.path === "/"
                  ? active === "/"
                  : active === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  className={`sidebar-item ${
                    isActive ? "active" : ""
                  }`}
                  onClick={() =>
                    handleNavigation(item.path)
                  }
                >
                  <Icon size={17} />

                  <span>{item.label}</span>
                </button>
              );
            })}

          </nav>

        </div>


        {/* Existing footer area */}
        <div className="sidebar-footer">
          <div className="sidebar-footer-content">
            <span>NP Travel</span>
            <small>Travel workspace</small>
          </div>
        </div>

      </aside>
    </>
  );
}
