// UpdateProduct.jsx
import React, { useState, useEffect, Component } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";

function UpdateProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [errol, setErrol] = useState({});

  const [productData, setProductData] = useState({
    name: "",
    price: 0,
    category: "",
    img1: "",
    img2: "",
    img3: "",
    img4: "",
    long_desc: "",
    short_desc: "",
  });
  console.log(params);
  useEffect(() => {
    // Gọi API để lấy thông tin sản phẩm dựa trên ID
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${params.productId}`
        );
        setProductData(response.data.product);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchData();
  }, [params.productId]);
  console.log(productData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
    setErrol({ ...errol, [e.target.name]: "" });
  };
  console.log(productData);
  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Gọi API để cập nhật thông tin sản phẩm
    try {
      const error = {};

      if (!productData.name) {
        error.name = " Please enter name";
      } else if (!productData.price) {
        error.price = " Please enter price";
      } else if (!productData.category) {
        error.category = " Please enter category";
      } else if (!productData.short_desc) {
        error.short_desc = "Please enter short description";
      } else if (!productData.long_desc) {
        error.long_desc = "Please enter long description";
      }
      if (Object.keys(error).length > 0) {
        setErrol(error);
      } else {
        const response = await axios.patch(
          `http://localhost:5000/product/admin/update-product/${params.productId}`,
          productData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          console.log(response.data);
          navigate("/product");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Container className="w-25 text-muted">
        <Form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          style={{ marginTop: "100px" }}
        >
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
            {errol.name && (
              <span className="error text-danger">{errol.name}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
            {errol.price && (
              <span className="error text-danger">{errol.price}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formCatogery">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              name="price"
              value={productData.category}
              onChange={handleChange}
            />
            {errol.category && (
              <span className="error text-danger">{errol.category}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image 1 </Form.Label>
            <img
              className="img-thumbnail "
              src={`${
                productData.img1 || "http://localhost:5000" + productData.img1
              }`}
              style={{ maxWidth: "100px", marginLeft: "10px" }}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image 2 </Form.Label>
            <img
              className="img-thumbnail "
              src={`${
                productData.img2 || "http://localhost:5000" + productData.img2
              }`}
              style={{ maxWidth: "100px", marginLeft: "10px" }}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image 3 </Form.Label>
            <img
              className="img-thumbnail "
              src={`${
                productData.img3 || "http://localhost:5000" + productData.img3
              }`}
              style={{ maxWidth: "100px", marginLeft: "10px" }}
            />
          </Form.Group>
          <Form.Group controlId="formImage">
            <Form.Label>Image 4 </Form.Label>
            <img
              className="img-thumbnail "
              src={`${
                productData.img4 || "http://localhost:5000" + productData.img4
              }`}
              style={{ maxWidth: "100px", marginLeft: "10px" }}
            />
          </Form.Group>
          {/*   <input
            id="custom-file"
            type="file"
            label="Choose file"
            onChange={handleFileChange}
            name="img1"
          /> */}

          <Form.Group controlId="formShort_desc">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="short_desc"
              value={productData.short_desc}
              onChange={handleChange}
            />
            {errol.short_desc && (
              <span className="error text-danger">{errol.short_desc}</span>
            )}
          </Form.Group>
          <Form.Group controlId="formLong_desc">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="long_desc"
              value={productData.long_desc}
              onChange={handleChange}
            />
            {errol.long_desc && (
              <span className="error text-danger">{errol.long_desc}</span>
            )}
          </Form.Group>
          {/* Thêm các trường khác tương tự với các giá trị từ productData */}

          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Update Product
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default UpdateProduct;
