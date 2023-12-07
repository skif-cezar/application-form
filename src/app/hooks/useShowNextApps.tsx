import {useEffect} from "react";
import {db} from "src/firebase";
import {collection, getDocs, limit, orderBy, query, startAfter, where} from "firebase/firestore";
import {AppState} from "src/app/store";
import {useDispatch, useSelector} from "react-redux";
import {
  ApplicationState,
  addAppLastVisible,
  addApplication,
  addIsShowAlert,
} from "src/app/store/applications/slices/applicationSlice";

export function useShowNextApps(): any {
  const dispatch = useDispatch();

  // Получение email юзера из store
  const email = useSelector((state: AppState) => state.users.user!.email);
  // Админ или обычный юзер из store
  const isAdmin = useSelector((state: AppState) => state.users.user!.isAdmin);

  // Получение последних видимых заявок из store
  const lastVisible = useSelector((state: AppState) => state.applications!.appLastVisible);
  // Получение информации о показе alert из store
  const isShowAlert = useSelector((state: AppState) => state.applications!.isShowAlert);

  useEffect(() => {
    if(!lastVisible && !isShowAlert) {
      dispatch(
        addIsShowAlert(true),
      );
      alert("Это все заявки");
    }
  }, [lastVisible]);

  if(lastVisible) {
    const getNextApps = async (): Promise<void> => {
      // Получение данных из Firestore по условию с лимитом по 8 записей
      let nextAppData;
      if(isAdmin) {
        nextAppData = query(collection(db, "applications"),
          orderBy("date", "desc"),
          startAfter(lastVisible), limit(8));
      } else {
        nextAppData = query(collection(db, "applications"),
          where("email", "==", email),
          orderBy("date", "desc"),
          startAfter(lastVisible), limit(8));
      }

      const querySnapshot = await getDocs(nextAppData);

      // Получение последних видимых записей
      const lastVisibleApps = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных заявки в store
      dispatch(
        addAppLastVisible(lastVisibleApps),
      );

      querySnapshot.forEach((doc: any) => {
        // id заявки
        const {id}: ApplicationState = doc;
        const {author, title, description, parlor, comment, status}: ApplicationState = doc.data();

        // Перевод даты из Firestore в строку
        const dateToString = new Date(doc.data().date.seconds * 1000);
        const date = dateToString.toLocaleString();

        // Добавление данных заявки в store
        dispatch(
          addApplication({
            id,
            author,
            email,
            title,
            description,
            parlor,
            date,
            comment,
            status,
          }),
        );
      });
    };
    return getNextApps;
  }
  return null;
};