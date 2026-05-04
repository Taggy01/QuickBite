export default function OrderCard({ order }) {
  const { id, date, status, items, paymentMethod } = order;
  const subtotal = items.reduce((sum, i) => sum + i.price, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-50 text-green-800";
      case "pending":
        return "bg-yellow-50 text-yellow-800";
      case "cancelled":
        return "bg-red-50 text-red-800";
      default:
        return "bg-neutral-100 text-neutral-600";
    }
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden w-full max-w-lg">
      <div className="flex justify-between items-center px-5 py-4 border-b border-neutral-100">
        <div>
          <p className="text-sm font-medium text-neutral-900">Order #{id}</p>
          <p className="text-xs text-neutral-400 mt-0.5">{date}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(status)}`}>
        {status}
      </span>
    </div>

      {
    items.map((item, idx) => (
      <div
        key={idx}
        className="flex items-center gap-3 px-5 py-3.5 border-b border-neutral-100 last:border-b-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-13 h-13 rounded-lg object-cover bg-neutral-100 shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-neutral-900">{item.name}</p>
          <p className="text-xs text-neutral-400 mt-0.5">Qty: {item.qty}</p>
        </div>
        <span className="text-sm font-medium text-neutral-900 font-mono">₹{item.price}</span>
      </div>
    ))
  }

      <div className="px-5 py-4">
        <div className="flex justify-between text-sm text-neutral-500 mb-2">
          <span>Subtotal</span><span className="font-mono text-neutral-800">₹{subtotal}</span>
        </div>
        <div className="flex justify-between text-sm text-neutral-500 mb-3">
          <span>GST (5%)</span><span className="font-mono text-neutral-800">₹{gst}</span>
        </div>
        <div className="border-t border-neutral-100 pt-3 flex justify-between text-sm font-medium text-neutral-900">
          <span>Total</span><span className="font-mono">₹{total}</span>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-neutral-100 flex justify-between">
        <span className="text-xs text-neutral-400">{paymentMethod}</span>
      </div>
    </div >
  );
}