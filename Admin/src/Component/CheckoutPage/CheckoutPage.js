import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import NavBar from "../Layout/NavBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UPDATE_CART } from "../../store/context";

function CheckOutPage() {
  const cart_manager = useSelector((state) => state.cart_manager);
  const separateNumber = useSelector((state) => state.separateNumber);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Láy dữ liệu cart manager từ redux

  const [totalPrice, setTotalPrice] = useState(0);
  console.log(totalPrice);
  const [information, setInformation] = useState({});
  const [errol, setErrol] = useState({});
  const handlerChange = (e) => {
    setInformation({ ...information, [e.target.name]: e.target.value });
    setErrol({ ...errol, [e.target.name]: "" });
  };
  // Tính tổng giá trị của tất cả đơn hàng
  //---------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    if (
      cart_manager &&
      Array.isArray(cart_manager) &&
      cart_manager.length !== 0
    ) {
      setTotalPrice(
        cart_manager.reduce((total, currenValue) => {
          return total + currenValue.price * currenValue.quantity;
        }, 0)
      );
    }
  }, []);
  const handlerClick = async () => {
    try {
      const respon = await axios({
        url: "http://localhost:5000/order/postOrder",
        headers: { "Content-Type": "application/json" },
        method: "POST",
        withCredentials: true,
        data: {
          products: cart_manager,
          information: information,
          total: totalPrice,
        },
      });

      if (respon.status === 200) {
        dispatch({ type: UPDATE_CART, cart: [] });
        navigate("/history");
        console.log("Update Order Success");
        console.log(respon.data);
      }
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="container-fluid d-flex justify-content-between mt-5 p-5 w-75">
        <h2 className="mt-5  fs-1 fst-italic ">CHECKOUT</h2>
        <p className="mt-5">
          HOME / CART / <span className="text-secondary">CHECKOUT</span>
        </p>
      </div>
      <div className="container-fluid f-flex  justify-content-between mt-5">
        <h2>BILLING DETAILS</h2>
        <div className="container-fluid row">
          <div className="col-8">
            <p className="  fs-3">FULL NAME:</p>
            <input
              placeholder="Enter Your Full Name Here!"
              className=" w-75 py-3 px-4"
              name="fullname"
              onChange={handlerChange}
            />
            <p className="  fs-3">EMAIL:</p>
            <input
              placeholder="Enter Your Email Here!"
              className=" w-75 py-3 px-4"
              type="email"
              name="email"
              onChange={handlerChange}
            />
            <p className="  fs-3">NUMBER:</p>
            <input
              placeholder="Enter Your Number Here!"
              className=" w-75 py-3 px-4"
              type="number"
              name="phone"
              onChange={handlerChange}
            />
            <p className="  fs-3">ADDRESS:</p>
            <input
              placeholder="Enter Your Adress Here!"
              className=" w-75 py-3 px-4"
              name="address"
              onChange={handlerChange}
            />
            <button
              className="p-3 mt-4 d-block text-light bg-dark w-25 fst-italic"
              onClick={handlerClick}
            >
              Place Order
            </button>
          </div>
          <div className="col-4 bg-light">
            <h3 className="p-4 fw-bold">YOUR ORDER</h3>
            {cart_manager &&
              Array.isArray(cart_manager) &&
              cart_manager.length !== 0 &&
              cart_manager.map((res) => {
                return (
                  <div className="px-5">
                    <span className="fw-bolder fs-4">{res.name}</span>
                    <span className="px-3 fs-5   fw-light">
                      {separateNumber(res.price)} VND x {res.quantity}
                    </span>
                    <hr width="100%" align="center" />
                  </div>
                );
              })}
            <p className="fw-bolder">
              TOTAL:{" "}
              <span className="px-4 fw-normal">
                {separateNumber(totalPrice)} VND
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOutPage;
