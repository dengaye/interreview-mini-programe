export const getDay = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  return `${year}${month}${date}`;
}

export const getYestday = () => {
  const time = new Date();
  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate() - 1;
  return `${year}${month}${date}`;
}