import mix from "./mix";

export default (color: string) => (weight: number | string) =>
  mix("000000", color, weight as number);
