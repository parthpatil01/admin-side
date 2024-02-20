import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import addItemImg from "../../assets/add.png";
import deleteItemImg from "../../assets/delete.png";
import updateItemImg from "../../assets/update.png";
import getItemImg from "../../assets/get.png";

function MainPage() {
  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>

      <section className="container mx-auto my-auto">
        <div className="row justify-content-center">

          <div className="col-md-2 mb-3">
            <Link to="/get-product" className="card pt-3 d-block text-decoration-none">
              <img src={getItemImg} className="card-img-top" alt="Add Product" style={{ width: "100px", height: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">Get Product</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-2 mb-3">
            <Link to="/add-product" className="card pt-3 d-block text-decoration-none">
              <img src={addItemImg} className="card-img-top" alt="Add Product" style={{ width: "100px", height: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">Add Product</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-2 mb-3">
            <Link to="/update-product" className="card pt-3 d-block text-decoration-none">
              <img src={updateItemImg} className="card-img-top" alt="Add Product" style={{ width: "100px", height: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">Update Product</h5>
              </div>
            </Link>
          </div>

          <div className="col-md-2 mb-3">
            <Link to="/delete-product" className="card pt-3 d-block text-decoration-none">
              <img src={deleteItemImg} className="card-img-top" alt="Add Product" style={{ width: "100px", height: "100px" }} />
              <div className="card-body">
                <h5 className="card-title">Delete Product</h5>
              </div>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

export default MainPage;
