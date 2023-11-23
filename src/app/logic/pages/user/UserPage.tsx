import React from "react";
import {Outlet} from "react-router-dom";

/**
 *  Path to user page
 */
export const USER_PAGE_URL = "/user";

/**
 * User page
 */
export const UserPage: React.FC = () => {

  return (
    <>
      <nav>Menu</nav>
      <Outlet />
    </>

  );
};