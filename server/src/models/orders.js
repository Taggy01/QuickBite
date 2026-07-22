import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    status: {
      type: String,
      enum: ["Delivered", "Pending", "Cancelled"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      enum: ["UPI", "Cash", "Card"],
      required: true,
    },
    items: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Foods",
      required: true
    }],
    user: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    subtotal: Number,
    GST: Number,
    total: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Orders",OrderSchema);