import React, { useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Settings from "./pages/Settings";
import Topbar from "./components/Topbar";
import Toast from "./components/Toast";

import Dashboard from "./pages/Dashboard";
import Trips from "./pages/Trips";
import TripForm from "./pages/TripForm";
import TripDetails from "./pages/TripDetails";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";
import BookingDetails from "./pages/BookingDetails";
import CalendarPage from "./pages/CalendarPage";
import Analytics from "./pages/Analytics";

import { initialTrips, initialBookings } from "./data/data";

function TripDetailsRoute({ navigate }) {
  const { id } = useParams();

  const trips = JSON.parse(
    localStorage.getItem("travel_trips") ||
      JSON.stringify(initialTrips)
  );

  const trip = trips.find((item) => String(item.id) === String(id));

  return (
    <TripDetails
      trip={trip}
      navigate={navigate}
    />
  );
}

function TripEditRoute({ navigate, notify }) {
  const { id } = useParams();

  const trips = JSON.parse(
    localStorage.getItem("travel_trips") ||
      JSON.stringify(initialTrips)
  );

  const trip = trips.find((item) => String(item.id) === String(id));

  return (
    <TripForm
      trip={trip}
      navigate={navigate}
      notify={notify}
    />
  );
}

function BookingDetailsRoute({ navigate }) {
  const { id } = useParams();

  const bookings = JSON.parse(
    localStorage.getItem("travel_bookings") ||
      JSON.stringify(initialBookings)
  );

  const booking = bookings.find(
    (item) => String(item.id) === String(id)
  );

  return (
    <BookingDetails
      booking={booking}
      navigate={navigate}
    />
  );
}
function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState("");

  const title = useMemo(() => {
    if (location.pathname.startsWith("/destinations"))
      return "Destinations";

    if (location.pathname.startsWith("/trips/new"))
      return "Create trip";

    if (location.pathname.includes("/edit"))
      return "Edit trip";

    if (location.pathname.startsWith("/trips/"))
      return "Trip details";

    if (location.pathname.startsWith("/trips"))
      return "Trips";

    if (location.pathname.startsWith("/customers"))
      return "Customers";

    if (location.pathname.startsWith("/bookings/"))
      return "Booking details";

    if (location.pathname.startsWith("/bookings"))
      return "Bookings";

    if (location.pathname.startsWith("/calendar"))
      return "Calendar";

    if (location.pathname.startsWith("/analytics"))
      return "Analytics";

    return "Overview";
  }, [location.pathname]);

  function notify(message) {
    setToast(message);
  }

  function getActivePath() {
    if (location.pathname.startsWith("/destinations"))
      return "/destinations";

    if (location.pathname.startsWith("/trips"))
      return "/trips";

    if (location.pathname.startsWith("/customers"))
      return "/customers";

    if (location.pathname.startsWith("/bookings"))
      return "/bookings";

    if (location.pathname.startsWith("/calendar"))
      return "/calendar";

    if (location.pathname.startsWith("/analytics"))
      return "/analytics";

    if (location.pathname.startsWith("/settings"))
    return "/settings";

    return "/";
  }

  return (
    <div className="app-shell">

      <Sidebar
        active={getActivePath()}
        navigate={navigate}
        mobileOpen={sidebarOpen}
        close={() => setSidebarOpen(false)}
      />

      <main className="main-area">

        <Topbar
          title={title}
          onMenu={() => setSidebarOpen(true)}
          onAdd={
            location.pathname === "/trips"
              ? () => navigate("/trips/new")
              : undefined
          }
        />

        <Routes>

          <Route
            path="/"
            element={<Dashboard navigate={navigate} />}
          />

          <Route
            path="/trips"
            element={
              <Trips
                navigate={navigate}
                notify={notify}
              />
            }
          />

          <Route
            path="/trips/new"
            element={
              <TripForm
                navigate={navigate}
                notify={notify}
              />
            }
          />

          <Route
            path="/trips/:id"
            element={
              <TripDetailsRoute navigate={navigate} />
            }
          />

          <Route
            path="/trips/:id/edit"
            element={
              <TripEditRoute
                navigate={navigate}
                notify={notify}
              />
            }
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/bookings"
            element={
              <Bookings navigate={navigate} />
            }
          />

          <Route
            path="/bookings/:id"
            element={
              <BookingDetailsRoute
                navigate={navigate}
              />
            }
          />

          <Route
            path="/calendar"
            element={<CalendarPage />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />
          <Route
  path="/settings"
  element={<Settings />}
/>

        </Routes>
      </main>

      <Toast
        message={toast}
        onClose={() => setToast("")}
      />

    </div>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}