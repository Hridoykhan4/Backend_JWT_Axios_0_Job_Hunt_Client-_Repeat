import React from "react";
import { Link, NavLink } from "react-router-dom";
import useAuthValue from "../../hooks/useAuthValue";

const Navbar = () => {
  const { user, logOut } = useAuthValue();

  const activeLinkClass = ({ isActive }) =>
    `${isActive && "text-red-600  border-b-4"}`;

  const userLogOut = () => {
    logOut()
      .then(() => {
        alert("sign Out");
      })
      .catch((err) => console.log(err));
  };

  const links = (
    <>
      <li>
        <NavLink className={activeLinkClass} to="/">
          Home
        </NavLink>
      </li>
      {user ? (
        <>
          <li>
            <NavLink className={activeLinkClass} to="/viewAllJob">
              All Jobs
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLinkClass} to="/add-jobs">
              Add Job
            </NavLink>
          </li>

          <li>
            <NavLink className={activeLinkClass} to="/my-jobs">
              My Posted Jobs
            </NavLink>
          </li>
          <li>
            <NavLink className={activeLinkClass} to="/application-me">
              My Applications
            </NavLink>
          </li>
        </>
      ) : (
        ""
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">daisyUI</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end gap-3">
        {user ? (
          <button onClick={userLogOut} className="btn">
            Log out
          </button>
        ) : (
          <>
            <Link className="btn" to="/register">
              Register
            </Link>
            <Link className="btn" to="/signIn">
              Sign In
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(Navbar);
