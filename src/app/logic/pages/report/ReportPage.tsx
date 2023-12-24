import React, {useEffect, useState} from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {InvoicePDF} from "src/app/components/getPDF/InvoicePDF";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";
import axios from "axios";
import {query, collection, where, orderBy, getDocs} from "firebase/firestore";
import {getFormatDate, convertDateToString} from "src/app/utility/getFormatDate";
import {db} from "src/firebase";
import {Spinner} from "src/app/components/spinner/Spinner";
import clsx from "clsx";
import styles from "src/app/logic/pages/report/ReportPage.module.scss";
import {UserState} from "src/app/store/user/slices/userSlice";

/**
 *  Path to report page
 */
export const REPORT_PAGE_URL = "/user/report";

/**
 * Report page
 */
export const ReportPage: React.FC = () => {
  const BUTTON_STYLES = clsx(styles.button);
  const BUTTONS_STYLES = clsx(styles.buttons);

  const user = useSelector((state: AppState) => state.users.user);
  const fullNameUser = `${user!.lastName} ${user!.firstName} ${user!.surname}`;
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [apps, setApps] = useState<any>([]);

  // Получение назначенных заявок специалисту
  const getApplicationByExecutor = async (): Promise<void> => {
    setIsLoading(true);

    // Получение заявок из Firestore
    const appData = query(collection(db, "applications"),
      where("executor", "==", user.idUser),
      where("status", "==", "Выполнена"),
      orderBy("date", "desc"));

    const querySnapshot = await getDocs(appData);

    if(querySnapshot.docs.length) {
      const newArr = await Promise.all(querySnapshot.docs.map(async(docApp: any) => {
        // id заявки
        const idApp = docApp.id;
        const {parlor, title, idUser}: any = docApp.data();
        const dateApp = getFormatDate(docApp.data()["date"].seconds);
        let author;

        // Получение данных user из Firestore по условию
        const userData = query(collection(db, "users"),
          where("idUser", "==", idUser));

        const querySnapshotUser = await getDocs(userData);

        // Проверка на наличие данных
        if(querySnapshotUser.docs.length) {
          querySnapshotUser.forEach((userDoc: any) => {
            const {firstName, lastName, surname}: UserState = userDoc.data();
            author = `${lastName} ${firstName} ${surname}`;
          });
        }
        return {idApp, author, parlor, title, dateApp};
      }));
      setApps([...apps, ...newArr]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Дата и время формирования отчета
    async function getDate(): Promise<void> {
      try {
        const response = await axios.get("https://worldtimeapi.org/api/timezone/Europe/Moscow");
        const {datetime}: any = response.data;
        setCurrentDate(convertDateToString(datetime));
      } catch (error) {
        console.error(error);
        setCurrentDate("Ошибка получения даты");
      }
    };

    getDate();
    getApplicationByExecutor();
  }, []);

  if(isLoading) {
    return <Spinner />;
  }

  return (
    <div className={BUTTONS_STYLES}>
      <PDFDownloadLink
        document={(
          <InvoicePDF
            employe={fullNameUser} openOrders={user.openOrders}
            completedOrders={user.completedOrders}
            apps={apps} currentDate={currentDate}
          />
        )} fileName={`Отчёт ${fullNameUser}.pdf`}
      >
        {({loading}: any) =>
          loading ? "Формирование отчёта..." : <button className={BUTTON_STYLES} type="button">Сформировать отчёт</button>
        }
      </PDFDownloadLink>
    </div>
  );

};