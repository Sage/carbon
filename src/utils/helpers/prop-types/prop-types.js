const PropTypesHelper = {

  inValidRange: (props, propName, componentName, min, max) => {
    if (props[propName]) {

      let value = props[propName];

      if (isTypeOfNumberOrString(value)) {
        if (!valueInRange(value, min, max)) {
          return throwError(propName, componentName, `must be between ${ min } and ${ max }`);
        }
      } else {
        return throwError(propName, componentName, 'must be a String or Integer');
      }
    }

    return null;
  }
};

export default PropTypesHelper;

const valueInRange = (value, min, max) => {
  return value >= min && value <= max;
};

const throwError = (propName, componentName, error) => {
  return new Error(buildErrorString(propName, componentName, error));
};

const buildErrorString = (propName, componentName, error) => {
  return (`${ propName } in ${ componentName } ${ error }`);
};

const isTypeOfNumberOrString = (value) => {
  return typeof value === 'string' || typeof value === 'number';
};
