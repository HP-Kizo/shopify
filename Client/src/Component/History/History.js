import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import useFetch from "../../context/useFetch";

function History() {
  const param = useParams();
  const navigate = useNavigate();
  const separateNumber = useSelector((state) => state.separateNumber);

  const { data, isLoading, status, error, reFetch } = useFetch(
    param.id ? `/orders/getOrder/${param.id}` : `/orders/getOrders`
  );
  useEffect(() => {
    reFetch(param.id ? `/orders/getOrder/${param.id}` : `/orders/getOrders`);
  }, [param.id]);
  console.log(data);
  return (
    <>
      <NavBar></NavBar>

      <div className="container-fluid d-flex  justify-content-between align-items-center mt-5 p-5 w-75">
        <h2 className="mt-3  fs-1 fst-italic ">HISTORY</h2>
        <p className="mt-5 fw-bold text-secondary">HISTORY</p>
      </div>
      {!isLoading && status === 200 && (
        <div className="container text-center  bg-transparent">
          {!param.id && (
            <table class="table table-striped ">
              <thead>
                <tr className="table-light py-5 fst-italic fw-bolder mb-0">
                  <th scope="col">ID ORDER</th>
                  <th scope="col">ID USER</th>
                  <th scope="col">NAME</th>
                  <th scope="col">PHONE</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">TOTAL</th>
                  <th scope="col">DELIVERY</th>
                  <th scope="col">STATUS</th>
                  <th scope="col">DETAIL</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  Array.isArray(data) &&
                  data.length !== 0 &&
                  data.map((res) => {
                    return (
                      <tr>
                        <th scope="row">{res._id}</th>
                        <td>{res.userId}</td>
                        <td>{res.information.fullname}</td>
                        <td>{res.information.phone}</td>
                        <td>{res.information.address}</td>
                        <td>{res.total}</td>
                        <td>Waiting for progressing</td>
                        <td>{res.status}</td>
                        <td>
                          <button
                            type="button"
                            class="btn btn-light  btn-outline-secondary"
                            onClick={() => {
                              navigate(`/history/${res._id}`);
                            }}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
          {param.id && data.products && (
            <div className="container mt-5">
              <div className="container text-start ">
                <h2 className="fst-italic">INFORMATION ORDER</h2>
                <p className="text-secondary">ID User: {data.userId}</p>
                <p className="text-secondary">
                  Full Name: {data.information.fullname}
                </p>
                <p className="text-secondary">
                  Phone: {data.information.phone}
                </p>
                <p className="text-secondary">
                  Address: {data.information.address}
                </p>
                <p className="text-secondary">
                  Total: {separateNumber(data.total)} VND
                </p>
              </div>
              <div className="container">
                <table class="table table-striped ">
                  <thead>
                    <tr className="table-light py-5 fst-italic fw-bolder mb-0">
                      <th scope="col">ID PRODUCT</th>
                      <th scope="col">IMAGE</th>
                      <th scope="col">NAME</th>
                      <th scope="col">PRICE</th>
                      <th scope="col">COUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.products.length > 0 &&
                      data.products.map((res) => {
                        return (
                          <tr>
                            <td>{res._id}</td>
                            <td className="col-1 ">
                              <img
                                className="img-thumbnail "
                                src={`${res.image}`}
                              />
                            </td>
                            <td className="mt-5">{res.name}</td>
                            <td>{separateNumber(res.price)} VND</td>
                            <td>{res.quantity}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default History;
