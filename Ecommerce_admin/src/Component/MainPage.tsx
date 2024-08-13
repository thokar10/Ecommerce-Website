import { Link, Route, Routes } from "react-router-dom";
import DashboardPage from "./DashboardPage";
import HeaderPage from "./HeaderPage";
import ProductPage from "./ProductPage";
import { useState } from "react";
import OrderPage from "./VendorAll/OrderPage";

const MainPage = () => {
  //to make background color balck for side bar items
  const [itemsName, setItemsName] = useState("Dashboard");
  const sideBarItems = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Products",
      link: "/products",
    },
    {
      name: "Orders Details",
      link: "/orders",
    },
  ];

  return (
    <>
      <div className="w-[100vw] h-[100vh] overflow-hidden flex">
        <div className="h-[100vh] w-[10%] bg-[whitesmoke] flex justify-center ">
          <div className="mt-16 flex flex-col items-center gap-4 ">
            {sideBarItems.map((items) => {
              return (
                <>
                  {items.name === itemsName ? (
                    <>
                      <div className="bg-black text-white p-3">
                        {" "}
                        <Link
                          to={items.link}
                          onClick={() => {
                            setItemsName(items.name);
                          }}
                        >
                          {items.name}
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="">
                        {" "}
                        <Link
                          to={items.link}
                          onClick={() => {
                            setItemsName(items.name);
                          }}
                        >
                          {items.name}
                        </Link>
                      </div>
                    </>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div className="h-[100vh] w-[90%] flex flex-col  ">
          <div>
            <HeaderPage />
          </div>
          <div className="overflow-auto ">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage />}></Route>
              <Route path="/products" element={<ProductPage />}></Route>
              <Route path="/orders" element={<OrderPage />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;
