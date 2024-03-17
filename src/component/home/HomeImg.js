import React from "react";
import button from "../logo/button.png";
import ecommerceImg from "../logo/slide-ecommerce-removebg-preview.png";

function HomeImg() {
  return (
    <div className="bg-gray-400/35 h-screen flex pb-20">
      <div className="pl-20 justify-center flex flex-col w-[50%]">
        <h1 className="text-xl text-black font-[500]">Trade-in-Offer</h1>
        <p className="text-6xl flex flex-col py-2">
          Super Value deals
          <span className="text-green-600/55">On all Porducts</span>
          <span className="text-gray-400 text-[20px] py-2">
            Save more with coupons & up to 70% off !
          </span>
          <button className="relative my-4">
            <img src={button} alt="shop" />
            <h1 className="absolute left-14 top-3 text-[20px] font-bold text-green-600/55">
              Shop now
            </h1>
          </button>
        </p>
      </div>
      <div className="w-[50%] flex items-center mr-28">
        <img  src={ecommerceImg} alt="img" className="w-full" />
      </div>
    </div>
  );
}

export default HomeImg;
