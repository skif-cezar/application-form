import React from "react";
import {Page, Text, View, Document, StyleSheet, Font} from "@react-pdf/renderer";

/**
 * InvoicePDF props
 */
export interface InvoicePDFProps {
  employe: string;
  openOrders: string;
  completedOrders: string;
}

export const InvoicePDF: React.FC<InvoicePDFProps> = (props: InvoicePDFProps) => {
  Font.register({
    family: "Roboto",
    src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
  });

  const styles = StyleSheet.create({
    page: {
      flexDirection: "column",
      padding: 20,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Roboto",
    },
    header: {
      margin: 10,
      padding: 10,
      fontSize: 14,
      textAlign: "justify",
      fontFamily: "Roboto",
    },
    section: {
      margin: 10,
      padding: 10,
    },
    title: {
      margin: 10,
      padding: 10,
    },
    value: {
      margin: 10,
      padding: 10,
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View>
          <Text style={styles.header}>Отчёт по заявкам сотрудника</Text>

          <View style={styles.section}>
            <Text style={styles.title}>Сотрудник</Text>
            <Text style={styles.value}>{props.employe}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>В работе</Text>
            <Text style={styles.value}>{props.openOrders}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.title}>Выполнено</Text>
            <Text style={styles.value}>{props.completedOrders}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};