import { Fragment, useRef, useState, useEffect } from "react";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ON_LOGIN, UPDATE_CART } from "../../store/context";
import { ADD_CART } from "../../store/context";
import styles from "./SignIn.module.css";
import useFetch from "../../context/useFetch";
import axios from "axios";

// Sử dụng các useRudecer để kiểm tra các trường thông tin
const reducerEmail = (state, action) => {
  switch (action.type) {
    case "ENTER_EMAIL":
      return { value: action.value, isValid: action.value.includes("@") };
    case "CHECK_EMAIL":
      return { value: state.value, isValid: action.value.includes("@") };
    default:
      return state;
  }
};
const reducerPassword = (state, action) => {
  switch (action.type) {
    case "ENTER_PASSWORD":
      return { value: action.value, isValid: action.value.trim().length >= 8 };
    case "CHECK_PASSWORD":
      return { value: state.value, isValid: action.value.trim().length >= 8 };
    case "RESET_INPUT_PASSWORD":
      return {
        value: action.value,
        isValid: action.value.trim().length >= 8,
      };
    default:
      return state;
  }
};

const initState = {
  value: "",
  isValid: null,
};
function SignIn(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //  -----------------------------------------------------------------------------------------------------------------------

  // Kiểm tra xem các input có hợp lệ
  //  -----------------------------------------------------------------------------------------------------------------------

  const [emailState, dispatchEmail] = useReducer(reducerEmail, initState);
  const [passwordState, dispatchPassword] = useReducer(
    reducerPassword,
    initState
  );
  // Check là giá trị kiểm tra xem các input đã hợp lệ chưa, nếu chưa sẽ hiển thị lỗi
  const [check, setCheck] = useState(null);
  // FormisValid là giá trị kiểm tra xem tất cả dữ liệu đã hơp lệ chưa

  const [formIsValid, setFormIsValid] = useState(false);
  const hanlderEnterEmail = (e) => {
    dispatchEmail({ type: "ENTER_EMAIL", value: e.target.value });
    setFormIsValid(e.target.value.includes("@") && passwordState.isValid);
  };
  const hanlderEnterPassword = (e) => {
    dispatchPassword({ type: "ENTER_PASSWORD", value: e.target.value });
    setFormIsValid(emailState.isValid && e.target.value.trim().length >= 8);
    setCheck(null);
  };
  const hanlderValidateEmail = () => {
    dispatchEmail("CHECK_EMAIL");
  };
  const hanlderValidatePassword = () => {
    dispatchPassword("CHECK_PASSWORD");
  };
  //  -----------------------------------------------------------------------------------------------------------------------

  // Lấy dữ liệu người dùng
  //  -----------------------------------------------------------------------------------------------------------------------

  const failLogin = () => {
    setCheck(true);
    dispatchPassword({ type: "RESET_INPUT_PASSWORD", value: "" });
  };

  const validateLogin = async () => {
    if (formIsValid) {
      try {
        const respon = await axios({
          url: "http://localhost:5000/auth/admin/login",
          headers: { "Content-Type": "application/json" },
          method: "POST",
          withCredentials: true,
          data: {
            email: emailState.value,
            password: passwordState.value,
          },
        });
        if (respon.status === 200) {
          console.log(respon.data);
          dispatch({ type: ON_LOGIN, userLogin: respon.data.user });
        

          localStorage.setItem("user", JSON.stringify(respon.data.user));
          navigate("/");
        } else {
          setCheck(true);
          dispatchPassword({ type: "RESET_INPUT_PASSWORD", value: "" });
        }
      } catch (error) {
        console.error("Lỗi:", error);
        setCheck(true);
        dispatchPassword({ type: "RESET_INPUT_PASSWORD", value: "" });
      }
    } else {
      setCheck(true);
      dispatchPassword({ type: "RESET_INPUT_PASSWORD", value: "" });
    }
  };

  return (
    <Fragment>
      <div className={styles.signUP}>
        <h2 className={styles.h2}>Sign In</h2>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <input
            className="px-4"
            type="email"
            placeholder="Email"
            onChange={hanlderEnterEmail}
            onBlur={hanlderValidateEmail}
          ></input>
        </div>

        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <input
            className="px-4"
            type="password"
            placeholder="Password"
            value={passwordState.value}
            onChange={hanlderEnterPassword}
            onBlur={hanlderValidatePassword}
          ></input>
        </div>

        {check && <p className={styles.notice}>Incorrect email or password</p>}
        <button
          disabled={!formIsValid}
          className={
            formIsValid
              ? `${styles.button} border-0 text-light fw-normal fs-5 col-10 rounded-1 p-4`
              : `${styles.no_button} border-0 text-light fw-normal fs-5 col-10 rounded-1 p-4`
          }
          onClick={validateLogin}
        >
          LOGIN
        </button>
        {props.children}
        <div className="container text-center ">
          <span className="mt-4">Create an account?</span>
          <NavLink
            className="border-0 text-dark fs-5 bg-transparent text-decoration-none"
            onClick={() => {}}
            to="/login/sign_up"
          >
            <span className="p-0 text-primary"> Signup</span>
          </NavLink>
        </div>
      </div>
    </Fragment>
  );
}
export default SignIn;
