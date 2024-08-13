"use client";
import { useEffect, useState } from "react";
import HeaderPage from "../Component/HeaderPage";
import axios from "axios";
import FooterContainer from "../Component/FooterContainer";

const Page = () => {
  const [orderDetails, setOrderDetails]: any = useState([]);
  const getOrderDetails = async () => {
    const userToken = localStorage.getItem("userAccessToken");

    try {
      const response: any = await axios.get(
        "http://localhost:8000/carts/getOrderDetails",
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      setOrderDetails(response.data.OrderDetails);
    } catch (e) {}
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <HeaderPage />
      <div className=" flex flex-col gap-2 items-center text-gray-500 p-5">
        <p className="font-mono font-bold text-2xl p-2 rounded-sm  product-container  bg-[whitesmoke] text-gray-500 ">
          Order List
        </p>
        <div className="flex flex-col gap-10   w-[60%]  p-5  ">
          {orderDetails.map((orderProducts) => (
            <>
              <div className="flex flex-col  justify-evenly   box-shadow  ">
                <div className="flex justify-evenly items-center p-5">
                  <div className="flex items-center gap-4">
                    <div
                      style={{
                        backgroundImage: `url(${orderProducts.productId?.ProductImage})`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",

                        backgroundPosition: "center",
                        width: "100px",
                        height: "100px",
                      }}
                    ></div>
                    <p>{orderProducts.productId?.ProductName}</p>
                    <p className=" font-semibold">
                      Rs. {orderProducts.productId?.ProductPrice}
                    </p>
                    <div className="flex gap-2">
                      {" "}
                      <p>Quantity:</p>
                      <p>{orderProducts?.Quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex font-mono font-bold text-red-500">
                      <p>Total Amount:</p>
                      <p>Rs. {orderProducts?.totalPrice}</p>
                    </div>
                  </div>
                </div>

                <div className="font-mono flex justify-center  gap-5   p-2 rounded-sm  text-gray-400 ">
                  <p className="underline text-md">Order Status:</p>
                  <p className="  font-extrabold text-red-300">
                    {orderProducts.orderStatus}
                  </p>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      <FooterContainer />
    </>
  );
};
export default Page;
