const mongoose = require('mongoose');

const dbConnect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(`MongoDB connected`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = dbConnect;