import NavBar from "../Layout/NavBar";
import Footer from "../Layout/Footer";
import Banner from "../Layout/Banner";
import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { HIDE_POPUP } from "../../store/context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    short_desc: "",
    long_desc: "",
  });

  const [errol, setErrol] = useState({});
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
    setSelectedFiles(e.target.files);
    setErrol({ ...errol, [e.target.name]: "" });
  };

  //********************************************************************* */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Lặp qua tất cả các hình ảnh và thêm chúng vào FormData

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
      } else if (!selectedFiles) {
        error.images = "Please select image";
      }
      if (Object.keys(error).length > 0) {
        setErrol(error);
      } else {
        const formData = new FormData();

        // Thêm các trường sản phẩm vào formData
        Object.entries(productData).forEach(([key, value]) => {
          formData.append(key, value);
        });

        // Thêm các tệp tin hình ảnh vào formData
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("images", selectedFiles[i]);
        }
        const respon = await axios({
          url: "http://localhost:5000/product/admin/add-new",
          headers: { "Content-Type": "multipart/form-data" },
          method: "POST",
          withCredentials: true,
          data: formData,
        });
        if (respon.status === 200) {
          console.log(respon.data);
          navigate("/product");
        }
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  return (
    <>
      <NavBar></NavBar>
      {/* <Banner></Banner> */}

      <Container className="w-25 text-muted" style={{ marginTop: "100px" }}>
        <Form encType="multipart/form-data">
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={productData.name}
              onChange={handleChange}
            />
            {errol.name && (
              <span className="error text-danger">{errol.name}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formShortDescription">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter price"
              name="price"
              value={productData.price}
              onChange={handleChange}
            />
            {errol.price && (
              <span className="error text-danger">{errol.price}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter category"
              name="category"
              value={productData.category}
              onChange={handleChange}
            />
            {errol.category && (
              <span className="error text-danger">{errol.category}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formShortDescription">
            <Form.Label>Short Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter short description"
              name="short_desc"
              value={productData.short_desc}
              onChange={handleChange}
            />
            {errol.short_desc && (
              <span className="error text-danger">{errol.short_desc}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formLongDescription">
            <Form.Label>Long Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="Enter long description"
              name="long_desc"
              value={productData.long_desc}
              onChange={handleChange}
            />
            {errol.long_desc && (
              <span className="error text-danger">{errol.long_desc}</span>
            )}
          </Form.Group>

          <Form.Group controlId="formFile">
            <Form.Label>Choose File</Form.Label>

            <Form.Control
              name="images"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />
            {errol.images && (
              <span className="error text-danger">{errol.images}</span>
            )}
          </Form.Group>

          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            className="mt-3"
          >
            Submit
          </Button>
        </Form>
      </Container>
      <Footer></Footer>
    </>
  );
}

export default AddProduct;
