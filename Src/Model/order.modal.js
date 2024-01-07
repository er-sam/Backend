import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const orderSchema = new Schema(
  {
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    buyer: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin: {
      type: Number,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      trim: true,
    },
    totalPrice: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

orderSchema.plugin(mongooseAggregatePaginate);
export const Order = mongoose.model("Order", orderSchema);
