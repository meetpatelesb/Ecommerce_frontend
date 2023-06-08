import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import image from "../../../Ecommerce_sequelize2/product_images/1686218496604.png";

const Home = () => {
  const [productData, setProductData] = useState();

  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();

  // YUP VALIDATIONS...

  // ......
  useEffect(() => {
    getproduct();
  },[]);
  const getproduct = async () => {
    try {
      const res = await axios.get(`http://localhost:8001/getproduct`);
      const products = await res.data;
      // const res = await axios.fetch("http://localhost:8001/getproducts");
      // const ans = await res.data;
      setProductData(products);
      (products.data).map((h,i)=>{
return console.log(i,h.id, h.name, h.discription, h.price,h.product_image);
      })  

      // console.log(ans);
      // .then((res) => console.log(res.config.data))
      // .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
   
  };


  return (
    <div>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="text-center container py-5">
          <h4 className="mt-4 mb-5">
            <strong>Bestsellers</strong>
          </h4>

          <div className="row">
          {
            productData  && (productData.data).map((h,i)=>{
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
                <span className="badge bg-primary ms-2">New</span>
              </h5>
            </div>
          </div>
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title mb-3">{h.name}</h5>
        {/* </a>
                  <a className="text-reset"> */}
        <p>{h.discription}</p>
        {/* </a> */}
        <h6 className="mb-3">${h.price}</h6>
      </div>
      <a href={i}>
        <div className="mask">
          <div className="d-flex justify-content-start align-items-end h-100">
            <h5>
              <span className="badge bg-primary ms-2" key={i}>
                Add to Cart
              </span>
            </h5>
          </div>
        </div>
      </a>
    </div>
  </div>
);
})
}
</div>
         
          
        </div>
      </section>
    </div>
  );
};

export default Home;
