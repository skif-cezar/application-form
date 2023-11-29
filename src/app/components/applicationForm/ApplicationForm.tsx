/* eslint-disable @typescript-eslint/typedef */
import React, {forwardRef} from "react";
import {useSelector} from "react-redux";
import {Message, useForm} from "react-hook-form";
import {collection, addDoc, serverTimestamp} from "firebase/firestore";
import clsx from "clsx";
import styles from "src/app/components/applicationForm/ApplicationForm.module.scss";
import {db} from "src/firebase";
import {AppState} from "src/app/store";

export type FieldsForm = {
  title: string;
  description: string;
  parlor: string;
  comment?: string;
  message?: Message;
};

/**
 *  Path to application form
 */
export const APPLICATION_FORM_URL = "/user/new-application";

/**
 * Application form component
 */
export const ApplicationForm: React.FC = forwardRef((props: any, ref: any) => {
  const FORM_STYLES = clsx(styles.form);
  const TITLE_STYLES = clsx(styles.title);
  const ERRORS_STYLES = clsx(styles.errors);
  const REQUIRED_STYLES = clsx(styles.required);
  const BUTTON_STYLES = clsx(styles.button);

  const userEmail = useSelector((state: AppState) => state.user.email);

  const {
    register,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<FieldsForm>({mode: "onBlur"});

  const onSubmit = async (data: FieldsForm): Promise<void> => {
    reset();

    try {
      const docRef = await addDoc(collection(db, "applications"), {
        author: userEmail,
        title: data.title,
        description: data.description,
        parlor: data.parlor,
        date: serverTimestamp(),
        comment: data.comment,
        status: "Открыта",
      });
      // eslint-disable-next-line no-console
      console.log("Заявка создана с ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <form
      className={FORM_STYLES}
      onSubmit={handleSubmit(onSubmit)} ref={ref}
      {...props}
    >
      <h2 className={TITLE_STYLES}>Новая заявка</h2>
      <input
        className={REQUIRED_STYLES}
        {...register("title", {
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          required: "Это поле обязательно",
        })}
        type="text"
        placeholder="Название заявки"
        maxLength={40}
      />
      {errors.title && <span className={ERRORS_STYLES}>{errors.title.message}</span>}

      <textarea
        className={REQUIRED_STYLES}
        {...register("description", {
          minLength: {
            value: 10,
            message: "Минимум 10 символов",
          },
          required: "Это поле обязательно",
        })}
        placeholder="Описание"
      />
      {errors.description && (
        <span className={ERRORS_STYLES}>{errors.description.message}</span>
      )}

      <input
        className={REQUIRED_STYLES}
        {...register("parlor", {
          minLength: {
            value: 2,
            message: "Минимум 2 символа",
          },
          required: "Это поле обязательно",
        })}
        type="text"
        placeholder="Какой кабинет?"
        maxLength={40}
      />
      {errors.parlor && <span className={ERRORS_STYLES}>{errors.parlor.message}</span>}

      <textarea
        {...register("comment", {
          minLength: {
            value: 10,
            message: "Минимум 10 символов",
          },
        })}
        placeholder="Добавить комментарий"
      />
      {errors.comment && <span className={ERRORS_STYLES}>{errors.comment.message}</span>}

      <button className={BUTTON_STYLES} type="submit">
        Оформить заявку
      </button>
    </form>
  );
});
