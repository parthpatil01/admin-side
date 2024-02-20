import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormControl, InputGroup } from 'react-bootstrap';

function ProductPage() {

  const [productId, setProductId] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    setProductId(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/products/?productsrno=${productId}`);
      const data = await response.data;
     
      setProduct(data);
      setError('');
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
      setError('Product not found');
    }
  };

  const handleDelete = async () => {
    try {

      const response = await axios.delete(`http://localhost:5000/api/products/?productsrno=${productId}`);
  
      const responseData = response.data;
      setProduct(null);
      setError(responseData.message);

      alert('product deleted successfully');
      window.location.reload();

    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column" style={{ minHeight: '100vh' }}>

      <div className="row d-flex align-items-center justify-content-center mb-4" style={{ minWidth: '52vw' }}>
        <div className="col-md-10">
          <input
            type="text"
            placeholder="Enter product ID"
            value={productId}
            onChange={handleInputChange}
            className="form-control border"
          />
        </div>
        <div className="col-md-2">
          <button onClick={handleSearch} className="btn btn-primary btn-block">Search</button>
        </div>
      </div>



      {error && <p>{error}</p>}
      {product && (

        <div style={{ maxWidth: '50vw', width: '50%' }}>
          <div className="card " >
            <div className="card-header" style={{ fontSize: '24px', fontWeight: 'bold' }}>Delete Product</div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-4 d-flex align-items-center justify-content-center">
                  <img src={product[0].imagePath} className="card-img" alt={product[0].name} style={{ maxWidth: 'auto', height: 'auto' }} />
                </div>
                <div className="col-md-8">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Sr. No:</strong> <span className="text-muted">{product[0].productsrno}</span></li>
                    <li className="list-group-item"><strong>Name:</strong> {product[0].name}</li>
                    <li className="list-group-item"><strong>Description:</strong> {product[0].description}</li>
                    <li className="list-group-item"><strong>Category:</strong> {product[0].category}</li>
                    <li className="list-group-item"><strong>Price:</strong> ${product[0].price}</li>
                    <li className="list-group-item"><strong>Quantity:</strong> {product[0].quantity}</li>
                  </ul>
                  <button className="btn btn-danger mt-3" onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default ProductPage;
