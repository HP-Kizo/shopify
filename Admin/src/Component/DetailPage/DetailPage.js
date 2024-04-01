import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../Layout/NavBar";
import styles from "./Detail.module.css";
import { UPDATE_CART } from "../../store/context";
import Footer from "../Layout/Footer";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import useFetch from "../../context/useFetch";
import usePath from "../../context/usePath";
function DetailPage() {
  const param = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, reFetch } = useFetch(`/product/${param.id}`);

  const cart_manager = useSelector((state) => state.cart_manager);
  const userLogin = useSelector((state) => state.userLogin);
  const [productsInCategory, setProductsInCategory] = useState([]);
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const listProduct = useSelector((state) => state.listProduct);
  const separateNumber = useSelector((state) => state.separateNumber);
  const [detailData, setDetailData] = useState();
  const [related, setRelated] = useState();
  const [cart, setCart] = useState([]);
  const [count, setCount] = useState(1);
  const [position, setPosition] = useState("undefined");

  // Mỗi khi cart thay đổi thì gửi 1 dispatch để cập nhật lại dữ liệu trên redux
  //---------------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    cart &&
      Array.isArray(cart) &&
      cart.length !== 0 &&
      dispatch({ type: UPDATE_CART, cart: cart });
  }, [cart]);
  //---------------------------------------------------------------------------------------------------------------------------
  // Lấy dữ liệu người dùng đã login dưới local

  //  -----------------------------------------------------------------------------------------------------------------------
  const handlerClickAddcart = async () => {
    // Kiểm tra xem đã login chưa, nếu chưa thì chuyển hướng sang login
    if (!!userLogin) {
      // Tạo 1 new_cart chính là dữ liệu đã nhận vào từ phía người dùng
      let new_cart = {
        _id: data.product._id,
        image: data.product.img1,
        quantity: parseInt(count),
        price: data.product.price,
        name: data.product.name,
      };
      if (
        cart_manager &&
        Array.isArray(cart_manager) &&
        cart_manager.length !== 0
      ) {
        const productIndex = cart_manager.findIndex((res) => {
          return res._id === new_cart._id;
        });
        if (productIndex !== -1) {
          const updateCart = [...cart_manager];

          updateCart[productIndex].quantity += new_cart.quantity;
          setCart(updateCart);
        } else {
          const updateCart = [...cart_manager, new_cart];
          setCart(updateCart);
        }
      } else {
        const updateCart = [new_cart];
        setCart(updateCart);
      }
    } else {
      navigate("/login");
    }
  };
  // Lấy toàn bộ dữ liệu của sản phẩm đã chọn
  useEffect(() => {
    listProduct &&
      Array.isArray(listProduct) &&
      listProduct.length !== 0 &&
      setDetailData(
        listProduct.filter((res) => {
          return res._id.$oid === param.id;
        })
      );
  }, [listProduct, param]);
  const [parts, setParts] = useState();

  // Tìm các sản phẩm cùng category với sản phẩm chính rồi lưu lại
  //---------------------------------------------------------------------------------------------------------------------------

  useEffect(() => {
    listProduct &&
      Array.isArray(listProduct) &&
      listProduct.length !== 0 &&
      data &&
      setRelated(
        listProduct.filter((res) => {
          return (
            res.category === data.product.category &&
            res._id.$oid !== data.product._id.$oid
          );
        })
      );
    data && setParts(data.product.long_desc.split("•"));
  }, [data]);
  return (
    <>
      <NavBar></NavBar>
      {isLoading && !data && (
        <section className="dots-container container pt-5 ">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      )}
      {data && (
        <div className="container pt-5 mt-5">
          <div className="row mt-5">
            <div className="container-fluid d-flex justify-content-center col-sm-8 col-md-8 col-lg-5">
              <div className="col-2 col-lg-2">
                <img src={`${data.product.img4}`} className={`w-100`} />
                <img src={`${data.product.img3}`} className={`w-100`} />
                <img src={`${data.product.img2}`} className={`w-100`} />
                <img src={`${data.product.img1}`} className={`w-100`} />
              </div>
              <div className="col-1"></div>
              <div className="col-8 ">
                <img src={`${data.product.img1}`} className="w-100" />
              </div>
            </div>
            <div className="col-lg-5 mt-5 text-secondary">
              <h2 className="fw-border fs-2 text-uppercase fst-italic ">
                {data.product.name}
              </h2>
              <p className="fw-normal fs-4">
                {separateNumber(data.product.price)} VND
              </p>
              <p className="fst-italic px-5">{data.product.short_desc}</p>
              <p className="fw-normal text-uppercase">
                CATEGORY: {data.product.category}
              </p>
              <label className="row justify-content-center">
                <input
                  type="number"
                  className="col-6"
                  value={count}
                  min="1"
                  onChange={(e) => {
                    setCount(e.target.value);
                  }}
                ></input>
                <button
                  className="col-3 p-3 bg-dark text-light  "
                  onClick={handlerClickAddcart}
                >
                  Add to cart
                </button>
              </label>
            </div>
          </div>
          <div>
            <h4 className="fw-bold fs-2 mt-5">DESCRIPTION</h4>
            <h5 className="fw-bolder fs-4 mt-4">PRODUCT DESCRIPTION</h5>

            <div className="fst-italic mt-3  text-secondary text-start d-lg-block short_text_popup overflow-auto noibat">
              {parts && parts.length !== 0 && (
                <>
                  <p className="px-5 fs-4 fw-bold">{parts[0]}</p>
                  {parts.map((res, index) => {
                    if (index === 0) {
                      return;
                    } else return <p className="px-5">• {res}</p>;
                  })}
                </>
              )}
            </div>
          </div>
          <div>
            <p className="fw-bolder fs-4 mt-4">RELATED PRODUCTS</p>
            <div className="row text-center border-0 justify-content-center">
              {data &&
                Array.isArray(data.productsInCategory) &&
                data.productsInCategory.length !== 0 &&
                data.productsInCategory.map((res) => {
                  return (
                    <button
                      className="container bg-transparent col-8 col-sm-5 border-0 mx-3 mt-2"
                      onClick={() => {
                        navigate(`/detail/${res._id}`);
                      }}
                    >
                      <LazyLoadComponent>
                        <img src={res.img1} className="w-50" loading="lazy" />
                      </LazyLoadComponent>
                      <p className="fs-5">{res.name}</p>
                      <p className="fs-5">{separateNumber(res.price)} VND</p>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <Footer></Footer>
    </>
  );
}

export default DetailPage;
