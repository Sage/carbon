import { createContext } from "react";
import { VariantType } from "../menu-item/menu-item.component";

interface VariantContextType {
  menuItemVariant?: VariantType;
}

export default createContext<VariantContextType>({});
