import { useParams } from "react-router-dom";
import summeryApi from "../common";
import { useCallback, useContext, useEffect, useState } from "react";
import { FaRegStar, FaRegStarHalf } from "react-icons/fa";
import CatWiseProductDisplay from "../components/CatWiseProductDisplay";
import addToCart from "../helper/addToCart";
import Context from "../context";
const DetailsProduct = () => {
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [zoomCordinate, setZoomCordinate] = useState({
    x: 0,
    y: 0,
  });
  const imageBtnLoading = new Array(4).fill(null);
  const imageLoading = new Array(1).fill(null);
  const productLoading = new Array(1).fill(null);
  const { getCountAddToCart } = useContext(Context);
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const fetchData = await fetch(summeryApi.detailsProduct.url, {
        method: summeryApi.detailsProduct.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: params.id }),
      });

      const response = await fetchData.json();
      if (response) {
        setLoading(false);
        setProduct(response?.data);
        setActiveImage(response?.data?.productImage?.flat()[0].url);
      }
    };
    fetchProduct();
  }, [params?.id]);

  const setOnMouseDown = (imgUrl) => {
    setActiveImage(imgUrl);
  };

  const handleZoomImage = useCallback((e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    setZoomCordinate({
      x,
      y,
    });
  }, []);
    const handleAddToCart = async (e, id) => {
      await addToCart(e, id);
      getCountAddToCart();
    };
  return (
    <div className="container mx-auto px-4  py-8 ">
      <div className="flex gap-4 ">
        {/* image part  */}

        {loading ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-2 justify-center">
              {imageBtnLoading?.map((el, index) => (
                <div
                  key={el + index}
                  className="w-20 h-20 bg-slate-100 rounded shadow cursor-pointer animate-pulse"
                ></div>
              ))}
            </div>
            {imageLoading.map((el, index) => (
              <div
                key={el + index}
                className="bg-slate-100 w-[350px] h-[350px] shadow rounded flex flex-col justify-center items-center animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-4 ">
            <div className="flex flex-col gap-2 justify-center">
              {product?.productImage?.flat().map((imgUrl) => (
                <div
                  key={imgUrl.public_id}
                  className="w-20 h-20 bg-white rounded shadow cursor-pointer"
                  onMouseEnter={() => setOnMouseDown(imgUrl.url)}
                  onClick={() => setOnMouseDown(imgUrl.url)}
                >
                  <img
                    src={imgUrl.url}
                    alt="/"
                    className="w-full h-full object-contain"
                  />
                </div>
              ))}
            </div>
            <div className="bg-white w-[350px] h-[350px] shadow rounded flex flex-col justify-center items-center group relative cursor-pointer">
              <img
                src={activeImage}
                alt="/"
                className="w-full h-full object-contain "
                onMouseMove={handleZoomImage}
              />
              <div
                className="bg-slate-100 w-[160%] h-full absolute left-[100%] top-0 hidden group-hover:block z-50 "
                style={{
                  backgroundImage: `url(${activeImage})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: `${zoomCordinate.x * 100}%  ${
                    zoomCordinate.y * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        )}
        {/* details part  */}
        {loading ? (
          productLoading?.map((el, index) => (
            <div key={el + index} className="w-full space-y-4">
              <span className=" shadow rounded-full py-3 bg-slate-100 w-2/4 animate-pulse block "></span>
              <h4 className="rounded-full py-5 bg-slate-100 w-3/5 animate-pulse  "></h4>
              <span className="rounded-full py-2 bg-slate-100 w-1/3 animate-pulse block "></span>
              <div className="flex items-center gap-1 text-orange-500">
                <span className="rounded-full py-2 bg-slate-100 w-5 animate-pulse block "></span>
                <span className="rounded-full py-2 bg-slate-100 w-5 animate-pulse block "></span>
                <span className="rounded-full py-2 bg-slate-100 w-5 animate-pulse block "></span>
                <span className="rounded-full py-2 bg-slate-100 w-5 animate-pulse block "></span>
                <span className="rounded-full py-2 bg-slate-100 w-5 animate-pulse block "></span>
              </div>
              <div className="flex items-center gap-2">
                <p className="rounded-full py-2 bg-slate-100 w-40 animate-pulse block"></p>
                <p className="rounded-full py-2 bg-slate-100 w-40 animate-pulse block"></p>
              </div>
              <div className="flex items-center gap-4">
                <button className="rounded-full py-4 bg-slate-100 w-40 animate-pulse block"></button>
                <button className="rounded-full py-4 bg-slate-100 w-40 animate-pulse block"></button>
              </div>
              <p className="rounded py-2 bg-slate-100 w-full h-20 animate-pulse block"></p>
            </div>
          ))
        ) : (
          <div className="relative">
            <div className="w-full space-y-4">
              <span className="bg-purple shadow rounded-full py-1 px-2  capitalize text-white text-sm font-bold">
                {product?.brandName}
              </span>
              <h4 className="text-3xl font-semibold  capitalize  ">
                {product?.productName}
              </h4>
              <span className="text-xs font-semibold  uppercase text-slate-400  ">
                {product?.category}
              </span>
              <div className="flex items-center gap-1 text-orange-500">
                <FaRegStar size={20} />
                <FaRegStar size={20} />
                <FaRegStar size={20} />
                <FaRegStar size={20} />
                <FaRegStarHalf size={20} />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-2xl font-semibold text-orange-600">
                  <span className="text-xl font-bold">&#x9F3;</span>
                  {`${product?.sellingPrice}.00`}
                </p>
                <p className="text-2xl font-semibold text-slate-400 line-through">
                  <span className="text-xl font-bold">&#x9F3;</span>
                  {`${product?.price}.00`}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="border border-purple px-2 py-1 rounded-full w-20 uppercase text-sm font-bold text-purple hover:bg-purple hover:text-white transition-all duration-200 ease-linear">
                  Buy
                </button>
                <button
                  className="border border-purple px-2 py-1 rounded-full  uppercase text-sm font-bold hover:text-purple bg-purple text-white hover:bg-transparent transition-all duration-200 ease-linear"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add To Cart
                </button>
              </div>
              <p className="text-sm font-semibold text-metal leading-6 ">
                {product?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="py-4">
        <CatWiseProductDisplay
          category={product?.category}
          heading={"Recommended Product"}
        />
      </div>
    </div>
  );
};

export default DetailsProduct;
