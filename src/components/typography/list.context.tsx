import React from "react";
import { VariantTypes } from "./typography.component";

export interface ListContextProps {
  variant?: VariantTypes;
}

const ListContext = React.createContext<ListContextProps>({});

export default ListContext;
