const express = require("express");
const cors = require("cors");
const app = express();

const dbConfig = require('./db');
const hotelsRoute = require('./routes/hotelsRoute');

app.use(cors());
app.use(express.json())
app.use('/api/hotels', hotelsRoute);
app.get('/book/:id', hotelsRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Node Server Started"));