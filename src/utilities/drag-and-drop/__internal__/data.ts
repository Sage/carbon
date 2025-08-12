const privateItemKey = Symbol("item");

type IItem = {
  [privateItemKey]: true;
  id: string;
  instanceId: symbol;
  index: number;
  list: string;
  type?: string;
};

const privateListKey = Symbol("list");

type IList = {
  [privateListKey]: true;
  instanceId: symbol;
  id: string;
  accepts?: string[];
};

export const getItem = (data: Omit<IItem, typeof privateItemKey>): IItem => ({
  [privateItemKey]: true,
  ...data,
});

export const isItem = (data: Record<string | symbol, unknown>): data is IItem =>
  Boolean(data[privateItemKey]);

export const getList = (data: Omit<IList, typeof privateListKey>): IList => ({
  [privateListKey]: true,
  ...data,
});

export const isList = (data: Record<string | symbol, unknown>): data is IList =>
  Boolean(data[privateListKey]);
