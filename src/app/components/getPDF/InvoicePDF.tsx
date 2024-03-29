import React from "react";
import {Page, Text, View, Document, StyleSheet, Font} from "@react-pdf/renderer";

/**
 * InvoicePDF props
 */
export interface InvoicePDFProps {
  employe: string;
  openOrders: string;
  completedOrders: string;
  currentDate: string;
  apps: [];
}

export const InvoicePDF: React.FC<InvoicePDFProps> = (props: InvoicePDFProps) => {
  const numberAllApps = props.openOrders + props.completedOrders;

  Font.register({
    family: "Inter",
    fonts: [
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
        fontWeight: 400,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
        fontWeight: 500,
      },
      {
        src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
        fontWeight: 600,
      },
    ],
  });

  const colorBorder = "#b5b4ff";

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
      fontSize: 14,
      fontFamily: "Inter",
      fontWeight: 400,
    },
    titleContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 18,
      paddingBottom: 18,
    },
    reportTitle: {
      fontSize: 16,
      textAlign: "center",
      fontWeight: 600,
      textTransform: "uppercase",
    },
    container: {
      borderColor: colorBorder,
      borderWidth: 1,
    },
    rowTitle: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#7879f1",
      height: 24,
      textAlign: "center",
      fontWeight: 500,
    },
    employeTitle: {
      width: "60%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
    },
    openTitle: {
      width: "20%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
    },
    completedTitle: {width: "20%"},
    row: {
      flexDirection: "row",
      borderBottomColor: colorBorder,
      borderBottomWidth: 1,
      alignItems: "center",
      height: 24,
      fontWeight: 500,
    },
    employe: {
      width: "60%",
      textAlign: "left",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    open: {
      width: "20%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      textAlign: "right",
      paddingRight: 8,
    },
    completed: {
      width: "20%",
      textAlign: "right",
      paddingRight: 8,
    },
    footer: {
      flexDirection: "row",
      alignItems: "center",
      height: 24,
      fontSize: 12,
      fontWeight: 500,
    },
    footerTitle: {
      width: "60%",
      textAlign: "right",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      paddingRight: 8,
    },
    total: {
      width: "40%",
      textAlign: "center",
    },
    dateContainer: {
      flexDirection: "row",
      justifyContent: "flex-end",
      paddingBottom: 40,
      fontSize: 12,
      fontWeight: 400,
    },
    completedOrdersTable: {flexDirection: "column"},
    titleContainerTable: {
      flexDirection: "row",
      justifyContent: "center",
      marginTop: 26,
      paddingBottom: 18,
    },
    reportTitleTable: {
      fontSize: 14,
      textAlign: "center",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    userTitle: {
      width: "40%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
    },
    parlorTitle: {
      width: "8%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
    },
    themeTitle: {
      width: "39%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
    },
    dateTitle: {width: "13%"},
    user: {
      width: "40%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    parlor: {
      width: "8%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      textAlign: "center",
    },
    theme: {
      width: "39%",
      borderRightColor: colorBorder,
      borderRightWidth: 1,
      paddingLeft: 8,
    },
    date: {
      width: "13%",
      textAlign: "center",
    },
  });

  return (
    <Document>
      <Page
        size="A4" style={styles.page}
        orientation="landscape"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.reportTitle}>Отчёт по заявкам сотрудника</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text>Дата формирования отчёта: </Text>
          <Text>{props.currentDate}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.rowTitle}>
            <Text style={styles.employeTitle}>Сотрудник</Text>
            <Text style={styles.openTitle}>В работе</Text>
            <Text style={styles.completedTitle}>Выполнено</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.employe}>{props.employe}</Text>
            <Text style={styles.open}>{props.openOrders}</Text>
            <Text style={styles.completed}>{props.completedOrders}</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerTitle}>Всего заявок</Text>
            <Text style={styles.total}>{numberAllApps}</Text>
          </View>
        </View>

        {(props.apps.length) && (
          <View style={styles.completedOrdersTable}>
            <View style={styles.titleContainerTable}>
              <Text style={styles.reportTitleTable}>Выполненные заявки</Text>
            </View>
            <View style={styles.container}>
              <View style={styles.rowTitle}>
                <Text style={styles.userTitle}>Пользователь</Text>
                <Text style={styles.parlorTitle}>Кабинет</Text>
                <Text style={styles.themeTitle}>Название заявки</Text>
                <Text style={styles.dateTitle}>Дата подачи</Text>
              </View>
              {props.apps.map((app: any) => (
                <View
                  style={styles.row} key={app.idApp}
                  id={app.idApp}
                >
                  <Text style={styles.user}>{app.author}</Text>
                  <Text style={styles.parlor}>{app.parlor}</Text>
                  <Text style={styles.theme}>{app.title}</Text>
                  <Text style={styles.date}>{app.dateApp}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};