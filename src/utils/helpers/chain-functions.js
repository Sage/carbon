export default (newFunction, originalFunction) => {
  return (...args) => {
    if (originalFunction) { originalFunction(...args); }
    newFunction(...args);
  };
};
