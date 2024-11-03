import { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import summeryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

const AllProduct = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [product, setProduct] = useState([]);

  const getAllProducts = async () => {
    const fetchResponse = await fetch(summeryApi.getProduct.url, {
      method: summeryApi.getProduct.method,
    });
    const fetchData = await fetchResponse.json();
    setProduct(fetchData?.data || []);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className=" h-full">
      <div className="flex justify-between items-center bg-white p-2 rounded">
        <h3 className=" text-lg font-semibold text-metal ">AllProduct</h3>
        <button
          className="text-metal font-bold text-sm border border-purple px-2 py-1 rounded-full hover:bg-purple hover:text-white transition-all duration-200 ease-in-out"
          onClick={() => setOpenUploadProduct(true)}
        >
          Upload
        </button>
      </div>
      {/* Upload product Component  */}
      {openUploadProduct && (
        <UploadProduct
          onClose={() => setOpenUploadProduct(false)}
          fetchProduct={getAllProducts}
          openModal={openUploadProduct}
        />
      )}

      <div>
        <AdminProductCard
          products={product}
          onClose={() => setOpenUploadProduct(false)}
          fetchProduct={getAllProducts}
        />
      </div>
    </div>
  );
};

export default AllProduct;
