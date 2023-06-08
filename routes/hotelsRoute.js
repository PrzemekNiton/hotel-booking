const express = require("express");
const router = express.Router();
const Hotel = require('../models/hotel');

router.get("/getAllHotels", async(req, res) => {

    try{
        const hotels = await Hotel.find({})
        res.send(hotels)
    } catch (error){
        return res.status(400).json({message: error});
    }

});

router.post("/getHotelById", async(req, res) => {

const hotelId = req.body.hotelId

    try{
        const hotel = await Hotel.findOne({_id: hotelId})
        res.send(hotel)
    } catch (error){
        return res.status(400).json({message: error});
    }

});

module.exports = router;