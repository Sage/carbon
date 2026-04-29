import React from "react";
import Portrait from "./portrait.component";

const PortraitDefaultComponent = ({ ...props }) => {
  return <Portrait {...props} />;
};

export default PortraitDefaultComponent;
