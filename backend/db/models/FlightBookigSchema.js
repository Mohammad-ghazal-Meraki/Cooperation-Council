const mongoose = require("mongoose");

const FlightBookigSchema = mongoose.Schema({
  flightId: {
    type: mongoose.Schema.Types._ObjectId,
    ref: "Flight",
    required: true,
  },
  UsertId: {
    type: mongoose.Schema.Types._ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("FlightBookig", FlightBookigSchema);
