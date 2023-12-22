import React, {useState} from "react";
import clsx from "clsx";
import styles from "src/app/components/registration/Registration.module.scss";
import {RegistrationForm} from "./RegistrationForm";
import {AuthorizationForm} from "./AuthorizationForm";

/**
 *  Path to registrtion page
 */
export const REGISTRATION_PAGE_PATH = "/registration";

/**
 * Registration component
 */
export const Registration: React.FC = () => {
  const FLEX_STYLES = clsx(styles.flex);
  const TITLE_STYLES = clsx(styles.title);
  const HIDDEN_STYLES = clsx(styles.hidden);
  const CONTAINER_STYLES = clsx(styles.container);
  const PANEL_ACTIVE_STYLES = clsx(styles.container, styles.right_panel_active);
  const SIGN_UP_STYLES = clsx(styles.form__container, styles.sign_up);
  const SIGN_IN_STYLES = clsx(styles.form__container, styles.sign_in);
  const OVERLAY_CONTAINER_STYLES = clsx(styles.overlay__container);
  const OVERLAY_STYLES = clsx(styles.overlay);
  const PANEL_LEFT_STYLES = clsx(styles.overlay__panel, styles.overlay__left);
  const PANEL_RIGHT_STYLES = clsx(styles.overlay__panel, styles.overlay__right);
  const GHOST_STYLES = clsx(styles.button, styles.ghost);

  const [isActive, setIsActive] = useState(true);

  const onClickButton = (e: React.MouseEvent<HTMLElement>, value: string): void => {
    e.preventDefault();
    e.stopPropagation();

    if (value === "sign-up") {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div className={FLEX_STYLES}>
      <article className={isActive ? CONTAINER_STYLES : PANEL_ACTIVE_STYLES}>
        <h2 className={HIDDEN_STYLES}>Регистрация и авторизация!</h2>
        <div className={SIGN_UP_STYLES}>
          <RegistrationForm />
        </div>
        <div className={SIGN_IN_STYLES}>
          <AuthorizationForm />
        </div>
        <div className={OVERLAY_CONTAINER_STYLES}>
          <div className={OVERLAY_STYLES}>
            <article className={PANEL_LEFT_STYLES}>
              <h2 className={TITLE_STYLES}>Добро пожаловать!</h2>
              <p>Чтобы оформить заявку, пожалуйста, войдите, используя свои личные данные.</p>
              <button
                className={GHOST_STYLES}
                type="button"
                onClick={(e: React.MouseEvent<HTMLElement>) => onClickButton(e, "sign-in")}
              >
                Войти
              </button>
            </article>
            <article className={PANEL_RIGHT_STYLES}>
              <h2 className={TITLE_STYLES}>Здравствуйте!</h2>
              <p>Заполните свои личные данные для регистрации, чтобы оформить заявку</p>
              <button
                className={GHOST_STYLES}
                type="button"
                onClick={(e: React.MouseEvent<HTMLElement>) => onClickButton(e, "sign-up")}
              >
                Зарегистрироваться
              </button>
            </article>
          </div>
        </div>
      </article>
    </div>
  );
};
