import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { imageToBase64 } from "../helper/ImageToBase64";
import summeryApi from "../common";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePhoto: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password === data.confirmPassword) {
      const fetchData = await fetch(summeryApi.signUp.url, {
        method: summeryApi.signUp.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const dataApi = await fetchData.json()
      if (dataApi.success) {
        toast.success(dataApi.message);
        navigate("/login")
      }
           if (dataApi.error) {
             toast.error(dataApi.message);
           }
     
    } else {
      toast.error("password and confirm password should be matched!");
    }
  };

  const handleProfilePic = async (e) => {
    const file = e.target.files[0];

    const imagePic = await imageToBase64(file);
    setData((prev) => {
      return {
        ...prev,
        profilePhoto: imagePic,
      };
    }
    );
  };

  return (
    <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-fit bg-white container mx-auto p-5 my-8 rounded shadow grid gap-y-6">
      <div className="w-fit container mx-auto relative overflow-hidden rounded-full border-2 border-purple ">
        <form className="absolute  z-10 ">
          <label>
            <input
              type="file"
              className="w-20 h-20 cursor-pointer opacity-0"
              onChange={handleProfilePic}
            />
          </label>
        </form>
        {data.profilePhoto ? (
          <img
            src={data.profilePhoto}
            alt="profile photo"
            className="lg:w-20 lg:h-20  h-16 w-16  p-1  rounded-full"
          />
        ) : (
          <FaUser className=" lg:w-20 lg:h-20  h-16 w-16  p-1  rounded-full text-purple" />
        )}

        <div className="text-xs font-semibold  bg-slate-200/40 text-center  absolute -bottom-2 lg:p-2 p-3 lg:bottom-1 ">
          Upload Photo
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-metal font-semibold md:text-base text-sm">
            Name:
          </label>
          <div className="bg-gray-100 w-full p-2 focus-within:shadow-sm rounded">
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter Your name"
              required
              className="w-full bg-transparent outline-none text-sm font-semibold text-metal "
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-metal font-semibold md:text-base text-sm">
            Email:
          </label>
          <div className="bg-gray-100 w-full p-2 focus-within:shadow-sm rounded">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter Your Email"
              required
              className="w-full bg-transparent outline-none text-sm font-semibold text-metal "
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-metal md:text-base text-sm font-semibold">
            Password:
          </label>
          <div className="bg-gray-100 w-full p-2 focus-within:shadow-sm rounded flex items-center">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
              className="w-full bg-transparent outline-none text-sm font-semibold text-metal "
            />
            {showPassword ? (
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEyeSlash className="text-metal" />
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FaEye className="text-metal" />
              </span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-metal md:text-base text-sm font-semibold">
            Confirm Password:
          </label>
          <div className="bg-gray-100 w-full p-2 focus-within:shadow-sm rounded flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Enter Confirm Password"
              required
              className="w-full bg-transparent outline-none text-sm font-semibold text-metal "
            />
            {showConfirmPassword ? (
              <span
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(!showPassword)}
              >
                <FaEyeSlash className="text-metal" />
              </span>
            ) : (
              <span
                className="cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <FaEye className="text-metal" />
              </span>
            )}
          </div>
        </div>

        <div className="w-full bg-purple hover:bg-midnight transition-all duration-300 ease-linear  flex justify-center rounded ">
          <button
            type="submit"
            className="text-xs uppercase font-semibold text-white w-full p-2"
          >
            Register
          </button>
        </div>
      </form>
      <div>
        <span className="text-sm font-semibold text-metal ">
          Already have an account? please{" "}
          <Link
            to={"/login"}
            className="hover:cursor-pointer hover:text-purple hover:underline  transition-all duration-300 ease-linear  text-purple/80"
          >
            Login
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Register;
