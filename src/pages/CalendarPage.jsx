import React, { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  CalendarDays,
} from "lucide-react";
import { initialBookings } from "../data/data";

export default function CalendarPage() {
  const [month, setMonth] = useState(new Date(2026, 9, 1));

  const bookings = JSON.parse(
    localStorage.getItem("travel_bookings") ||
      JSON.stringify(initialBookings)
  );

  const year = month.getFullYear();
  const currentMonth = month.getMonth();

  const days = useMemo(() => {
    const first = new Date(year, currentMonth, 1).getDay();
    const total = new Date(year, currentMonth + 1, 0).getDate();

    const cells = [];

    for (let i = 0; i < first; i++) {
      cells.push(null);
    }

    for (let i = 1; i <= total; i++) {
      cells.push(i);
    }

    return cells;
  }, [year, currentMonth]);

  function hasBooking(day) {
    const date = `${year}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return bookings.filter((booking) => booking.date === date);
  }

  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <span>SCHEDULE</span>
          <h2>Travel calendar</h2>
          <p>Keep track of departures and reservations.</p>
        </div>

        <div className="calendar-controls">
          <button
            onClick={() =>
              setMonth(
                new Date(year, currentMonth - 1, 1)
              )
            }
          >
            <ChevronLeft size={17} />
          </button>

          <strong>
            {month.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </strong>

          <button
            onClick={() =>
              setMonth(
                new Date(year, currentMonth + 1, 1)
              )
            }
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      <div className="calendar-card">
        <div className="calendar-weekdays">
          {[
            "Sun",
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
          ].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>

        <div className="calendar-grid">
          {days.map((day, index) => {
            const dayBookings = day ? hasBooking(day) : [];

            return (
              <div
                className={`calendar-day ${
                  !day ? "empty" : ""
                }`}
                key={index}
              >
                {day && (
                  <>
                    <span className="day-number">{day}</span>

                    {dayBookings.map((booking) => (
                      <div
                        className="calendar-event"
                        key={booking.id}
                      >
                        <CalendarDays size={12} />
                        {booking.customer}
                      </div>
                    ))}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}