import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quanity:{
    type:Number,
    required:true,
    min:1,
  },
  price:{
    type:Number,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
},{_id:false});

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
    items: [OrderItemSchema],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subtotal: Number,
    GST: Number,
    total: Number,
  },
  { timestamps: true },
);

export default mongoose.model("Orders",OrderSchema);