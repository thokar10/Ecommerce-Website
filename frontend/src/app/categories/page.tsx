export const metadata = {
  title: "serached",
  description: "Generated by Next.js",
};

import { Button } from "antd";
import axios from "axios";
import Link from "next/link";
import HeaderPage from "../Component/HeaderPage";
import FooterContainer from "../Component/FooterContainer";

const page = async ({ searchParams }: any) => {
  const { category } = searchParams;
  console.log(category);
  let ProductDetails = [];
  try {
    const response = await axios.get(
      `http://localhost:8000/products/categories?category_name=${category}`
    );
    ProductDetails = response.data.productDetails;
    console.log(ProductDetails);
  } catch (error) {
    <div>something wrong</div>;
  }

  return (
    <>
      <div className="flex flex-col justify-between w-[100vw] h-[100vh] overflow-x-hidden bg-[whitesmoke]">
        <HeaderPage />

        <div className="w-[100%]">
          <div className="gridContainer grid gap-5 p-5 ">
            {ProductDetails.map((element: any) => (
              <>
                <Link href={`/productDetails/${element._id}`}>
                  <div className="product-container flex flex-col items-center  gap-5  rounded-sm p-5 bg-white hover:cursor-pointer  ">
                    <div className="flex flex-col items-center flex-wrap gap-5">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          style={{
                            backgroundImage: `url(${element.ProductImage})`,
                          }}
                          className="productImage h-[100px] w-[100px]"
                        ></div>{" "}
                        <p>{element.ProductName}</p>
                        <p className="text-red-400">
                          Rs.{element.ProductPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </>
            ))}
          </div>
        </div>

        <div>
          <FooterContainer />
        </div>
      </div>
    </>
  );
};
export default page;
