/**
 * Переводит строку в формат 1-я заглавна, остальные - нижний регистр
 */
export const toCapitalize = (str: string): string => {
  const lowerCaseStr = str.toLowerCase();
  if (!lowerCaseStr) {
    return lowerCaseStr;
  }
  return lowerCaseStr[0]!.toUpperCase() + lowerCaseStr.slice(1);
};