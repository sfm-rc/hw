export default (value, separator = ',') => {
  const number = parseInt(value, 10);
  return number && number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
};
