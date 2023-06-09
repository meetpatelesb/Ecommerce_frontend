import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatter } from "../utils/helper";

const Home = () => {
  const [productData, setProductData] = useState();
  const [cartItem, setCartItem] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getproduct();
  }, [location]);

  const getproduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/getproduct`);
      const products = await res.data;
      setProductData(products);
    } catch (error) {
      console.log(error);
    }
  };
console.log(productData);
  const addToCart = async (id) => {
    //  const token = localStorage.getItem("token");
    
     

    setCartItem(cartItem)
    try {
      console.log(id);
      console.log(cartItem);
      console.log(cartItem.indexOf(id));
      if (cartItem.indexOf(id) !== -1) {
        //  update
      } else {
        cartItem.push(id);
        setCartItem(cartItem);
        try {
          const res = await axios.post("http://localhost:8001/insertcart", {
            id: id,
            userId: 51,
          });
          const cartItems = await res.data;
          console.log(cartItems);
        } catch (error) {
          console.log("insert+++++++++++++++++++++++");
          console.log(error);
        }
        // insert
      }
      console.log(cartItem);
    } catch (error) {
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
                <Link to={"/login"} className="nav-link">
                  Login in
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/signup"} className="nav-link">
                  Sign up
                </Link>
              </li>
            </ul>
          </div>

          <div className="d-flex align-items-center">
            <Link to={"/cart"} className="nav-link">
              <img
                src="/images/cartlogo.png"
                height="50"
                className="rounded-circle ml-10"
                alt="MDB Logo"
                loading="lazy"
              />
            </Link>

            <Link to={"/profile"} className="nav-link">
              <img
                src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                className="rounded-circle"
                height="50"
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
                          <a href="#!">
                            <div className="mask">
                              <div className="d-flex justify-content-start align-items-end h-100">
                                <h5>
                                  <span className="badge bg-primary ms-2">
                                    New
                                  </span>
                                </h5>
                              </div>
                            </div>
                          </a>
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
