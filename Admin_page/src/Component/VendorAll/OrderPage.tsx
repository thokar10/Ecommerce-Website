import { Table, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const OrderPage = () => {
  const [arrayList, setorderArrayList] = useState([]);
  const getOrderList = async () => {
    try {
      const vender_access_token = localStorage.getItem("vender_access_token");

      const response = await axios.get(
        "http://localhost:8000/vendors/orderDetails",
        {
          headers: {
            Authorization: `Bearer ${vender_access_token}`,
          },
        }
      );

      setorderArrayList(response.data.allProducts);
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  const data = arrayList.map((product, index) => {
    return {
      key: index + 1,
      ProductName: product.productId.ProductName,
      ProductImage: product.productId.ProductImage,
      Quantity: product.Quantity,
    };
  });
  console.log(data);
  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Product Image",
      dataIndex: "ProductImage",
      key: "ProductImage",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
  ];

  return (
    <>
      <div className="flex justify-center p-5">
        {" "}
        <Table
          className="w-[80%] shadow-md"
          columns={columns}
          dataSource={data}
          bordered
          pagination={{ pageSize: 4 }}
        />
      </div>
    </>
  );
};
export default OrderPage;
