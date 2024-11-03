import PropTypes from "prop-types";
import summeryApi from "../common/index";
import toast from "react-hot-toast";


const ConfirmDeleteModal = ({ onClose, productId, fetchProduct }) => {
  const handleDelete = async (productId) => {
    const fetchData = await fetch(summeryApi.deleteProduct.url, {
      method: summeryApi.deleteProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: productId }),
    });
    const response = await fetchData.json();

    if (response.success) {
      toast.success(response.message);
    }
    if (response.error) {
      toast.error(response.message);
    }
    onClose();
    fetchProduct();
  };

  return (
    <div className="fixed left-0 top-0 bottom-0 right-0 bg-black/20 flex justify-center items-center">
      <div className="bg-white w-96 h-60 rounded flex flex-col justify-center items-center p-4">
        <h3 className="text-2xl font-semibold text-metal">Are you sure?</h3>
        <div className="space-x-4 mt-10">
          <button
            className="bg-metal font-semibold text-sm px-2 py-1 text-white hover:bg-metal/90 transition-all duration-300 ease-linear"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-700 font-semibold text-sm px-2 py-1 text-white hover:bg-red-600 transition-all duration-300 ease-linear"
            onClick={() => handleDelete(productId)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

ConfirmDeleteModal.propTypes = {
  productId: PropTypes.string,
  onClose: PropTypes.func,
  fetchProduct: PropTypes.func,
};
