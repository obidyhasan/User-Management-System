import { FaLongArrowAltLeft } from "react-icons/fa";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateUser = () => {
  const navigate = useNavigate();
  const loaderUser = useLoaderData();
  const { _id, name, email, gender, status } = loaderUser;

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const status = form.status.value;

    const updateUser = { name, email, gender, status };

    fetch(`http://localhost:5000/users/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updateUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          Swal.fire({
            title: "Success",
            text: "Update Successfully",
            icon: "success",
          });

          navigate("/");
        }
      });
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-5 my-20">
        <button onClick={() => navigate(-1)} className="btn rounded-none">
          <FaLongArrowAltLeft className="text-xl"></FaLongArrowAltLeft> All
          Users
        </button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-center font-semibold text-xl mt-10">
            Update User
          </h1>
          <p className="text-center text-sm text-gray-400 mt-2">
            Use the below form to update exiting user
          </p>

          <form onSubmit={handelOnSubmit} className="">
            <div className="form-control mt-10">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                defaultValue={name}
                placeholder="name"
                name="name"
                className="input input-bordered rounded"
                required
              />
            </div>
            <div className="form-control mt-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                defaultValue={email}
                name="email"
                className="input input-bordered rounded"
                required
              />
            </div>
            <div className="flex items-center gap-16 my-5">
              <label className="">Gender</label>
              <label className="flex items-center gap-2">
                {gender === "Male" ? (
                  <input
                    type="radio"
                    name="gender"
                    value={"Male"}
                    className="radio"
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    name="gender"
                    value={"Male"}
                    className="radio"
                  />
                )}
                Male
              </label>

              <label className="flex items-center gap-2">
                {gender === "Female" ? (
                  <input
                    type="radio"
                    name="gender"
                    value={"Female"}
                    className="radio"
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    value={"Female"}
                    name="gender"
                    className="radio"
                  />
                )}
                Female
              </label>
            </div>
            <div className="flex items-center gap-16 my-5">
              <label className="">Status</label>
              <label className="flex items-center gap-2">
                {status === "Active" ? (
                  <input
                    type="radio"
                    name="status"
                    className="radio"
                    value={"Active"}
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    value={"Active"}
                    name="status"
                    className="radio"
                  />
                )}
                Active
              </label>

              <label className="flex items-center gap-2">
                {status === "Inactive" ? (
                  <input
                    type="radio"
                    name="status"
                    value={"Inactive"}
                    className="radio"
                    defaultChecked
                  />
                ) : (
                  <input
                    type="radio"
                    name="status"
                    value={"Inactive"}
                    className="radio"
                  />
                )}
                Inactive
              </label>
            </div>

            <button className="btn w-full rounded my-5 bg-purple-600 text-white">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
