import { FaLongArrowAltLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AddUser = () => {
  const navigate = useNavigate();

  const handelOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const status = form.status.value;

    const user = { name, email, gender, status };

    fetch("https://user-management-server-nine-psi.vercel.app/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          Swal.fire({
            title: "Success",
            text: `${name} added successfully`,
            icon: "success",
          });

          form.reset();
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
          <h1 className="text-center font-semibold text-xl mt-10">New User</h1>
          <p className="text-center text-sm text-gray-400 mt-2">
            Use the below form to create a new account
          </p>

          <form onSubmit={handelOnSubmit} className="">
            <div className="form-control mt-10">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
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
                name="email"
                className="input input-bordered rounded"
                required
              />
            </div>
            <div className="flex items-center gap-16 my-5">
              <label className="">Gender</label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  className="radio"
                  defaultChecked
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  className="radio"
                />
                Female
              </label>
            </div>
            <div className="flex items-center gap-16 my-5">
              <label className="">Status</label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  className="radio"
                  value={"Active"}
                  defaultChecked
                />
                Active
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value={"Inactive"}
                  name="status"
                  className="radio"
                />
                Inactive
              </label>
            </div>

            <button className="btn w-full rounded my-5 bg-purple-600 text-white">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
