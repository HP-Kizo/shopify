import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import {
  ON_LOGOUT,
  UPDATE_CART,
  UPDATE_DATA_ALL_CART,
} from "../../store/context";
import { ON_LOGIN } from "../../store/context";
import { useState, useEffect } from "react";
import { IconManager } from "../Icon/Icon";
import axios from "axios";
function NavBar() {
  // Lây các trường dữ liệu từ local và redux

  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  // Xử lí lúc logout
  const handlerLogout = async () => {
    if (userLogin) {
      const data = await axios({
        method: "GET",
        url: "/auth/admin/logout",
        withCredentials: true,
      });
      dispatch({ type: ON_LOGIN, userLogin: false });
      localStorage.removeItem("user");
    }
  };

  return (
    <nav className="navbar navbar-expand-sm shadow-sm bg-light fixed-top px-5">
      <div className="container-fluid">
        <NavLink
          className="mx-5 text-warning nav-link fs-3 fst-italic d-inline d-sm-none"
          to="/"
        >
          Home
        </NavLink>
        <button
          className="navbar-toggler py-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="container-fluid row  text-center collapse navbar-collapse"
          id="collapsibleNavbar"
        >
          <ul className="navbar-nav ">
            <div className=" nav-item  col-sm-0 col-md-2 col-lg-2 col-xxl-2"></div>
            <li className="nav-item col-2 col-sm-2 col-md-1 fs-3 fst-italic li d-none d-sm-inline">
              <NavLink
                className={(navData) =>
                  navData.isActive ? ` text-warning nav-link` : "nav-link"
                }
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item col-2 col-sm-2 col-md-1 fs-3 fst-italic">
              <NavLink
                className={(navData) =>
                  navData.isActive ? `text-warning nav-link` : "nav-link"
                }
                to="/product"
              >
                Product
              </NavLink>
            </li>
            <li className="nav-item col-4  fs-1 fst-italic">
              <NavLink
                className={(navData) =>
                  navData.isActive ? `text-warning nav-link` : "nav-link"
                }
              >
                BOUTIQUE
              </NavLink>
            </li>
            <li className="nav-item col-2 col-lg-1 col-md-2 col-sm-2 col-xs-3 fs-3 fst-italic">
              <NavLink
                className={(navData) =>
                  navData.isActive ? `text-warning nav-link` : "nav-link"
                }
                to={!!userLogin ? "/cart" : "/login"}
              >
                <div className="d-none d-sm-inline box_cart cartIcon">
                  <span className="icon">{IconManager.cart}</span>
                  <span className={`cart_number`}></span>
                </div>
                Cart
              </NavLink>
            </li>
            <li
              className={
                !!userLogin
                  ? "nav-item col-3 fs-3 fst-italic"
                  : "nav-item col-2 col-lg-1 col-md-2  col-sm-2 col-xs-2  fs-3 fst-italic"
              }
            >
              <NavLink
                className={(navData) =>
                  navData.isActive ? `text-warning nav-link` : "nav-link"
                }
                to="/login"
                onClick={handlerLogout}
              >
                <div className="d-none d-sm-inline">{IconManager.user}</div>
                {!!userLogin ? `${userLogin.name} (Logout)` : "Login"}
              </NavLink>
            </li>
            <div className={!!userLogin ? "col-0" : "col-2"}></div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
