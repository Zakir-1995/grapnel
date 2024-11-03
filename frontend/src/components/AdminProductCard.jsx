import PropTypes from "prop-types";
import { FaPencil } from "react-icons/fa6";
import { FaRegTrashCan } from "react-icons/fa6";
import EditAdminProductCard from "./EditAdminProductCard";
import { useState } from "react";
import ConfirmDeleteProductModal from "./ConfirmDeleteProductModal";
import displayCurrency from "../helper/displayCurrency";

const AdminProductCard = ({ products, fetchProduct }) => {
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [productId, setProductId] = useState(null);

  return (
    <>
      {products.length > 0 ? (
        <div className="w-full py-5">
          <div className="   ">
            <table className="w-full text-left  ">
              <thead className="bg-purple text-white   ">
                <tr className="p-5">
                  <th className="p-2 border">Sr.</th>
                  <th className="p-2 border">Product Image</th>
                  <th className="p-2 border">Product Name</th>
                  <th className="p-2 border">Brand Name</th>
                  <th className="p-2 border">Category</th>
                  <th className="p-2 border">Price</th>
                  <th className="p-2 border">Selling Price</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              {products.map((product, index) => (
                <tr key={product._id} className=" border">
                  <td className=" p-2  border">{index + 1}</td>
                  <td className=" p-2  border">
                    <img
                      src={product?.productImage?.flat()[0]?.url}
                      alt=""
                      className="w-12 h-12  rounded mt-3 object-contain"
                    />
                  </td>
                  <td className=" p-2  border">{product.productName}</td>
                  <td className=" p-2  border">{product.brandName}</td>
                  <td className=" p-2  border">{product.category}</td>
                  <td className=" p-2  border">{displayCurrency(product.price)}</td>
                  <td className=" p-2  border">
                    {displayCurrency(product.sellingPrice)}
                  </td>
                  <td className="p-2 space-x-2 border">
                    <button
                      className="bg-green-300 rounded-full p-2 text-xs hover:bg-green-500 hover:text-white transition-all duration-300 ease-linear"
                      onClick={() => {
                        setOpenEditForm(true);
                        setEditProduct(product);
                      }}
                    >
                      <FaPencil />
                    </button>
                    <button
                      className="bg-red-400 rounded-full p-2 text-xs hover:bg-red-700 hover:text-white transition-all duration-300 ease-linear"
                      onClick={() => {
                        setOpenModal(true);
                        setProductId(product._id);
                      }}
                    >
                      <FaRegTrashCan />
                    </button>
                  </td>
                  {openModal && (
                    <ConfirmDeleteProductModal
                      onClose={() => setOpenModal(false)}
                      productId={productId}
                      fetchProduct={fetchProduct}
                    />
                  )}
                </tr>
              ))}
            </table>
          </div>
          {openEditForm && (
            <EditAdminProductCard
              onClose={() => setOpenEditForm(false)}
              fetchProduct={fetchProduct}
              product={editProduct}
            />
          )}
        </div>
      ) : (
        <p className="text-3xl font-bold text-metal flex justify-center items-center mt-10">
          No Products Found!{" "}
        </p>
      )}
    </>
  );
};

export default AdminProductCard;

AdminProductCard.propTypes = {
  products: PropTypes.array,
  onClose: PropTypes.func,
  fetchProduct: PropTypes.func,
};
