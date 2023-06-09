const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Hotel = require("../models/hotel");

router.post("/bookHotel", async (req, res) => {
  const { hotel, userId, fromDate, toDate, totalAmount, totalDays } = req.body;

  try {
    const newBooking = new Booking({
      hotel: hotel.name,
      hotelId: hotel._id,
      userId,
      fromDate: new Date(fromDate).toISOString(),
      toDate: new Date(toDate).toISOString(),
      totalAmount,
      totalDays,
      transactionId: '1234',
    });

    const booking = await newBooking.save();

    const hotelTemp = await Hotel.findOne({ _id: hotel._id });

    hotelTemp.currentBookings.push({
      bookingId: booking._id,
      fromDate: new Date(fromDate).toISOString(),
      toDate: new Date(toDate).toISOString(),
      userId: userId,
      status: booking.status,
    });

    await hotelTemp.save();

    res.status(200).json({ message: 'Hotel Booked Successfully', booking });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
