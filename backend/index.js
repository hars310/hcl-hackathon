const express = require('express');
const cors = require('cors');
const connectDB = require("./dbconnection/connectDB");
const bankChargesRoutes = require("./routes/bankChargesRoutes"); 
const transactionTimeRoutes  = require("./routes/transactionTimeRoutes");
const bankRoutes = require("./routes/bankRoutes");
const transactionRoutes = require("./routes/transactionRoute");

require('dotenv').config();
const app = express();
const port = 3000;


connectDB();
app.use(cors()); 
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Successful response.');
});


//routes
app.use('/api/banks', bankRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bankcharges', bankChargesRoutes);
app.use('/api/transactions-time', transactionTimeRoutes);



app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});