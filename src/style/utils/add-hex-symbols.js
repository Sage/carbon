const addHex = obj => (acc, col) => {
  const color = obj[col];
  acc[col] = `#${color}`;
  return acc;
};

export default configObject => Object.keys(configObject).reduce(addHex(configObject), {});
