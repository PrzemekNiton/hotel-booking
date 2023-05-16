const mongoose = require("mongoose");

//funckja konstruktora, pozwala na definiowanie schemmatu dla kolekcji tabeli w bazie danych Mongo
const hotelSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    maxGuests:{
        type: Number,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    pricePerNight:{
        type: Number,
        required: true
    },
    imageUrls: [],
    currentBookings: [],
    typeOfHotel:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
}, {
    timestamps: true,
})

const hotelModel = mongoose.model('hotel', hotelSchema)

module.exports = hotelModel