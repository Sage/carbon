const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null;
};

// eslint-disable-next-line import/prefer-default-export
export const assertIsSubset = (obj, comparison) => {
  if (!isObject(obj)) {
    // no further nesting
    return;
  }

  const objKeys = Object.keys(obj);
  const comparisonKeys = Object.keys(comparison);

  objKeys.forEach((key) => {
    // assert that keys are present
    expect(comparisonKeys).toContain(key);

    // repeat for nested objects
    assertIsSubset(obj[key], comparison[key]);
  });
};
