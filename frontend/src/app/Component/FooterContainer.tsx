import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const FooterContainer = () => {
  return (
    <>
      <div className="flex footer-div justify-center w-[100%]  bg-slate-600 p-5">
        <div className=" w-[90%] flex gap-8   p-5 text-[whitesmoke]  ">
          <div className="flex w-[25%] flex-col gap-2 ">
            <p className="font-bold ">ABOUT</p>
            <p className="text-slate-400">
              Sporty is the e-commerce website established in 2023 which is
              related with the sports products and the quality provide by it are
              of good and better than other sports shop{" "}
            </p>
          </div>
          <div className="flex w-[25%] flex-col gap-2 ">
            <p className="font-bold  ">CATEGORIES</p>
            <ul className="list-disc text-slate-400">
              <li>Futsal Shoes</li>
              <li>Futsal T-Shirt</li>
            </ul>
          </div>
          <div className="flex w-[25%] flex-col gap-2 ">
            <p className="font-bold  ">INFORMATION</p>
            <ul className="list-disc text-slate-400">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Term and Conditions</li>
              <li>Return and Exchange</li>
              <li>Private Policy</li>
            </ul>
          </div>
          <div className="flex w-[25%] flex-col  gap-2">
            <p className="font-bold ">CONTACT</p>

            <div>
              <div className="flex  items-center gap-4  text-slate-400">
                <FaPhoneAlt />
                <p>
                  phone :{" "}
                  <span className="hover:text-red-400 cursor-pointer">
                    +977 981213123
                  </span>
                </p>
              </div>
              <div className="flex  items-center gap-4  text-slate-400">
                <MdEmail />
                <p>
                  Email :{" "}
                  <span className="hover:text-red-400 cursor-pointer">
                    Sporty@gmail.com
                  </span>{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FooterContainer;
