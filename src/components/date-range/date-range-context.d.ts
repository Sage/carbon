import * as React from "react";

interface DateInputRefMap {
  isBlurBlocked: { current: boolean };
  setOpen: null | ((open: boolean) => void);
}

export interface DateRangeContextProps {
  inputRefMap: {
    start: DateInputRefMap;
    end: DateInputRefMap;
  };
  setInputRefMap: (newState: DateInputRefMap) => void;
}

declare const DateRangeContext: React.Context<DateRangeContextProps>;
export default DateRangeContext;
