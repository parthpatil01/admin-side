import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductInsert = () => {
  const [srno, setsrno] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  /* excel upload*/
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleBulkSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/api/products/bulk-export', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Bulk Export successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error);
    }
  };
  /* excel upload*/


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('productsrno', parseFloat(srno))
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', parseFloat(price));
      formData.append('quantity', parseFloat(quantity));
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      alert('Product Inserted successfully');
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert(error);

    }
  };


  return (
    <div className="container mt-5 pt-4 mb-2">
      
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow">
        <div className="card-header fs-4">Add Product</div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Product SR No" value={srno} onChange={(e) => setsrno(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
              </div>
              <div className="form-group">
                <input type="file" className="form-control-file" accept="image/*" onChange={handleImageChange} />
              </div>
              <button type="button" className="btn btn-primary btn-block" onClick={handleSubmit}>Add Product</button>
            </form>

            <div className="text-center mt-3">
              <h5>Add bulk products</h5>
            </div>

            <form onSubmit={handleBulkSubmit}>
              <div className="form-group">
                <input type="file" name='file'  className="form-control-file" accept=".xlsx" onChange={handleFileChange} />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Upload File</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>

  );
};

export default ProductInsert;

