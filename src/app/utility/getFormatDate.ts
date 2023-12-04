export const getFormatDate = (value: number): string => {
  const date = new Date(value * 1000);
  const day = date.getDate().toString().padStart(2, "0"); // день месяца с ведущим нулем
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // месяц с ведущим нулем
  const year = date.getFullYear().toString().slice(-2); // год в двухзначном формате
  const hours = date.getHours().toString().padStart(2, "0"); // часы с ведущим нулем
  const minutes = date.getMinutes().toString().padStart(2, "0"); // минуты с ведущим нулем

  const formattedDate = `${day}.${month}.${year}, ${hours}:${minutes}`;

  return formattedDate;
};