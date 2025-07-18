import React from "react";

export type InputName = "start" | "end";
type IsBlurBlocked = { current: boolean };
type SetOpen = null | ((value: boolean) => void);
export type SetInputRefMapValue = {
  [id in InputName]?: { isBlurBlocked: IsBlurBlocked; setOpen: SetOpen };
};

interface DateInputRefMap {
  isBlurBlocked: IsBlurBlocked;
  setOpen: SetOpen;
}

export interface DateRangeContextProps {
  inputRefMap?: Partial<Record<InputName, DateInputRefMap>>;
  setInputRefMap?: (value: SetInputRefMapValue) => void;
  validationMessagePositionTop?: boolean;
}

export default React.createContext<DateRangeContextProps>({});
