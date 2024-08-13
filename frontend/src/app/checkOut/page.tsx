"use client";
import { Button, Spin, message } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import FooterContainer from "../Component/FooterContainer";
import HeaderPage from "../Component/HeaderPage";
import { IProductDetails } from "../utils/interface";

const Page = () => {
  const navigate = useRouter();
  const [loading, setLoading] = useState(false);

  const shippingPrice = 200;

  const [userToken, setUserToken] = useState(" ");
  const [AllCartItems, setAllCartItems] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  const [numberOfProduct, setNumberOfProduct] = useState(0);
  const [showEmptyDiv, setShowEmptyDiv] = useState(false);

  const orderProduct = async () => {
    try {
      await axios.post(
        "http://localhost:8000/carts/orderProducts",
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      message.success("order successful");

      getCartItems();
      setTimeout(() => {
        navigate.push("/orderDetails");
      }, 3000);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };

  const getCartItems = async () => {
    const userTokenFromLocalStorage = localStorage.getItem("userAccessToken");
    if (userTokenFromLocalStorage !== null) {
      setUserToken(userTokenFromLocalStorage);
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/carts/getAllProducts",
        {
          headers: {
            Authorization: `Bearer ${userTokenFromLocalStorage}`,
          },
        }
      );

      setAllCartItems(response.data.ProductDetails);

      if (response.data.ProductDetails.length === 0) {
        setShowEmptyDiv(true);
      }
      setCartTotalPrice(response.data.TotalAmountOfCart);
      setNumberOfProduct(response.data.ProductsNumber);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };
  useEffect(() => {
    const userTokenFromLocalStorage = localStorage.getItem("userAccessToken");

    if (!userTokenFromLocalStorage) {
      message.error("login first");

      navigate.push("/login");
    } else {
      getCartItems();
    }
  }, []);

  const changeQuantity = async (Quantity: number, cartId: string) => {
    let temQuantity;
    if (Quantity > 5 || Quantity < 1) {
      message.error("You can't change furthermore");
      if (Quantity == 6) {
        temQuantity = 5;
      } else {
        temQuantity = 1;
      }

      try {
        const userToken = localStorage.getItem("userAccessToken");
        await axios.patch(
          `http://localhost:8000/carts/updateCarts?cart_id=${cartId}`,
          {
            Quantity: temQuantity,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        getCartItems();
        setLoading(false);
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          message.error(error.response.data.errorMessage);
        }
        message.error(error);
      }
    } else {
      try {
        const userToken = localStorage.getItem("userAccessToken");
        await axios.patch(
          `http://localhost:8000/carts/updateCarts?cart_id=${cartId}`,
          {
            Quantity: Quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        message.success(" quantity update successful");
        setTimeout(() => {
          getCartItems();
          setLoading(false);
        }, 2000);
      } catch (error: any) {
        if (error.response.data.errorMessage) {
          message.error(error.response.data.errorMessage);
        }
        message.error(error);
      }
    }
  };

  const deleteItemFromCart = async (cartId: string) => {
    try {
      const userToken = localStorage.getItem("userAccessToken");
      await axios.delete(
        `http://localhost:8000/carts/deleteProducts?cartProductId=${cartId}`,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      message.success(" Item deleted successfully");
      setTimeout(() => {
        getCartItems();
      }, 2000);
    } catch (error: any) {
      if (error.response.data.errorMessage) {
        message.error(error.response.data.errorMessage);
      }
      message.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-between h-[100vh] w-[100vw] overflow-x-hidden ">
        <HeaderPage />

        {loading ? (
          <>
            <div className="flex w-[100vw] h-[100vh] justify-center p-5">
              <Spin tip="Loading" size="large" />
            </div>
          </>
        ) : (
          <>
            <div className="flex   justify-center pt-10 ">
              <div className="w-[75%] flex   gap-5">
                {showEmptyDiv ? (
                  <>
                    <div className="flex flex-col w-[100vw]  items-center p-5 gap-5 ">
                      <p className="text-sm text-gray-500">
                        {" "}
                        There are no items in cart
                      </p>
                      <Button
                        className="bg-orange-400 w-[11rem] h-[3rem] "
                        type="primary"
                        onClick={() => {
                          navigate.push("/");
                        }}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left side part */}
                    <div className="w-[75%]  ">
                      <div className="flex flex-col gap-7 justify-between p-10 ">
                        {AllCartItems.map((items: IProductDetails) => {
                          return (
                            <>
                              <div className="flex justify-between h-[max-content] bg-white box-shadow p-9">
                                <div className="flex flex-col gap-7   items-center h-[max-content] ">
                                  <div className="flex justify-center items-center gap-5 ">
                                    {" "}
                                    <img
                                      src={items.productId.ProductImage}
                                      className="w-[100px]"
                                      alt="s"
                                    />
                                    <p className="text-gray-500 text-[15px]">
                                      {items.productId.ProductName}
                                    </p>
                                  </div>

                                  <p className="text-gray-500 text-xl">
                                    Rs. {items.productId.ProductPrice}
                                  </p>
                                </div>

                                <div className="flex gap-2 items-center">
                                  <div className="flex gap-4 items-center">
                                    {" "}
                                    <Button
                                      className="w-[45px]  "
                                      onClick={() => {
                                        const addedQuantityNumber =
                                          items.Quantity - 1;
                                        changeQuantity(
                                          addedQuantityNumber,
                                          items._id
                                        );
                                        setLoading(true);
                                      }}
                                    >
                                      -
                                    </Button>
                                    <p className="text-gray-500 font-mono font-semibold">
                                      {items.Quantity}
                                    </p>
                                    <Button
                                      className="w-[45px]    "
                                      onClick={() => {
                                        const addedQuantityNumber =
                                          items.Quantity + 1;
                                        changeQuantity(
                                          addedQuantityNumber,
                                          items._id
                                        );
                                        setLoading(true);
                                      }}
                                    >
                                      +
                                    </Button>
                                  </div>
                                  <div
                                    className="hover:cursor-pointer text-2xl "
                                    onClick={() => {
                                      deleteItemFromCart(items._id);
                                    }}
                                  >
                                    <Button danger>delete</Button>
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    </div>

                    {/* right side part */}
                    <div className="w-[35%] h-[max-content] flex flex-grow flex-col gap-2 box-shadow p-5 bg-white text-gray-500 sticky top-5">
                      <p className="text-center font-semibold ">
                        Order Summary
                      </p>
                      <div className="flex justify-between">
                        <p>Total price:</p>

                        <p className="font-semibold text-gray-500">
                          Rs. {cartTotalPrice}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>Number of products in cart:</p>

                        <p className="font-semibold text-gray-500">
                          {numberOfProduct}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <p>shipping price:</p>
                        <p className="font-semibold text-gray-500">
                          Rs. {shippingPrice}
                        </p>
                      </div>
                      <div className="flex font-mono justify-between pt-5">
                        <p className="font-semibold text-xl text-gray-500 ">
                          Total Amount
                        </p>
                        <p className="font-semibold text-xl   text-red-400">
                          Rs. {shippingPrice + cartTotalPrice}
                        </p>
                      </div>

                      <Button
                        type="primary"
                        className="w-[100%]"
                        onClick={() => {
                          orderProduct();
                          setLoading(true);
                        }}
                      >
                        Order Product
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </>
        )}

        <div>
          <FooterContainer />
        </div>
      </div>
    </>
  );
};
export default Page;
