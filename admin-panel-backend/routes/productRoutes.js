const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');


// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Specify the filename for uploaded files
  }
});

const upload = multer({ storage: storage });

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Add a new product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let imagePath = ''; // Initialize imagePath

    // Check if req.file is present (file upload)
    if (req.file) {
      imagePath = '/uploads/' + req.file.filename; // Assuming uploads directory is used to store images
    }

    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      quantity: req.body.quantity,
      imagePath: imagePath // Save imagePath in the database
    });

    const savedProduct = await product.save();
    res.json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
