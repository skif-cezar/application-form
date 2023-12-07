import React from "react";
import clsx from "clsx";
import styles from "src/app/components/pagination/Pagination.module.scss";
import {useShowNextApps} from "src/app/hooks/useShowNextApps";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";
// import {useShowNextUsers} from "src/app/hooks/useShowNextUsers";

/**
 * Pagination component
 */
export const Pagination: React.FC = () => {
  const PAGINATION_STYLES = clsx(styles.pagination);
  const NEXT_STYLES = clsx(styles.next);

  const getNextApps = useShowNextApps();
  // const getNextUsers = useShowNextUsers();
  // Получение последних видимых заявок из store
  const lastVisibleApp = useSelector((state: AppState) => state.applications!.appLastVisible);
  // Получение последних видимых users из store
  // const lastVisibleApp = useSelector((state: AppState) => state.users.userLastVisible);

  return (
    <div className={PAGINATION_STYLES}>
      {lastVisibleApp && (
        <button
          type="button" className={NEXT_STYLES}
          onClick={getNextApps}
        >
          Показать ещё
        </button>
      )}
    </div>
  );

};