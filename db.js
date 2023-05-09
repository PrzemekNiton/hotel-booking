//podlaczenie do MongoDB
const mongoose = require ("mongoose");

var mongoURL = 'mongodb+srv://przemekniton:fzVDs1QhUSprYhSK@cluster0.hstnqzu.mongodb.net/Booking'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser : true})

var connection = mongoose.connection

connection.on('error', () =>{

    console.log(`Mongo DB Connection failed`)
})

connection.on('connected' , () => {
    console.log(`Mongo DB Connection Successful`)
})

module.exports = mongoose