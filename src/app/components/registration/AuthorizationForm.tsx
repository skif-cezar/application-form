/* eslint-disable @typescript-eslint/typedef */
import React, {forwardRef, useState} from "react";
import {Message, useForm} from "react-hook-form";
import {Icon} from "react-icons-kit";
import {eye} from "react-icons-kit/feather/eye";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import clsx from "clsx";
import styles from "src/app/components/registration/Registration.module.scss";

export type FieldsForm = {
  email: string;
  password: string;
  message?: Message;
};

/**
 * Authorization form component
 */
export const AuthorizationForm: React.FC = forwardRef((props: any, ref: any) => {
  const FORM_STYLES = clsx(styles.form);
  const TITLE_STYLES = clsx(styles.title);
  const ERRORS_STYLES = clsx(styles.errors);
  const REQUIRED_STYLES = clsx(styles.required);
  const INPUT_STYLES = clsx(styles.input);
  const SHOW_ICON_STYLES = clsx(styles.icon);
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

  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const handleToggle = (): void => {
    if(type === "password"){
      setIcon(eye);
      setType("text");
    } else{
      setIcon(eyeOff);
      setType("password");
    }
  };

  return (
    <form
      className={FORM_STYLES}
      onSubmit={handleSubmit(onSubmit)} ref={ref}
      {...props}
    >
      <h2 className={TITLE_STYLES}>Войти</h2>
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
      {errors.email && <span className={ERRORS_STYLES}>{errors.email.message}</span>}

      <div className={INPUT_STYLES}>
        <input
          className={REQUIRED_STYLES}
          {...register("password", {
            minLength: {
              value: 8,
              message: "Минимум 8 символов",
            },
            required: "Это поле обязательно",
          })}
          type={type}
          placeholder="Пароль"
          maxLength={40}
        />
        <span
          className={SHOW_ICON_STYLES} onClick={handleToggle}
          aria-hidden="true"
        >
          <Icon icon={icon} size={20} />
        </span>
        {errors.password && <span className={ERRORS_STYLES}>{errors.password.message}</span>}
      </div>

      <a href="/">Забыли пароль?</a>

      <button className={BUTTON_STYLES} type="submit">
        Войти
      </button>
    </form>
  );
});
