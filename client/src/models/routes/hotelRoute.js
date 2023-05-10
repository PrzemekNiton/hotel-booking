const express = require("express");
const router = express.Router(); 

const Hotel = require('../models/hotel')

router.get("getAllHotels", async(req, res) => {

    try{
        const hotels = await Hotel.find({})
        return res.json({hotels});
    } catch (error){
        return res.status(400).json({message: error});
    }

});

module.exports = router;