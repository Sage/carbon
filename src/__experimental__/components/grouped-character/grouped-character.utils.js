export const toSum = (acc, i) => acc + i;

export const generateGroups = (groups, rawValue) => {
  return groups.reduce((acc, group, index, src) => {
    const soFar = src.slice(0, index).reduce(toSum, 0);
    const toAdd = rawValue.slice(soFar, soFar + group);

    return toAdd ? [...acc, toAdd] : acc;
  }, []);
};

export const toIndexSteps = (acc, grp, index) => {
  if (index === 0) return [...acc, grp];

  const stepMemo = grp + acc[index - 1] + 1;
  return [...acc, stepMemo];
};
