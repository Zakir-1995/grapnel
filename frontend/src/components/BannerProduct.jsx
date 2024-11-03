import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useCallback, useRef } from "react";
import { desktopBannerImage, mobileBannerImage } from "../data/BannerImage";

const BannerProduct = () => {
  const sliderRef = useRef(null);

  const handlePrev = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  return (
    <div className=" mx-auto container px-2 w-full h-72">
      <div className=" bg-slate-200 w-full h-full relative ">
        <Swiper
          ref={sliderRef}
          loop={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          modules={[Navigation, Autoplay]}
        >
          {window.screen.width < 640
            ? mobileBannerImage.map((el) => (
                <SwiperSlide key={el.id}>
                  <div className="w-full h-72 ">
                    <img
                      src={el.imgurl}
                      alt="banner image"
                      className="w-full h-full "
                    />
                  </div>
                </SwiperSlide>
              ))
            : desktopBannerImage.map((el) => (
                <SwiperSlide key={el.id}>
                  <div className="w-full h-72 ">
                    <img
                      src={el.imgurl}
                      alt="banner image"
                      className="w-full h-full  object-fill"
                    />
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        <div
          className="absolute top-[50%] left-8 z-10 cursor-pointer transform -translate-y-[50%] "
          onClick={handlePrev}
        >
          <IoIosArrowDropleftCircle className="w-6 h-6 opacity-80 hover:opacity-100 transition-all duration-200 ease-in " />
        </div>
        <div
          className="absolute top-[50%] right-8 z-10 cursor-pointer transform -translate-y-[50%] "
          onClick={handleNext}
        >
          <IoIosArrowDroprightCircle className="w-6 h-6 opacity-80 hover:opacity-100 transition-all duration-200 ease-in" />
        </div>
      </div>
    </div>
  );
};

export default BannerProduct;
