import React from "react";

type FieldsetValidationContextType = {
  disableErrorBorder?: boolean;
};

export default React.createContext<FieldsetValidationContextType>({});
