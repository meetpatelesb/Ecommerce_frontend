import React, {  useState } from "react";
import "../assets/styles/signup.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [loginData, setLoginData] = useState(
    []
    // {
    // password:"",
    // email:"",
    // }
  );

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    email: yup.string().email().required("email is required!!"),
    password: yup.string().required("password is required!!").min(5).max(12),
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
    //login,
    //password
    // } = e;
    console.log(e);
    setLoginData(e);
    setSubmit(true);

    axios
      .post("http://localhost:8001/home", e)
      // const ans = await req.data;
      // console.log(ans);
      .then((res) => console.log(res.config.data))
      .catch((err) => console.log(err));
    navigate("/home");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
        <section className="vh-100">
          <div
            className="container py-5 h-100"
            style={{ backgroundColor: " #508bfc" }}
          >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>

                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control form-control-lg"
                        {...register("email")}
                      />
                      <label className="form-label" for="email">
                        Email
                      </label>
                      <br></br>
                      <span>{errors.email?.message}</span>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        type="password"
                        id="password"
                        name="passsword"
                        className="form-control form-control-lg"
                        {...register("password")}
                      />
                      <label className="form-label" for="password">
                        Password
                      </label>
                      <br></br>
                      <span>{errors.password?.message}</span>
                    </div>

                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                    >
                      Login
                    </button>
                    <br></br>

                    <button
                      className="btn btn-primary btn-lg btn-block "
                      style={{ color: "white" }}
                    >
                      <Link
                        to={"/signup"}
                        className="loginBtn mt-20"
                        style={{ color: "white" }}
                      >
                        Registration
                      </Link>
                    </button>
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

export default Login;
