import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  Users,
  MapPin,
  Clock,
  Pencil,
} from "lucide-react";

export default function TripDetails({
  trip,
  navigate,
}) {
  if (!trip) {
    return (
      <div className="empty-state">
        <h3>Trip not found</h3>
        <button
          className="primary-btn"
          onClick={() => navigate("/trips")}
        >
          Back to trips
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/trips")}>
        <ArrowLeft size={17} />
        Back to trips
      </button>

      <div className="details-hero">
        <img src={trip.image} alt={trip.title} />

        <div className="details-hero-overlay">
          <span>{trip.category}</span>
          <h2>{trip.title}</h2>

          <p>
            <MapPin size={15} />
            {trip.destination}, {trip.country}
          </p>
        </div>
      </div>

      <div className="details-grid">
        <div className="details-main">
          <div className="detail-info-row">
            <div>
              <span>Duration</span>
              <strong>
                <Clock size={16} />
                {trip.duration}
              </strong>
            </div>

            <div>
              <span>Departure</span>
              <strong>
                <CalendarDays size={16} />
                {trip.startDate}
              </strong>
            </div>

            <div>
              <span>Travelers</span>
              <strong>
                <Users size={16} />
                {trip.booked}/{trip.capacity}
              </strong>
            </div>
          </div>

          <section className="content-section">
            <span>ABOUT THIS JOURNEY</span>
            <h3>Everything you need for an unforgettable trip.</h3>
            <p>{trip.description}</p>
          </section>
        </div>

        <aside className="booking-price-card">
          <span>STARTING FROM</span>
          <strong>${trip.price.toLocaleString()}</strong>

          <div className="availability">
            <div>
              <span>Booked</span>
              <strong>{trip.booked}</strong>
            </div>

            <div>
              <span>Available</span>
              <strong>{trip.capacity - trip.booked}</strong>
            </div>
          </div>

          <button
            className="primary-btn full-btn"
            onClick={() => navigate("/bookings")}
          >
            Book this trip
          </button>

          <button
            className="secondary-btn full-btn"
            onClick={() =>
              navigate(`/trips/${trip.id}/edit`)
            }
          >
            <Pencil size={16} />
            Edit trip
          </button>
        </aside>
      </div>
    </div>
  );
}