import toast from "react-hot-toast";
import summeryApi from "../common";
import { useEffect, useState } from "react";
import moment from "moment";
import { FaPencilAlt } from "react-icons/fa";
import ChangeUserRole from "../components/ChangeUserRole";
import { FaRegTrashCan } from "react-icons/fa6";
import ConfirmDeleteUserModal from "../components/ConfirmDeleteUserModal";

const AllUser = () => {
  const [openUserRole, setOpenUserRole] = useState(false);
   const [openModal, setOpenModal] = useState(false);
  const [users, setUsers] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState(null)
  const [updateUserDetails, setUpdateUserDetails] = useState({});

  const allUserData = async () => {
    const fetchData = await fetch(summeryApi.allUser.url, {
      method: summeryApi.allUser.method,
      credentials: "include",
    });
    const fetchResponse = await fetchData.json();

    if (fetchResponse.success) {
      setUsers(fetchResponse.data);
    }

    if (fetchResponse.error) {
      toast.error(fetchResponse.message);
    }
  };

  useEffect(() => {
    allUserData();
  }, []);

  return (
    <>
      {users.length > 0 ? (
        <table className="w-full border ">
          <thead className="bg-purple text-white border-b">
            <tr>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Sr.
              </th>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Name
              </th>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Email
              </th>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Role
              </th>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Created date
              </th>
              <th className=" text-sm font-bold uppercase py-2 border-r">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id} className="border-b text-center ">
                <td className="text-metal text-sm font-semibold p-2 border-r">
                  {index + 1}
                </td>
                <td className="text-metal text-sm font-semibold p-2 border-r">
                  {user?.name}
                </td>
                <td className="text-metal text-sm font-semibold p-2 border-r">
                  {user?.email}
                </td>
                <td className="text-metal text-sm font-semibold p-2 border-r">
                  {user?.role}
                </td>
                <td className="text-metal text-sm font-semibold p-2 border-r">
                  {moment(user?.createdAt).format("LL")}
                </td>
                <td className="text-metal text-sm font-semibold p-2 border-r flex justify-center space-x-2">
                  <button
                    className="cursor-pointer bg-green-300 p-2 rounded-full hover:bg-green-500 hover:text-white transition-all duration-300 ease-in-out"
                    onClick={() => {
                      setUpdateUserDetails(user);
                      setOpenUserRole(true);
                    }}
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    className="bg-red-400 rounded-full p-2 text-xs hover:bg-red-700 hover:text-white transition-all duration-300 ease-linear"
                    onClick={() => {
                      setOpenModal(true);
                      setDeleteUserId(user._id)
                    }}
                  >
                    <FaRegTrashCan />
                  </button>
                </td>
                {openModal && (
                  <ConfirmDeleteUserModal
                    userId={deleteUserId}
                    onClose={() => setOpenModal(false)}
                    fetchUser={allUserData}
                  />
                )}
              </tr>
            ))}
          </tbody>
          {openUserRole && (
            <div className="w-full py-10 flex justify-center items-center">
              <ChangeUserRole
                onClose={() => setOpenUserRole(false)}
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callFunc={allUserData}
              />
            </div>
          )}
        </table>
      ) : (
        <p className="text-3xl font-bold text-metal flex justify-center items-center mt-10">
          No Users Found!{" "}
        </p>
      )}
    </>
  );
};

export default AllUser;
