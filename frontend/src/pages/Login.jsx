import { useContext, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import summeryApi from "../common";
import toast from "react-hot-toast";
import Context from "../context";

const Login = () => {
  const { fetchUsersDetails, getCountAddToCart } = useContext(Context);

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
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

    const fetchData = await fetch(summeryApi.signIn.url, {
      method: summeryApi.signIn.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const dataApi = await fetchData.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      navigate("/");
      fetchUsersDetails();
      getCountAddToCart()
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };

  return (
    <div className="w-[80%] sm:w-[70%] md:w-[50%] lg:w-[40%] h-fit bg-white container mx-auto p-5 my-8 rounded shadow grid gap-y-6">
      <div className="w-full flex justify-center">
        <FaUser className="border-2 border-purple lg:w-10 lg:h-10 w-7 md:h-8 md:w-8  h-7 p-1  rounded-full text-purple" />
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
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
        <div className="flex justify-end hover:underline hover:text-purple transition-all duration-300 ease-linear text-metal text-sm font-semibold">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>
        <div className="w-full bg-purple hover:bg-midnight transition-all duration-300 ease-linear  flex justify-center rounded ">
          <button
            type="submit"
            className="text-xs uppercase font-semibold text-white w-full p-2"
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <span className="text-sm font-semibold text-metal ">
          {"Don't"} have an account? please{" "}
          <Link
            to={"/register"}
            className="hover:cursor-pointer hover:text-purple hover:underline  transition-all duration-300 ease-linear  text-purple/80"
          >
            Register
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
