import React, { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { destinations, initialTrips } from "../data/data";

export default function TripForm({
  trip,
  navigate,
  notify,
}) {
  const editing = !!trip;

  const [form, setForm] = useState(
    trip || {
      title: "",
      destination: "Bali",
      country: "Indonesia",
      category: "Beach",
      startDate: "",
      endDate: "",
      duration: "",
      price: "",
      capacity: 20,
      booked: 0,
      status: "Active",
      image:
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
      description: "",
    }
  );

  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((old) => ({
      ...old,
      [field]: value,
    }));
  }

  function validate() {
    const next = {};

    if (!form.title.trim()) next.title = "Trip title is required";

    if (!form.startDate) {
      next.startDate = "Start date is required";
    }

    if (!form.endDate) {
      next.endDate = "End date is required";
    }

    if (
      form.startDate &&
      form.endDate &&
      form.endDate < form.startDate
    ) {
      next.endDate = "End date must be after start date";
    }

    if (!form.price || Number(form.price) <= 0) {
      next.price = "Enter a valid price";
    }

    if (!form.capacity || Number(form.capacity) <= 0) {
      next.capacity = "Enter valid capacity";
    }

    if (!form.description.trim()) {
      next.description = "Description is required";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  }

  function save() {
    if (!validate()) return;

    const trips = JSON.parse(
      localStorage.getItem("travel_trips") ||
        JSON.stringify(initialTrips)
    );

    let updated;

    if (editing) {
      updated = trips.map((item) =>
        item.id === trip.id
          ? {
              ...form,
              price: Number(form.price),
              capacity: Number(form.capacity),
            }
          : item
      );
    } else {
      updated = [
        ...trips,
        {
          ...form,
          id: Date.now(),
          price: Number(form.price),
          capacity: Number(form.capacity),
          booked: 0,
        },
      ];
    }

    localStorage.setItem("travel_trips", JSON.stringify(updated));

    notify(
      editing
        ? "Trip updated successfully"
        : "Trip created successfully"
    );

    navigate("/trips");
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate("/trips")}>
        <ArrowLeft size={17} />
        Back to trips
      </button>

      <div className="form-header">
        <div>
          <span>{editing ? "EDIT JOURNEY" : "NEW JOURNEY"}</span>
          <h2>{editing ? "Edit trip" : "Create a new trip"}</h2>
        </div>
      </div>

      <div className="form-layout">
        <div className="form-card">
          <div className="form-section-title">
            <span>01</span>
            <div>
              <strong>Trip information</strong>
              <p>Basic details about the journey.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field full">
              Trip title
              <input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g. Bali Tropical Escape"
              />
              {errors.title && <small>{errors.title}</small>}
            </label>

            <label className="field">
              Destination
              <select
                value={form.destination}
                onChange={(e) => {
                  const selected = destinations.find(
                    (x) => x.name === e.target.value
                  );

                  update("destination", e.target.value);
                  update("country", selected?.country || "");
                  update("image", selected?.image || "");
                }}
              >
                {destinations.map((item) => (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="field">
              Category
              <select
                value={form.category}
                onChange={(e) =>
                  update("category", e.target.value)
                }
              >
                <option>Beach</option>
                <option>Luxury</option>
                <option>Adventure</option>
                <option>City</option>
                <option>Nature</option>
              </select>
            </label>

            <label className="field">
              Start date
              <input
                type="date"
                value={form.startDate}
                onChange={(e) =>
                  update("startDate", e.target.value)
                }
              />
              {errors.startDate && <small>{errors.startDate}</small>}
            </label>

            <label className="field">
              End date
              <input
                type="date"
                value={form.endDate}
                onChange={(e) =>
                  update("endDate", e.target.value)
                }
              />
              {errors.endDate && <small>{errors.endDate}</small>}
            </label>
          </div>

          <div className="form-section-title second">
            <span>02</span>
            <div>
              <strong>Pricing & capacity</strong>
              <p>Set your trip price and available seats.</p>
            </div>
          </div>

          <div className="form-grid">
            <label className="field">
              Price
              <input
                type="number"
                value={form.price}
                onChange={(e) =>
                  update("price", e.target.value)
                }
                placeholder="1299"
              />
              {errors.price && <small>{errors.price}</small>}
            </label>

            <label className="field">
              Capacity
              <input
                type="number"
                value={form.capacity}
                onChange={(e) =>
                  update("capacity", e.target.value)
                }
              />
              {errors.capacity && <small>{errors.capacity}</small>}
            </label>

            <label className="field full">
              Description
              <textarea
                rows="5"
                value={form.description}
                onChange={(e) =>
                  update("description", e.target.value)
                }
                placeholder="Describe this journey..."
              />
              {errors.description && (
                <small>{errors.description}</small>
              )}
            </label>
          </div>

          <div className="form-actions">
            <button
              className="secondary-btn"
              onClick={() => navigate("/trips")}
            >
              Cancel
            </button>

            <button className="primary-btn" onClick={save}>
              <Save size={17} />
              {editing ? "Save changes" : "Create trip"}
            </button>
          </div>
        </div>

        <div className="form-preview">
          <span>PREVIEW</span>

          <div className="preview-image">
            <img src={form.image} alt="preview" />
          </div>

          <h3>{form.title || "Your trip title"}</h3>

          <p>
            {form.description ||
              "Your trip description will appear here."}
          </p>

          <div className="preview-price">
            <span>From</span>
            <strong>
              ${Number(form.price || 0).toLocaleString()}
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}