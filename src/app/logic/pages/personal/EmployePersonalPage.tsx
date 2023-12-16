/* eslint-disable no-console */
import React, {forwardRef, memo, useCallback, useEffect} from "react";
import AvatarSrc from "src/resources/avatar.png";
import clsx from "clsx";
import styles from "src/app/logic/pages/personal/PersonalePage.module.scss";
import {Message, UseFormReturn, useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "src/app/store";
import {collection, deleteDoc, getDocs, query, updateDoc, where} from "firebase/firestore";
import {db} from "src/firebase";
import {UserState, removeEmploye, updateEmploye} from "src/app/store/user/slices/userSlice";
import {toCapitalize} from "src/app/utility/toCapitalize";
import {useNavigate, useParams} from "react-router-dom";

export type FieldsForm = {
  firstName: string;
  surname: string;
  lastName: string;
  email: string;
  role: string;
  message?: Message;
};

/**
 *  Path to employe personal page
 */
export const EMPLOYE_PERSONAL_PAGE_PATH = "/admin/employees";

/**
 * Employe personal page
 */
export const EmployePersonalPage: React.FC = memo(forwardRef((props: any, ref: any) => {
  const PANEL_STYLES = clsx(styles.panel);
  const TITLE_STYLES = clsx(styles.title);
  const INFORMATION_STYLES = clsx(styles.information);
  const USER_STYLES = clsx(styles.user);
  const FORM_STYLES = clsx(styles.form);
  const REQUIRED_STYLES = clsx(styles.required);
  const ERRORS_STYLES = clsx(styles.errors);
  const BUTTON_STYLES = clsx(styles.button);
  const BUTTON_DELETE_STYLES = clsx(styles.btn_delete);
  const INPUT_STYLES = clsx(styles.input);

  const {id}: any = useParams<{id?: string}>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получение всех сотрудников из store
  const users = useSelector((state: AppState) => state.users.employees);
  // Получение сотрудника по idUser из store
  const user = users!.find((employe: UserState) => employe.idUser === id);
  const userFullName = `${user!.lastName} ${user!.firstName} ${user!.surname}`;

  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  }: UseFormReturn<FieldsForm> = useForm<FieldsForm>({mode: "onBlur"});

  // Устанавливаем значения по умолчанию
  useEffect(() => {
    if (user) {
      setValue("firstName", user.firstName || "");
      setValue("surname", user.surname || "");
      setValue("lastName", user.lastName || "");
      setValue("role", user.role || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data: FieldsForm): Promise<void> => {

    try {
      // Проверка на изменения данных
      if(data.firstName !== user?.firstName ||
        data.surname !== user?.surname ||
        data.lastName !== user?.lastName ||
        data.role !== user?.role) {

        // Получение данных сотрудника из Firestore
        const userData = query(collection(db, "users"),
          where("idUser", "==", id));
        const querySnapshot = await getDocs(userData);

        // Обновить данные user
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];

          if(doc) {
            await updateDoc(doc.ref, {
              firstName: toCapitalize(data.firstName),
              surname: toCapitalize(data.surname),
              lastName: data.lastName.toUpperCase(),
              role: data.role,
            });
          }
        }

        // Добавление пользователя в store
        dispatch(
          updateEmploye({
            firstName: toCapitalize(data.firstName),
            surname: toCapitalize(data.surname),
            lastName: data.lastName.toUpperCase(),
            token: null,
            idUser: id,
            email: user!.email,
            isLoggedIn: false,
            isAdmin: user!.isAdmin,
            role: data.role,
          }),
        );
        alert("Данные успешно обновлены.");
      }

    } catch (e) {
      console.error("Ошибка изменения данных: ", e);
    }
  };

  // Удаление пользователя
  const deleteEmploye = useCallback(async (): Promise<void> => {
    // Получение данных сотрудника из Firestore
    const userData = query(collection(db, "users"),
      where("idUser", "==", id));
    const querySnapshot = await getDocs(userData);
    // eslint-disable-next-line no-restricted-globals
    const isDelete = confirm("Вы действительно хотите удалить пользователя навсегда?");

    // Удалить данные user
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];

      if(doc && isDelete) {
        console.log();
        try {
          await deleteDoc(doc.ref);
          dispatch(
            removeEmploye(id),
          );
          navigate(EMPLOYE_PERSONAL_PAGE_PATH);
        } catch(error) {
          console.error("Ошибка удаления пользователя: ", error);
        }
      }
    }
  }, []);

  return (
    <article className={PANEL_STYLES}>
      <h2 className={TITLE_STYLES}>Личные данные</h2>
      <div className={INFORMATION_STYLES}>
        <img alt={userFullName} src={AvatarSrc} />
        <div className={USER_STYLES}>
          <span>{user!.role}</span>
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
            style={{textTransform: "capitalize"}}
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
            style={{textTransform: "capitalize"}}
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
            style={{textTransform: "uppercase"}}
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
          <h5>Роль</h5>
          <select
            {...register("role")}
          >
            <option value="Пользователь">Пользователь</option>
            <option value="Специалист">Специалист</option>
            <option value="Администратор">Администратор</option>
          </select>
        </div>

        <button className={BUTTON_STYLES} type="submit">
          Сохранить
        </button>
        <button
          className={BUTTON_DELETE_STYLES}
          type="button" onClick={deleteEmploye}
        >
          Удалить пользователя
        </button>
      </form>
    </article>
  );
}));
