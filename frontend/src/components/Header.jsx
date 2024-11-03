import { FaSearch, FaUser } from "react-icons/fa";
import Logo from "./Logo";
import { FaCartPlus } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import summeryApi from "../common";
import toast from "react-hot-toast";
import { setUserDetails } from "../store/userSlice";
import { useContext, useState } from "react";
import Role from "../common/Role";
import { Hourglass } from "react-loader-spinner";
import Context from "../context";

const Header = () => {
  const navigate = useNavigate();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const { user } = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const { countAddToCart } = useContext(Context);
    const searchInput = useLocation();
    const URLSearch = new URLSearchParams(searchInput?.search);
    const searchQuery = URLSearch.getAll("q");
    const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchResponse = await fetch(summeryApi.userLogout.url, {
      method: summeryApi.userLogout.method,
      credentials: "include",
    });
    const dataApi = await fetchResponse.json();
    if (dataApi.success) {
      toast.success(dataApi.message);
      dispatch(setUserDetails(null));
    }
    if (dataApi.error) {
      toast.error(dataApi.message);
    }
  };
  const handleSearch = (e) => {

    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <>
      <div className=" h-20  shadow-md bg-white fixed w-full z-50">
        <div className="flex container mx-auto px-4 justify-between items-center h-full gap-4">
          <Link to={"/"}>
            <Logo />
          </Link>
          <div className="md:flex justify-between items-center w-full max-w-[500px] focus-within:shadow-md  rounded-full hidden">
            <input
              onChange={handleSearch}
              value={search}
              type="search"
              placeholder="Search Item Here..."
              className="outline-none border border-purple h-10 w-full  px-4 rounded-l-full text-sm font-semibold "
            />
            <div className="w-14 h-10 bg-purple flex items-center justify-center text-white rounded-r-full cursor-pointer">
              <FaSearch />
            </div>
          </div>
          <div className="flex items-center gap-3">
            {user?.profilePhoto ? (
              <div className="relative flex  justify-center ">
                {user ? (
                  <div
                    className="md:border-2 border  border-purple   cursor-pointer rounded-full md:w-10 md:h-10 w-8 h-8 flex justify-center items-center"
                    onClick={() => setMenuDisplay(!menuDisplay)}
                  >
                    <img
                      className="rounded-full w-full h-full"
                      src={user?.profilePhoto}
                      alt={user?.name}
                    />
                  </div>
                ) : (
                  <div>
                    {" "}
                    <Hourglass
                      visible={true}
                      height="50"
                      width="50"
                      ariaLabel="hourglass-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      colors={["#306cce", "#72a1ed"]}
                    />
                  </div>
                )}

                {menuDisplay && (
                  <>
                    {user?.role === Role.ADMIN && (
                      <div className="absolute whitespace-nowrap bg-white p-3 h-fit top-12 shadow-md hidden md:block z-50">
                        <Link
                          className="hover:bg-slate-100 px-3 py-1 transition-all duration-200 ease-linear text-metal text-sm font-semibold rounded"
                          to={"/admin-panel/all-product"}
                          onClick={() => setMenuDisplay(!menuDisplay)}
                        >
                          Admin Panel
                        </Link>
                      </div>
                    )}
                  </>
                )}
              </div>
            ) : (
              <>
                {user?._id && (
                  <div className="md:border-2 border  border-metal p-1  cursor-pointer rounded-full md:w-8 md:h-8 w-6 h-6 flex justify-center items-center">
                    <FaUser className="text-metal" />
                  </div>
                )}
              </>
            )}

            {user?._id ? (
              <div className="relative cursor-pointer">
                <Link to={"add-to-cart"}>
                  <FaCartPlus className="text-metal md:text-2xl text-xl" />
                  <span className="bg-purple md:w-5 md:h-5 md:p-2 w-4 h-4 p-1 flex items-center justify-center rounded-full text-white text-xs absolute -top-2 -right-2">
                    {countAddToCart}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="relative cursor-pointer">
                <FaCartPlus className="text-metal md:text-2xl text-xl" />
                <span className="bg-purple md:w-5 md:h-5 md:p-2 w-4 h-4 p-1 flex items-center justify-center rounded-full text-white text-xs absolute -top-2 -right-2">
                  0
                </span>
              </div>
            )}
            <div>
              {user?._id ? (
                <button
                  className="bg-purple px-3 py-1 rounded-full text-white font-semibold uppercase  text-xs hover:bg-midnight transition-all duration-300 ease-linear"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={"/login"}
                  className="bg-purple px-3 py-1 rounded-full text-white font-semibold uppercase  text-xs hover:bg-midnight transition-all duration-300 ease-linear"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
