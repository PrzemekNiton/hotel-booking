// instalacja node servera
const express = require("express");

const app = express();

const dbConfig = require ('./db')

const hotelRoute = require('./routes/hotelRoute') 

app.use('/api/hotel', hotelRoute)

const port = process.env.PORT || 5000;

//instalacja nodemon ,który restartuje atumotatycznie dane node.js po zmianie w plikach projektu

app.listen(port, () => console.log(`Node Server Started`));



