const mongoose = require("mongoose");

// creatin schema

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    cars: [
      {
        carId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    address: {
      type: Object,
    },

    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);
