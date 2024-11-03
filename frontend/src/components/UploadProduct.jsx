import { IoMdCloseCircle } from "react-icons/io";
import PropTypes from "prop-types";
import { useState } from "react";
import productCategory from "../helper/ProductCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { imageToBase64 } from "../helper/ImageToBase64";
import DisplayImage from "./DisplayImage";
import summeryApi from "../common";
import {toast} from 'react-hot-toast'

const UploadProduct = ({ onClose, fetchProduct }) => {
  const [productData, setProductData] = useState({
    productName: "",
    brandName: "",
    productImage: [],
    category: "",
    description: "",
    price: "",
    sellingPrice: "",
  });
  const { productName, brandName, category, description, price, sellingPrice } =
    productData;
  const [fullScreenImage, setFullScreenImage] = useState("");
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleProductImage = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageToBase64(file);
    setProductData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, imagePic],
      };
    });
  };

  const handleChange = (e) => {
    setProductData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onDeleteImage = (index) => {
    const newProductImage = [...productData.productImage];
    newProductImage.splice(index, 1);
    setProductData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const dataRespons = await fetch(summeryApi.uploadProduct.url, {
      method: summeryApi.uploadProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const responseData = await dataRespons.json();

    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchProduct();

    }

    if (responseData.error) {
      toast.error(responseData?.message);
    }
  };

  return (
    <div className="fixed w-full h-full bg-black/60  top-0 left-0 flex justify-center items-center">
      <div className="pt-5  bg-white shadow-md w-[600px] h-[500px] rounded relative overflow-y-scroll">
        <button className="absolute left-1 top-1 " onClick={onClose}>
          <IoMdCloseCircle className="w-5 h-5 text-red-700" />
        </button>
        <div className="  p-3 w-full">
          <h3 className="text-lg font-semibold text-metal bg-slate-100 px-2 rounded py-1">
            Upload Product
          </h3>

          <form className="my-2 space-y-2" onSubmit={handleProductSubmit}>
            <div className="flex flex-col">
              <label className=" font-semibold text-metal">Product Name:</label>
              <input
                className="outline-none border border-purple px-2 py-1 w-full rounded text-metal font-semibold"
                type="text"
                name="productName"
                placeholder="Enter Product Name"
                value={productName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <label className=" font-semibold text-metal">Brand Name:</label>
              <input
                className="outline-none border border-purple px-2 py-1 w-full rounded text-metal font-semibold"
                type="text"
                name="brandName"
                placeholder="Enter Brand Name"
                value={brandName}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col ">
              <label className=" font-semibold text-metal mb-1">
                Category:
              </label>
              <select
                onChange={handleChange}
                name="category"
                value={category}
                className="border border-purple px-2 py-1 w-full rounded text-metal font-semibold bg-transparent "
              >
                <option value={""} disabled>
                  Select Category
                </option>
                {productCategory.map((cat, index) => (
                  <option key={index} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex flex-col w-full">
                <label className=" font-semibold text-metal">Price:</label>
                <input
                  className="outline-none border border-purple px-2 py-1 w-full rounded text-metal font-semibold"
                  type="number"
                  name="price"
                  placeholder="Enter Product Price"
                  value={price}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col w-full">
                <label className=" font-semibold text-metal">
                  Selling Price:
                </label>
                <input
                  className="outline-none border border-purple px-2 w-full py-1 rounded text-metal font-semibold"
                  type="number"
                  name="sellingPrice"
                  placeholder="Enter Selling Price"
                  value={sellingPrice}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className=" font-semibold text-metal">
                Product Description:
              </label>
              <textarea
                className="resize-none outline-none border border-purple p-2 w-full rounded  text-metal font-semibold"
                type="text"
                name="description"
                placeholder="Enter Product Description"
                value={description}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="flex flex-col ">
              <label className=" font-semibold text-metal mb-1">
                Product Image:
              </label>
              <div className="w-full h-24 bg-slate-100 rounded relative flex flex-col justify-center items-center cursor-pointer">
                <span className=" absolute flex flex-col justify-center items-center ">
                  <FaCloudUploadAlt className="w-8 h-8 text-metal" />
                  <span className="text-metal font-semibold ">
                    Upload Product
                  </span>
                </span>
                <input
                  type="file"
                  className="w-full h-full opacity-0"
                  onChange={handleProductImage}
                />
              </div>
              <div className="py-2 flex w-full gap-2">
                {productData.productImage[0] ? (
                  productData.productImage.map((el, index) => (
                    <div
                      key={index}
                      className="group relative transition-all duration-300"
                    >
                      <img
                        src={el}
                        alt="product image"
                        className="bg-slate-100 border w-[80px] h-[80px] object-cover cursor-pointer "
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <span
                        className="absolute bottom-1 right-1 hidden group-hover:block cursor-pointer "
                        onClick={() => onDeleteImage(index)}
                      >
                        <AiOutlineDelete className="text-white bg-red-700 rounded-full p-[1px]" />
                      </span>
                    </div>
                  ))
                ) : (
                  <p>Product Image</p>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <button className="border bg-purple text-white border-purple hover:bg-transparent transition-all duration-200 ease-linear px-2 w-fit py-1 rounded hover:text-purple font-semibold">
                Upload Product
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* display image full screen  */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imgUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default UploadProduct;

UploadProduct.propTypes = {
  onClose: PropTypes.func,
  fetchProduct: PropTypes.func,
};
