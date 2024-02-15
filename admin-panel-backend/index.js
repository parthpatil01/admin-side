// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/products', require('./routes/productRoutes'));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/admin-antique', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


