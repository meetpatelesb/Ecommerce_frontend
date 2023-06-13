import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { formatter } from "../utils/helper";
import { useForm } from "react-hook-form";

// import image from "../../../Ecommerce_sequelize2/product_images/1686218496604.png";

const OrderPage = () => {
  const [orderlist, setOrderList] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    orderList();
  }, []);

  const orderList = async () => {
    try {
      const LocalData = JSON.parse(localStorage.getItem("token"));
      const customer_id = LocalData.Userdata.customer_id;
      const res = await axios.post(
        "http://localhost:8001/orderlist",
        {
          data: {
            customer_id,
          },
        },
        {
          headers: {
            Authorization: LocalData.token,
          },
        }
      );

      const data = res.data;
      setOrderList(data.orderList);
    } catch (error) {
      //  setSignupError(true);
      console.log("please try again!!");
    }
  };
  return (
    <>
      <section className="h-100" style={{ backgroundColor: " #508bfc" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100"> 
             <div className="col mt-25 mb-25">
              <p>
                <span className="h2">Order Items</span>
                <span className="h4">(1 item in your cart)</span>
              </p>
              {orderlist?.map((order,i) => {
                return (
                  <>
                    <div className="card mb-2">
                      <div className="card-body p-1">
                        <p>#{i + 1}</p>
                        <div className="row align-items-center">
                          <div className="col-md-2">
                            <p className="small text-muted mb-4 pb-2"></p>
                          </div>
                          <div className="col-md-2">
                            <p className="small text-muted mb-4 pb-2">Name</p>
                          </div>
                          <div className="col-md-2">
                            <p className="small text-muted mb-4 pb-2">Quentity</p>
                          </div>
                          <div className="col-md-2">
                            <p className="small text-muted mb-4 pb-2">Price</p>
                          </div>
                          <div className="col-md-2">
                            <p className="small text-muted mb-4 pb-2">Total Price</p>
                          </div>
                        </div>
                        {order.product_carts?.map(
                          (items) => {
                            return (
                              <>
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
                                   
                                      
                                      <p className="lead fw-normal mb-0">
                                        {items.name}
                                      </p>
                                    
                                  </div>

                                  <div className="col-md-2 d-flex justify-content-center">
                                    
                                     

                                      <p className="lead fw-normal mb-0">
                                        {items.quentity}
                                      </p>
                                    
                                  </div>
                                  <div className="col-md-2 d-flex justify-content-center">
                                   
                                    
                                      <p className="lead fw-normal mb-0">
                                        {formatter?.format(items.price)}
                                      </p>
                                   
                                  </div>
                                  <div className="col-md-2 d-flex justify-content-center">
                                   
                                     
                                      <p className="lead fw-normal mb-0">
                                        {formatter?.format(
                                          items.price * items.quentity
                                        )}
                                      </p>
                                    
                                  </div>
                                </div>
                              </>
                            );
                          }
                        
                        )}
                      </div>
                    </div>
                  </>
                );
              })}
           
            </div>
          </div>{" "}
        </div>
      </section>
    </>
  );
};

export default OrderPage;
