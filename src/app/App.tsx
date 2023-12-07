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
import {ApplicationsAll, APPLICATIONS_URL} from "src/app/logic/pages/admin/ApplicationsAll";
import {EmployeesPage, EMPLOYEES_PAGE_URL} from "src/app/logic/pages/employees/EmployeesPage";
import {PERSONAL_USER_PAGE_PATH, PersonalPage} from "src/app/logic/pages/personal/PersonalPage";

/**
 * The main component in app
 */
export const App: React.FC = () => {
  // Получение данных о user из store
  const user = useSelector((state: AppState) => state.users.user);
  // Авторизирован ли пользователь
  const isLoggedIn = user && user.isLoggedIn;
  // Админ или обычный юзер
  const isAdmin = user && user.isAdmin;

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
            <Route path={USER_PAGE_URL} element={isLoggedIn ? (<UserPage />) : (<Navigate to={REGISTRATION_PAGE_PATH} />)}>
              <Route element={<MainLayout />}>
                <Route path="/user/" element={<Navigate to={APPLICATION_FORM_URL} />} />
                <Route path={APPLICATION_FORM_URL} element={<ApplicationForm />} />
                <Route path={APPLICATION_USER_URL} element={<ApplicationUser />} />
                <Route path={`${APPLICATION_USER_URL}/:id`} element={<ApplicationPage />} />
                <Route
                  path={PERSONAL_USER_PAGE_PATH} element={isLoggedIn ?
                    (<PersonalPage />) :
                    (<Navigate to={REGISTRATION_PAGE_PATH} />)}
                />
              </Route>
            </Route>
            <Route path={ADMIN_PAGE_URL} element={isAdmin ? (<AdminPage />) : (<Navigate to={REGISTRATION_PAGE_PATH} />)}>
              <Route element={<MainLayout />}>
                <Route path="/admin/" element={<Navigate to={APPLICATIONS_URL} />} />
                <Route path={APPLICATIONS_URL} element={<ApplicationsAll />} />
                <Route path={`${APPLICATIONS_URL}/:id`} element={<ApplicationPage />} />
              </Route>
              <Route element={<MainLayout />}>
                <Route path={EMPLOYEES_PAGE_URL} element={<EmployeesPage />} />
                <Route path={`${EMPLOYEES_PAGE_URL}/:id`} element={<ApplicationPage />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
