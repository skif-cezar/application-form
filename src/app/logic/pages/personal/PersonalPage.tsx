import React, {forwardRef, memo, useEffect} from "react";
import AvatarSrc from "src/resources/avatar.png";
import clsx from "clsx";
import styles from "src/app/logic/pages/personal/PersonalePage.module.scss";
import {Message, UseFormReturn, useForm} from "react-hook-form";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";

export type FieldsForm = {
  firstName: string;
  surname: string;
  lastName: string;
  email: string;
  role: string;
  message?: Message;
};

/**
 *  Path to personal page
 */
export const PERSONAL_USER_PAGE_PATH = "/user/personal";

/**
 * Personal page
 */
export const PersonalPage: React.FC = memo(forwardRef((props: any, ref: any) => {
  const PANEL_STYLES = clsx(styles.panel);
  const TITLE_STYLES = clsx(styles.title);
  const INFORMATION_STYLES = clsx(styles.information);
  const USER_STYLES = clsx(styles.user);
  const FORM_STYLES = clsx(styles.form);
  const REQUIRED_STYLES = clsx(styles.required);
  const ERRORS_STYLES = clsx(styles.errors);
  const BUTTON_STYLES = clsx(styles.button);
  const INPUT_STYLES = clsx(styles.input);

  // Получение данных о user из store
  const user = useSelector((state: AppState) => state.users.user);
  const userFullName = `${user!.lastName} ${user!.firstName} ${user!.surname}`;

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  }: UseFormReturn<FieldsForm> = useForm<FieldsForm>({mode: "onBlur"});

  // Устанавливаем значения по умолчанию
  useEffect(() => {
    setValue("firstName", user.firstName);
    setValue("surname", user.surname);
    setValue("lastName", user.lastName);
    setValue("email", user.email);
    setValue("role", user.role);
  }, [user, setValue]);

  const onSubmit = async (data: FieldsForm): Promise<void> => {

    try {

      // eslint-disable-next-line no-console
      console.log("Датнные ", data);
    } catch (e) {
      console.error("Ошибка изменения данных: ", e);
    }
  };

  return (
    <article className={PANEL_STYLES}>
      <h2 className={TITLE_STYLES}>Личные данные</h2>
      <div className={INFORMATION_STYLES}>
        <img alt={userFullName} src={AvatarSrc} />
        <div className={USER_STYLES}>
          <span>{user.role}</span>
          <span>{userFullName}</span>
        </div>
      </div>
      <form
        autoComplete="on"
        className={FORM_STYLES}
        onSubmit={handleSubmit(onSubmit)} ref={ref}
        {...props}
      >
        <div className={INPUT_STYLES}>
          <h5>Имя</h5>
          <input
            autoComplete="off"
            className={REQUIRED_STYLES}
            {...register("firstName", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            type="text"
            maxLength={40}
          />
          {errors.firstName && <span className={ERRORS_STYLES}>{errors.firstName.message}</span>}
        </div>
        <div className={INPUT_STYLES}>
          <h5>Отчество</h5>
          <input
            autoComplete="off"
            className={REQUIRED_STYLES}
            {...register("surname", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            type="text"
            maxLength={40}
          />
          {errors.surname && <span className={ERRORS_STYLES}>{errors.surname.message}</span>}
        </div>
        <div className={INPUT_STYLES}>
          <h5>Фамилия</h5>
          <input
            autoComplete="off"
            className={REQUIRED_STYLES}
            {...register("lastName", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            type="text"
            maxLength={40}
          />
          {errors.lastName && <span className={ERRORS_STYLES}>{errors.lastName.message}</span>}
        </div>
        <div className={INPUT_STYLES}>
          <h5>Email</h5>
          <input
            autoComplete="on"
            className={REQUIRED_STYLES}
            {...register("email", {
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Некорректный email",
              },
            })}
            type="text"
            maxLength={60}
          />
          {errors.email && <span className={ERRORS_STYLES}>{errors.email.message}</span>}
        </div>
        <div className={INPUT_STYLES}>
          <h5>Роль</h5>
          <input
            autoComplete="off"
            className={REQUIRED_STYLES}
            {...register("role", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
            })}
            type="text"
            maxLength={40}
          />
          {errors.role && <span className={ERRORS_STYLES}>{errors.role.message}</span>}
        </div>

        <button className={BUTTON_STYLES} type="submit">
          Сохранить
        </button>
      </form>
    </article>
  );
}));
