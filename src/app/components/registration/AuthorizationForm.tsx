/* eslint-disable no-console */
import React, {forwardRef, useState} from "react";
import {useDispatch} from "react-redux";
import {UserState, setUser} from "src/app/store/user/slices/userSlice";
import {getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import {Message, UseFormReturn, useForm} from "react-hook-form";
import {Icon} from "react-icons-kit";
import {eye} from "react-icons-kit/feather/eye";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import clsx from "clsx";
import styles from "src/app/components/registration/Registration.module.scss";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "src/firebase";

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
  }: UseFormReturn<FieldsForm> = useForm<FieldsForm>({mode: "onBlur"});

  const dispatch = useDispatch();
  // Текущий шаг авторизации
  const [currentStep, setCurrentStep] = useState(1);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const onSubmit = async (data: FieldsForm): Promise<void> => {
    // Очищает поля input
    reset();

    const auth = getAuth();

    if((currentStep === 1)) {
    // Логика авторизации пользователя и добавления его данных в store
      try {
        const userCredentialImpl = await signInWithEmailAndPassword(auth, data.email, data.password);
        const {user}: any = userCredentialImpl;
        // Получение данных user по id из Firestore
        const userData = query(collection(db, "users"), where("idUser", "==", user.uid));
        const querySnapshot = await getDocs(userData);

        if(querySnapshot.docs.length !== 0) {
          querySnapshot.forEach((doc: any) => {
            const {firstName, surname, lastName, isAdmin, role}: UserState = doc.data();

            // Добавление пользователя в store
            dispatch(
              setUser({
                firstName,
                surname,
                lastName,
                idUser: user.uid,
                email: user.email,
                token: user.accessToken,
                isLoggedIn: true,
                isAdmin,
                role,
              }),
            );
          });

        } else {
          alert("Пользователь не найден");
        }
      } catch(error) {
        console.error(error);
        alert("Пользователь не зарегистрирован или неверно введены данные!");
      }
    } else {
      sendPasswordResetEmail(auth, data.email)
        .then(() => {
          // Password reset email sent!
          setCurrentStep(1);
          alert("Письмо с подтверждением выслано на Email!");
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  };

  const handleToggle = (): void => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };

  // Увеличивает значение текущего шага авторизации
  const nextStep = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    // Очищает поля input
    reset();
    const nextStepValue = currentStep + 1;
    setCurrentStep(nextStepValue);
  };

  return (
    <form
      autoComplete="on"
      className={FORM_STYLES} onSubmit={handleSubmit(onSubmit)}
      ref={ref} {...props}
    >
      <h2 className={TITLE_STYLES}>Войти</h2>

      <input
        autoComplete="on"
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

      {(currentStep === 1) && (
        <>
          <div className={INPUT_STYLES}>
            <input
              autoComplete="on"
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

          <a href="#!" onClick={nextStep}>Забыли пароль?</a>
        </>
      )}

      <button className={BUTTON_STYLES} type="submit">
        {(currentStep === 1) ? "Войти" : "Сбросить пароль"}
      </button>
    </form>
  );
});
