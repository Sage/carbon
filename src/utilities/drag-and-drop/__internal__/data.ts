const itemKey = Symbol("item");
const containerKey = Symbol("container");

type IItem = {
  [itemKey]: true;
  id: string;
  instanceId: symbol;
  index: number;
  list: string;
};

type IContainer = {
  [containerKey]: true;
  instanceId: symbol;
  id: string;
};

function getItem(data: Omit<IItem, typeof itemKey>): IItem {
  return {
    [itemKey]: true,
    ...data,
  };
}

function getContainer(data: Omit<IContainer, typeof containerKey>): IContainer {
  return {
    [containerKey]: true,
    ...data,
  };
}

function isItem(data: Record<string | symbol, unknown>): data is IItem {
  return Boolean(data[itemKey]);
}

function isContainer(
  data: Record<string | symbol, unknown>,
): data is IContainer {
  return Boolean(data[containerKey]);
}

export { getItem, getContainer, isItem, isContainer };
