export const toSum = (acc: number, i: number) => acc + i;

export const generateGroups = (groups: number[], rawValue: string) => {
  return groups.reduce(
    (acc: string[], group: number, index: number, src: number[]) => {
      const soFar = src.slice(0, index).reduce(toSum, 0);
      const toAdd = rawValue.slice(soFar, soFar + group);

      return toAdd ? [...acc, toAdd] : acc;
    },
    [],
  );
};
