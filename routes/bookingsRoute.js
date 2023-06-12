const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Hotel = require("../models/hotel");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51NHNsGD4TiwA6UHXf1A7Qsw7RvjBSErhcJ2eZWaNEyB5sQ35FbBjeEWscJDYwlOH5T36G7lJkYWmbDWNcV6DRy2q00HvZeh8SS')

router.post("/bookHotel", async (req, res) => {
  const {
    hotel,
    userId,
    fromDate,
    toDate,
    totalAmount,
    totalDays,
    token
  } = req.body;

  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const payment = await stripe.charges.create(
      {
        amount: totalAmount * 100,
        customer: customer.id,
        currency: 'eur',
        receipt_email: token.email
      },
      {
        idempotencyKey: uuidv4()
      }
    );

    if (payment) {
      const newBooking = new Booking({
        hotel: hotel.name,
        hotelId: hotel._id,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        transactionId: '1234',
      });

      const booking = await newBooking.save();

      await Hotel.findOneAndUpdate(
        { _id: hotel._id },
        {
          $push: {
            currentBookings: {
              bookingID: booking._id,
              fromDate: moment(fromDate).format("DD-MM-YYYY"),
              toDate: moment(toDate).format("DD-MM-YYYY"),
              userId: userId,
              status: booking.status
            }
          }
        }
      );
    }

    res.send("Payment Successful, Your Hotel is booked");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/getBookingsByUserId", async (req, res) => {
  const userId = req.body.userId;

  try {
    const bookings = await Booking.find({ userId: userId });
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
