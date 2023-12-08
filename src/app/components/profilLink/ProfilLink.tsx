import React, {useState} from "react";
import AvatarSrc from "src/resources/avatar.png";
import clsx from "clsx";
import styles from "src/app/components/profilLink/ProfilLink.module.scss";
import {NavLink} from "react-router-dom";
import {PERSONAL_USER_PAGE_PATH} from "src/app/logic/pages/personal/PersonalPage";

/**
 * ProfilLink props
 */
export interface ProfilLinkProps {
  fullName: string;
  role: string;
  onClick?: () => void;
}

/**
 * Profil link component
 */
export const ProfilLink: React.FC<ProfilLinkProps> = (props: ProfilLinkProps) => {
  const PROFIL_LINK_STYLES = clsx(styles.profil_link);
  const ARROW_STYLES = clsx(styles.arrow_icon);
  const ARROW_OPEN_STYLES = clsx(styles.arrow_icon, styles.open);
  const LEFT_BAR_STYLES = clsx(styles.left_bar);
  const RIGHT_BAR_STYLES = clsx(styles.right_bar);
  const MENU_STYLES = clsx(styles.menu);
  const MENU_SHOW_STYLES = clsx(styles.menu, styles.show);
  const CONTAINER_INFORMATION_STYLES = clsx(styles.container_information);
  const INFORMATION_STYLES = clsx(styles.information);
  const USER_STYLES = clsx(styles.user);
  const SETTINS_STYLES = clsx(styles.settings);
  const LOGOUT_STYLES = clsx(styles.logout);
  const HIDE_STYLES = clsx(styles.hide);

  const [isShow, setIsShow] = useState(false);

  const showMenu = (): void => {
    if(isShow) {
      setIsShow(false);
    } else {
      setIsShow(true);
    }
  };

  return (
    <>
      <a
        href="#!" className={PROFIL_LINK_STYLES}
        onClick={showMenu}
      >
        <span className={HIDE_STYLES}>Настройки профиля</span>
        <img alt={props.fullName} src={AvatarSrc} />
        <div className={(isShow) ? ARROW_OPEN_STYLES : ARROW_STYLES}>
          <span className={LEFT_BAR_STYLES} />
          <span className={RIGHT_BAR_STYLES} />
        </div>
      </a>
      <div className={(isShow) ? MENU_SHOW_STYLES : MENU_STYLES}>
        <div className={CONTAINER_INFORMATION_STYLES}>
          <div className={INFORMATION_STYLES}>
            <img alt={props.fullName} src={AvatarSrc} />
            <div className={USER_STYLES}>
              <span>{props.role}</span>
              <span>{props.fullName}</span>
            </div>
          </div>
        </div>
        <NavLink
          to={PERSONAL_USER_PAGE_PATH} className={SETTINS_STYLES}
          onClick={showMenu}
        >
          Настройки
        </NavLink>
        <a
          href="#!" onClick={props.onClick}
          className={LOGOUT_STYLES}
        >
          Выйти
        </a>
      </div>
    </>
  );
};

ProfilLink.defaultProps = {onClick: () => null};
