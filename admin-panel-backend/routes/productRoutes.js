const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const xlsx = require('xlsx');

router.use(express.json());

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

const memoryStorage = multer.memoryStorage();
const memoryUpload = multer({ storage: memoryStorage });

// Function to add image URL to product object
const addImageURL = (product, req) => ({
  ...product._doc,
  imagePath: `${req.protocol}://${req.get('host')}${product.imagePath}`
});

// Route to fetch all products or a single product by serial number
router.get('/', async (req, res) => {
  try {
    let products;
    if (req.query.productsrno) {
      const product = await Product.findOne({ productsrno: req.query.productsrno });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      products = [addImageURL(product, req)]; // Convert single product to array
    } else {
      products = await Product.find();
      // Modify each product to include the full URL of the image
      products = products.map(product => addImageURL(product, req));
    }
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Internal Server Error' });
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
      productsrno: req.body.productsrno,
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

//Update a product
router.put('/', upload.single('image'), async (req, res) => {
  const productsrno = req.query.productsrno;
  
  try {
    // Find the product by SR number
    const product = await Product.findOne({ productsrno: productsrno });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update product details
    product.name = req.body.name;
    product.description = req.body.description;
    product.category = req.body.category;
    product.price = req.body.price;
    product.quantity = req.body.quantity;
    if (req.file) {
      product.imagePath = '/uploads/' + req.file.filename;
    }

    // Save the updated product
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Delete a product

router.delete('/', async (req, res) => {
  try {
    if (!req.query.productsrno) {
      return res.status(400).json({ message: 'Product serial number is required' });
    }

    const product = await Product.findOneAndDelete({ productsrno: req.query.productsrno });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Bulk upload products

router.post('/bulk-export', memoryUpload.single('file'), (req, res) => {
  
  const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
  
  const sheetName = workbook.SheetNames[0];

  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  
  Product.insertMany(excelData)
      .then(() => {
          res.status(200).send('Data uploaded successfully');
      })
      .catch(err => {
          res.status(500).send('Error uploading data');
      });
});

module.exports = router;
