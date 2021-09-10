const express = require("express");
const flightBookingRouter = express.Router();

const {
  getFlightsBookingByUserId,
  creatFlightBooking, deleteFlightBooking, getAllFlightsBooking,updateFlightBooking
} = require("../../controllers/flight/flightBookingController");

flightBookingRouter.post("/", creatFlightBooking);
flightBookingRouter.delete("/:bookingId", deleteFlightBooking);
flightBookingRouter.get("/allBooking/:userId", getFlightsBookingByUserId);
flightBookingRouter.get("/allBooking/", getAllFlightsBooking);
flightBookingRouter.put("/:bookingId", updateFlightBooking);





module.exports = flightBookingRouter;
