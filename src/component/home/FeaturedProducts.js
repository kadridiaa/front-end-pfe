import { GiShoppingCart } from "react-icons/gi";
import logo from "../logo.png";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import * as React from "react";
function FeaturedProducts() {
  return (
    <div className=" bg-gray-400/25 w-full h-screen">
      <div className="m-14 items-center flex flex-col ">
        <h1 className="text-6xl font-bold flex flex-col py-2">
          Featured Products
        </h1>
        <p className="text-gray-400 text-[20px] py-2">
          Summer Collection New Modern Desgin
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 w-full gap-6 ml-3 mt-4">
          <div className="border-2 rounded-xl flex flex-col border-gray-400/25">
            <div className="bg-gray-400/25 m-2 rounded-xl">
              <img className="m-1 w-full" src={logo} alt="" />
            </div>
            <div className="px-4 my-4 ">
              <h1 className="text-gray-600/55 font-bold pl-1">ss</h1>
              <h2 className="font-bold pl-1 ">first products</h2>
              <div className="flex items-center justify-between">
                <div className="flex flex-col items-start">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      // readOnly
                    />
                  </Stack>
                  <h1 className="text-green-600/75 font-bold pl-1">24$</h1>
                </div>
                <div>
                  <GiShoppingCart size={45} className="bg-green-600/15 p-2 border-2 border-gray-300/65 rounded-full text-green-600/55"/>
                </div>
              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl items-center justify-center flex flex-col border-gray-400/25">
            <div className="bg-gray-400/25 m-2 rounded-xl">
              <img className="m-2" src={logo} alt="" />
            </div>
            <div>
              <h1 className="text-gray-600/55">ss</h1>
              <h2>first products</h2>
              <div className="">
                <div className=" flex items-center">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      // readOnly
                    />
                  </Stack>
                  <h1>24$</h1>
                </div>
                <GiShoppingCart />
              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl items-center justify-center flex flex-col border-gray-400/25">
            <div className="bg-gray-400/25 m-2 rounded-xl">
              <img className="m-2" src={logo} alt="" />
            </div>
            <div>
              <h1 className="text-gray-600/55">ss</h1>
              <h2>first products</h2>
              <div className="">
                <div className=" flex items-center">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      // readOnly
                    />
                  </Stack>
                  <h1>24$</h1>
                </div>
                <GiShoppingCart />
              </div>
            </div>
          </div>
          <div className="border-2 rounded-xl items-center justify-center flex flex-col border-gray-400/25">
            <div className="bg-gray-400/25 m-2 rounded-xl">
              <img className="m-2" src={logo} alt="" />
            </div>
            <div>
              <h1 className="text-gray-600/55">ss</h1>
              <h2>first products</h2>
              <div className="">
                <div className=" flex items-center">
                  <Stack spacing={1}>
                    <Rating
                      name="half-rating"
                      defaultValue={2.5}
                      precision={0.5}
                      // readOnly
                    />
                  </Stack>
                  <h1>24$</h1>
                </div>
                <GiShoppingCart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
