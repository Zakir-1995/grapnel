import { useEffect, useState } from "react";
import summeryApi from "../common";
import { Link } from "react-router-dom";

const GetCategoryProductOne = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryLoading = new Array(12).fill(null)

  const getCategoryProduct = async () => {
    const fetchResponse = await fetch(summeryApi.getCategoryProductOne.url);
    const fetchData = await fetchResponse.json();
    if (fetchData.success) {
      setProducts(fetchData);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryProduct();
  }, []);

  return (
    <div className=" container mx-auto flex items-center space-x-2  overflow-x-scroll scrollbar_none justify-between py-4 px-2">
      {loading
        ? categoryLoading?.map((el,index) => (
            <div key={el+ index} className="md:w-24 md:h-24 w-16 h-16 bg-slate-50 shadow rounded-full animate-pulse"></div>
          ))
        : products?.data?.map((product) => (
            <Link
              to={`/product-category?category=${product.category}`}
              key={product._id}
              className=" flex flex-col items-center gap-1 justify-center "
            >
              <div className="md:w-24 md:h-24 w-16 h-16 bg-slate-50 shadow rounded-full md:p-4 p-2 group">
                <img
                  src={product?.productImage?.flat()[0].url}
                  alt={product.name}
                  className="w-full h-full object-contain  mix-blend-multiply group-hover:scale-125 transition-all duration-200"
                />
              </div>
              <p className="md:text-sm font-semibold text-metal text-xs text-center">
                {product.productName}
              </p>
            </Link>
          ))}
    </div>
  );
};

export default GetCategoryProductOne;
