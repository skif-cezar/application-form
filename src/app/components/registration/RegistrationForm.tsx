import React, {forwardRef, useState} from "react";
import {Message, UseFormReturn, useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "src/app/store/user/slices/userSlice";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {Icon} from "react-icons-kit";
import {eye} from "react-icons-kit/feather/eye";
import {eyeOff} from "react-icons-kit/feather/eyeOff";
import {USER_PAGE_URL} from "src/app/logic/pages/user/UserPage";
import clsx from "clsx";
import styles from "src/app/components/registration/Registration.module.scss";
import {addDoc, collection} from "firebase/firestore";
import {db} from "src/firebase";

export type FieldsForm = {
  firstName: string;
  surname: string;
  lastName: string;
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
    formState: {errors, isValid},
  }: UseFormReturn<FieldsForm> = useForm<FieldsForm>({mode: "onBlur"});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = async (data: FieldsForm): Promise<void> => {
    // Очистить поля input
    reset();

    // Проверка на совпадение паролей
    if (data.password !== data.confirmPassword) {
      alert("Пароли не совпадают");
      setError("confirmPassword", {type: "manual", message: "Пароли не совпадают"});
    } else {
      const auth = getAuth();

      // Логика создания пользователя в firebase
      createUserWithEmailAndPassword(auth, data.email, data.confirmPassword)
        .then(({user}: {user: any}) => {
          try {
            // eslint-disable-next-line no-console
            console.log(data);
            // Добавление данных в Firestore db
            const addUser = async (): Promise<void> => {
              const docRef = await addDoc(collection(db, "users"), {
                firstName: data.firstName,
                surname: data.surname,
                lastName: data.lastName,
                email: user.email,
                id: user.uid,
                isAdmin: false,
                role: "Пользователь",
              });

              // eslint-disable-next-line no-console
              console.log("Заявка создана с ID: ", docRef.id);
            };

            // Добавление пользователя в store
            dispatch(
              setUser({
                firstName: data.firstName,
                surname: data.surname,
                lastName: data.lastName,
                email: user.email,
                id: user.uid,
                token: user.accessToken,
                isLoggedIn: true,
                isAdmin: false,
                role: "Пользователь",
              }),
            );

            addUser();

          } catch (e) {
            console.error("Ошибка добавления документа: ", e);
          }
          navigate(USER_PAGE_URL);
        })
        .catch(console.error);
    }
  };

  const password = watch("password");
  const [currentStep, setCurrentStep] = useState(1);
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);

  const nextStep = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    const nextStepValue = currentStep + 1;
    setCurrentStep(nextStepValue);
  };

  const renderButton = (): JSX.Element => {
    if(currentStep === 1) {
      return (
        <button
          disabled={!isValid}
          className={BUTTON_STYLES} type="button"
          // eslint-disable-next-line no-restricted-globals
          onClick={nextStep}
        >
          Далее
        </button>
      );
    }
    return (
      <button
        className={BUTTON_STYLES} type="submit"
      >
        Зарегистрироваться
      </button>
    );

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

  return (
    <form
      autoComplete="on"
      className={FORM_STYLES} onSubmit={handleSubmit(onSubmit)}
      ref={ref} {...props}
    >
      <h2 className={TITLE_STYLES}>Создать аккаунт</h2>
      {(currentStep === 1) && (
        <>
          <input
            autoComplete="on"
            className={REQUIRED_STYLES}
            {...register("firstName", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              required: "Это поле обязательно",
            })}
            type="text"
            placeholder="Имя"
            maxLength={40}
          />
          {errors.firstName && <span className={ERRORS_STYLES}>{errors.firstName.message}</span>}

          <input
            autoComplete="on"
            className={REQUIRED_STYLES}
            {...register("surname", {
              minLength: {
                value: 2,
                message: "Минимум 2 символа",
              },
              required: "Это поле обязательно",
            })}
            type="text"
            placeholder="Отчество"
            maxLength={40}
          />
          {errors.surname && <span className={ERRORS_STYLES}>{errors.surname.message}</span>}

          <div className={INPUT_STYLES}>
            <input
              autoComplete="on"
              className={REQUIRED_STYLES}
              {...register("lastName", {
                minLength: {
                  value: 2,
                  message: "Минимум 2 символа",
                },
                required: "Это поле обязательно",
              })}
              type="text"
              placeholder="Фамилия"
              maxLength={60}
            />
            {errors.lastName && <span className={ERRORS_STYLES}>{errors.lastName.message}</span>}
          </div>
        </>
      )}
      {(currentStep === 2) && (
        <>
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
            type="password"
            placeholder="Пароль"
            maxLength={40}
          />
          {errors.password && <span className={ERRORS_STYLES}>{errors.password.message}</span>}

          <div className={INPUT_STYLES}>
            <input
              autoComplete="on"
              className={REQUIRED_STYLES}
              {...register("confirmPassword", {
                minLength: {
                  value: 8,
                  message: "Минимум 8 символов",
                },
                required: "Это поле обязательно",
                validate: (value: string) => value === password,
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
        </>
      )}
      {renderButton()}
    </form>
  );
});
