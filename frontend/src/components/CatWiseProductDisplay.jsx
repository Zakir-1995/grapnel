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
import scrollTop from "../helper/ScrollTop";
const CatWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(7).fill(null);

  const sliderRef = useRef(null);
  const { getCountAddToCart } = useContext(Context);
  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

    const handleAddToCart = async (e, id) => {
      await addToCart(e, id);
      getCountAddToCart();
    };


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

  return (
    <div className="container mx-auto py-4 px-2">
      <div className="bg-slate-100  shadow p-2">
        <h3 className="text-xl font-semibold text-metal capitalize">
          {heading}
        </h3>
      </div>

      {loading ? (
        <div className="flex items-center gap-4 py-4">
          {categoryLoading?.map((el, index) => (
            <div
              key={el + index}
              className="sm:w-36 md:w-40 w-full h-fit bg-white shadow bg-blend-overlay rounded  animate-pulse  p-2 "
            >
              <div className=" w-full  custom:h-36 h-60 group  bg-slate-100 cursor-pointer overflow-hidden rounded"></div>
              <div className="p-1 space-y-4">
                <h4 className="bg-slate-100  rounded-full animate-pulse p-1 w-2/3 "></h4>
                <span className="bg-slate-100  rounded-full animate-pulse p-1 mt-2 block w-1/2"></span>
                <div className="flex pb-1 flex-col gap-4 ">
                  <p className="bg-slate-100  rounded-full animate-pulse p-1 w-full">
                    <span className="w-full h-1 "> </span>
                  </p>
                  <p className="bg-slate-100  rounded-full animate-pulse p-1 w-2/5">
                    <span className="text-2xl  font-bold "></span>
                  </p>
                </div>
                <button className="bg-slate-100  p-2 rounded-full animate-pulse block w-full"></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-4 relative">
          <Swiper
            ref={sliderRef}
            slidesPerView={1}
            loop={true}
            spaceBetween={0}
            modules={[Navigation]}
            breakpoints={{
              380: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 4,
                spaceBetween: 10,
              },

              1024: {
                slidesPerView: 7,
                spaceBetween: 20,
              },
            }}
          >
            {data?.map((el) => (
              <SwiperSlide key={el?._id}>
                <Link to={`/product-details/${el?._id}`} onClick={scrollTop}>
                  <div className="sm:w-36 md:w-40 w-full h-fit bg-white shadow bg-blend-overlay rounded    p-2">
                    <div className=" w-full  custom:h-36 h-60 group  bg-slate-100 cursor-pointer overflow-hidden rounded">
                      <img
                        src={el?.productImage?.flat()[0].url}
                        alt="/"
                        className="w-full object-contain  group-hover:scale-110 transition-all duration-200 ease-linear  mix-blend-multiply h-full "
                      />
                    </div>
                    <div className="p-1">
                      <h4 className="text-metal  font-semibold">
                        {el?.productName}
                      </h4>
                      <span className="font-semibold text-sm text-metal capitalize">
                        {el?.category}
                      </span>
                      <div className="flex pb-1 flex-col ">
                        <p className="text-red-700 line-through font-medium">
                          <span className="text-2xl  "> &#x9F3;</span>
                          {`${el?.price}.00`}
                        </p>
                        <p className="text-red-500 font-semibold">
                          <span className="text-2xl  font-bold ">&#x9F3;</span>
                          {`${el?.sellingPrice}.00`}
                        </p>
                      </div>
                      <button
                        className="bg-purple px-3 py-1 rounded-full text-white font-semibold uppercase  text-xs hover:bg-midnight transition-all duration-300 ease-linear"
                        onClick={(e) => handleAddToCart(e, el?._id)}
                      >
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

export default CatWiseProductDisplay;

CatWiseProductDisplay.propTypes = {
  category: PropTypes.string,
  heading: PropTypes.string,
};
