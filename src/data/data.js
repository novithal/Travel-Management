export const destinations = [
  {
    id: 1,
    name: "Bali",
    country: "Indonesia",
    image:
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=80",
    trips: 12,
    rating: 4.9,
  },
  {
    id: 2,
    name: "Santorini",
    country: "Greece",
    image:
    "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=900&q=80",
    trips: 8,
    rating: 4.8,
  },
  {
    id: 3,
    name: "Swiss Alps",
    country: "Switzerland",
    image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",

    trips: 9,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Maldives",
    country: "Maldives",
    image:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    trips: 15,
    rating: 5,
  },
  {
    id: 5,
    name: "Dubai",
    country: "UAE",
    image:
          "https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=80",

    trips: 11,
    rating: 4.7,
  },
  {
    id: 6,
    name: "Paris",
    country: "France",
    image:
          "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=900&q=80",

    trips: 10,
    rating: 4.8,
  },
];

export const initialTrips = [
  {
    id: 101,
    title: "Bali Tropical Escape",
    destination: "Bali",
    country: "Indonesia",
    category: "Beach",
    startDate: "2026-10-10",
    endDate: "2026-10-16",
    duration: "7 Days",
    price: 1299,
    capacity: 24,
    booked: 18,
    status: "Active",
    image:
          "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1000&q=80",

    description:
      "A relaxing tropical journey through beaches, temples, waterfalls and local culture.",
  },
  {
    id: 102,
    title: "Santorini Sunset Journey",
    destination: "Santorini",
    country: "Greece",
    category: "Luxury",
    startDate: "2026-10-18",
    endDate: "2026-10-23",
    duration: "6 Days",
    price: 1899,
    capacity: 18,
    booked: 14,
    status: "Active",
    image:
          "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1000&q=80",

    description:
      "Experience beautiful sunsets, white villages and luxury island living.",
  },
  {
    id: 103,
    title: "Swiss Alps Adventure",
    destination: "Swiss Alps",
    country: "Switzerland",
    category: "Adventure",
    startDate: "2026-11-05",
    endDate: "2026-11-12",
    duration: "8 Days",
    price: 2299,
    capacity: 20,
    booked: 11,
    status: "Active",
    image:
          "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80",

    description:
      "Mountain trains, snowy peaks and unforgettable alpine landscapes.",
  },
  {
    id: 104,
    title: "Maldives Island Retreat",
    destination: "Maldives",
    country: "Maldives",
    category: "Luxury",
    startDate: "2026-10-28",
    endDate: "2026-11-03",
    duration: "7 Days",
    price: 2499,
    capacity: 16,
    booked: 15,
    status: "Almost Full",
    image:
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
    description:
      "Private villas, turquoise lagoons and premium island experiences.",
  },
  {
    id: 105,
    title: "Dubai City Lights",
    destination: "Dubai",
    country: "UAE",
    category: "City",
    startDate: "2026-11-14",
    endDate: "2026-11-19",
    duration: "6 Days",
    price: 1599,
    capacity: 30,
    booked: 21,
    status: "Active",
    image:
          "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1000&q=80",

    description:
      "Explore modern architecture, desert adventures and luxury shopping.",
  },
  {
    id: 106,
    title: "Paris Weekend Escape",
    destination: "Paris",
    country: "France",
    category: "City",
    startDate: "2026-12-01",
    endDate: "2026-12-05",
    duration: "5 Days",
    price: 1399,
    capacity: 25,
    booked: 9,
    status: "Active",
    image:
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1000&q=80",

    description:
      "A romantic city break covering iconic landmarks and French cuisine.",
  },
];

export const initialCustomers = [
  {
    id: 1,
    name: "Oviya Kumar",
    email: "oviya@example.com",
    phone: "+1 202 555 0181",
    trips: 4,
    spent: 6480,
    status: "Active",
  },
  {
    id: 2,
    name: "Dinesh Karna",
    email: "dinesh@example.com",
    phone: "+1 202 555 0192",
    trips: 2,
    spent: 3290,
    status: "Active",
  },
  {
    id: 3,
    name: "Sophia Mani",
    email: "sophia@example.com",
    phone: "+44 7700 900123",
    trips: 6,
    spent: 9250,
    status: "VIP",
  },
  {
    id: 4,
    name: "Jaya Kamali",
    email: "jaya@example.com",
    phone: "+61 412 345 678",
    trips: 1,
    spent: 1299,
    status: "Active",
  },
  {
    id: 5,
    name: "Elakiya Bharathi",
    email: "elakiya@example.com",
    phone: "+1 303 555 0112",
    trips: 3,
    spent: 4590,
    status: "Active",
  },
];

export const initialBookings = [
  {
    id: "BK-1001",
    customer: "Oviya kumar",
    trip: "Bali Tropical Escape",
    destination: "Bali",
    date: "2026-10-10",
    amount: 1299,
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    travelers: 2,
  },
  {
    id: "BK-1002",
    customer: "Dinesh Karna",
    trip: "Santorini Sunset Journey",
    destination: "Santorini",
    date: "2026-10-18",
    amount: 1899,
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    travelers: 2,
  },
  {
    id: "BK-1003",
    customer: "Sophia Mani",
    trip: "Maldives Island Retreat",
    destination: "Maldives",
    date: "2026-10-28",
    amount: 2499,
    bookingStatus: "Pending",
    paymentStatus: "Pending",
    travelers: 1,
  },
  {
    id: "BK-1004",
    customer: "Jaya Kamali",
    trip: "Dubai City Lights",
    destination: "Dubai",
    date: "2026-11-14",
    amount: 1599,
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    travelers: 1,
  },
  {
    id: "BK-1005",
    customer: "Elakiya Bharathi",
    trip: "Paris Weekend Escape",
    destination: "Paris",
    date: "2026-12-01",
    amount: 1399,
    bookingStatus: "Cancelled",
    paymentStatus: "Refunded",
    travelers: 2,
  },
];