import {useEffect} from "react";
import {db} from "src/firebase";
import {collection, getDocs, limit, orderBy, query, startAfter} from "firebase/firestore";
import {AppState} from "src/app/store";
import {useDispatch, useSelector} from "react-redux";
import {addEmploye, addIsShowEmployees, addUserLastVisible} from "src/app/store/user/slices/userSlice";

export function useShowNextUsers(): any {
  const dispatch = useDispatch();

  // Получение последних видимых заявок из store
  const lastVisible = useSelector((state: AppState) => state.users.userLastVisible);
  // Получение информации о показе alert из store
  const isShowAlert = useSelector((state: AppState) => state.users.isShowAlert);

  useEffect(() => {
    if(!lastVisible && !isShowAlert) {
      dispatch(
        addIsShowEmployees(true),
      );
      alert("Это все пользователи");
    }
  }, [lastVisible]);

  if(lastVisible) {
    const getNextUsers = async (): Promise<void> => {
      // Получение данных из Firestore по условию с лимитом по 8 записей
      const nextUserData = query(collection(db, "users"),
        orderBy("lastName", "desc"),
        startAfter(lastVisible), limit(8));

      const querySnapshot = await getDocs(nextUserData);

      // Получение последних видимых записей
      const lastVisibleApps = querySnapshot.docs[querySnapshot.docs.length - 1];

      // Добавление последних видимых данных user в store
      dispatch(
        addUserLastVisible(lastVisibleApps),
      );

      querySnapshot.forEach((doc: any) => {
        const {firstName, surname, lastName, token, idUser, isLoggedIn, isAdmin, role}: any = doc.data();

        // Добавление данных заявки в store
        dispatch(
          addEmploye({firstName, surname, lastName, token, idUser, isLoggedIn, isAdmin, role}),
        );
      });
    };
    return getNextUsers;
  }
  return null;
};