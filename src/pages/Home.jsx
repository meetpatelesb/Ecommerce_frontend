import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { formatter } from "../utils/helper";

// const SERVER_URL =;
// console.log("asdjkhasfba" + process.env.REACT_APP_URL);

const Home = () => {
  const [productData, setProductData] = useState();
  const location = useLocation();

  useEffect(() => {
    getproduct();
  }, [location]);
   const navigate = useNavigate();
  const Logout = async()=>{
    localStorage.clear();
    navigate('login');
  }
  const getproduct = async () => {
    try {
      const LocalData = JSON.parse(localStorage.getItem("token"));
      // const res = await axios({
      //   url:'http://localhost:8001/getproduct',
      //   method:'GET',
      //   headers:{
      //     'Content-Type':'application/json',
      //     // 'Content-Type':'multipart/form-data'
      //   },
      //   data:{}
      // })

      const res = await axios.get("http://localhost:8001/getproduct", {
        headers: {
          "Content-Type": "application/json",
          Authorization: LocalData.token,
        },
      });
      const products = await res.data;
      setProductData(products);
    } catch (error) {
      console.log(error);
    }
  };
 
  const addToCart = async (id) => {
    const LocalData = JSON.parse(localStorage.getItem("token"));
  
    try {
      const res = await axios.post(
        "http://localhost:8001/insertcart",
        {
          data: {
            id: id,
            userId: LocalData.Userdata.customer_id,
          },
        },

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: LocalData.token,
          },
        }
      );
      const cartItems = await res.data;
    } catch (error) {
      console.log("insert+++++++++++++++++++++++");
      console.log(error);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="fas fa-bars"></i>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <img
              src="/images/logo.png"
              height="30"
              alt="MDB Logo"
              loading="lazy"
            />

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"login"} className="nav-link">
                  Login in
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/addproduct"} className="nav-link">
                  Add Product
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/orderlist"} className="nav-link">
                  Order
                </Link>
              </li>
            </ul>
            <Link to={"/cart"} className="nav-link">
              <img
                src="/images/cartlogo.png"
                height="50"
                className="rounded-circle ml-10"
                alt="MDB Logo"
                loading="lazy"
              />
            </Link>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <span onClick={Logout}>Log Out</span>
              </li>
            </ul>
            <Link to={"/profile"} className="nav-link">
              <img
                src="/images/dummyuser.jpg"
                className="rounded-circle  ml-10 "
                height="45"
                alt="Black and White Portrait of a Man"
                loading="lazy"
              />
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <section style={{ backgroundColor: "#eee" }}>
          <div className="text-center container py-5">
            <h4 className="mt-4 mb-5">
              <strong>Bestsellers</strong>
            </h4>

            <div className="row">
              {productData &&
                productData.data.map((h, i) => {
                  return (
                    <div className="col-lg-3 col-md-12 mb-4">
                      <div className="card">
                        <div
                          className="bg-image hover-zoom ripple ripple-surface ripple-surface-light"
                          data-mdb-ripple-color="light"
                        >
                          <figure>
                            <img
                              src={`http://localhost:8001/${h.product_image}`}
                              height={150}
                              width={120}
                              alt=""
                              className="w-100"
                            />
                          </figure>

                          <div className="mask">
                            <div className="d-flex justify-content-start align-items-end h-100">
                              <h5>
                                <span className="badge bg-primary ms-2">
                                  New
                                </span>
                              </h5>
                            </div>
                          </div>
                        </div>
                        <div className="card-body">
                          <h5 className="card-title mb-3">{h.name}</h5>

                          <p>{h.discription}</p>

                          <h6 className="mb-3">{formatter?.format(h.price)}</h6>
                        </div>

                        <div className="mask">
                          <div className="d-flex justify-content-start align-items-end h-100">
                            <h5>
                              <button
                                type="button"
                                className="badge bg-primary ms-2"
                                key={h.id}
                                onClick={() => {
                                  addToCart(h.id);
                                }}
                              >
                                Add to Cart
                              </button>
                            </h5>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
