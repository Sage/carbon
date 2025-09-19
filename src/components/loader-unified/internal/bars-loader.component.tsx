import React from "react";

import { LoaderProps } from "../loader.component";
import { InnerBar, OuterBar } from "../loader.style";

const BarsLoader = (size: LoaderProps["size"]) => (
  <OuterBar data-role="outer-bar" size={size}>
    <InnerBar data-role="inner-bar" size={size} />
  </OuterBar>
);

export default BarsLoader;
