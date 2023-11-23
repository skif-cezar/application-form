import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Layout, MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {Registration, REGISTRATION_PAGE_PATH} from "src/app/components/registration/Registration";
import {UserPage, USER_PAGE_URL} from "src/app/logic/pages/user/UserPage";
import {ApplicationForm, APPLICATION_FORM_URL} from "src/app/components/applicationForm/ApplicationForm";
import {ApplicationUser, APPLICATION_USER_URL} from "src/app/logic/pages/user/ApplicationUser";
import {AdminPage, ADMIN_PAGE_URL} from "src/app/logic/pages/admin/AdminPage";

/**
 * The main component in app
 */
export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN_PAGE_PATH} element={<Layout />}>
          <Route path={REGISTRATION_PAGE_PATH} element={<Registration />} />
          <Route path={USER_PAGE_URL} element={<UserPage />}>
            <Route path={APPLICATION_FORM_URL} element={<ApplicationForm />} />
            <Route path={APPLICATION_USER_URL} element={<ApplicationUser />} />
          </Route>
          <Route path={ADMIN_PAGE_URL} element={<AdminPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
