import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatter } from "../utils/helper";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dropdown } from "../components/Dropdown";
import { City, Country, State } from "../utils/constant";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import image from "../../../Ecommerce_sequelize2/product_images/1686218496604.png";

const OrderPage = () => {
  const [productCartData, setproductCartData] = useState();
  const [cartItems, setCartItems] = useState();
  let [totalPrice, setTotalPrice] = useState(0);
  let [address, setAddress] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartItems();
    getAddress();
  }, [cartItems]);

  const getAddress = async () => {
    const LocalData = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.post(
        "http://localhost:8001/getaddress",
        {
          data: {
            userId: LocalData.Userdata.customer_id,
          },
        },
        {
          headers: {
            Authorization: LocalData.token,
          },
        }
      );
      const address = await res.data;

      setAddress(address.getAddress);
    } catch (error) {
      console.log(error);
    }
  };

  const selectAddress = (e) => {
    const id = e.target.value;
    console.log(id);
    const findAddress = (add) => {
      console.log(add.id, id);
      return add.id == id;
    };
    // console.log(address);
    var data = address.find(findAddress);
    for (let x in data) {
      setValue(x, data[x]);
    }
  };
  const getCartItems = async () => {
    const LocalData = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.post(
        `http://localhost:8001/getcartitems`,
        {
          data: {
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
      setproductCartData(cartItems.getcartitems);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let totalCartValue = 0;
    productCartData?.map(
      (product) => (totalCartValue += product.price * product.quentity)
    );
    setTotalPrice(totalCartValue);
  }, [productCartData]);

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    address: yup
      .string()
      .min(5)
      .trim()
      .max(250)
      .required()
      .typeError("address is required!!"),
    country: yup.string().required("country is required!!"),
    state: yup.string().required("state is required!!"),
    city: yup.string().required("city is required!!"),
    pincode: yup
      .number()
      .integer()
      .positive()
      .min(100000, "pincode is not valid!!")
      .max(999999)
      .required("pincode is required!!"),
  });
  let udata = {};

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: udata,
  });
  // ......
  const differToast = () => {
    toast("Order PLaced successfully!!");
  };

  const onSubmit = async (e) => {
    const LocalData = JSON.parse(localStorage.getItem("token"));
    const address = { ...e, customer_id: LocalData.Userdata.customer_id };
    try {
      const res = await axios.post(
        "http://localhost:8001/orderplace",
        { address },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: LocalData.token,
          },
        }
      );
      const data = res.data;

      if (data?.status === 200 && data?.boolean === true) {
        console.log("email already registererd!!");
        differToast();
        setTimeout(() => {
          navigate("/home");
        }, 1800);
      } else {
        console.log("something missing!!!");
      }
    } catch (error) {
      //  setSignupError(true);
      console.log("please try again!!");
    }
  };
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <section className="h-100" style={{ backgroundColor: " #508bfc" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col mt-25 mb-25">
              <p>
                <span className="h2">Order Items</span>
                <span className="h4">(1 item in your cart)</span>
              </p>

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

                              <p className="lead fw-normal mb-0">
                                {items.quentity}
                              </p>
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
                                  items.price * items.quentity
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
                      <span className="lead fw-normal">
                        {formatter?.format(totalPrice)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
          <form onSubmit={handleSubmit(onSubmit)} method="POST">
            <div className="col-lg-6 bg-indigo text-white">
              <div className="p-5">
                <h3 className="fw-normal mb-5">Address Details</h3>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <select
                      name="city"
                      id="addressSelect"
                      // {...register("city")}
                      onChange={(e) => {
                        selectAddress(e);
                      }}
                      className="select col-md-6"
                    >
                      <option value="">Select</option>
                      {address?.map((address, i) => (
                        <option value={address.id} key={address.id}>
                          {address.address}
                        </option>
                      ))}
                    </select>

                    <br></br>
                    <span>{errors.city?.message}</span>
                  </div>
                  <div className="col-md-6 mb-4 ">
                    <select
                      name="country"
                      id="country"
                      {...register("country")}
                      className="select col-md-6"
                    >
                      <option value="" selected>
                        Select
                      </option>
                      <Dropdown for={Country} />
                    </select>

                    <br></br>
                    <span>{errors.country?.message}</span>
                  </div>
                  <div className="col-md-6 mb-4  w-50">
                    <select
                      name="state"
                      {...register("state")}
                      className="select col-md-6"
                    >
                      <option value="" selected>
                        Select
                      </option>
                      <Dropdown for={State} />
                    </select>
                    <br></br>
                    <span>{errors.state?.message}</span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-4">
                    <select
                      name="city"
                      id="city"
                      {...register("city")}
                      className="select col-md-6"
                    >
                      <option value="" selected>
                        Select
                      </option>
                      <Dropdown for={City} />
                    </select>

                    <br></br>
                    <span>{errors.city?.message}</span>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <input
                        type="text"
                        name="pincode"
                        id="pincode"
                        {...register("pincode")}
                        className="form-control form-control-lg"
                      />
                      <label className="form-label" htmlFor="pincode">
                        Pincode
                      </label>{" "}
                      <br></br>
                      <span>{errors.pincode?.message}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 pb-2">
                  <div className="form-outline form-white">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      {...register("address")}
                      className="form-control form-control-lg"
                    />
                    <label className="form-label" htmlFor="address">
                      Street + Nr Address
                    </label>
                    <br></br>
                    <span>{errors.address?.message}</span>
                  </div>
                </div>
                <button
                  type="submit"
                  id="submit"
                  className="btn btn-light btn-lg ml-10"
                  data-mdb-ripple-color="dark"
                >
                  Order Place
                </button>{" "}
                <div className="d-flex justify-content-end">
                  <button type="button" className="btn btn-dark btn-lg">
                    <Link to={"/home"} className="text-light">
                      Back to Shopping
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default OrderPage;
