import { useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Role from '../common/Role'
import { Hourglass } from "react-loader-spinner";

const AdminPanel = () => {
  const navigate =useNavigate()
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user?.role !== Role.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    <div className="md:grid grid-cols-12 min-h-[calc(100vh-120px)] hidden">
      <aside className="col-span-2 bg-white custom_shadow">
        {user ? (
          <div className="flex justify-center items-center p-5">
            {user?.profilePhoto ? (
              <div className="flex flex-col items-center justify-center gap-2">
                <img
                  className="w-20 h-20 rounded-full border border-purple "
                  src={user?.profilePhoto}
                  alt={user?.name}
                />
                <p className="text-metal font-semibold uppercase text-sm">
                  {user?.name}
                </p>
                <span className="text-metal font-medium uppercase text-xs">
                  {user?.role}
                </span>
              </div>
            ) : (
              <div className="w-20 h-20 rounded-full border border-slate-300 flex justify-center items-center">
                <FaUser className="text-metal w-12 h-12" />
              </div>
            )}
          </div>
        ) : (
          <Hourglass
            visible={true}
            height="50"
            width="50"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        )}

        <ul className="space-y-2 p-4 grid">
          <Link
            className="w-full text-metal font-semibold hover:bg-slate-200 transition-all duration-300 ease-linear px-2 py-1 rounded"
            to={"all-user"}
          >
            All User
          </Link>
          <Link
            className="w-full text-metal font-semibold hover:bg-slate-200 transition-all duration-300 ease-linear px-2 py-1 rounded"
            to={"all-product"}
          >
            All Product
          </Link>
        </ul>
      </aside>
      <main className="col-span-10 p-3">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
