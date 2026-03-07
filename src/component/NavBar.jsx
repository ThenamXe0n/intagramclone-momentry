// import { HeartIcon, InboxIcon } from "@heroicons/react/16/outline";
import { PlusIcon } from "@heroicons/react/16/solid";
import React from "react";
import { Link, useLocation } from "react-router";
import { pagePaths } from "../router/pagePaths";
import { NotificationIcon, PostIcon } from "../assets/icons";

// function Header

const NavBar = () => {
  const { pathname } = useLocation();
  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <div className="flex items-center justify-between h-full px-4">
      <PostIcon />
      {pathname === pagePaths.home ? (
        <Link
          to={pagePaths.home}
          className="max-w-4/12  flex items-center justiify-center"
        >
          <img
            src="/assets/header_logo-removebg-preview.png"
            className="w-full h-auto"
            alt="logo"
          />
        </Link>
      ) : (
        <div>
          <span className="font-bold text-lg">{loggedIn?.username || "no user name"}</span>
        </div>
      )}
      <NotificationIcon />
    </div>
  );
};

export default NavBar;
