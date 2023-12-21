import React from "react";
import {PDFDownloadLink} from "@react-pdf/renderer";
import {InvoicePDF} from "src/app/components/getPDF/InvoicePDF";
import {useSelector} from "react-redux";
import {AppState} from "src/app/store";

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
  // eslint-disable-next-line no-console
  console.log(user);

  return (
    <PDFDownloadLink
      document={(
        <InvoicePDF
          employe={fullNameUser} openOrders={user.ordersCompleted}
          completedOrders={user.ordersCompleted}
        />
      )} fileName={`Отчёт ${fullNameUser}.pdf`}
    >
      {({loading}: any) =>
        loading ? "Loading..." : <button type="button">Сформировать отчёт</button>
      }
    </PDFDownloadLink>
  );
};