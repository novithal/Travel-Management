import React, { useMemo, useState } from "react";
import { Search, Mail, Phone, Users } from "lucide-react";
import { initialCustomers } from "../data/data";

export default function Customers() {
  const [search, setSearch] = useState("");

  const customers = useMemo(() => {
    return initialCustomers.filter((customer) =>
      `${customer.name} ${customer.email}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="page">
      <div className="page-intro">
        <div>
          <span>TRAVELERS</span>
          <h2>Customers</h2>
          <p>Manage your traveler relationships.</p>
        </div>

        <div className="inline-search">
          <Search size={17} />
          <input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="customer-stats">
        <div>
          <Users size={20} />
          <span>Total customers</span>
          <strong>3,842</strong>
        </div>

        <div>
          <span>Active travelers</span>
          <strong>3,214</strong>
        </div>

        <div>
          <span>VIP customers</span>
          <strong>184</strong>
        </div>
      </div>

      <div className="table-card">
        <div className="table-header">
          <div>
            <span>CUSTOMER DATABASE</span>
            <h3>All customers</h3>
          </div>
        </div>

        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Contact</th>
                <th>Trips</th>
                <th>Total spent</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="table-user">
                      <div className="mini-avatar">
                        {customer.name
                          .split(" ")
                          .map((x) => x[0])
                          .join("")}
                      </div>
                      <strong>{customer.name}</strong>
                    </div>
                  </td>

                  <td>
                    <div className="contact-cell">
                      <span>
                        <Mail size={13} />
                        {customer.email}
                      </span>
                      <span>
                        <Phone size={13} />
                        {customer.phone}
                      </span>
                    </div>
                  </td>

                  <td>{customer.trips}</td>

                  <td>
                    <strong>
                      ${customer.spent.toLocaleString()}
                    </strong>
                  </td>

                  <td>
                    <span
                      className={`status-pill ${
                        customer.status === "VIP"
                          ? "purple"
                          : "green"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}