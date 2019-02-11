const validator = validationFunctions => async (value) => {
  let res = false;
  for (let func of validationFunctions) {
    try {
      res = await func(value).catch((error) => {
        console.log(error.message);
        throw error;
      });

    } catch(err) {
      console.log('err in second catch', err)
      return false;
    }
  }
  console.log('res : ', res);
  return res;
};
export default validator;
