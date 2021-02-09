import { useContext } from "react";

import Context from "../../../__internal__/I18nContext";

export default function useTranslation() {
  return useContext(Context);
}
