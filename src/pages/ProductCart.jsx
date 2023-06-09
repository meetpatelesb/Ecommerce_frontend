import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatter } from "../utils/helper";
import toast, { Toaster } from "react-hot-toast";
import SweetAlert from "sweetalert-react";
// import image from "../../../Ecommerce_sequelize2/product_images/1686218496604.png";

const ProductCart = () => {
  const [productCartData, setproductCartData] = useState();

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const dummydata = {
    name: "bullet",
    quantity: 12,
    price: 400,
  };

  const [sweet, setSweet] = useState();
  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = async () => {
    const userId = 51;
    try {
      const res = await axios.post(`http://localhost:8001/getcartitems`, {
        userId: userId,
      });
      const cartItems = await res.data;
      setproductCartData(cartItems.getcartitems);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (productId, type) => {
    differ();
    //  setSweet(true)
    const userId = 51;
    console.log(productId, type);
    try {
      const res = await axios.post(`http://localhost:8001/updatecart`, {
        cartId: userId,
        productId: productId,
        type: type,
      });
      // const updatecart = await res.data;
      // console.log(updatecart);
    } catch (error) {
      console.log(error);
    }
  };

  const differ = () => {
    toast.success("item add successfully!!", {
      // position: "top-center",
      // autoClose: 1000,
      hideProgressBar: false,
      // draggable: true,
      // progress: undefined,
      // theme: "dark",
      // pauseOnHover: true,
    });
  };

  return (
    <>
      <section className="h-100" style={{ backgroundColor: " #508bfc" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col mt-25 mb-25">
              <p>
                <span className="h2">Shopping Cart </span>
                <span className="h4">(1 item in your cart)</span>
              </p>
              {/* <Toaster/> */}
              {/* <SweetAlert
                show={true}
                title="Demo"
                text="SweetAlert in React"
                onConfirm={() =>{
                  setSweet(true);
                }}
              /> */}

              {productCartData?.map((items) => {
                return (
                  <>
                    <div className="card mb-2">
                      <div className="card-body p-1">
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <img
                              src={`http://localhost:8001/${items.product_image}`}
                              height={80}
                              width={80}
                              className="img-fluid"
                              alt="Generic placeholder "
                            />
                          </div>
                          <div className="col-md-2 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">Name</p>
                              <p className="lead fw-normal mb-0">
                                {items.name}
                              </p>
                            </div>
                          </div>

                          <div className="col-md-2 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                Quantity
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  updateCart(items.product_id, "dec");
                                }}
                              >
                                -
                              </button>{" "}
                              <p className="lead fw-normal mb-0">
                                {items.quentity}
                              </p>
                              <button
                                type="button"
                                onClick={() => {
                                  updateCart(items.product_id, "inc");
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="col-md-2 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                Price
                              </p>
                              <p className="lead fw-normal mb-0">
                                {formatter?.format(items.price)}
                              </p>
                            </div>
                          </div>
                          <div className="col-md-2 d-flex justify-content-center">
                            <div>
                              <p className="small text-muted mb-4 pb-2">
                                Total
                              </p>
                              <p className="lead fw-normal mb-0">
                                {formatter?.format(
                                  items.quentity * items.price
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}

              <div className="card mb-5">
                <div className="card-body p-4">
                  <div className="float-end">
                    <p className="mb-0 me-5 d-flex align-items-center">
                      <span className="small text-muted me-2">
                        Order total:
                      </span>
                      <span className="lead fw-normal">$799</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end">
                <button type="button" className="btn btn-light btn-lg me-2">
                  <Link to={"/home"}>Continue shopping</Link>
                </button>
                <button type="button" className="btn btn-dark btn-lg">
                  <Link to={"/home"} className="text-light">
                    {" "}
                    Order Place
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductCart;
