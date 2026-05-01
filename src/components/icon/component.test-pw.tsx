import React from "react";
import Icon, { IconProps } from ".";

const IconComponent = (props: Partial<IconProps>) => {
  return <Icon type="add" tooltipVisible {...props} />;
};

export default IconComponent;
