import { useContext } from "react";

import Context from "../../../__internal__/i18n-context";

export default function useLocale() {
  return useContext(Context);
}
