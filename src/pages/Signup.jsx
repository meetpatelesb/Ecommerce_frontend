import React, { useEffect, useState } from "react";
import "../assets/styles/signup.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { City, Country, State } from "../utils/constant";
import { Dropdown } from "../components/Dropdown";
import axios from "axios";

const Signup = () => {
  const [signupData, setSignupData] = useState(
    []
    // {
    // userName:"",
    // password:"",
    // first_name: "",
    // last_name: "",
    // gender:"",
    // dob:"",
    // email:"",
    // phoneNo:"",
    // country:"",
    // state:"",
    // city:"",
    // pincode:"",
    // address:""
    // }
  );

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    first_name: yup.string().required("Name is required!!"),
    last_name: yup.string().required("Name is required!!"),
    gender: yup.string().required("gender is required!!"),
    dob: yup.string().required("date is required!!"),
    email: yup.string().email().required(),
    password: yup.string().min(5).max(12).required(),
    cpassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Password is not matched!!")
      .required(),
    phoneNo: yup
      .number()
      .integer()
      .positive()
      .min(6000000000, "number is not valide!!")
      .required()
      .typeError("amount is required!!"),
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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: udata,
  });
  // ......


  const onSubmit = async (e) => {
    // let {
    //   userName,
    //   password,
    //   first_name,
    //   last_name,
    //   gender,
    //   dob,
    //   email,
    //   phoneNo,
    //   country,
    //   state,
    //   city,
    //   pincode,
    //   address,
    // } = e;
    console.log(e);
    setSignupData(e);
    setSubmit(true);
    
    navigate('/login'); 
    axios
      .post("http://localhost:8001/signup", e)
      // const ans = await req.data;
      // console.log(ans);
      .then((res) => console.log(res.config.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <section className="h-100 h-custom gradient-custom-2">
          <div className="container py-5 h-100">
            <div className="row ">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  // style="border-radius: 15px;"
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <div className="col-lg-6">
                        <div className="p-5">
                          <h3
                            className="fw-normal mb-5"
                            // style="color: #4835d4;"
                          >
                            General Infomation
                          </h3>
                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  name="first_name"
                                  id="firstName"
                                  className="form-control form-control-lg"
                                  {...register("first_name")}
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="firstName"
                                >
                                  First name
                                </label>
                                <br></br>
                                <span>{errors.firstName?.message}</span>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  name="last_name"
                                  id="lastName"
                                  // value={signupData.lastName}
                                  {...register("last_name")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="lastName"
                                >
                                  Last name
                                </label>
                                <br></br>
                                <span>{errors.lastName?.message}</span>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="row">
                            <div className="col-md-4 mb-1 pb-1">
                              <div className="form-outline">
                                <input
                                  type="radio"
                                  name="gender"
                                  id="male"
                                  value="male"
                                  // value={signupData.gender}
                                  {...register("gender")}
                                  className=""
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label className="form-label" htmlFor="male">
                                  Male
                                </label>
                                <br></br>
                                <span>{errors.gender?.message}</span>
                              </div>
                            </div>
                            <div className="col-md-4 mb-1 pb-1">
                              <div className="form-outline">
                                <input
                                  type="radio"
                                  name="gender"
                                  id="female"
                                  value="female"
                                  // value={signupData.gender}

                                  {...register("gender")}
                                  className=""
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label className="form-label" htmlFor="female">
                                  Female
                                </label>
                              </div>
                            </div>
                            <div className="col-md-4 mb-1 pb-1">
                              <div className="form-outline">
                                <input
                                  type="radio"
                                  name="gender"
                                  id="others"
                                  value="others"
                                  // value={signupData.gender}
                                  {...register("gender")}
                                  className=""
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label className="form-label" htmlFor="others">
                                  Others
                                </label>
                              </div>
                            </div>
                          </div>{" "}
                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="date"
                                  name="dob"
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                  id="date"
                                  {...register("dob")}
                                  // value={data?.transactionDate?.value}

                                  onClick={() => {
                                    const newdate = new Date();
                                    var year = newdate.getFullYear();
                                    var month = newdate.getMonth() + 1;
                                    var day = newdate.getDate();
                                    if (month < 10) {
                                      month = "0" + month;
                                    }
                                    if (day < 10) {
                                      day = "0" + day;
                                    }

                                    var limit = `${year}-${month}-${day}`;

                                    document
                                      .getElementById("date")
                                      .setAttribute("max", limit);
                                  }}
                                />
                                <label className="form-label" htmlFor="date">
                                  Date of Birth
                                </label>
                                <br></br>
                                <span>{errors.dob?.message}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="email"
                                  name="email"
                                  id="email"
                                  // value={signupData.email}
                                  {...register("email")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label className="form-label" htmlFor="email">
                                  Email
                                </label>
                                <br></br>
                                <span>{errors.email?.message}</span>
                              </div>
                            </div>

                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="text"
                                  name="phoneNo"
                                  id="phoneNo"
                                  // value={signupData.phoneNo}
                                  {...register("phoneNo")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label className="form-label" htmlFor="phoneNo">
                                  Phone No
                                </label>{" "}
                                <br></br>
                                <span>{errors.phoneNo?.message}</span>
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="Password"
                                  name="password"
                                  id="password"
                                  // value={signupData.password}
                                  {...register("password")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="password"
                                >
                                  Password
                                </label>
                                <br></br>
                                <span>{errors.password?.message}</span>
                              </div>
                            </div>
                            <div className="col-md-6 mb-4 pb-2">
                              <div className="form-outline">
                                <input
                                  type="Password"
                                  name="cpassword"
                                  id="cpassword"
                                  // value={signupData.cpassword}
                                  {...register("cpassword")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
                                />
                                <label
                                  className="form-label"
                                  htmlFor="cpassword"
                                >
                                  Confirm Password
                                </label>{" "}
                                <br></br>
                                <span>{errors.cpassword?.message}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 bg-indigo text-white">
                        <div className="p-5">
                          <h3 className="fw-normal mb-5">Address Details</h3>
                          <div className="row">
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
                                  // value={signupData.pincode}
                                  {...register("pincode")}
                                  className="form-control form-control-lg"
                                  // onChange={(e) => hasChange(e)}
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
                                // value={signupData.address}
                                {...register("address")}
                                className="form-control form-control-lg"
                                // onChange={(e) => hasChange(e)}
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
                            Register
                          </button>

                          <button
                            type="button"
                            id="login"
                            className="btn btn-light btn-lg  "
                            data-mdb-ripple-color="dark"
                          >
                            <Link
                              to={"/login"}
                              className="loginBtn mt-20"
                              style={{ color: "black" }}
                            >
                              Login{" "}
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default Signup;
