import useIdPolyfill from "../useIdPolyfill";

export default (id?: string, name?: string): string[] => {
  const createdId = useIdPolyfill();
  const createdName = useIdPolyfill();

  return [id || createdId, name || createdName];
};
