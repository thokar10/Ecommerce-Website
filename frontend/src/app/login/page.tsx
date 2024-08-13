"use client";
import { Button, Form, Input, message } from "antd";
import axios from "axios";

import { useRouter } from "next/navigation";
import HeaderPage from "../Component/HeaderPage";
import FooterContainer from "../Component/FooterContainer";
import { useEffect, useState } from "react";

const Page = () => {
  const navigate = useRouter();
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        values
      );

      await localStorage.setItem(
        "userAccessToken",
        response.data.userAccessToken
      );
      message.success("login successful");
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
      <div className=" p-6 flex    justify-center  font-[inter]  ">
        <div className=" w-[60%] h-[30rem] flex flex-col bg-gray-500 box-shadow ">
          <div className=" flex justify-between text-white items-center p-8">
            <p className="text-[25px] font-semibold ">
              {" "}
              Welcome to Sporty, please login !
            </p>
            <p className="text-[15px] ">
              New member,{" "}
              <span
                className="text-red-400 hover:cursor-pointer"
                onClick={() => {
                  navigate.push("/signUp");
                }}
              >
                Register
              </span>{" "}
              here
            </p>
          </div>

          <div className="  p-5 flex gap-2 justify-center  ">
            <div className="w-[40%]  flex flex-col  p-5   ">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                style={{ maxWidth: 600, color: "white" }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
              >
                <Form.Item
                  label={<p className="text-white">email</p>}
                  name="userEmail"
                  rules={[
                    { required: true, message: "Please enter your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label={<p className="text-white">Password</p>}
                  name="userPassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <div className="  flex justify-center w-[100%]">
                  <Button
                    htmlType="submit"
                    type="primary"
                    className=" text-white pl-7 pr-7 pt-2 pb-2 w-auto h-auto "
                  >
                    LOGIN
                  </Button>
                </div>
              </Form>
              <div className="flex justify-end pt-2">
                <p className="text-[14px] hover:cursor-pointer text-white hover:text-red-400 ">
                  Reset Your Password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterContainer />
    </>
  );
};

export default Page;
