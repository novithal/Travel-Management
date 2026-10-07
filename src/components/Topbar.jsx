
import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Bell,
  Plus,
  ChevronDown,
  User,
  Settings,
  LogOut,
  CheckCircle2,
  X,
} from "lucide-react";

export default function Topbar({
  onMenu,
  title,
  onAdd,
}) {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const notifications = [
    {
      id: 1,
      title: "New booking received",
      text: "A new Bali Escape booking was added.",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Trip updated",
      text: "Paris Explorer trip details were updated.",
      time: "24 min ago",
    },
    {
      id: 3,
      title: "Payment completed",
      text: "Payment for NP Adventure is completed.",
      time: "1 hour ago",
    },
  ];

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  function handleNotificationClick() {
    setNotificationOpen((prev) => !prev);
    setProfileOpen(false);
  }

  function handleProfileClick() {
    setProfileOpen((prev) => !prev);
    setNotificationOpen(false);
  }

  return (
    <header className="topbar">
      <button className="mobile-menu-btn" onClick={onMenu}>
        <Menu size={22} />
      </button>

      <div className="page-heading">
        <span>Travel workspace</span>
        <h1>{title}</h1>
      </div>

      <div className="topbar-right">

        {onAdd && (
          <button className="add-top-btn" onClick={onAdd}>
            <Plus size={17} />
            <span>Add</span>
          </button>
        )}

        {/* NOTIFICATION */}
        <div className="topbar-action-wrap" ref={notificationRef}>
          <button
            className={`icon-btn notification-btn ${
              notificationOpen ? "active" : ""
            }`}
            onClick={handleNotificationClick}
            aria-label="Notifications"
          >
            <Bell size={19} />
            <i></i>
          </button>

          {notificationOpen && (
            <div className="notification-panel">
              <div className="panel-header">
                <div>
                  <span>UPDATES</span>
                  <h3>Notifications</h3>
                </div>

                <button
                  className="panel-close"
                  onClick={() => setNotificationOpen(false)}
                >
                  <X size={16} />
                </button>
              </div>

              <div className="notification-list">
                {notifications.map((notification) => (
                  <div
                    className="notification-item"
                    key={notification.id}
                  >
                    <div className="notification-icon">
                      <CheckCircle2 size={15} />
                    </div>

                    <div className="notification-content">
                      <strong>{notification.title}</strong>
                      <p>{notification.text}</p>
                      <small>{notification.time}</small>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="view-notifications"
                onClick={() => setNotificationOpen(false)}
              >
                View all notifications
              </button>
            </div>
          )}
        </div>

        {/* PROFILE */}
        <div className="topbar-action-wrap profile-wrap" ref={profileRef}>
          <button
            className={`user-profile ${
              profileOpen ? "profile-active" : ""
            }`}
            onClick={handleProfileClick}
          >
            <div className="avatar">NL</div>

            <div className="user-info">
              <strong>Novitha Loganathan</strong>
              <span>Administrator</span>
            </div>

            <ChevronDown
              size={15}
              className={profileOpen ? "rotate-chevron" : ""}
            />
          </button>

          {profileOpen && (
            <div className="profile-panel">
              <div className="profile-panel-head">
                <div className="profile-large-avatar">SK</div>

                <div>
                  <strong>Novitha Loganathan</strong>
                  <span>Administrator</span>
                </div>
              </div>

              <div className="profile-divider"></div>

              <div className="profile-details">
                <div>
                  <span>Email</span>
                  <strong>novitha@np.com</strong>
                </div>

                <div>
                  <span>Role</span>
                  <strong>Travel Administrator</strong>
                </div>

                <div>
                  <span>Workspace</span>
                  <strong>NP Travel</strong>
                </div>
              </div>

              <button
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <User size={16} />
                <span>Profile details</span>
              </button>

              <button
                className="profile-menu-item"
                onClick={() => setProfileOpen(false)}
              >
                <Settings size={16} />
                <span>Account settings</span>
              </button>

              <button
                className="profile-menu-item logout-item"
                onClick={() => setProfileOpen(false)}
              >
                <LogOut size={16} />
                <span>Sign out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
