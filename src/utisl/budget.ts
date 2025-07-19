export const formatNumberWithSpaces = (num: string) => {
  // Форматируем число с пробелами между тысячами
  const formattedNum = num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  // Добавляем "руб." в конце
  return formattedNum + ' руб.';
};
