export const toSum = (acc, i) => acc + i;

export const generateGroups = (groups, rawValue) => {
  return groups.reduce((acc, group, index, src) => {
    const soFar = src.slice(0, index).reduce(toSum, 0);
    const toAdd = rawValue.slice(soFar, soFar + group);

    return toAdd ? [...acc, toAdd] : acc;
  }, []);
};
