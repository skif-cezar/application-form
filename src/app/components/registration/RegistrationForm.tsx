/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/typedef */
import React, {forwardRef, useState} from "react";
import {Message, useForm} from "react-hook-form";
// import {useDispatch} from "react-redux";
// import {setUser} from "src/app/store/slices/userSlice";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Icon} from "react-icons-kit";
import {eye} from "react-icons-kit/feather/eye";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
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
  const INPUT_STYLES = clsx(styles.input);
  const SHOW_ICON_STYLES = clsx(styles.icon);
  const BUTTON_STYLES = clsx(styles.button);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: {errors},
  } = useForm<FieldsForm>({mode: "onBlur"});

  // const dispatch = useDispatch();

  const onSubmit = async (data: FieldsForm): Promise<void> => {
    reset();

    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {type: "manual", message: "Пароли не совпадают"});
    } else {
      // setFormData(data, reset);
      // eslint-disable-next-line no-console
      console.log(data);

      const auth = getAuth();
      createUserWithEmailAndPassword(auth, data.email, data.confirmPassword)
        .then(console.log)
        .catch(console.error);
    }
  };

  const password = watch("password");
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
      {errors.email && <span className={ERRORS_STYLES}>{errors.email.message}</span>}

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
      {errors.password && <span className={ERRORS_STYLES}>{errors.password.message}</span>}

      <div className={INPUT_STYLES}>
        <input
          className={REQUIRED_STYLES}
          {...register("confirmPassword", {
            minLength: {
              value: 8,
              message: "Минимум 8 символов",
            },
            required: "Это поле обязательно",
            validate: (value) => {return value === password;},
          })}
          type={type}
          placeholder="Повторите пароль"
          maxLength={40}
        />
        <span
          className={SHOW_ICON_STYLES} onClick={handleToggle}
          aria-hidden="true"
        >
          <Icon icon={icon} size={20} />
        </span>
        {errors.confirmPassword && <span className={ERRORS_STYLES}>Пароли не совпадают</span>}
      </div>

      <button className={BUTTON_STYLES} type="submit">
        Зарегистрироваться
      </button>
    </form>
  );
});
