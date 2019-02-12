const validator = validationFunctions => async (value) => {
  let results = [];
  if (Array.isArray(validationFunctions)) {
    results = validationFunctions.map(func => (func(value)));
  } else {
    results = [validationFunctions(value)];
    // Promise.resolve() ?????
  }
  const validate = await Promise.all(results)
    .catch((error) => {
      console.log('Error : ', error.message);
      throw error;
    });
  console.log('Validate status : ', validate);
  return validate;
};
export default validator;
