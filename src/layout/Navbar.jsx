import React from "react";
import useStore from "../context/store";
import { signInWithGoogle, logOut } from "../Auth/Authentication";
import { FaRegKeyboard } from "react-icons/fa";
import DefaultIcon from "../assets/default.png";
const Navbar = () => {
  const { user, best } = useStore();

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="flex items-center text-xl btn btn-ghost">
            Typing Tutor
            <FaRegKeyboard />
          </a>
        </div>
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user ? user.photoURL : DefaultIcon}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  onClick={() =>
                    document.getElementById("my_modal_5").showModal()
                  }
                >
                  Profile
                </a>
              </li>

              <li>
                {user ? (
                  <a onClick={logOut}>Logout</a>
                ) : (
                  <a onClick={signInWithGoogle}>Login</a>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <>
            {user ? (
              <div className="flex-col space-y-2">
                <h3 className="text-lg font-bold">
                  Name : <span className="font-normal">{user.displayName}</span>
                </h3>
                <h3 className="text-lg font-bold">
                  Email : <span className="font-normal">{user.email}</span>
                </h3>
                <h3 className="text-lg font-bold">
                  Typing Speed : <span className="font-normal">{best}</span>{" "}
                  <span
                    className="font-normal tooltip tooltip-right"
                    data-tip="words per minute"
                  >
                    WPM
                  </span>
                </h3>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold">Login</h3>
                <p className="py-4">Login to continue</p>
              </>
            )}
          </>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Navbar;
