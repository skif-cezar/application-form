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

  return (
    <>
      <nav>Меню админа</nav>
      <Outlet />
    </>

  );
};