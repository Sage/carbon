const isLegacy = (func) => { return typeof func === 'object'; };

const validator = validationFunctions => (value, props) => (
  new Promise(async (resolve, reject) => {
    let results = [];

    if (Array.isArray(validationFunctions)) {
      results = validationFunctions.map((func) => {
        if (isLegacy(func)) {
          const valid = func.validate(value, props);
          if (valid) {
            return Promise.resolve();
          }
          return Promise.reject(func.message());
        }
        return func(value, props);
      });
    } else if (isLegacy(validationFunctions)) {
      if (validationFunctions.validate(value, props)) {
        results = [Promise.resolve()];
      } else {
        results = [Promise.reject(validationFunctions.message())];
      }
    } else {
      results = [validationFunctions(value, props)];
    }

    try {
      await Promise.all(results);
      return resolve();
    } catch (err) {
      return reject(err);
    }
  })
);
export default validator;
