const addHex =
  (obj: Record<string, string>) =>
  (acc: Record<string, string>, col: keyof Record<string, string>) => {
    const color = obj[col];
    acc[col] = `#${color}`;
    return acc;
  };

export default (configObject: Record<string, string>) =>
  Object.keys(configObject).reduce(addHex(configObject), {});
