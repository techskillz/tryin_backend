const mongoose = require("mongoose");

// creatin schema

const CartSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Cart", CarSchema);
