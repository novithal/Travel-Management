import React from "react";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  User,
  MapPin,
  Users,
} from "lucide-react";

export default function BookingDetails({
  booking,
  navigate,
}) {
  if (!booking) {
    return (
      <div className="empty-state">
        <h3>Booking not found</h3>
        <button
          className="primary-btn"
          onClick={() => navigate("/bookings")}
        >
          Back to bookings
        </button>
      </div>
    );
  }

  return (
    <div className="page">
      <button
        className="back-btn"
        onClick={() => navigate("/bookings")}
      >
        <ArrowLeft size={17} />
        Back to bookings
      </button>

      <div className="booking-detail-header">
        <div>
          <span>BOOKING DETAILS</span>
          <h2>{booking.id}</h2>
          <p>{booking.trip}</p>
        </div>

        <div className="booking-detail-status">
          <span
            className={`status-pill ${
              booking.bookingStatus === "Confirmed"
                ? "green"
                : "orange"
            }`}
          >
            {booking.bookingStatus}
          </span>

          <span
            className={`status-pill ${
              booking.paymentStatus === "Paid"
                ? "green"
                : "orange"
            }`}
          >
            {booking.paymentStatus}
          </span>
        </div>
      </div>

      <div className="booking-detail-grid">
        <div className="detail-card">
          <span>TRAVELER</span>

          <div className="traveler-large">
            <div className="avatar large">
              {booking.customer
                .split(" ")
                .map((x) => x[0])
                .join("")}
            </div>

            <div>
              <h3>{booking.customer}</h3>
              <p>Primary traveler</p>
            </div>
          </div>

          <div className="detail-list">
            <div>
              <User size={17} />
              <span>Customer</span>
              <strong>{booking.customer}</strong>
            </div>

            <div>
              <Users size={17} />
              <span>Travelers</span>
              <strong>{booking.travelers}</strong>
            </div>

            <div>
              <MapPin size={17} />
              <span>Destination</span>
              <strong>{booking.destination}</strong>
            </div>
          </div>
        </div>

        <div className="detail-card">
          <span>RESERVATION</span>

          <div className="detail-list">
            <div>
              <CalendarDays size={17} />
              <span>Travel date</span>
              <strong>{booking.date}</strong>
            </div>

            <div>
              <CreditCard size={17} />
              <span>Total amount</span>
              <strong>
                ${booking.amount.toLocaleString()}
              </strong>
            </div>

            <div>
              <CreditCard size={17} />
              <span>Payment status</span>
              <strong>{booking.paymentStatus}</strong>
            </div>
          </div>

          <div className="invoice-box">
            <span>Total paid</span>
            <strong>
              $
              {booking.paymentStatus === "Paid"
                ? booking.amount.toLocaleString()
                : "0"}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}