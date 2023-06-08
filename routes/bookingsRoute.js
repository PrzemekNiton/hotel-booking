const express = require("express");
const router = express.Router();
const Booking = require("../models/booking")

router.post("/bookHotel",async (req, res) => {
    const {
        hotel,
        userId,
        fromDate,
        toDate,
        totalAmount,
        totalDays } = req.body

    try{
       const newBooking = new Booking({
           hotel: hotel.name,
           hotelId: hotel._id,
           userId,
           fromDate,
           toDate,
           totalAmount,
           totalDays,
           transactionId : '1234',
       })
        const booking = await newBooking.save();
        res.send('Hotel booked');
    }catch (error){
        return res.status(400).json({error})
    }
});

module.exports = router


