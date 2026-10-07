import React, { useEffect, useState } from "react";
import {
  Plane,
  CalendarCheck,
  Users,
  Wallet,
  ArrowUpRight,
  MapPin,
} from "lucide-react";

import StatCard from "../components/StatCard";
import RevenueChart from "../components/Chart";

import LoadingState from "../components/LoadingState";
import ErrorState from "../components/ErrorState";
import EmptyState from "../components/EmptyState";

import { initialBookings, initialTrips } from "../data/data";

export default function Dashboard({ navigate }) {
  const [bookings, setBookings] = useState([]);
  const [trips, setTrips] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDashboardData = () => {
    try {
      setLoading(true);
      setError(false);

      const savedBookings = JSON.parse(
        localStorage.getItem("travel_bookings") ||
          JSON.stringify(initialBookings)
      );

      const savedTrips = JSON.parse(
        localStorage.getItem("travel_trips") ||
          JSON.stringify(initialTrips)
      );

      if (!Array.isArray(savedBookings) || !Array.isArray(savedTrips)) {
        throw new Error("Invalid dashboard data");
      }

      setBookings(savedBookings);
      setTrips(savedTrips);

      // Small loading delay so the loading state can be displayed properly
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (err) {
      console.error("Dashboard data loading failed:", err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <ErrorState
        message="Unable to load dashboard data. Please try again."
        onRetry={loadDashboardData}
      />
    );
  }

  /* =========================
     EMPTY STATE
  ========================= */
  if (bookings.length === 0 && trips.length === 0) {
    return (
      <div className="page">
        <EmptyState
          title="No dashboard data"
          message="There are no bookings or trips available yet."
          actionText="Explore Trips"
          onAction={() => navigate("/trips")}
        />
      </div>
    );
  }

  return (
    <div className="page">
      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-banner">
        <div className="hero-copy">
          <span>EXPLORE WITHOUT LIMITS</span>

          <h2>
            Your next great
            <br />
            <em>journey</em> starts here.
          </h2>

          <p>
            Manage destinations, trips, travelers and bookings
            from one beautifully simple workspace.
          </p>

          <button onClick={() => navigate("/trips")}>
            Explore trips
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="hero-image">
          <img
  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80"
  alt="Travel destination"
/>

          <div className="hero-floating-card">
            <span>Popular this week</span>
            <strong>Bali Escape</strong>
            <small>From $1,299 · 7 days</small>
          </div>
        </div>
      </section>

      {/* =========================
          STATS
      ========================= */}
      <div className="stats-grid">
        <StatCard
          icon={<Wallet size={19} />}
          label="Total revenue"
          value="$84,290"
          change="18.4%"
        />

        <StatCard
          icon={<CalendarCheck size={19} />}
          label="Total bookings"
          value="1,248"
          change="12.8%"
        />

        <StatCard
          icon={<Users size={19} />}
          label="Travelers"
          value="3,842"
          change="8.6%"
        />

        <StatCard
          icon={<Plane size={19} />}
          label="Active trips"
          value={trips.length}
          change="6.2%"
        />
      </div>

      {/* =========================
          REVENUE + BOOKINGS
      ========================= */}
      <div className="dashboard-grid">
        <RevenueChart />

        <div className="destination-panel">
          <div className="section-heading">
            <div>
              <span>BOOKINGS</span>
              <h3>Recent bookings</h3>
            </div>

            <button onClick={() => navigate("/bookings")}>
              View all
            </button>
          </div>

          {bookings.length === 0 ? (
            <EmptyState
              title="No bookings"
              message="There are no recent bookings available."
              actionText="View Trips"
              onAction={() => navigate("/trips")}
            />
          ) : (
            <div className="recent-bookings">
              {bookings.slice(0, 4).map((booking) => (
                <div className="recent-booking" key={booking.id}>
                  <div className="mini-avatar">
                    {booking.customer
                      .split(" ")
                      .map((x) => x[0])
                      .join("")}
                  </div>

                  <div>
                    <strong>{booking.customer}</strong>

                    <span>
                      <MapPin size={12} />
                      {booking.destination}
                    </span>
                  </div>

                  <strong>
                    ${Number(booking.amount || 0).toLocaleString()}
                  </strong>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* =========================
          POPULAR TRIPS
      ========================= */}
      <section className="popular-section">
        <div className="section-heading">
          <div>
            <span>CURATED JOURNEYS</span>
            <h3>Popular trips</h3>
          </div>

          <button onClick={() => navigate("/trips")}>
            See all trips →
          </button>
        </div>

        {trips.length === 0 ? (
          <EmptyState
            title="No trips available"
            message="Create your first trip to display it here."
            actionText="Explore Trips"
            onAction={() => navigate("/trips")}
          />
        ) : (
          <div className="popular-grid">
            {trips.slice(0, 3).map((trip) => (
              <div
                className="popular-card"
                key={trip.id}
                onClick={() => navigate(`/trips/${trip.id}`)}
              >
                <img src={trip.image} alt={trip.title} />

                <div className="popular-overlay">
                  <span>{trip.category}</span>

                  <h3>{trip.title}</h3>

                  <div>
                    <span>{trip.destination}</span>

                    <strong>
                      ${Number(trip.price || 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}