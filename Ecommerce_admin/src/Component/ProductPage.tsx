import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  Tag,
  message,
} from "antd";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserProvider";

const ProductPage = () => {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const userContextData: any = useContext(userContext);

  const getAccessToken = localStorage.getItem("vender_access_token");
  console.log(getAccessToken);

  const addProductSubmit = async (values: any) => {
    console.log("Success:", values);
    console.log(userContextData.userDetails);
    const vendor_id = userContextData.userDetails._id;
    console.log(vendor_id);

    const mergedObject = { ...values, vendor_id };
    console.log(mergedObject);

    try {
      await axios.post(
        "http://localhost:8000/products/createProducts",
        mergedObject,
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      message.success("product created successfully");
      // form.resetFields();
      getAllProduct();
    } catch (e: any) {
      const errorMessage = e.response.data.message;
      if (!errorMessage) {
        message.error(e);
      } else {
        message.error(errorMessage);
      }
    }
  };

  const getAllProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/products/getAllProducts",
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        }
      );
      console.log(response.data.productDetails);
      setProductDetails(response.data.productDetails);
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
    getAllProduct();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //table data
  const dataSource = productDetails;
  const columns = [
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
      render: (data: any, dataSource: any) => (
        <>
          <div className="flex items-center justify-between ">
            <p className="font-bold">{data}</p>
            <div
              className="h-[50px] w-[50px] rounded-[50%] border-2 border-black"
              style={{
                backgroundImage: `url(${dataSource.ProductImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
            ></div>
          </div>
        </>
      ),
    },
    {
      title: "Product Price",
      dataIndex: "ProductPrice",
      key: "ProductPrice",
      render: (data: any) => (
        <>
          <Tag color="#2db7f5">
            <p className="text-[15px]">{data}</p>
          </Tag>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="p-5">
        {" "}
        <Button type="primary" onClick={showModal}>
          + Add Product
        </Button>
      </div>
      <div className="flex  justify-center">
        <div>
          <Modal
            title={
              <div className="bg-black text-white p-2 flex justify-center ">
                <p>Product Details</p>
              </div>
            }
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <div className="p-4">
              <Form
                form={form}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={addProductSubmit}
              >
                <Form.Item
                  label="Product Name:"
                  name="ProductName"
                  rules={[
                    { required: true, message: "Please input  product name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Product Image:"
                  name="ProductImage"
                  rules={[
                    { required: true, message: "Please input  product image!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label="Product Price:"
                  name="ProductPrice"
                  rules={[
                    { required: true, message: "Please input  product price!" },
                  ]}
                >
                  <InputNumber style={{ width: "18.5rem" }} />
                </Form.Item>
                <Form.Item
                  label="Product Category:"
                  name="ProductCategory"
                  rules={[
                    { required: true, message: "Please input  product name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button type="default" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        </div>
        <div className="w-[90%]">
          {/* {productDetails.map((product: any) => {
            return <>{product.ProductName}</>;
          })} */}
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            pagination={{ pageSize: 4 }}
          />
        </div>
      </div>
    </>
  );
};
export default ProductPage;
