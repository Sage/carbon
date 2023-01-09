import { action } from "@storybook/addon-actions";
import React from "react";

function partialAction(actionName: string) {
  return (eventObj?: React.SyntheticEvent | string, ...args: string[]) => {
    action(actionName)(
      typeof eventObj === "string"
        ? { view: undefined }
        : { ...eventObj, view: undefined },
      ...args
    );
  };
}

export default partialAction;
