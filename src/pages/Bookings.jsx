import React, { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Eye,
} from "lucide-react";
import { initialBookings } from "../data/data";

export default function Bookings({ navigate }) {
  const [bookings] = useState(() => {
    return JSON.parse(
      localStorage.getItem("travel_bookings") ||
        JSON.stringify(initialBookings)
    );
  });

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [bookingStatus, setBookingStatus] = useState("All");
  const [paymentStatus, setPaymentStatus] = useState("All");
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    let result = [...bookings];

    if (search) {
      result = result.filter((booking) =>
        `${booking.id} ${booking.customer} ${booking.trip}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (destination !== "All") {
      result = result.filter(
        (booking) => booking.destination === destination
      );
    }

    if (bookingStatus !== "All") {
      result = result.filter(
        (booking) => booking.bookingStatus === bookingStatus
      );
    }

    if (paymentStatus !== "All") {
      result = result.filter(
        (booking) => booking.paymentStatus === paymentStatus
      );
    }

    if (sort === "amount-high") {
      result.sort((a, b) => b.amount - a.amount);
    }

    if (sort === "amount-low") {
      result.sort((a, b) => a.amount - b.amount);
    }

    if (sort === "newest") {
      result.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
    }

    return result;
  }, [
    bookings,
    search,
    destination,
    bookingStatus,
    paymentStatus,
    sort,
  ]);

  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <span>RESERVATIONS</span>
          <h2>Bookings</h2>
          <p>Track reservations and payment activity.</p>
        </div>
      </div>

      <div className="booking-filters">
        <div className="filter-search">
          <Search size={17} />
          <input
            placeholder="Search booking, customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="All">All destinations</option>
          <option>Bali</option>
          <option>Santorini</option>
          <option>Maldives</option>
          <option>Dubai</option>
          <option>Paris</option>
        </select>

        <select
          value={bookingStatus}
          onChange={(e) => setBookingStatus(e.target.value)}
        >
          <option value="All">All booking status</option>
          <option>Confirmed</option>
          <option>Pending</option>
          <option>Cancelled</option>
        </select>

        <select
          value={paymentStatus}
          onChange={(e) => setPaymentStatus(e.target.value)}
        >
          <option value="All">All payments</option>
          <option>Paid</option>
          <option>Pending</option>
          <option>Refunded</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="amount-high">Amount high</option>
          <option value="amount-low">Amount low</option>
        </select>

        <button className="filter-icon-btn">
          <SlidersHorizontal size={17} />
        </button>
      </div>

      <div className="booking-overview">
        <div>
          <span>Total bookings</span>
          <strong>1,248</strong>
        </div>

        <div>
          <span>Confirmed</span>
          <strong>984</strong>
        </div>

        <div>
          <span>Pending</span>
          <strong>128</strong>
        </div>

        <div>
          <span>Revenue</span>
          <strong>$84,290</strong>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <span>BOOKING MANAGEMENT</span>
            <h3>{filtered.length} reservations</h3>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Booking</th>
                <th>Customer</th>
                <th>Trip</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Booking</th>
                <th>Payment</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((booking) => (
                <tr key={booking.id}>
                  <td>
                    <strong>{booking.id}</strong>
                  </td>

                  <td>{booking.customer}</td>

                  <td>
                    <div className="trip-name-cell">
                      <strong>{booking.trip}</strong>
                      <span>{booking.destination}</span>
                    </div>
                  </td>

                  <td>{booking.date}</td>

                  <td>
                    <strong>${booking.amount.toLocaleString()}</strong>
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        booking.bookingStatus === "Confirmed"
                          ? "green"
                          : booking.bookingStatus === "Pending"
                          ? "orange"
                          : "red"
                      }`}
                    >
                      {booking.bookingStatus}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        booking.paymentStatus === "Paid"
                          ? "green"
                          : booking.paymentStatus === "Pending"
                          ? "orange"
                          : "gray"
                      }`}
                    >
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td>
                    <button
                      className="table-action"
                      onClick={() =>
                        navigate(`/bookings/${booking.id}`)
                      }
                    >
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!filtered.length && (
          <div className="empty-state compact">
            <h3>No bookings found</h3>
            <p>Try changing your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}