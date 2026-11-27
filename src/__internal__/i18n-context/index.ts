import { createContext } from "react";
import enGB from "../../locales/en-gb";
import Locale from "../../locales/locale";

export default createContext<Locale>(enGB);
