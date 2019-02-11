const Validator = args => new Promise((resolve, reject) => {
  const validate = () => new Promise(() => {
    if (Array.isArray(args)) {
      for (const arg of args) {
        if (arg) {
          resolve();
        } else {
          reject();
        }
      }
    }
  });
  return validate;
});
export default Validator;
