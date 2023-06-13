import React, { useState } from "react";
import "../assets/styles/signup.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MAX_FILE_SIZE, validFileExtensions } from "../utils/constant";

const AddProduct = () => {
  const [productData, setproductData] = useState({
    name: "",
    discription: "",
    price: "",
    product_image: "",
  });

  const navigate = useNavigate();

  // YUP VALIDATIONS...

  const formSchema = yup.object().shape({
    name: yup.string().min(5).trim().required("name is required!!"),
    discription: yup
      .string()
      .min(5)
      .trim()
      .max(250)
      .required()
      .typeError("discription is required!!"),
    price: yup
      .number()
      .integer()
      .positive()
      .min(2, "minimum amount should be 10")
      .required()
      .typeError("amount is required!!"),
    product_image: yup.mixed().test({
      name: "is-sku",
      skipAbsent: true,
      test(value, error) {
        if (value === undefined || value === null || value.length === 0) {
          return error.createError({ message: "image is required!!!" });
        } else {
          if (typeof value === "string") {
            return true;
          } else {
            if (!validFileExtensions.includes(value[0].type)) {
              return error.createError({
                message: "image type must be jpeg,png,jpg or svg..",
              });
            }
          }
          if (typeof value === "string") {
            return true;
          } else {
            if (value[0]["size"] > MAX_FILE_SIZE) {
              return error.createError({
                message: "image must less than 10kb",
              });
            }
          }
        }
        return true;
      },
    }),
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
  const handleChange = (e) => {
    let receiptPhoto;
    let file = e.target.files[0];
    let freader = new FileReader();
    freader.readAsDataURL(file);
    freader.addEventListener("load", () => {
      receiptPhoto = freader.result;

      setproductData((prev) => ({
        ...prev,
        product_image: receiptPhoto,
      }));
    });
  };
  const removeImage = () => {
    setproductData((prev) => ({
      ...prev,
      product_image: "",
    }));
  };

  const onSubmit = async (e) => {
    setproductData(e);
    const formData = new FormData();
    formData.append("name", e.name);
    formData.append("discription", e.discription);
    formData.append("price", e.price);
    formData.append("product_image", e.product_image[0]);
    const LocalData = JSON.parse(localStorage.getItem("token"));
    try {
      const res = await axios.post(
        "http://localhost:8001/addproduct",
       formData,
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Authorization: LocalData.token,
          },
        }
      );
      const data = res.data;
      navigate("/home");
    } catch (error) {
      console.log("Error, please try again");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="POST"
        className="form-horizontal "
        enctype="multipart/form-data"
      >
        <section className="vh-100">
          <div
            className="container py-5 h-100"
            style={{ backgroundColor: " #508bfc" }}
          >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card shadow-2-strong">
                  <div className="card-body p-4 text-center">
                    <h3 className="mb-1">ADD PRODUCT</h3>
                    <div className="form-group">
                      <label
                        className="col-md-4 control-label"
                        for="product_name"
                      >
                        PRODUCT NAME
                      </label>
                      <div className="col-md-12">
                        <input
                          id="product_name"
                          name="name"
                          placeholder="PRODUCT NAME"
                          className="form-control   "
                          type="text"
                          {...register("name")}
                        />
                      </div>
                      <br></br>
                      <span>{errors?.name?.message}</span>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-md-12 control-label"
                        for="product_description"
                      >
                        PRODUCT DESCRIPTION
                      </label>
                      <div className="col-md-12">
                        <textarea
                          className="form-control"
                          id="product_description"
                          name="discription"
                          placeholder="PRODUCT DESCRIPTION"
                          {...register("discription")}
                        ></textarea>
                      </div>
                      <br></br>
                      <span>{errors?.discription?.message}</span>
                    </div>
                    <div className="form-group">
                      <label
                        className="col-md-12 control-label"
                        for="product_description"
                      >
                        PRODUCT PRICE
                      </label>
                      <div className="col-md-12">
                        <input
                          type="text"
                          className="form-control"
                          id="product_price"
                          name="price"
                          placeholder="PRODUCT PRICE"
                          {...register("price")}
                        />
                      </div>
                      <br></br>
                      <span>{errors?.price?.message}</span>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-md-4 control-label"
                        for="filebutton"
                      >
                        PRODUCT IMAGE
                      </label>
                      <div className="col-md-12">
                        {productData.product_image ? (
                          <>
                            <img
                              src={productData.product_image}
                              width={50}
                              height={50}
                              alt=""
                            />
                            <span onClick={removeImage} className="cross">
                              X
                            </span>
                          </>
                        ) : (
                          <>
                            {" "}
                            <input
                              id="filebutton"
                              name="product_image"
                              className="input-file"
                              type="file"
                              accept=""
                              {...register("product_image", {
                                onChange: handleChange,
                              })}
                            />
                          </>
                        )}
                      </div>
                      <br></br>
                      <span>{errors?.product_image?.message}</span>
                    </div>

                    <div className="form-group ">
                      <div className="col-md-12">
                        <button
                          id="singlebutton"
                          name="singlebutton"
                          className="btn btn-primary"
                        >
                          ADD
                        </button>
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

export default AddProduct;


// Air Jordan Shoes of Special Adition by Sanisinh 2023