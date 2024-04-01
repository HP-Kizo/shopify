import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../context/useFetch";

function Product() {
  const param = useParams();
  const navigate = useNavigate();
  const { data, isLoading, status, error, reFetch } = useFetch(
    `/product/admin/getProducts`
  );
  const handleUpdate = (productId) => {
    // Điều hướng đến trang cập nhật sản phẩm với ID cụ thể
    navigate(`${productId}`);
  };

  // Hàm xóa sản phẩm
  const handleDelete = async (productId) => {
    try {
      // Gửi yêu cầu DELETE đến server để xóa sản phẩm
      const shouldDelete = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (shouldDelete) {
        const respon = await axios({
          url: `http://localhost:5000/product/admin/delete/${productId}`,
          method: "DELETE",
          withCredentials: true,
        });
        if (respon.status === 200) {
          console.log(respon.data);
          reFetch();
        }
        // Gọi lại hàm reFetch để cập nhật danh sách sản phẩm sau khi xóa
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const separateNumber = useSelector((state) => state.separateNumber);

  return (
    <>
      <NavBar></NavBar>

      <div className="container-fluid d-flex  justify-content-between align-items-center mt-5 p-5 w-75">
        <h2 className="mt-3  fs-1 fst-italic ">PRODUCT</h2>
        <p className="mt-5 fw-bold text-secondary">PRODUCT</p>
      </div>
      <div class="container mt-4">
        <div class="input-container w-25">
          <input
            type="text"
            class="form-control"
            id="exampleInput"
            placeholder="Enter Search"
          />
        </div>
      </div>
      {!isLoading && status === 200 && (
        <div className="container text-center  bg-transparent">
          <div className="container mt-5">
            <div className="container">
              <table class="table table-striped ">
                <thead>
                  <tr className="table-light py-5 fst-italic fw-bolder mb-0">
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Image</th>
                    <th scope="col">Category</th>
                    <th scope="col">Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.length > 0 &&
                    data.map((res) => {
                      return (
                        <tr>
                          <td>{res._id}</td>
                          <td className="mt-5">{res.name}</td>
                          <td>{separateNumber(res.price)} VND</td>
                          <td className="col-1 ">
                            <img
                              className="img-thumbnail "
                              src={`${
                                res.img1 || "http://localhost:5000" + res.img1
                              }`}
                            />
                          </td>
                          <td>{res.category}</td>
                          <td className="">
                            <button
                              className="btn btn-success"
                              onClick={() => handleUpdate(res._id)}
                            >
                              Update
                            </button>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(res._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product;
