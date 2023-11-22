/* eslint-disable @typescript-eslint/typedef */
import React, {forwardRef} from "react";
import {Message, useForm} from "react-hook-form";
import clsx from "clsx";
import styles from "src/app/components/registration/Registration.module.scss";

export type FieldsForm = {
  email: string;
  password: string;
  confirmPassword: string;
  message?: Message;
};

/**
 * Registration form component
 */
export const RegistrationForm: React.FC = forwardRef((props: any, ref: any) => {
  const FORM_STYLES = clsx(styles.form);
  const TITLE_STYLES = clsx(styles.title);
  const ERRORS_STYLES = clsx(styles.errors);
  const REQUIRED_STYLES = clsx(styles.required);
  const BUTTON_STYLES = clsx(styles.button);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FieldsForm>({mode: "onBlur"});

  const onSubmit = async (data: FieldsForm): Promise<void> => {
    // setFormData(data, reset);
    reset();
    // eslint-disable-next-line no-console
    console.log(data);
  };

  return (
    <form
      className={FORM_STYLES}
      onSubmit={handleSubmit(onSubmit)} ref={ref}
      {...props}
    >
      <h2 className={TITLE_STYLES}>Создать аккаунт</h2>
      <input
        className={REQUIRED_STYLES}
        {...register("email", {
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Некорректный email",
          },
          required: "Это поле обязательно",
        })}
        type="text"
        placeholder="Email"
        maxLength={60}
      />
      {errors["email"] && <span className={ERRORS_STYLES}>{errors["email"].message}</span>}

      <input
        className={REQUIRED_STYLES}
        {...register("password", {
          minLength: {
            value: 8,
            message: "Минимум 8 символов",
          },
          required: "Это поле обязательно",
        })}
        type="password"
        placeholder="Пароль"
        maxLength={40}
      />
      {errors["password"] && <span className={ERRORS_STYLES}>{errors["password"].message}</span>}

      <input
        className={REQUIRED_STYLES}
        {...register("confirmPassword", {
          minLength: {
            value: 8,
            message: "Минимум 8 символов",
          },
          required: "Это поле обязательно",
        })}
        type="password"
        placeholder="Повторите пароль"
        maxLength={40}
      />
      {errors["confirmPassword"] && (
        <span className={ERRORS_STYLES}>{errors["confirmPassword"].message}</span>
      )}

      <button className={BUTTON_STYLES} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
});
