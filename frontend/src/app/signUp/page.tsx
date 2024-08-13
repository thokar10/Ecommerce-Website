"use client";
import { Button, Form, Input, InputNumber, message } from "antd";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HeaderPage from "../Component/HeaderPage";
import FooterContainer from "../Component/FooterContainer";
import { useRef, useState } from "react";

const Page = () => {
  const navigate = useRouter();
  const [firstForm] = Form.useForm();
  const [secondForm] = Form.useForm();

  const handleButtonClick = () => {
    const firstFormData = firstForm.getFieldValue();
    const secondFormData = secondForm.getFieldValue();

    const mergedData = { ...firstFormData, ...secondFormData };
    console.log(mergedData);
    onFinish(mergedData);
  };

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/Register",
        values
      );

      await localStorage.setItem(
        "userAccessToken",
        response.data.userAccessToken
      );
      message.success("registered successful");
      setTimeout(() => {
        navigate.push("/");
      }, 2000);
    } catch (error: any) {
      console.log(error.response.data);
      if (!error.response.data.errorMessage) {
        alert(error);
      } else {
        message.error(error.response.data.errorMessage);
      }
    }
  };
  return (
    <>
      <HeaderPage />

      <div className=" font-[inter]  flex  justify-center p-8 ">
        <div className=" w-[60%] h-max flex flex-col bg-gray-500  box-shadow ">
          <div className=" flex justify-between items-center p-8">
            <p className="text-[25px] font-semibold font-[inter] text-white q">
              {" "}
              Welcome to Sporty, please sign up !
            </p>
          </div>

          <div className=" flex  justify-center pb-[20px] pl-[10px] pr-[20px]  ">
            <Form
              form={firstForm}
              style={{ width: "50%" }}
              labelCol={{ span: 9 }}
              wrapperCol={{ span: 16 }}
              className=" pl-6  pr-6"
              onFinish={onFinish}
            >
              <Form.Item
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
                label={<p className="text-white">user name</p>}
                name="userName"
              >
                <Input className="text-gray-500" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your useremail!" },
                ]}
                label={<p className="text-white">email</p>}
                name="userEmail"
              >
                <Input className="text-gray-500" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                label={<p className="text-white">password</p>}
                name="userPassword"
              >
                <Input.Password className="text-gray-500" />
              </Form.Item>
              <Form.Item
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
                label={<p className="text-white">confirm password</p>}
                name="confirmPassword"
              >
                <Input.Password className="text-gray-500" />
              </Form.Item>
            </Form>
            <Form
              form={secondForm}
              style={{ width: "50%" }}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              className=" pl-5 pr-5 "
            >
              <Form.Item
                rules={[
                  { required: true, message: "Please input your location!" },
                ]}
                label={<p className="text-white">location</p>}
                name="location"
              >
                <Input className="text-gray-500" />
              </Form.Item>
              <Form.Item
                rules={[{ required: true, message: "enter  number !" }]}
                label={<p className="text-white">phone number</p>}
                name="phoneNo"
              >
                <InputNumber className="text-gray-500 w-[100%]" />
              </Form.Item>
              <div className="flex justify-center">
                <Button
                  onClick={handleButtonClick}
                  htmlType="submit"
                  type="primary"
                  className=" text-white  pt-[6px] pb-[6px] w-[30%] "
                >
                  SIGN UP
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <FooterContainer />
    </>
  );
};

export default Page;
