import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import addToCart from "../helper/addToCart";
import { useContext } from "react";
import Context from "../context";
const SearchProductCard = ({ data=[] }) => {
 const { getCountAddToCart } = useContext(Context);
      const handleAddToCart = async (e, id) => {
        await addToCart(e, id);
        getCountAddToCart();
      };
    return (
      <div className="py-4 container mx-auto">
        <div className="pb-4">
          <p className="text-xl font-semibold text-metal">{data.length} product found</p>
        </div>
        <div className="grid   grid-cols-7 gap-4 ">
          {data?.map((el) => (
            <div key={el._id}>
              <Link to={`/product-details/${el?._id}`}>
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
            </div>
          ))}
        </div>
      </div>
    );
};

export default SearchProductCard;


SearchProductCard.propTypes = {
  data: PropTypes.array,
};
