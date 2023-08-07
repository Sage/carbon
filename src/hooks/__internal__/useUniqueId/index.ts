import { useRef } from "react";
import createGuid from "../../../__internal__/utils/helpers/guid";

export default (id?: string, name?: string): string[] => {
  const createdId = useRef<string>(createGuid());
  const createdName = useRef<string>(createGuid());

  return [id || createdId.current, name || createdName.current];
};
