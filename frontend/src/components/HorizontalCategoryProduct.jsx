import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import summeryApi from "../common";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useCallback, useRef } from "react";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import Context from "../context";

const HorizontalCategoryProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const categoryLoading = new Array(5).fill(null);

  const sliderRef = useRef(null);
  const {  getCountAddToCart } = useContext(Context);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(summeryApi.categoryWiseProduct.url, {
        method: summeryApi.categoryWiseProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ category: category }),
      });

      const dataResponse = await response.json();
      setLoading(false);
      setData(dataResponse?.data);
    };
    fetchData();

  }, [category, setLoading]);

  const handleAddToCart = async(e,id) => {
   await addToCart(e, id)
   getCountAddToCart()
  }

  return (
    <div className="container mx-auto py-4 px-2 ">
      <div className="bg-slate-100 p-2 shadow">
        <h3 className="text-xl font-semibold text-metal capitalize">
          {heading}
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-full gap-4 py-4">
          {categoryLoading?.map((el, index) => (
            <div
              key={el + index}
              className="sm:w-64 w-full h-fit min-h-36  bg-white shadow bg-blend-overlay rounded   overflow-hidden flex gap-2 items-center sm:items-start animate-pulse "
            >
              <div className=" w-1/2 h-36   group  bg-slate-100 p-1 animate-pulse cursor-pointer "></div>
              <div className="p-1 w-1/2 flex flex-col justify-between  gap-4">
                <h4 className="bg-slate-100 p-1 rounded-full animate-pulse w-2/3"></h4>
                <span className="bg-slate-100 p-1 rounded-full animate-pulse w-1/2"></span>
                <div className="flex flex-col gap-4 pb-1 h-full  ">
                  <span className="bg-slate-100 p-1 rounded-full animate-pulse w-5/6">
                    <span className=" "> </span>
                  </span>
                  <span className="bg-slate-100 p-1 rounded-full animate-pulse w-1/2">
                    <span className=" "> </span>
                  </span>
                </div>
                <button className="bg-slate-100  animate-pulse p-1 rounded-full w-full   block"></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 relative ">
          <Swiper
            ref={sliderRef}
            slidesPerView={1}
            loop={true}
            spaceBetween={0}
            modules={[Navigation]}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {data?.map((el) => (
              <SwiperSlide key={el?._id}>
                <Link to={`product-details/${el?._id}`} >
                  <div className="sm:w-64 w-full h-fit min-h-36  bg-white shadow bg-blend-overlay rounded   overflow-hidden flex gap-2 items-center sm:items-start">
                    <div className=" w-1/2 h-36   group  bg-slate-100 cursor-pointer ">
                      <img
                        src={el?.productImage?.flat()[0].url}
                        alt="/"
                        className="w-full h-full group-hover:scale-110 transition-all duration-200 ease-linear  mix-blend-multiply object-contain sm:object-center"
                      />
                    </div>
                    <div className="p-1 w-1/2 flex flex-col justify-between">
                      <h4 className="text-metal text-lg font-semibold">
                        {el?.productName}
                      </h4>
                      <span className="font-semibold text-sm text-metal capitalize">
                        {el?.category}
                      </span>
                      <div className="flex items-center gap-1 pb-1">
                        <span className="text-red-700 line-through font-medium text-xs">
                          <span className="text-xl mr-[2px] "> &#x9F3;</span>
                          {el?.price}
                          {".00"}
                        </span>
                        <span className="text-red-500 font-semibold text-xs">
                          <span className="text-xl  font-bold "> &#x9F3;</span>
                          {el?.sellingPrice}
                          {".00"}
                        </span>
                      </div>
                      <button className="bg-purple px-2 py-1 rounded-full text-white font-semibold uppercase  text-xs hover:bg-midnight transition-all duration-300 ease-linear" onClick={(e)=>handleAddToCart(e,el?._id)}>
                        Add to cart
                      </button>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}

            <div
              className="absolute top-[50%] left-4 z-10 cursor-pointer transform -translate-y-[50%] "
              onClick={handlePrev}
            >
              <IoIosArrowDropleftCircle className="w-6 h-6 opacity-80 hover:opacity-100 transition-all duration-200 ease-in  " />
            </div>
            <div
              className="absolute top-[50%] right-8 z-10 cursor-pointer transform -translate-y-[50%] "
              onClick={handleNext}
            >
              <IoIosArrowDroprightCircle className="w-6 h-6 opacity-80 hover:opacity-100 transition-all duration-200 ease-in" />
            </div>
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default HorizontalCategoryProduct;

HorizontalCategoryProduct.propTypes = {
  category: PropTypes.string,
  heading: PropTypes.string,
};
