import PropTypes from "prop-types";
import summeryApi from "../common/index";
import toast from "react-hot-toast";

const ConfirmDeleteUserModal = ({ onClose, userId, fetchUser }) => {
  const handleDelete = async (userId) => {
    const fetchData = await fetch(summeryApi.deleteUser.url, {
      method: summeryApi.deleteUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ _id: userId }),
    });
    const response = await fetchData.json();

    if (response.success) {
      toast.success(response.message);
    }
    if (response.error) {
      toast.error(response.message);
    }
    onClose();
    fetchUser();
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
            onClick={() => handleDelete(userId)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteUserModal;

ConfirmDeleteUserModal.propTypes = {
  userId: PropTypes.string,
  onClose: PropTypes.func,
  fetchUser: PropTypes.func,
};
