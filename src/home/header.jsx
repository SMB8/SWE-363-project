import React from "react";
import { Link, useLocation } from "react-router-dom";
import KConnect from "../assets/kfupmConnectLogo.png";
import avatar from "../assets/avatar.png";

const Header = () => {
  const tabs = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Profile", path: "/profile" },
  ];
  const location = useLocation();

  const token = localStorage.getItem("token");

  return (
    <header className="fixed inset-x-0 top-0 h-[100px] z-50">
      <div className="mx-auto max-w-7xl h-full grid grid-cols-3 items-center px-4">
        <div className="flex items-center h-full justify-self-start">
          <img
            src={KConnect}
            alt="KFUPM Connect Logo"
            className="h-[48px] w-auto"
          />
        </div>

        <nav className="justify-self-center">
          <ul className="flex h-[46px] items-center bg-white bg-opacity-90 rounded-full px-2">
            {tabs.map((tab) => {
              const isActive =
                location.pathname === tab.path ||
                (location.pathname === "" && tab.path === "/");
              return (
                <li key={tab.name} className="mx-1">
                  <Link
                    to={tab.path}
                    className={`
                      flex items-center justify-center
                      h-full px-5 text-sm font-medium rounded-full transition
                      ${
                        isActive
                          ? "bg-[#90E0EF] text-[#0077B6]"
                          : "text-gray-700 hover:text-blue-900"
                      }
                    `}
                  >
                    {tab.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {token && (
          <Link
            to="/manage"
            className="flex items-center h-full justify-self-end pr-4"
          >
            <img
              src={avatar}
              alt="User Avatar"
              className="h-[54px] w-[54px] rounded-full border-2 border-white"
            />
            <span className="ml-2 font-medium text-gray-900">
              Welcome Ahmed
            </span>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
