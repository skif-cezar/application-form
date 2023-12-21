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

/**
 *  Path to report page
 */
export const REPORT_PAGE_URL = "/user/report";

/**
 * Report page
 */
export const ReportPage: React.FC = () => {
  const user = useSelector((state: AppState) => state.users.user);
  const fullNameUser = `${user!.lastName} ${user!.firstName} ${user!.surname}`;
  const [isLoading, setIsLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState("");
  const [apps, setApps] = useState<any>([]);
  // eslint-disable-next-line no-console
  console.log(user);

  // Получение назначенных заявок специалисту
  const getApplicationByExecutor = async (): Promise<void> => {
    setIsLoading(true);

    // Получение заявок из Firestore
    const appData = query(collection(db, "applications"),
      where("executor", "==", user.idUser),
      where("status", "==", "Выполнена"),
      orderBy("date", "desc"));

    const querySnapshot = await getDocs(appData);

    // Проверка на наличие данных
    if(querySnapshot.docs.length) {
      const newApps = querySnapshot.docs.map((docApp: any) => {
        // id заявки
        const idApp = docApp.id;
        const {parlor, title, idUser}: any = docApp.data();
        const dateApp = getFormatDate(docApp.data().date.seconds);
        // const author = `${lastName} ${firstName} ${surname}`;
        return {idApp, idUser, parlor, title, dateApp};
      });
      setApps([...apps, ...newApps]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Дата и время формирования отчета
    async function getDate(): Promise<void> {
      try {
        const response = await axios.get("http://worldtimeapi.org/api/timezone/Europe/Moscow");
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
        loading ? "Loading..." : <button type="button">Сформировать отчёт</button>
      }
    </PDFDownloadLink>
  );

};