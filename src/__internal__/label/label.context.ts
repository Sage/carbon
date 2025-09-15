import { createContext } from "react";

export type LabelContextType = {
  inputHint?: string;
  inputHintId?: string;
  labelHelp?: React.ReactNode;
  validationRedesignOptIn?: boolean;
};

export default createContext<LabelContextType>({
  inputHint: undefined,
  inputHintId: undefined,
  labelHelp: undefined,
  validationRedesignOptIn: false,
});
