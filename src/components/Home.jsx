import { Link, useLoaderData } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { MdEdit, MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import { useState } from "react";

const Home = () => {
  const loaderUsers = useLoaderData();
  const [users, setUsers] = useState(loaderUsers);

  function handelDelete(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount) {
              Swal.fire({
                title: "Deleted!",
                text: "User has been deleted.",
                icon: "success",
              });

              const remainingUser = users.filter((user) => user._id !== id);
              setUsers(remainingUser);
            }
          });
      }
    });
  }

  return (
    <div className="max-w-7xl mx-auto px-5 my-20">
      <Link to={"/addUser"} className="btn rounded-none">
        Add User <LuUser2 className="text-xl"></LuUser2>
      </Link>

      <div className="overflow-x-auto mt-10">
        {users.length ? (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id}>
                  <th>{idx + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.status}</td>
                  <td className="flex gap-3">
                    <Link to={`/updateUser/${user._id}`} className="btn">
                      <MdEdit className="text-purple-500 text-lg"></MdEdit>
                    </Link>
                    <button
                      onClick={() => handelDelete(user._id)}
                      className="btn"
                    >
                      <MdDelete className="text-purple-500 text-lg"></MdDelete>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h1 className="text-center">No Data Found</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
