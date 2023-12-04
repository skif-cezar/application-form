import React from "react";
import {useSelector} from "react-redux";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {Layout, MAIN_PAGE_PATH} from "src/app/logic/layout/Layout";
import {Registration, REGISTRATION_PAGE_PATH} from "src/app/components/registration/Registration";
import {UserPage, USER_PAGE_URL} from "src/app/logic/pages/user/UserPage";
import {ApplicationForm, APPLICATION_FORM_URL} from "src/app/components/applicationForm/ApplicationForm";
import {ApplicationUser, APPLICATION_USER_URL} from "src/app/logic/pages/user/ApplicationUser";
import {AdminPage, ADMIN_PAGE_URL} from "src/app/logic/pages/admin/AdminPage";
import {MainLayout} from "src/app/logic/main/MainLayout";
import {AppState} from "src/app/store";
import {ApplicationPage} from "src/app/logic/pages/application/ApplicationPage";

/**
 * The main component in app
 */
export const App: React.FC = () => {
  // Авторизирован ли пользователь
  const isLoggedIn = useSelector((state: AppState) => state.user.isLoggedIn);
  // Админ или обычный юзер
  const isAdmin = useSelector((state: AppState) => state.user.isAdmin);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={MAIN_PAGE_PATH} element={<Layout />}>
          <Route element={<MainLayout />}>
            <Route path={MAIN_PAGE_PATH} element={<Navigate to={REGISTRATION_PAGE_PATH} />} />
            <Route
              path={REGISTRATION_PAGE_PATH}
              element={isLoggedIn ?
                (
                  <Navigate
                    to={isAdmin ?
                      (ADMIN_PAGE_URL) :
                      (USER_PAGE_URL)}
                  />
                )
                : (<Registration />)}
            />
            <Route path={USER_PAGE_URL} element={<UserPage />}>
              <Route element={<MainLayout />}>
                <Route path="/user/" element={<Navigate to={APPLICATION_FORM_URL} />} />
                <Route path={APPLICATION_FORM_URL} element={<ApplicationForm />} />
                <Route path={APPLICATION_USER_URL} element={<ApplicationUser />} />
                <Route path={`${APPLICATION_USER_URL}/:id`} element={<ApplicationPage />} />
              </Route>
            </Route>
            <Route path={ADMIN_PAGE_URL} element={isAdmin ? (<AdminPage />) : (<Navigate to={REGISTRATION_PAGE_PATH} />)} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
