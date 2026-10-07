
import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowUpDown,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import TripCard from "../components/TripCard";
import Modal from "../components/Modal";
import { initialTrips, destinations } from "../data/data";

export default function Trips({ navigate, notify }) {
  const [trips, setTrips] = useState(() => {
    return JSON.parse(
      localStorage.getItem("travel_trips") ||
        JSON.stringify(initialTrips)
    );
  });

  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [price, setPrice] = useState("All");
  const [sort, setSort] = useState("default");
  const [deleteTrip, setDeleteTrip] = useState(null);

  /* ==========================================
     PAGINATION STATE
  ========================================== */

  const [currentPage, setCurrentPage] = useState(1);

  // 3 trips per page
  // Change to 6 later if you want 6 cards per page
  const itemsPerPage = 3;

  /* ==========================================
     FILTER + SORT
  ========================================== */

  const filteredTrips = useMemo(() => {
    let result = [...trips];

    if (search) {
      result = result.filter((trip) =>
        `${trip.title} ${trip.destination} ${trip.category}`
          .toLowerCase()
          .includes(search.toLowerCase())
      );
    }

    if (destination !== "All") {
      result = result.filter(
        (trip) => trip.destination === destination
      );
    }

    if (price !== "All") {
      if (price === "low") {
        result = result.filter((trip) => trip.price < 1500);
      }

      if (price === "medium") {
        result = result.filter(
          (trip) => trip.price >= 1500 && trip.price < 2200
        );
      }

      if (price === "high") {
        result = result.filter(
          (trip) => trip.price >= 2200
        );
      }
    }

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [trips, search, destination, price, sort]);

  /* ==========================================
     PAGINATION CALCULATION
  ========================================== */

  const totalPages = Math.ceil(
    filteredTrips.length / itemsPerPage
  );

  const startIndex =
    (currentPage - 1) * itemsPerPage;

  const endIndex =
    startIndex + itemsPerPage;

  const currentTrips = filteredTrips.slice(
    startIndex,
    endIndex
  );

  /* ==========================================
     RESET PAGE WHEN FILTER CHANGES
  ========================================== */

  useEffect(() => {
    setCurrentPage(1);
  }, [search, destination, price, sort]);

  /* ==========================================
     IF CURRENT PAGE BECOMES INVALID
  ========================================== */

  useEffect(() => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  /* ==========================================
     PAGE CLICK
  ========================================== */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    setCurrentPage(page);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* ==========================================
     DELETE
  ========================================== */

  function removeTrip() {
    const updated = trips.filter(
      (trip) => trip.id !== deleteTrip.id
    );

    setTrips(updated);

    localStorage.setItem(
      "travel_trips",
      JSON.stringify(updated)
    );

    setDeleteTrip(null);

    notify("Trip deleted successfully");
  }

  return (
    <div className="page">

      {/* ======================================
          PAGE INTRO
      ====================================== */}

      <div className="page-intro">
        <div>
          <span>CURATED JOURNEYS</span>

          <h2>Trips</h2>

          <p>
            Manage all your travel packages and journeys.
          </p>
        </div>

        <button
          className="primary-btn"
          onClick={() => navigate("/trips/new")}
        >
          <Plus size={17} />
          Create trip
        </button>
      </div>

      {/* ======================================
          FILTER BAR
      ====================================== */}

      <div className="filter-bar">

        <div className="filter-search">
          <Search size={17} />

          <input
            placeholder="Search trips..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        <select
          value={destination}
          onChange={(e) =>
            setDestination(e.target.value)
          }
        >
          <option value="All">
            All destinations
          </option>

          {destinations.map((item) => (
            <option
              key={item.id}
              value={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>

        <select
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        >
          <option value="All">
            All prices
          </option>

          <option value="low">
            Under $1,500
          </option>

          <option value="medium">
            $1,500 - $2,200
          </option>

          <option value="high">
            $2,200+
          </option>
        </select>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
        >
          <option value="default">
            Sort by
          </option>

          <option value="price-low">
            Price: Low to high
          </option>

          <option value="price-high">
            Price: High to low
          </option>

          <option value="name">
            Name
          </option>
        </select>

        <button className="filter-icon-btn">
          <SlidersHorizontal size={17} />
        </button>

      </div>

      {/* ======================================
          RESULTS INFO
      ====================================== */}

      <div className="results-info">

        <span>
          {filteredTrips.length} trips found
        </span>

        <span>
          <ArrowUpDown size={14} />
          Updated just now
        </span>

      </div>

      {/* ======================================
          TRIPS
      ====================================== */}

      {filteredTrips.length ? (
        <>
          <div className="trip-grid">

            {currentTrips.map((trip) => (
              <TripCard
                key={trip.id}
                trip={trip}
                onView={() =>
                  navigate(`/trips/${trip.id}`)
                }
                onEdit={() =>
                  navigate(`/trips/${trip.id}/edit`)
                }
                onDelete={setDeleteTrip}
              />
            ))}

          </div>

          {/* ==================================
              PAGINATION
          ================================== */}

          {totalPages > 1 && (
            <div className="trips-pagination">

              <button
                className="trips-pagination-btn"
                disabled={currentPage === 1}
                onClick={() =>
                  handlePageChange(
                    currentPage - 1
                  )
                }
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              <div className="trips-pagination-numbers">

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    className={
                      currentPage === page
                        ? "trips-page-number active"
                        : "trips-page-number"
                    }
                    onClick={() =>
                      handlePageChange(page)
                    }
                  >
                    {page}
                  </button>
                ))}

              </div>

              <button
                className="trips-pagination-btn"
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  handlePageChange(
                    currentPage + 1
                  )
                }
              >
                Next
                <ChevronRight size={16} />
              </button>

            </div>
          )}

          {/* ==================================
              PAGE INFORMATION
          ================================== */}

          {totalPages > 1 && (
            <div className="trips-page-info">
              Page {currentPage} of {totalPages}
            </div>
          )}

        </>
      ) : (
        <div className="empty-state">

          <h3>No trips found</h3>

          <p>
            Try changing your search or filters.
          </p>

        </div>
      )}

      {/* ======================================
          DELETE MODAL
      ====================================== */}

      <Modal
        open={!!deleteTrip}
        title="Delete trip?"
        onClose={() =>
          setDeleteTrip(null)
        }
      >
        <div className="confirm-content">

          <p>
            Are you sure you want to delete{" "}
            <strong>
              {deleteTrip?.title}
            </strong>
            ?
          </p>

          <div className="modal-actions">

            <button
              className="secondary-btn"
              onClick={() =>
                setDeleteTrip(null)
              }
            >
              Cancel
            </button>

            <button
              className="danger-btn"
              onClick={removeTrip}
            >
              Delete trip
            </button>

          </div>

        </div>
      </Modal>

    </div>
  );
}