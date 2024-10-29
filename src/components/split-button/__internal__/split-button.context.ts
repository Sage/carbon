import React from "react";

export interface SplitButtonContextProps {
  inSplitButton: boolean;
  onChildButtonClick?: (
    childOnClick?: React.MouseEventHandler<
      HTMLButtonElement | HTMLAnchorElement
    >,
  ) =>
    | React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
    | undefined;
}

export default React.createContext<SplitButtonContextProps>({
  inSplitButton: false,
});
