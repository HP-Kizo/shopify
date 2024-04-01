import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListProduct from "./ListProduct";
import { Link, NavLink, useParams } from "react-router-dom";
function Catogerias() {
  const listProduct = useSelector((state) => state.listProduct);
  const params = useParams();
  const [productShow, setProductShow] = useState();
  // Hàm xử lí lúc lọc
  function filterProduct(nameProduct) {
    let product = listProduct.filter((res) => {
      return res.category === nameProduct;
    });
    setProductShow(product);
  }
  // Phần catogerias, lọc ra các sản phẩm hiển thị theo catogerias

  useEffect(() => {
    if (params.categories) {
      listProduct &&
        listProduct.length !== 0 &&
        filterProduct(params.categories);
    } else {
      listProduct && listProduct.length !== 0 && setProductShow(listProduct);
    }
  }, [listProduct, params]);

  return (
    <>
      <div className="d-flex container justify-content-between">
        <h2 className="fw-normal w-25 p-5">CATEGORIES</h2>
        <input
          id="search"
          placeholder="Enter Search Here!"
          className="col-4 px-5 text-secondary border border-secondary rounded"
          onChange={(e) => {
            listProduct &&
              Array.isArray(listProduct) &&
              listProduct.length !== 0 &&
              setProductShow(
                listProduct.filter((res) => {
                  return res.category.includes(e.target.value);
                })
              );
          }}
        />
      </div>
      <div className="container d-flex text-left">
        <div className="container d-flex g-2">
          <div className="col-4 col-md-3 d-none d-sm-inline">
            <h3 className="w-100 border-0 fw-lighter py-3 bg-dark text-light px-5 d-flex justify-content-center">
              APPLE
            </h3>
            <NavLink
              to="/shop"
              className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
            >
              All
            </NavLink>
            <div className="">
              <h3 className="w-100 border-0 bg-warning text-dark fs-4 px-5 d-flex justify-content-center">
                IPHONE & MAC
              </h3>
              <NavLink
                to="/shop/iphone"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Iphone
              </NavLink>
              <NavLink
                to="/shop/ipad"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Ipad
              </NavLink>
              <NavLink
                to="/shop/macbook"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Macbook
              </NavLink>
            </div>
            <div className="">
              <h3 className="w-100 border-0 bg-warning text-dark fs-4 px-5 py-2 d-flex justify-content-center">
                WIRELESS
              </h3>
              <NavLink
                to="/shop/airpod"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Airpod
              </NavLink>
              <NavLink
                to="/shop/watch"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Watch
              </NavLink>
            </div>
            <div className="">
              <h3 className="w-100 border-0 bg-warning text-dark fs-4 px-5 d-flex justify-content-center">
                OTHER
              </h3>
              <NavLink
                to="/shop/mouse"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Mouse
              </NavLink>
              <NavLink
                to="/shop/keyboard"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Keyboard
              </NavLink>
              <NavLink
                to="/shop/other"
                className="w-100 border-0 bg-transparent row text-secondary fst-italic fs-4 py-2 d-flex justify-content-center"
              >
                Other
              </NavLink>
            </div>
          </div>
          <div className="col-12 col-sm-9 px-3">
            {productShow &&
              Array.isArray(productShow) &&
              productShow.length !== 0 && (
                <ListProduct data={productShow}></ListProduct>
              )}
          </div>
        </div>
        <div className="col-0 col-md-1"></div>
      </div>
    </>
  );
}

export default Catogerias;
