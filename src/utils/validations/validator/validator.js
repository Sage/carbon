const isLegacy = (func) => { return typeof func === 'object'; };

const handleLegacyValidation = (func, value, props) => {
  if (func.validate(value, props)) {
    return Promise.resolve();
  }
  return Promise.reject(func.message());
};

const validator = validationFunctions => (value, props) => {
  const validations = Array.isArray(validationFunctions) ? validationFunctions : [validationFunctions];
  const results = validations.map((func) => {
    if (isLegacy(func)) {
      return handleLegacyValidation(func, value, props);
    }
    return func(value, props);
  });

  return Promise.all(results);
};
export default validator;
