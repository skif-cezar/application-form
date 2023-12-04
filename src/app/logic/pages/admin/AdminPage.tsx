import React from "react";
import {Outlet} from "react-router-dom";

/**
 *  Path to admin page
 */
export const ADMIN_PAGE_URL = "/admin";

/**
 * Admin page
 */
export const AdminPage: React.FC = () => {
  // eslint-disable-next-line no-console
  console.log("admin111");
  alert("ку");
  return (
    <>
      <nav>Меню админа</nav>
      <Outlet />
    </>
  );
};