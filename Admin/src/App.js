import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Component/Home/HomePage";
import LoginPage from "./Component/LoginPage/LoginPage";
import CheckOutPage from "./Component/CheckoutPage/CheckoutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CART, GET_PRODUCT, UPDATE_CART } from "./store/context";
import { GET_ALL_CART } from "./store/context";
import { getTTFB } from "web-vitals";
import { Steam } from "react-bootstrap-icons";
import useFetch from "./context/useFetch";
import NotFound from "./Component/NotFound/NotFound";
import axios from "axios";
import Product from "./Component/Product/Product";
import AddProduct from "./Component/AddProduct/AddProduct";
import UpdateProduct from "./Component/AddProduct/UpdateProduct";
function App() {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route
        path="/login/*"
        element={userLogin ? <Navigate to="/" /> : <LoginPage />}
      ></Route>

      <Route
        path="/product"
        element={userLogin ? <Product></Product> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/product/:productId"
        element={
          userLogin ? <UpdateProduct></UpdateProduct> : <Navigate to="/login" />
        }
      ></Route>
      <Route
        path="/add-new"
        element={
          userLogin ? <AddProduct></AddProduct> : <Navigate to="/login" />
        }
      ></Route>

      <Route
        path="/checkout"
        element={
          userLogin ? <CheckOutPage></CheckOutPage> : <Navigate to="/login" />
        }
      ></Route>

      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default App;
