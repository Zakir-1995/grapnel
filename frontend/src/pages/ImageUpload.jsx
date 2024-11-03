import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { imageToBase64 } from "../helper/ImageToBase64";
import summeryApi from '../common/index'

const ImageUpload = () => {
  const [productImage, setProductImage] = useState([]);
  const [data, setData] = useState([]);

  const handleProductImage = async (e) => {
    const files = e.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const imagePic = await imageToBase64(file);
      setProductImage((prev) => [...prev, imagePic]);
    }
  };
  console.log(data)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const fetchData = await fetch(summeryApi.uploadImages.url, {
            method: summeryApi.uploadImages.method,
            headers: {
                "content-type" :"application/json"
            },
            body: JSON.stringify({
              productImage  
            })
        }) 
        const fetchRes = await fetchData.json()
        setData(fetchRes);
    }

  return (
    <div className="flex flex-col min-h-[80vh] justify-center items-center">
      <form onSubmit={handleSubmit}>
        <div className=" w-[300px] mx-auto h-[300px] bg-slate-100  relative flex flex-col justify-center items-center rounded-lg">
          <span className=" absolute flex flex-col justify-center items-center ">
            <FaCloudUploadAlt className="w-8 h-8 text-metal" />
            <span className="text-metal font-semibold ">Upload Images</span>
          </span>

          <input
            type="file"
            className="w-full h-full opacity-0 cursor-pointer"
            onChange={handleProductImage}
            multiple
          />
        </div>
        <button className="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg  w-full my-5" type="submit">Submit</button>
        <div className="py-2 flex w-full gap-2 justify-center">
          {productImage ? (
            productImage.map((el, index) => (
              <div
                key={index}
                className="group relative transition-all duration-300"
              >
                <img
                  src={el}
                  alt="product image"
                  className="bg-slate-100 border w-[80px] h-[80px] object-cover cursor-pointer "
                    />
                    
              </div>
            ))
          ) : (
            <p>Product Image</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
