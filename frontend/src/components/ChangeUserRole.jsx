import { useState } from "react";
import roll from "../common/Role";
import { IoMdCloseCircle } from "react-icons/io";
import summeryApi from "../common";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);
  const [updateName, setUpdateName] = useState(name);
  const [updateEmail, setUpdateEmail] = useState(email);

  const updateUserRole = async (e) => {
    e.preventDefault();
    const fetchData = await fetch(summeryApi.updateUser.url, {
      method: summeryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId:userId,
        name: updateName,
        email: updateEmail,
        role: userRole,
      }),
    });
    const fetchResponse = await fetchData.json();
    if (fetchResponse.success) {
      toast.success(fetchResponse.message);
      onClose();
      callFunc();
    }
    if (fetchResponse.error) {
      toast.error(fetchResponse.message);
    }
  };

  return (
    <div className="w-full h-full bg-black/60 absolute top-0 left-0 flex justify-center items-center">
      <div className="bg-white shadow-md p-5 w-[300px] rounded relative ">
        <button className="absolute right-1 top-1 " onClick={() => onClose()}>
          <IoMdCloseCircle className="w-5 h-5 text-red-700" />
        </button>
        <h1 className=" uppercase py-1 font-semibold text-white mb-2 px-2  rounded bg-purple  ">
          Change User Details
        </h1>

        <form onSubmit={updateUserRole}>
          <div>
            <label className="font-semibold  text-metal"> Name:</label>
            <input
              className=" outline-none bg-slate-200 p-1 w-full my-2"
              type="text"
              placeholder="Enter Name"
              name="name"
              value={updateName}
              onChange={(e) => setUpdateName(e.target.value)}
            />
          </div>
          <div>
            <label className="font-semibold  text-metal"> Email:</label>
            <input
              className=" outline-none bg-slate-200 p-1 w-full my-2"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center  gap-2 mt-3">
            <label className=" font-bold text-metal">Role:</label>
            <select
              className="w-full  text-sm font-bold text-metal p-2 "
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
            >
              {Object.values(roll).map((el) => (
                <option value={el} key={el}>
                  {el}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-purple px-3 py-1 rounded-full text-white font-semibold uppercase  text-sm hover:bg-midnight transition-all duration-300 ease-linear block mx-auto mt-4"
          >
            Change Role
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangeUserRole;

ChangeUserRole.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
  userId: PropTypes.string,
  onClose: PropTypes.func,
  callFunc: PropTypes.func,
};
