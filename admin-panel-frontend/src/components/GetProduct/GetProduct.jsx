// Import necessary modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

// Define the component
function ProductTable() {
  // State to store the fetched products
  const [products, setProducts] = useState([]);

  // Function to fetch products from MongoDB Atlas
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products'); // Replace "YOUR_API_ENDPOINT" with your actual API endpoint
      setProducts(response.data); // Set the fetched products in the state
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h2 className="my-4">Product Table</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr><th>Serial No</th>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Price</th>
            
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
                
              <td>{product.productsrno}</td>
              <td>{product.name}</td>
              <td>
              <img src={product.imagePath} alt={product.name} style={{ width: "auto", height: "100px", objectFit:"contain" }} />
              </td>
              <td>{product.description}</td>
              <td>{product.category}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Export the component
export default ProductTable;
