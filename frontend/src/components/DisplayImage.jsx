import PropTypes from "prop-types";
import { IoMdClose } from "react-icons/io";
const DisplayImage = ({ onClose, imgUrl }) => {
  return (
    <div className="absolute left-[50%] top-[50%] transform -translate-x-[50%] -translate-y-[50%] w-[600px] h-[600px] object-cover z-20 bg-white shadow-md rounded-md">
      <div className="absolute right-3 top-3">
      <IoMdClose className="text-2xl bg-red-700 rounded-full text-white cursor-pointer" onClick={onClose}/>
      </div>

        <img src={imgUrl} className="w-full object-cover h-full rounded-md" />
    </div>
  );
};

export default DisplayImage;

DisplayImage.propTypes = {
  onClose: PropTypes.func,
  imgUrl: PropTypes.string,
};
