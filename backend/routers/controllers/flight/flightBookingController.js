const flightBookingModle = require("../../../db/models/FlightBookigSchema");
const newFlightModel = require("../../../db/models/flightSchema");

const isBookingExist = (req, res, next) => {
  const { bookingId } = req.params;

  flightBookingModle
    .findOne({ _id: bookingId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `there is No flight booking with this id`,
        });
      } else {
        req.flightId = result.flightId;
        req.lastValueOfAdults = result.adults;

        next();
      }
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: `there is No flight booking with this id`,
      });
    });
};
const isFlightFit = (req, res, next) => {
  const { flightId, lastValueOfAdults } = req;

  //1: get flight id and last number of adults at the booking from past middleWare
  //2:check if flight fit the new value of adults then edit the flight capacity and edit the booking adults value by next()

  newFlightModel
    .findOne({ _id: flightId })
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `Server Error`,
        });
      } else {
        //     console.log(`flight.capacity : ${result.capacity}`);
        if (req.method === "PUT") {
          const { adults } = req.body;
          if (lastValueOfAdults == adults) {
            return res.status(500).json({
              success: false,
              message: `there is no changes to edit`,
            });
          } else if (lastValueOfAdults < adults) {
            //more people come
            if (result.capacity >= adults - lastValueOfAdults) {
              req.body.flightId = flightId;
              req.body.capacity =
                result.capacity - adults + parseInt(lastValueOfAdults);
              //  console.log(' req.body.capacity :', req.body.capacity);

              next();
            } else {
              res.status(500).json({
                success: false,
                message: `the flight not fit for the new adults`,
              });
            }
          } else {
            //    console.log('lastValueOfAdults ', lastValueOfAdults, 'adults  ', adults);
            req.body.flightId = flightId;
            req.body.capacity =
              result.capacity - adults + parseInt(lastValueOfAdults);
            next(); //less people come
          }
        }
      }
    })
    .catch((err) => {
      console.log(err.message);

      res.status(404).json({
        success: false,
        message: `Server Error`,
      });
    });
};

const getFlightsBookingByUserId = (req, res) => {
  const userId = req.body.params;

  flightBookingModle
    .find({ userId })
    .populate("User")
    .populate("Flight")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `there is No flight booking for the user`,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `all flights bookings for the user`,
          flights: result,
        });
      }
    });
};
// middleware presave 
//this.capacity=
const creatFlightBooking = (req, res) => {
  const { flightId, userId } = req.body;
  const newBooking = new flightBookingModle({
    flightId,
    userId,
  })
    .save()
    .then((result) => {
      
      
      console.log(result);

      res.status(201);
      res.json({ success: true, message: "new booking created" });
    })
    .catch((err) => {
      res.status(500);
      console.log(err.message);
      res.json("server error");
    });
};

const getAllFlightsBooking = (req, res) => {
  flightBookingModle
    .find({})
    .populate("userId", "-_id -password -email -__v")
    .populate("flightId", "-_id -__v")
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          success: false,
          message: `there is no flight booking for any user yet`,
        });
      } else {
        return res.status(200).json({
          success: true,
          message: `all flights bookings for all users`,
          flightsBookings: result,
        });
      }
    });
};

module.exports={getFlightsBookingByUserId}
