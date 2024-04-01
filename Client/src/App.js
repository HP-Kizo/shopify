import logo from "./logo.svg";
import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Component/Home/HomePage";
import CartPage from "./Component/Cart/CartPage";
import LoginPage from "./Component/LoginPage/LoginPage";
import CheckOutPage from "./Component/CheckoutPage/CheckoutPage";
import RegisterPage from "./Component/RegisterPage/RegisterPage";
import ShopPage from "./Component/Shop/ShopPage";
import DetailPage from "./Component/DetailPage/DetailPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { ADD_CART, GET_PRODUCT, UPDATE_CART } from "./store/context";
import { GET_ALL_CART } from "./store/context";
import { getTTFB } from "web-vitals";
import { ON_LOGOUT, UPDATE_DATA_ALL_CART } from "./store/context";
import { Steam } from "react-bootstrap-icons";
import useFetch from "./context/useFetch";
import NotFound from "./Component/NotFound/NotFound";
import axios from "axios";
import History from "./Component/History/History";

function App() {
  const dispatch = useDispatch();

  const { data, isLoading, error, reFetch } = useFetch("/products/get-products");
  dispatch({ type: GET_PRODUCT, product: data });
  const cart_manager = useSelector((state) => state.cart_manager);
  const userLogin = useSelector((state) => state.userLogin);
  const updatedCart = async () => {
    if (userLogin) {
      try {
        const respon = await axios({
          url: "http://localhost:5000/carts/updateCart",
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          withCredentials: true,
          data: { cart_manager },
        });

        if (respon.status === 200) {
          console.log("Update Cart Success");
        }
      } catch (error) {
        console.error("Lỗi:", error);
      }
    }
  };
  useEffect(() => {
    if (cart_manager.length > 0) {
      updatedCart();
    }
  }, [cart_manager]);
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route
        path="/login/*"
        element={userLogin ? <Navigate to="/" /> : <LoginPage />}
      ></Route>
      <Route path="/shop" element={<ShopPage></ShopPage>}></Route>

      <Route path="/shop/:categories" element={<ShopPage></ShopPage>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route
        path="/checkout"
        element={
          userLogin ? <CheckOutPage></CheckOutPage> : <Navigate to="/login" />
        }
      ></Route>
      <Route
        path="/history"
        element={userLogin ? <History></History> : <Navigate to="/login" />}
      ></Route>
      <Route
        path="/history/:id"
        element={userLogin ? <History></History> : <Navigate to="/login" />}
      ></Route>
      <Route path="/detail/:id" element={<DetailPage />}></Route>
      <Route
        path="/cart"
        element={userLogin ? <CartPage></CartPage> : <Navigate to="/login" />}
      ></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  );
}

export default App;

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";

// const App = ({ roomID, user }) => {
//   const [socket, setSocket] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     // Kết nối tới server với socket.io khi component mount
//     const newSocket = io("http://localhost:5000");
//     setSocket(newSocket);

//     // Lắng nghe tin nhắn mới
//     newSocket.on("chat-message", (data) => {
//       setMessages((prevMessages) => [...prevMessages, data]);
//     });

//     // Lắng nghe lịch sử tin nhắn khi vào phòng
//     newSocket.on("chat-history", (history) => {
//       setMessages(history);
//     });

//     // Clean up khi component unmount
//     return () => {
//       newSocket.disconnect();
//     };
//   }, [roomID]);

//   const sendMessage = () => {
//     // Gửi tin nhắn mới lên server
//     socket.emit("chat-message", { roomID, user, message: newMessage });

//     // Cập nhật giao diện người dùng
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       { roomID, user, message: newMessage },
//     ]);
//     setNewMessage("");
//   };

//   return (
//     <div>
//       <div>
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg.user}:</strong> {msg.message}
//           </div>
//         ))}
//       </div>
//       <div>
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default App;
