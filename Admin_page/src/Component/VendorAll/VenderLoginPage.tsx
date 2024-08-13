import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VenderLoginPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await axios.post(
        "http://localhost:8000/vendors/login",
        values
      );

      console.log(response.data);
      console.log(response.data.vender_access_token);
      message.success("login successful");
      localStorage.setItem(
        "vender_access_token",
        response.data.vender_access_token
      );

      form.resetFields();
      setTimeout(() => {
        navigate("/dashboard");
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
      <div className="all w-[100vw] h-[100vh] flex justify-center items-center ">
        <div className="bg-[whitesmoke] border-2 w-[50%] h-[70%] border-white rounded-lg  flex justify-center items-center ">
          <div className="bg-[#ffffff] flex justify-center p-9 items-center">
            <Form
              form={form}
              name="basic"
              labelCol={{ span: 10 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600, color: "white" }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Email"
                name="venderEmail"
                rules={[
                  { required: true, message: "Please enter your email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="venderPassword"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
export default VenderLoginPage;
