import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../UserProvider";
import { useNavigate } from "react-router-dom";
import { Button, Popover, message } from "antd";
import { IoMdMenu } from "react-icons/io";

const HeaderPage = () => {
  const content = (
    <div className="w-[5rem] flex justify-center">
      <Button
        danger
        onClick={() => {
          localStorage.removeItem("vender_access_token");
          navigate("/loginPage");
        }}
      >
        Sign Out
      </Button>
    </div>
  );
  const navigate = useNavigate();
  const userContextData = useContext(userContext);
  const [venderDetails, setVenderDetails]: any = useState({});
  const getVendorDetails = async () => {
    const getVenderAccessToken = localStorage.getItem("vender_access_token");

    try {
      if (!getVenderAccessToken) {
        setTimeout(() => {
          navigate("/signUpPage");
        }, 3000);
      }
      const response = await axios.post(
        "http://localhost:8000/vendors/dashboard",
        {},
        {
          headers: {
            Authorization: `bearer ${getVenderAccessToken}`,
          },
        }
      );
      console.log(response.data.venderDetails);
      setVenderDetails(response.data.venderDetails);
      userContextData.getUserDetails(response.data.venderDetails);
    } catch (error: any) {
      if (error.message.data) {
        message.error(error.message.errorMessage);
      }
      message.error(error);
    }
  };
  useEffect(() => {
    getVendorDetails();
  }, []);

  return (
    <>
      <div className="bg-gray-700 flex  justify-between  pl-[52px] pr-[52px] pt-[20px] pb-[20px]">
        {" "}
        <p className="font-semibold text-xl text-center text-white">
          Welcome {venderDetails.venderName}{" "}
        </p>
        <Popover placement="bottom" content={content}>
          <IoMdMenu className="bg-white rounded-[50%] text-2xl hover:cursor-pointer" />
        </Popover>
      </div>
    </>
  );
};
export default HeaderPage;
