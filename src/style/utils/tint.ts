import mix from "./mix";

export default (color: string) => (weight: number | string) =>
  mix("FFFFFF", color, weight as number);
