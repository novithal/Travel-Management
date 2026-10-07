import React from "react";
import {
  MapPin,
  CalendarDays,
  Users,
  MoreHorizontal,
} from "lucide-react";

export default function TripCard({
  trip,
  onView,
  onEdit,
  onDelete,
}) {
  return (
    <article className="trip-card">
      <div className="trip-image-wrap">
        <img src={trip.image} alt={trip.title} />

        <span className={`trip-status ${trip.status === "Almost Full" ? "warning" : ""}`}>
          {trip.status}
        </span>

        <div className="trip-actions">
          <button onClick={() => onView(trip)}>
            View
          </button>

          <button onClick={() => onEdit(trip)}>
            Edit
          </button>

          <button className="danger-text" onClick={() => onDelete(trip)}>
            Delete
          </button>
        </div>
      </div>

      <div className="trip-content">
        <div className="trip-location">
          <MapPin size={14} />
          {trip.destination}, {trip.country}
        </div>

        <h3>{trip.title}</h3>

        <p>{trip.description}</p>

        <div className="trip-meta">
          <span>
            <CalendarDays size={15} />
            {trip.duration}
          </span>

          <span>
            <Users size={15} />
            {trip.booked}/{trip.capacity}
          </span>
        </div>

        <div className="trip-footer">
          <div>
            <small>Starting from</small>
            <strong>${trip.price.toLocaleString()}</strong>
          </div>

          <button
            className="round-arrow"
            onClick={() => onView(trip)}
          >
            →
          </button>
        </div>
      </div>
    </article>
  );
}