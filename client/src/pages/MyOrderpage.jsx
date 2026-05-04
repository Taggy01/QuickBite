import Navbar from "../components/Navbar";
import OrderCard from "../components/orderCard";
import { useState } from "react";

const orders = [{
  id: 1042,
  date: "23 Apr 2025 · 12:34",
  status: "Delivered",
  paymentMethod: "Paid via UPI",
  items: [
    { name: "Rajma Chawal", qty: 1, price: 90, image: "/images/rajma.jpg" },
    { name: "Veg Salad",    qty: 2, price: 60, image: "/images/salad.jpg" },
    { name: "Lassi",        qty: 1, price: 40, image: "/images/lassi.jpg" },
    { name: "Gulab Jamun",  qty: 2, price: 44, image: "/images/gulab.jpg" },
  ]
},
{
  id: 1042,
  date: "23 Apr 2025 · 12:34",
  status: "Pending",
  paymentMethod: "Paid via UPI",
  items: [
    { name: "Rajma Chawal", qty: 1, price: 90, image: "/images/rajma.jpg" },
    { name: "Veg Salad",    qty: 2, price: 60, image: "/images/salad.jpg" },
    { name: "Lassi",        qty: 1, price: 40, image: "/images/lassi.jpg" },
    { name: "Gulab Jamun",  qty: 2, price: 44, image: "/images/gulab.jpg" },
  ]
},
{
  id: 1042,
  date: "23 Apr 2025 · 12:34",
  status: "Cancelled",
  paymentMethod: "Paid via UPI",
  items: [
    { name: "Rajma Chawal", qty: 1, price: 90, image: "/images/rajma.jpg" },
    { name: "Veg Salad",    qty: 2, price: 60, image: "/images/salad.jpg" },
    { name: "Lassi",        qty: 1, price: 40, image: "/images/lassi.jpg" },
    { name: "Gulab Jamun",  qty: 2, price: 44, image: "/images/gulab.jpg" },
  ]
}];

const filters = ["All", "Delivered", "Pending", "Cancelled"];

export default function MyOrderPage() {
  const [active, setActive] = useState("All");
  const filtered = orders.filter(o =>
    active === "All" || o.status.toLowerCase() === active.toLowerCase()
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center mt-40 px-4">
        <div className="w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-neutral-900">My Orders</h2>
          <p className="text-sm text-neutral-400 mt-1 mb-5">{orders.length} orders this month</p>

          <div className="flex gap-2 mb-6">
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-colors
                  ${active === f
                    ? "bg-neutral-900 text-white border-neutral-900"
                    : "bg-white text-neutral-500 border-neutral-200 hover:border-neutral-400"
                  }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {filtered.map(order => <OrderCard key={order.id} order={order} />)}
          </div>
        </div>
      </div>
    </>
  );
}