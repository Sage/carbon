const isLegacy = func => typeof func === 'object';

const handleLegacyValidation = (func, value, props) => {
  if (func.validate(value, props)) return Promise.resolve();
  return Promise.reject(func.message());
};

const validator = validationFunctions => (value, props) => {
  const validations = Array.isArray(validationFunctions) ? validationFunctions : [validationFunctions];
  const handleValidation = func => (
    isLegacy(func) ? handleLegacyValidation(func, value, props) : func(value, props)
  );
  const results = validations.map(handleValidation);
  return Promise.all(results);
};

export default validator;
