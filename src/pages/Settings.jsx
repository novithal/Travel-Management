import React, { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Save,
} from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const [profile, setProfile] = useState({
    name: "Saran Kumar",
    email: "saran@voyara.com",
    role: "Administrator",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    localStorage.setItem(
      "travel_profile",
      JSON.stringify(profile)
    );

    alert("Settings saved successfully");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <div>
          <span className="page-eyebrow">
            CONFIGURATION
          </span>

          <h2>Settings</h2>

          <p>
            Manage your account, preferences and workspace.
          </p>
        </div>

        <button
          className="settings-save-btn"
          onClick={handleSave}
        >
          <Save size={16} />
          Save changes
        </button>
      </div>

      <div className="settings-grid">

        {/* PROFILE */}
        <section className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              <User size={18} />
            </div>

            <div>
              <h3>Profile</h3>
              <p>Manage your personal information.</p>
            </div>
          </div>

          <div className="settings-form">

            <label>
              Full name
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Email
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Role
              <input
                type="text"
                value={profile.role}
                disabled
              />
            </label>

          </div>
        </section>


        {/* NOTIFICATIONS */}
        <section className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              <Bell size={18} />
            </div>

            <div>
              <h3>Notifications</h3>
              <p>Control your notification preferences.</p>
            </div>
          </div>

          <div className="settings-options">

            <div className="setting-row">
              <div>
                <strong>Push notifications</strong>
                <span>
                  Receive booking and trip updates.
                </span>
              </div>

              <button
                className={`toggle ${
                  notifications ? "on" : ""
                }`}
                onClick={() =>
                  setNotifications(!notifications)
                }
              >
                <i></i>
              </button>
            </div>

            <div className="setting-row">
              <div>
                <strong>Email updates</strong>
                <span>
                  Receive important updates by email.
                </span>
              </div>

              <button
                className={`toggle ${
                  emailUpdates ? "on" : ""
                }`}
                onClick={() =>
                  setEmailUpdates(!emailUpdates)
                }
              >
                <i></i>
              </button>
            </div>

          </div>
        </section>


        {/* APPEARANCE */}
        <section className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              <Palette size={18} />
            </div>

            <div>
              <h3>Appearance</h3>
              <p>Customize your workspace appearance.</p>
            </div>
          </div>

          <div className="settings-options">

            <div className="setting-row">
              <div>
                <strong>Dark mode</strong>
                <span>
                  Use a darker interface theme.
                </span>
              </div>

              <button
                className={`toggle ${
                  darkMode ? "on" : ""
                }`}
                onClick={() =>
                  setDarkMode(!darkMode)
                }
              >
                <i></i>
              </button>
            </div>

          </div>
        </section>


        {/* SECURITY */}
        <section className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              <Shield size={18} />
            </div>

            <div>
              <h3>Security</h3>
              <p>Manage your account security.</p>
            </div>
          </div>

          <button
            className="settings-outline-btn"
            onClick={() =>
              alert("Password change option opened")
            }
          >
            Change password
          </button>

        </section>


        {/* LANGUAGE */}
        <section className="settings-card">

          <div className="settings-card-title">
            <div className="settings-icon">
              <Globe size={18} />
            </div>

            <div>
              <h3>Language & Region</h3>
              <p>Choose your preferred language.</p>
            </div>
          </div>

          <select className="settings-select">
            <option>English</option>
            <option>Tamil</option>
          </select>

        </section>

      </div>
    </div>
  );
}